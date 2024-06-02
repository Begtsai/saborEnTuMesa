// Función para cargar el menú desde un archivo JSON local utilizando fetch

async function cargarMenu() {
    try {
        // carga de datos desde un JSON local
        const response = await fetch('./menu.json');
        if(!response.ok) {
            throw new Error ('Error al cargar el archivo JSON');
        }
        menu = await response.json();
        // manejo de promesas con fetch
        mostrarMenu(); 
    } catch (error) {
        console.error('Error al cargar el menú', error);
    }
}

// Array para almacenar la orden del usuario
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
                <button class="btn btn-primary ordenar" id="${plato.id}">Agregar a la orden</button>
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
                calcularTotal();
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
        .then(data => {
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
        calcularTotal();
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

// Función para calcular el total del pedido
function calcularTotal() {
    const total = comandaOrden.reduce((sum, item) => sum + item.price, 0);
    const totalContainer = document.querySelector('.total-container');
    if(!totalContainer) {
        const newTotalContainer = document.createElement('div');
        newTotalContainer.classList.add('total-container', 'mt-4');
        newTotalContainer.innerHTML = `<h2>Total: $${total}</h2>`;
        document.querySelector('main').appendChild(newTotalContainer)
    } else {
        totalContainer.innerHTML = `<h2>Total: $${total}</h2>`;
    }
}

// Función para finalizar la compra
function finalizarCompra () {
    if (comandaOrden.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    alert('Compra finalizada');
    comandaOrden = [];
    guardarOrdenEnLocalStorage();
    mostrarOrden();
    document.querySelector('.total-container').innerHTML = '<h2>Total: $0</h2>';
}

// Añadir botón de finalizar compra
document.addEventListener('DOMContentLoaded', () => {
    cargarMenu();
    cargarOrdenDesdeLocalStorage();

    const finalizarBtn = document.createElement('button');
    finalizarBtn.classList.add('btn', 'btn-success', 'mt-4');
    finalizarBtn.textContent = 'Finalizar Compra';
    finalizarBtn.addEventListener('click', finalizarCompra);
    document.querySelector('main').appendChild(finalizarBtn);
});


