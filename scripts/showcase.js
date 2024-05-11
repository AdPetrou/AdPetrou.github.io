var fs = require('fs');
var path = require('path');

function generateTemplate(item) {
    return /*html*/`
    <article id="${item.id}">
        <h1>${item.title}</h1>
        <br>
        <p>${item.paragraph}</p>
        <br>
        <figure class="__modifier-center">
            <div class="__element-image-container">
                <button class="prev-button">&#10094;</button>
                <img class="__element-showcase" src="${item.imageURL}" alt="Images">
                <button class="next-button">&#10095;</button>
            </div>
            <figcaption>${item.caption}</figcaption>
        </figure>
    </article>
    `;
}

function findJsonFiles(directory) {
    let jsonFiles = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
            // If it's a directory, recursively search for JSON files
            const subdirectoryFiles = findJsonFiles(filePath);
            jsonFiles = jsonFiles.concat(subdirectoryFiles);
        } else if (path.extname(file) === '.json') {
            // If it's a JSON file, add it to the list
            jsonFiles.push(filePath);
        }
    });

    return jsonFiles;
}

function generateAllTemplates(htmlContent, filePath, divId) {

    const jsonsInDir = findJsonFiles(path.join(__dirname, '..', filePath));
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(file);
        const item = JSON.parse(fileData.toString());
        const newContent = generateTemplate(item);

        // Append HTML content to the specified div
        htmlContent = appendToDiv(htmlContent, divId, newContent);
        //console.log(htmlContent);
        console.log(`Generated HTML for ${item.id}`);
    });
    //console.log(htmlContent);
    return htmlContent;
}

function appendToDiv(html, divId, content) {
    // Find the index of the closing tag of the target div
    const closingTagIndex = html.indexOf(`<div class="block-content" id="${divId}">`);

    if (closingTagIndex === -1) {
        console.error(`Target div with ID ${divId} not found.`);
        return html; // Return original HTML if target div not found
    }

    // Find the index of the closing </div> tag after the closing tag of the target div
    const closingDivIndex = html.indexOf('</div>', closingTagIndex);

    if (closingDivIndex === -1) {
        console.error(`Closing </div> tag not found for div with ID ${divId}.`);
        return html; // Return original HTML if closing </div> tag not found
    }

    // Insert the content between the closing tag and the closing </div> tag of the target div
    return html.slice(0, closingDivIndex) + content + html.slice(closingDivIndex);
}


module.exports = { generateAllTemplates };