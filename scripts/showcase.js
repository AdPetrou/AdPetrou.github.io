var fs = require('fs');
var path = require('path');

function arrayObject(filePath, id)
{
    this.filePath = filePath;
    this.id = id;
}

const fileArray = new Array();
const subtitlesData = fs.readFileSync('./Assets/Projects/Selector Data.json', 'utf8');
// Parse JSON data into JavaScript array
const subtitles = JSON.parse(subtitlesData);

function generateTemplate(item) {
    return /*html*/`
    <div id="${item.id}">
        <h1>${item.title}</h1>
        <br>
        <p>${item.paragraph}</p>
        <br>
        <figure class="__modifier-center">
            <div class="__element-image-container">
                <button class="prev-button">&#10094;</button>
                <img src="${item.imageUrl}">
                <button class="next-button">&#10095;</button>
            </div>
            <figcaption>${item.caption}</figcaption>
            <a class="" href="${item.link}"> See more </a>
        </figure>
    </div>
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

function generateAllTemplates() {
    const indexHtmlPath = path.join(__dirname, '..', 'index.html');
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    subtitles.forEach((element) => {
        if(element.showcase === "true") {
            fileArray.push(new arrayObject(`./Assets/Projects/${element.text}/`, element.target));
        }
    });

    fileArray.forEach((files) => {
        const jsonsInDir = findJsonFiles(path.join(__dirname, '..', files.filePath));
        jsonsInDir.forEach(file => {
            console.log("File Bell");
            const fileData = fs.readFileSync(file);
            const item = JSON.parse(fileData.toString());
            const htmlContent = generateTemplate(item);

            // Append HTML content to the specified div
            indexHtml = appendToDiv(indexHtml, `${files.id}-content`, htmlContent);

            console.log(`Generated HTML for ${item.id}`);
        });
    });

    // Write updated index.html content
    fs.writeFileSync(indexHtmlPath, indexHtml);
}

function appendToDiv(html, divId, content) {
    // Find the index of the closing tag of the target div
    console.log(html)
    const closingTagIndex = html.indexOf('id="level-design-content"');

    if (closingTagIndex === -1) {
        console.error(`Target div with ID ${divId} not found.`);
        return html; // Return original HTML if target div not found
    }

    // Insert the content before the closing tag of the target div
    return html.slice(0, closingTagIndex) + content + html.slice(closingTagIndex);
}

module.exports = { generateAllTemplates };