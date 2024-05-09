function arrayObject(index, filePath, id)
{
    this.index = index;
    this.filePath = filePath;
    this.id = id;
}

const fileArray = new Array();

function appShowcase(item){
    return/*html*/`
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
    `
}

async function generateTemplate(item) {
    const container = document.createElement("div");
    container.appendChild(appShowcase(item));
    container.id = item.id;
    
    return container;
}

// async function generateAllTemplates() {
//     subtitles.forEach((element, index) => {
//         if(element.showcase === "true"){
//             fileArray.push(new arrayObject(index, `./Assets/Projects/${element.text}`, element.id))
//         }
//     });

//     fileArray.forEach((element) =>{
//         const jsonsInDir = fs.readdirSync().filter(file => element.filePath.extname(file) === '.json');
//         jsonsInDir.forEach(file => {
//             document.getElementById(element.id).appendChild(generateTemplate(JSON.parse(fs.readFileSync(file))));
//         });
//     }
//     )
// }

async function fetchAllJsonFilesInFolder(folderPath) {
    const response = await fetch(folderPath);
    const files = await response.json();
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    return jsonFiles;
}

async function fetchAndGenerateTemplates(folderPath, elementID) {
    const response = await fetch(folderPath);
    const files = await response.json();
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const fetchPromises = jsonFiles.map(async file => {
        const response = await fetch(`${folderPath}/${file}`);
        const data = await response.json();
        const container = await generateTemplate(data);
        const targetElement = document.getElementById(elementID);
        if (targetElement) {
            targetElement.appendChild(container);
        } else {
            console.error(`Element with ID '${elementID}' not found.`);
        }
    });
    await Promise.all(fetchPromises);
}

//Example usage

function generateAllTemplates() {
        subtitles.forEach((element, index) => {
            if(element.showcase === "true"){
                fileArray.push(new arrayObject(index, `./Assets/Projects/${element.text}/`, element.id))
            }
        });

        fileArray.forEach((files) => {
            fetchAndGenerateTemplates(files.filePath, files.id)
            console.log(files.filePath)
        })
    }
    
generateAllTemplates();