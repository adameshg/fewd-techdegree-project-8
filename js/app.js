const randomUserUrl = 'https://randomuser.me/api/?results=12&inc=name,%20picture,%20email,%20location,%20phone,%20dob%20&noinfo';
const gridContainer = document.querySelector('.grid-container');
const employeeCard = document.getElementsByClassName('employee-card');
const modal = document.getElementById('modal');
const modalClose = document.getElementsByClassName('close');
const overlay = document.getElementById('overlay');
let employees = [];

// Fetch data from API
fetch(randomUserUrl)
    .then(res => res.json())
    .then(res => res.results)
    .then(generateHTML)
    .catch(console.error);

// Generate HTML from JSON for employee cards
function generateHTML(data) {
    
    // Store API data in 'employees' array
    employees = data;

    // Store employee HTML as it's created
    let employeeHTML = '';
   
    // Iterate through each employee to create HTML
    employees.forEach((employee, index) => {
        let picture = employee.picture.large;
        let name = employee.name.first + ' ' + employee.name.last;
        let email= employee.email;
        let city = employee.location.city;

        employeeHTML += `
            <div class="employee-card" data-index="${index}">
                <div class="img-div">
                    <img src="${picture}" alt="${name}">
                </div>
                <div class="text-div">
                    <h2 class="name">${name}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
        `;
    });

    // Insert each HTML for each employee card into the main section
    gridContainer.innerHTML = employeeHTML;
}

// Generate HTML from JSON for modal
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
        <div class="employee-popup">
            <div class="img-div-popup">
                <img src="${picture.large}" alt="${name.first} ${name.last}">
                <div class="text-div-popup">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
            <div class="info-div-popup">
                <p class="phone">${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p class="dob">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>
    `;

    overlay.style.display = 'block';
    modal.innerHTML = modalHTML;
}

// Display modal popup
gridContainer.addEventListener('click', event => {
    if (event.target !== gridContainer) {
        const card = event.target.closest(".employee-card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// X out of modal popup
modal.addEventListener('click', event => {
   overlay.style.display = 'none';
})