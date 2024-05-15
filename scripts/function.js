var subtitles = [
    { icon: "fa-house", text: "Home & About", target: "home-about", showcase: "false" },
    { icon: "fa-trowel-bricks", text: "Level Design", target: "level-design", showcase: "true" },
    { icon: "fa-gamepad", text: "Game Development", target: "game-development", showcase: "true" },
    { icon: "fa-globe", text: "Web-Dev Suite", target: "web-dev", showcase: "false" },
    { icon: "fa-globe", text: "Other Projects", target: "other-projects", showcase: "true" }
]

var fetching = false;
var looping = false;
let fetchQueue = []; // Queue to store GenerateDiv tasks

function SetHidden(content)
{
    content.style.display = "none";
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

function GenerateDiv(name, id){
    fetching = true; // Set the flag to indicate that a fetch operation is in progress
    const html = document.createElement('div');
    html.classList.add("block-content");
    const contentId = `${id}-content`;
    html.id = contentId;

    const parent =  document.getElementById("content");
    parent.appendChild(html);
    console.log("Fetching")

    fetch('/process-html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            htmlContent: parent.innerHTML,
            filePath: `./Assets/Projects/${name}/`,
            contentId,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Parse response body as text
    })
    .then(htmlReturn => {
        console.log("Fetched");
        parent.innerHTML = htmlReturn; // Update the parent element with the received HTML content
        fetching = false; // Reset the flag since the fetch operation is complete
        SetImageButtons();
        SetSelectors();
        CloneShowcase();
    })
    .catch(error => {
        fetching = false; // Reset the flag on error
        console.error('This Error:', error);
    });
}

async function processNextTask() {
    // Check if there are tasks in the queue#
    while (fetchQueue.length > 0) {
        looping =  true;
        // Execute the next task in the queue
        if(!fetching)
        {
            const nextTask = fetchQueue.shift();
            await nextTask();
        }
        await new Promise(resolve => setTimeout(resolve, 10)); // Add a small delay
        console.log("Looping");
    }
    looping = false
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
        fetchQueue.push( () => {GenerateDiv(subtitle.text, subtitle.target)});
        
        if (fetchQueue.length > 0 && !looping) {
            processNextTask();
        }
    }
});

function SetSelectors() {
    const subtitleElements = document.querySelectorAll(".__element-subtitle");
    const contents = document.querySelectorAll(".block-content");

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
                    content.style.display = null; // Show the content first
                    setTimeout(() => {
                        SetVisible(content);
                    }, 10); // Use a small delay to ensure display is applied before opacity transition starts
                } else {
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

    if(subtitleElements.length == subtitles.length)
    {
        const firstSubtitle = subtitleElements[0];
        setTimeout(() => {
            firstSubtitle.click();
        }, 1400);
    }
}

function SetImageButtons(){
    var imageContainer = document.querySelectorAll(".__element-image-container")

    imageContainer.forEach(container => {
        container = removeAllEventListeners(container);
        container.addEventListener("click", () => {
            var largeContainer = container.cloneNode(true);
            largeContainer.classList.add("__element-image-container-expanded")
            
            SetButtons(largeContainer);
            document.body.style.overflow = "hidden";

            document.body.appendChild(largeContainer);
            largeContainer.addEventListener("click", () => {
                largeContainer.remove();
                document.body.style.overflow = null;
            });
        });
    });

    SetShow(document);
    SetButtons(document);

    function SetShow(parent) {
        var elements = parent.querySelectorAll(".__element-show-more");
        elements.forEach(element => {
            element = removeAllEventListeners(element);
            element.addEventListener("click", handleClick);
        });
    
        function handleClick(event) {
            event.stopPropagation(); // Prevent event propagation
            
            var paragraph = this.parentElement.querySelector(".__element-showcase-paragraph");
            if (!paragraph.classList.contains("__element-showcase-paragraph-unhide")) {
                paragraph.classList.add("__element-showcase-paragraph-unhide");
                this.textContent = "Hide text";
                console.log("show")
            } else {
                paragraph.classList.remove("__element-showcase-paragraph-unhide");
                this.textContent = "Show more";
                console.log("hide")
            } 
        }
    }

    function SetButtons(parent){

    ButtonLoop(parent.querySelectorAll(".__element-next-button"));
    ButtonLoop(parent.querySelectorAll(".__element-prev-button"));

    function ButtonLoop(buttons)
    {
        buttons.forEach(button => { 
            button.addEventListener("click", RetrieveImage);
        })
    }
    }
}

function CloneShowcase() {
    var showcaseElement = document.querySelector('[id^="showcase-"]');
    if(showcaseElement)
    {
        var elementToClone = document.getElementById(showcaseElement.id.replace("showcase-", ""))
        showcaseElement.innerHTML = elementToClone.cloneNode(true).innerHTML;
        showcaseElement.classList.add(elementToClone.classList);
        showcaseElement.classList.add("__modifier-spotlight");
        SetImageButtons()
    }
}

function RetrieveImage(){
    var direction = true; // Assume next direction
    if (this.classList.contains("__element-prev-button")) {
        direction = false; // Change direction to previous if it's the previous button
    }
    
    const image = this.parentElement.querySelector("img");
    const imagePath = new URL(image.src).pathname; // Extracts the pathname of the URL
    
    fetch('/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            imagePath,
            direction,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        return response.json();
    })
    .then(imgSrc => {
        // Cycle through image URLs
        const basePath = new URL(image.src).origin;
        const imageUrl = basePath + imgSrc.imgSrc;

        var filePath = imageUrl.replace(' ', '%20');
        image.src = filePath;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeAllEventListeners(element) {
    // Create a shallow clone of the element
    const clone = element.cloneNode(true);

    // Replace the original element with the clone
    element.parentNode.replaceChild(clone, element);
    return clone;
}