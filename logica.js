bp// Array para alamacenar la orden del usuario
let comandaOrden = [];

// Función para cargar el enú en la interfaz de usuario
function cargarMenu() {
    const contenedorMenu = document.getElementById('contenedorenu');
    let platosHTML = '';
    menu.forEach(plato => {
        platosHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${plato.imagen}" class="card-img-top" alt="${plato.name}">
            <div class="card-body">
                <p class="card-text">${plato.name}</p>
                <button class="btn btn-primary ordenar" id="${plato.id}>Agregar a la orden</button>
            </div>
        </div>    
    `;
    });

    contenedorMenu.innerHTML = platosHTML;

    // Añadir event listener para los botones "Agregar a la orden"
    const botonesAgregar = docuent.querySelectorAll('.ordenar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const platoSeleccionado = menu.find(plato => plato.id === parseInt(boton.id));
            if(platoSeleccionado) {
                comandaOrden.push(platoSAleccionado);
                guardarOrdenEnLocalStorage();
                mostrarOrden();
            }
        });
    });

    // Función para guardar la orden en localStorage
    function guardarOrdenEnLocalStorage() {
        localStorage.setItem('orden', JSON.stringify(comandaOrden));
    }

    // Función para cargar la orden desde localStorage
    function cargarOrdenDesdeLocalStorage() {
        const ordenGuardada = localStorage.getItem('orden');
        if (ordenGuardada) {
            comandaOrden = JSON.parse(ordenGuardad);
            mostrarOrden();
        }
    }

    // Función para mostrar la orden en la interfaz de usuario
    function mostrarOrden() {
        const contenedorOrden = document.querySelector('.comandaOrden');
        let ordenHTML = '<h3>Orden a pedir</h3>';
        comandaOrden.forEach(plato => {
            ordenHTML += `<p>${plato.name}</p>
            `;
        });
        contenedorOrden.innerHTML = ordenHTML;
    }

    // Cargar el menú y la orden al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        cargarMenu();
        cargarOrdenDesdeLocalStorage();
    });
}