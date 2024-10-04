function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';
}
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Datos de ejemplo para proyectos
const projects = [
    { image: 'https://via.placeholder.com/300x200', description: 'Proyecto 1: Desarrollo Web' },
    { image: 'https://via.placeholder.com/300x200', description: 'Proyecto 2: Aplicación móvil' },
    { image: 'https://via.placeholder.com/300x200', description: 'Proyecto 3: E-commerce' }
];

// Generar cartas de proyectos
const projectCardsContainer = document.getElementById('project-cards');

projects.forEach((project, index) => {
    // Crear div de la carta
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-md-4', 'mb-4');

    // Crear contenido HTML de la carta
    cardDiv.innerHTML = `
        <div class="card" id="card-${index}" onclick="flipCard(${index})">
            <img src="${project.image}" class="card-img-top" alt="Project image" id="image-${index}">
            <div class="card-body" style="display: none;" id="text-${index}">
                <p class="card-text">${project.description}</p>
            </div>
        </div>
    `;
    // Agregar carta al contenedor
    projectCardsContainer.appendChild(cardDiv);
});

// Función para girar la carta
function flipCard(index) {
    const image = document.getElementById(`image-${index}`);
    const text = document.getElementById(`text-${index}`);

    if (image.style.display === 'none') {
        image.style.display = 'block';
        text.style.display = 'none';
    } else {
        image.style.display = 'none';
        text.style.display = 'block';
    }
}