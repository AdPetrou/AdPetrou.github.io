var subtitles
fetch('./Assets/Projects/Selector Data.json')
    .then(response => response.json())
    .then(subtitlesData => {
        // Use subtitles array in browser-side code
        subtitles = subtitlesData
    })
    .catch(error => {
        console.error('Error fetching subtitles:', error);
    });

function SetHidden(content)
{
    // Loop through each element
    Array.from(content.children).forEach((element, index) => {
    // Apply CSS styles dynamically based on the index
        element.style.opacity = 0;
    });
}

function SetVisible(content)
{
    // Loop through each element
    Array.from(content.children).forEach((element) => {
    // Apply CSS styles dynamically based on the index
        element.style.opacity = 1;
    });
}

function GenerateDiv(name){
    const tempContainer = document.createElement('div');
    tempContainer.classList.add("block-content");
    tempContainer.id = `${name}-content`;
    
    document.getElementById("content").appendChild(tempContainer);
    return tempContainer;
}

function SetSelectors(){
    var loaded = false;
    function SetTransition(){
        contents.forEach(content => {
            Array.from(content.children).forEach((element, index) => {
            // Apply CSS styles dynamically based on the index
                element.style.opacity = 0;
                element.style.transition = 'opacity 1s ease-in-out';
                element.style.transitionDelay = `${index * 0.25}s`;
            });
        });
    }

    const subtitleContainer = document.getElementById("selectors");
    subtitles.forEach(subtitle => {
        const subtitleElement = document.createElement("h3");
        subtitleElement.classList.add("__element-subtitle");
        subtitleElement.dataset.target = subtitle.target;

        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-solid", subtitle.icon);

        const textNode = document.createTextNode(subtitle.text);

        subtitleElement.appendChild(iconElement);
        subtitleElement.appendChild(textNode);

        subtitleContainer.appendChild(subtitleElement);

        if(subtitle.showcase === "true"){
            GenerateDiv(subtitle.target)
        }
    });

    fetch('/finished', { method: 'POST' })
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to notify server');
        }
        console.log('Server notified successfully');
    })
    .catch(error => {
        console.error('Error notifying server:', error);
    });

    const subtitleElements = document.querySelectorAll(".__element-subtitle");
    const contents = document.querySelectorAll(".block-content");
    SetTransition();

    subtitleElements.forEach(subtitle => {
        subtitle.addEventListener("click", () => {
            const targetId = subtitle.getAttribute("data-target");
        
            contents.forEach(content => {
                if (content.id === `${targetId}-content`) {
                    // Add class to the clicked subtitle element
                    if (!subtitle.classList.contains('__modifier-active-section')) {
                        subtitle.classList.add("__modifier-active-section");
                    }
                    content.style.display = "block"; // Show the content first
                    setTimeout(() => {
                        SetVisible(content);
                    }, 10); // Use a small delay to ensure display is applied before opacity transition starts
                } else {
                    content.style.display = "none";
                    SetHidden(content);
                    // Remove class from other subtitle elements
                    subtitleElements.forEach(otherSubtitle => {
                        if (otherSubtitle !== subtitle && otherSubtitle.classList.contains('__modifier-active-section')) {
                            otherSubtitle.classList.remove("__modifier-active-section");
                        }
                    });
                }
            });
        });
    });

    const firstSubtitle = subtitleElements[0];
    setTimeout(() => {
        firstSubtitle.click();
    }, 1400);
}