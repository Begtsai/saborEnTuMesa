// Array de productos (menú)

const menu =[
    { 
        id: 1,
        imagen: "https://images.app.goo.gl/8heYXe1vqU5namaG6",
        name: 'Pabellon',
        price: 10,  
    },
    {
        id: 2,
        imagen: "https://images.app.goo.gl/3KCXhryZokuCf95V6",
        name: 'Lasaña',
        price: 15,   
    },
    {
        id: 3,
        imagen: "https://images.app.goo.gl/S1MDe6B8jkYuR7fL6",
        name: 'Pollo',
        price: 20
    }
    ];

    // Función para cargar el menú desde un archivo JSON local utilizando fetch

    async function cargarMenu() {
        try {
            // carga de datos desde un JSON local
            const response = await fetch('menu.json');
            menu = await response.json();
            // manejo de promesas con fetch
            mostrarMenu(); 
        } catch (error) {
            console.error('Error al cargar el menú', error);
        }
    }