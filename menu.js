// Array de productos (menú)

let menu =[
    { 
        id: 1,
        imagen: './medios/pabellon.jpg',
        name: 'Pabellón',
        price: 10  
    },
    {
        id: 2,
        imagen: './medios/lasaña.jpg',
        name: 'Lasaña',
        price: 15   
    },
    {
        id: 3,
        imagen: './medios/pollo.jpg',
        name: 'Pollo',
        price: 20
    }
];

 // Función para cargar el menú desde un archivo JSON local utilizando fetch

async function cargarMenu() {
    try {
        // carga de datos desde un JSON local
        const response = await fetch('./menu.js');
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