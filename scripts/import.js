// Array of script source URLs
const scriptSources = [
    "./scripts/header.js",
    "./scripts/selector.js",
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
        SetSelectors();
    }
}

addScripts(0);
