// Función para mostrar la sección correspondiente
function showSection(section) {
    $('.section').hide(); // Ocultar todas las secciones
    $('#' + section).show(); // Mostrar la sección seleccionada
}

// Datos de ejemplo para proyectos
const projects = [
    { 
        image: './Imagenes/i3.jpeg', 
        description: `
            <h5>Proyecto 1: Desarrollo I3</h5>
            <p>Este proyecto para empezar fue en colaboración con Salesianos Pamplona.</p>
            <p>El proyecto consistía en idear unos dispositivos que ayudasen en el día a día a personas con necesidades especiales. Nosotros creamos las ideas
            y se las mostramos a Salesianos. Ellos desarrollaron la parte electrónica necesaria y nosotros la parte de software.</p>
        ` 
    },
    { 
        image: './Imagenes/Pagina Web.jpg', 
        description: `
            <h5>Proyecto 2: Desarrollo Página Web</h5>
            <p>Este proyecto fue más sencillo. Consistía en desarrollar nuestras propias páginas web para cualquier cosa. Podía ser para vender productos
            o para mostrar algún tipo de información sobre algo.</p>
        ` 
    },
    { 
        image: './Imagenes/base de datos.jpg', 
        description: `
            <h5>Proyecto 3: Desarrollo y administración de base de datos</h5>
            <p>En este proyecto nuestro objetivo era desarrollar una base de datos para una empresa, y administrarla. 
            Para ello nos tuvimos que inventar una empresa, de fabricación o ventas de algún producto, y crear cuál sería su base de datos.
            Después añadir algunos datos sobre productos y administrarla.</p>
        ` 
    }
];

// Inicializar en la sección de inicio
$(document).ready(function() {
    showSection('home');

    // Generar dinámicamente las cartas de proyectos
    const projectCards = $('#project-cards');
    projects.forEach((project, index) => {
        projectCards.append(`
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="Proyecto ${index + 1}" data-index="${index}" style="cursor:pointer;">
                    <div class="card-body">
                        <h5 class="card-title">Proyecto ${index + 1}</h5>
                    </div>
                </div>
            </div>
        `);
    });

    // Manejar el clic en una imagen de proyecto para abrir el modal
    $('.card-img-top').on('click', function() {
        const projectIndex = $(this).data('index');
        const project = projects[projectIndex];

        $('#modalImage').attr('src', project.image); // Cargar la imagen del proyecto
        $('#modalDescription').html(project.description); // Cargar la descripción del proyecto
        $('#projectModal').modal('show'); // Mostrar el modal
    });

    // Manejo del envío del formulario
    $('#formulario').on('submit', function(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        const email = $('#email').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo

        if (emailRegex.test(email)) {
            // Si el correo es válido, mostrar el modal de confirmación
            $('#confirmationModal').modal('show');
            // Limpiar el formulario
            $(this).trigger('reset');
        } else {
            // Mostrar alerta si el correo es inválido
            alert('Por favor, ingresa un correo electrónico válido. Asegúrate de que tenga el formato correcto.');
        }
    });
});

$('#projectSearch').on('input', function() {
    const searchTerm = $(this).val().toLowerCase();
    $('.project-card').each(function() {
        const cardDescription = $(this).find('.card-img-top').attr('alt').toLowerCase(); // Obtener el texto de la descripción del proyecto
        if (cardDescription.includes(searchTerm)) {
            $(this).show(); // Mostrar si incluye el término de búsqueda
        } else {
            $(this).hide(); // Ocultar si no incluye el término de búsqueda
        }
    });
});