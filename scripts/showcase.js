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


//Example usage

function generateAllTemplates() {
        subtitles.forEach((element, index) => {
            if(element.showcase === "true"){
                fileArray.push(new arrayObject(index, `./Assets/Projects/${element.text}/`, element.id))
            }
        });

        fileArray.forEach((files) => {
            
            console.log(files.filePath)
        })
    }

generateAllTemplates();