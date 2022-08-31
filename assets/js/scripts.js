/* const url = "../assets/js/data.js"; */
/* const url = "https://sebastrog.github.io/lookingfor/assets/js/data.js"; */
const url = "https://raw.githubusercontent.com/sebastrog/datappi/main/lookingfor/js/data.js";
const elTestData = document.querySelector('#data');
const elRandomCopy = document.querySelector('#randomCopy');
const search = document.querySelector( "#searchUser" );
const randomCopy = ["python developer", "ui/ux designer", "php developer", "javascript developer", "js developer"];

showRandomCopy();

function showRandomCopy() {
    const generateRandomCopy = randomCopy[Math.floor(Math.random() * randomCopy.length)];
    return elRandomCopy.innerHTML+= generateRandomCopy;
}

const templateString = ( el ) => {
    let templateString = `
        <div class="col-lg-4 mb-4">
            <div class="card h-100">

                <div class="card__image">
                    <img src="${el.avatar}" class="card-img-top" alt="${el.name}">
                </div>

                <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    
                    <p class="card-text">${el.description}</p>

                    <div class="skills mb-4">
                        ${el.skills.map(function (key) {
                            return "<span class='badge badge-primary'>" + key + "</span>"
                        }).join(" ")}
                    </div>
                    <a href="#" class="btn btn-danger">Hire me!</a>
                </div>
            </div>
        </div>
    `
    return templateString;
}

function printUsers(arr){
    arr.forEach(function(el){
        let getTemplate = templateString(el)
        return elTestData.innerHTML+= getTemplate;
        
    })
}

const getData = async () => {
    const fetching = await fetch(url).then(response => response.json());
    
    return printUsers(fetching)
}

getData();

const lookingForUser = async () => {
    elTestData.innerHTML = ""

    const fetching = await fetch(url).then(response => response.json());

    const result = fetching.map(item => {
        const findAtSkills = item.skills.find(el => el.includes(search.value));
        if(findAtSkills) return item;
    })

    const clearResults = result.filter(element => { return element !== undefined; })

    if( clearResults.length < 1 ) return elTestData.innerHTML+= `<div class="col-12"><h1 class="warning">we couldn't find what you looking for, try again!</h1></div>` 
    
    return printUsers(clearResults)
    
}


