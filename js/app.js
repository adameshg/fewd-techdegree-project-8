const randomUserUrl = 'https://randomuser.me/api/?results=12&inc=name,%20picture,%20email,%20location,%20phone,%20dob%20&noinfo';
const gridContainer = document.querySelector('.grid-container');
const employees = [];

// Fetch data from API
fetch(randomUserUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateHTML(data);
    })
    .catch(console.error);

// Generate HTML from JSON
function generateHTML(data) {
    const div = document.createElement('div');
    gridContainer.appendChild(div);
    div.innerHTML = `
        <div class="employee-card">
            <div class="img-div">
                <img src="${data.results[0].picture.large}" alt="${data.results[0].name.first + ' ' + data.results[0].name.last}">
            </div>
            <div class="text-div">
                <h3 class="name">${data.results[0].name.first + " " + data.results[0].name.last}</h3>
                <p class="email">${data.results[0].email}</p>
                <p class="city">${data.results[0].location.city}</p>
            </div>
        </div>
    `;
}