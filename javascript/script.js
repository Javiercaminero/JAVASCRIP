const productos = [
    { id: 1, nombre: "Ender", serie: "1", precio: 550000 },
    { id: 2, nombre: "Ender", serie: "2", precio: 630000 },
    { id: 3, nombre: "Ender", serie: "3", precio: 750000 }
];

let carrito = [];


function crearProductos() {
    const contenedor = document.getElementById("contenedor");

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');

        productoDiv.innerHTML = `
            <li>
                Impresora ${producto.nombre} ${producto.serie} - $${producto.precio.toLocaleString('es-CO')}
                <input type="number" id="cantidad-${producto.id}" value="0" min="0">
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </li>
        `;

        contenedor.appendChild(productoDiv);
    });
}


function agregarAlCarrito(id) {
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad > 0) {
        const producto = productos.find(p => p.id === id);
        const itemCarrito = carrito.find(item => item.id === id);
        
        if (itemCarrito) {
            itemCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        actualizarCarrito();
    } else {
        alert("La cantidad debe ser mayor que 0.");
    }
}


function actualizarCarrito() {
    const carritoLista = document.getElementById("carritoLista");
    const totalElement = document.getElementById("total");
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        carritoLista.innerHTML += `
            <li>Impresora ${item.nombre} ${item.serie} - $${item.precio.toLocaleString('es-CO')} x ${item.cantidad}</li>
        `;
    });

    totalElement.textContent = `Total: $${total.toLocaleString('es-CO')}`;
}


function confirmarCompra() { 
    carrito = [];
    actualizarCarrito()
}


document.getElementById("mostrarCarrito").onclick = function() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.style.display = carritoDiv.style.display === 'none' ? 'block' : 'none';
};


document.getElementById("confirmarCompra").onclick = confirmarCompra;

modonocturno.onclick = function(){
    document.body.classList.toggle("darkmode")
} 

crearProductos();

