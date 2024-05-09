const subtitles = [
    { icon: "fa-house", text: "Home & About", target: "home-about", showcase: "false" },
    { icon: "fa-trowel-bricks", text: "Level Design", target: "level-design", showcase: "true" },
    { icon: "fa-gamepad", text: "Game Development", target: "game-development", showcase: "true"  },
    { icon: "fa-globe", text: "Front-End Suite", target: "front-end", showcase: "false"  },
    { icon: "fa-globe", text: "Other Projects", target: "other-projects", showcase: "true" }
];

// Array of script source URLs
const scriptSources = [
    "./scripts/HomeAboutContent.js",
];

function addScript(src, callback) {
    const scriptElement = document.createElement('script');
    scriptElement.async = true; // Set the async attribute
    scriptElement.src = src; // Set the src attribute to the script source URL
    // Add onload event listener to execute callback when script is fully loaded and executed
    scriptElement.onload = callback;
    document.head.appendChild(scriptElement); // Append the script element to the document head
}
// Recursive function to add scripts one by one
function addScripts(index) {
    if (index < scriptSources.length) {
        addScript(scriptSources[index], () => {
            // When the current script is loaded and executed, add the next script
            addScripts(index + 1);
        });
    } else {
        // All scripts have been added and executed, execute the rest of the script
        console.log("All scripts loaded and executed");
        main();
    }
}

addScripts(0);

function main(){

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
    });

    const subtitleElements = document.querySelectorAll(".__element-subtitle");
    const contents = document.querySelectorAll(".block-content");
    SetTransition();

    subtitleElements.forEach(subtitle => {
        subtitle.addEventListener("click", () => {
            const targetId = subtitle.getAttribute("data-target");

            contents.forEach(content => {
                if (content.id === `${targetId}-content`) {
                    content.style.display = "block"; // Show the content first
                    setTimeout(() => {
                        SetVisible(content);
                    }, 10); // Use a small delay to ensure display is applied before opacity transition starts
                    subtitle.classList.add("__modifier-active-section")
                } else {
                    content.style.display = "none";
                    SetHidden(content);
                }
            });
        });
    });

    const firstSubtitle = subtitleElements[0];
    setTimeout(() => {
        firstSubtitle.click();
    }, 1400);
}