var fs = require('fs');
var path = require('path');

function GenerateTemplate(item) {
    return /*html*/`
    <article id="${item.id}">
        <h1>${item.title}</h1>
        <br>
        <p>${item.paragraph}</p>
        <br>
        <figure class="__modifier-center">
            <div class="__element-image-container">
                <button class="__element-prev-button">&#10094;</button>
                <img class="__element-showcase" src="${item.imageURL}" alt="Images">
                <button class="__element-next-button">&#10095;</button>
            </div>
            <figcaption>${item.caption}</figcaption>
        </figure>
    </article>
    `;
}

function FindFiles(directory, type) {
    let fileReturn = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
            // If it's a directory, recursively search for JSON files
            const subdirectoryFiles = FindFiles(filePath, type);
            fileReturn = fileReturn.concat(subdirectoryFiles);
        } else if (type.indexOf(path.extname(file)) != -1) {
            // If it's a JSON file, add it to the list
            fileReturn.push(filePath);
        }
    });

    return fileReturn;
}

function GenerateAllTemplates(htmlContent, filePath, divId) {

    const jsonsInDir = FindFiles(path.join(__dirname, '..', filePath), '.json');
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(file);
        const item = JSON.parse(fileData.toString());
        const newContent = GenerateTemplate(item);

        // Append HTML content to the specified div
        htmlContent = AppendToDiv(htmlContent, divId, newContent);
        //console.log(htmlContent);
        console.log(`Generated HTML for ${item.id}`);
    });
    //console.log(htmlContent);
    return htmlContent;
}

function AppendToDiv(html, divId, content) {
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

function CycleImage(oldPath, direction){
    return new Promise((resolve, reject) => {
        var fileTypes = ['.gif', '.png', '.jpeg'];
        const folder = path.join(__dirname, '..', oldPath, '..');
        const files = FindFiles(folder, fileTypes);
        
        files.forEach((file, index) => {
            filePath = file.replace(/\\/g, '/');
            if(filePath.indexOf(oldPath) != -1){
                var newPath = '';
                if(direction){
                    if(index + 1 < files.length)
                        newPath = RemoveRoot(files.at(index + 1));
                    else
                        newPath = RemoveRoot(files.at(0));
                }
                else{
                    if(index - 1 > 0)
                        newPath = RemoveRoot(files.at(index - 1));
                    else
                        newPath = RemoveRoot(files.at(files.length - 1));
                }
                resolve(newPath);
            }
        });
        
        function RemoveRoot(filePath){
            // Remove the root part of the path
            const relativePath = path.relative(__dirname, filePath);
        
            // Replace backslashes with forward slashes
            const cleanedPath = relativePath.replace(/\\/g, '/');
            const finalPath = cleanedPath.replace('../', '/');
        
            return finalPath.toString();
        }
    });
}

module.exports = { GenerateAllTemplates, CycleImage };