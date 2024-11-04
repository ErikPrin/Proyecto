$(document).ready(function() {
    // Manejo del botón de búsqueda
    $('#searchButton').on('click', function() {
        const query = $('#search').val().toLowerCase();
        $('#project-cards .col-md-4').each(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            $(this).toggle(title.includes(query));
        });
    });

    // Función para mostrar secciones
    window.showSection = function(section) {
        $('.section').hide(); // Ocultar todas las secciones
        $('#' + section).show(); // Mostrar la sección seleccionada
    };

    // Manejo del envío del formulario
    $('#contactForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir el envío normal
        $('#confirmationModal').modal('show'); // Mostrar modal de confirmación
        $('#contactForm')[0].reset(); // Reiniciar el formulario
    });

    // Aquí puedes cargar los proyectos desde la base de datos usando AJAX
    loadProjects();
});

// Función para cargar proyectos desde la base de datos
function loadProjects() {
    $.ajax({
        url: 'getProjects.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const projectCards = $('#project-cards');
            projectCards.empty(); // Limpiar cartas anteriores

            if (data.length > 0) {
                data.forEach((project, index) => {
                    projectCards.append(`
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <img src="${project.foto}" class="card-img-top" alt="${project.Nombre}" data-index="${index}" style="cursor:pointer;">
                                <div class="card-body">
                                    <h5 class="card-title">${project.Nombre}</h5>
                                </div>
                            </div>
                        </div>
                    `);
                });
            } else {
                projectCards.append('<p class="text-center">No hay proyectos disponibles.</p>');
            }

            // Manejar el clic en una imagen de proyecto para abrir el modal
            $('.card-img-top').on('click', function() {
                const projectIndex = $(this).data('index');
                const project = data[projectIndex];

                // Establecer los datos en el modal
                $('#modalImage').attr('src', project.foto);
                $('#modalDescription').html(project.Descripcion);
                $('#projectModal').modal('show'); // Mostrar el modal
            });
        },
        error: function() {
            alert('No se pudieron cargar los proyectos.');
        }
    });
}

function showProjectDetails(image, description) {
    $('#modalImage').attr('src', image);
    $('#modalDescription').text(description);
}
