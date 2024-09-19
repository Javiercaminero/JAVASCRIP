document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productos = [];

    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            crearProductos();
            actualizarCarrito();
        })
        .catch(() => {
            mostrarSweetAlert('error', 'No se pudo cargar los productos.');
        });

    function crearProductos() {
        const contenedor = document.getElementById("contenedor");
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.innerHTML = `
                <li>
                    Impresora ${producto.nombre} ${producto.serie} - $${producto.precio.toLocaleString('es-CO')}
                    <input type="number" id="cantidad-${producto.id}" value="0" min="0">
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                </li>
            `;
            contenedor.appendChild(productoDiv);
        });
    }

    window.agregarAlCarrito = function(id) {
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
            mostrarSweetAlert('success', `Has agregado ${cantidad} de la Impresora ${producto.nombre} ${producto.serie} al carrito.`);
            guardarCarritoEnLocalStorage();
        } else {
            mostrarSweetAlert('error', 'La cantidad debe ser mayor que 0.');
        }
    };

    window.eliminarDelCarrito = function(id) {
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarrito();
        mostrarSweetAlert('info', 'Producto eliminado del carrito.');
        guardarCarritoEnLocalStorage();
    };

    function actualizarCarrito() {
        const carritoLista = document.getElementById("carritoLista");
        const totalElement = document.getElementById("total");
        carritoLista.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            carritoLista.innerHTML += `
                <li>
                    Impresora ${item.nombre} ${item.serie} - $${item.precio.toLocaleString('es-CO')} x ${item.cantidad}
                    <button class="btn btn-danger" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </li>
            `;
        });

        totalElement.textContent = `Total: $${total.toLocaleString('es-CO')}`;
    }

    document.getElementById("confirmarCompra").onclick = function() {
        if (carrito.length === 0) {
            mostrarSweetAlert('info', 'No tienes productos en el carrito.');
        } else {
            Swal.fire({
                title: 'Confirmar Compra',
                text: '¿Estás seguro de que deseas confirmar la compra?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, comprar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    mostrarResumenCompra();
                    carrito = [];
                    actualizarCarrito();
                    Swal.fire('Gracias por tu compra.', '', 'success');
                    guardarCarritoEnLocalStorage();
                }
            });
        }
    };

    document.getElementById("mostrarCarrito").onclick = function() {
        const carritoDiv = document.getElementById("carrito");
        carritoDiv.style.display = carritoDiv.style.display === 'none' ? 'block' : 'none';
    };

    document.getElementById("modonocturno").onclick = function() {
        document.body.classList.toggle("darkmode");
    };

    function mostrarSweetAlert(tipo, mensaje) {
        Swal.fire({
            icon: tipo,
            title: mensaje,
            timer: 3000,
            showConfirmButton: false
        });
    }

    function mostrarResumenCompra() {
        const resumenCompra = document.createElement('div');
        resumenCompra.id = 'resumenCompra';
        resumenCompra.innerHTML = `
            <h2>Resumen de la Compra</h2>
            <ul>
                ${carrito.map(item => `
                    <li>
                        Impresora ${item.nombre} ${item.serie} - $${item.precio.toLocaleString('es-CO')} x ${item.cantidad}
                    </li>
                `).join('')}
            </ul>
            <p>Total: $${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toLocaleString('es-CO')}</p>
        `;
        document.body.appendChild(resumenCompra);
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
});