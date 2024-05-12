// Array para alamacenar la orden del usuario
let comandaOrden = [];

// Función para cargar el menú en la interfaz de usuario
function mostrarMenu() {
    const contenedorMenu = document.getElementById('contenedorMenu');
    let platosHTML = '';
    menu.forEach(plato => {
        platosHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${plato.imagen}" class="card-img-top" alt="${plato.name}">
            <div class="card-body">
                <p class="card-text">${plato.name}</p>
                <button class="btn btn-primary ordenar" id="${plato.id}">Agregar a la orden</button>;
            </div>
        </div>`;
    });

    contenedorMenu.innerHTML = platosHTML;

    // Añadir event listener para los botones "Agregar a la orden"
    const botonesAgregar = document.querySelectorAll('.ordenar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const platoSeleccionado = menu.find(plato => plato.id === parseInt(boton.id));
            if(platoSeleccionado) {
                comandaOrden.push(platoSeleccionado);
                guardarOrdenEnLocalStorage();
                mostrarOrden();
            }
        });
    });

    // Solicitud a la API de OpenWeatherMap
    const apiKey = 'clima_sabor';
    const ciudad = 'Paris';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos del clima');
            }
            return response.json();
        })
        .tenh(data => {
            console.log(data);
            const temperaturaActual = data.main.temp;
            console.log('Temperatura actual:', temperaturaActual);
        })
        .catch(error => {
            console.error('Error al obtener datos del clima:', error);
        });
} 

// Función para guardar la orden en localStorage
function guardarOrdenEnLocalStorage() {
    localStorage.setItem('orden', JSON.stringify(comandaOrden));
}

// Función para cargar la orden desde localStorage
function cargarOrdenDesdeLocalStorage() {
    const ordenGuardada = localStorage.getItem('orden');
    if (ordenGuardada) {
        comandaOrden = JSON.parse(ordenGuardada);
        mostrarOrden();
        }
}

// Función para mostrar la orden en la interfaz de usuario
function mostrarOrden() {
const contenedorOrden = document.querySelector('.comandaOrden');
        let ordenHTML = '<h3>Orden a pedir</h3>';
        comandaOrden.forEach(plato => {
            ordenHTML += `<p>${plato.name}</p>`;
        });
        contenedorOrden.innerHTML = ordenHTML;
    }

    // Cargar el menú y la orden al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        cargarMenu();
        cargarOrdenDesdeLocalStorage();
    });
