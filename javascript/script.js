document.addEventListener("DOMContentLoaded", function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productos = [];

    // Cargar productos desde el archivo JSON
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            crearProductos();
            actualizarCarrito();
        })
        .catch(() => {
            mostrarMensaje('error', 'No se pudo cargar los productos.');
        });

    // Crear elementos de productos en el DOM
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

    // Agregar producto al carrito
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
            mostrarMensaje('success', `Has agregado ${cantidad} de la Impresora ${producto.nombre} ${producto.serie} al carrito.`);
            guardarCarritoEnLocalStorage();
        } else {
            mostrarMensaje('error', 'La cantidad debe ser mayor que 0.');
        }
    };

    // Eliminar producto del carrito
    window.eliminarDelCarrito = function(id) {
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarrito();
        mostrarMensaje('info', 'Producto eliminado del carrito.');
        guardarCarritoEnLocalStorage();
    };

    // Actualizar la lista y el total del carrito
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

    // Confirmar compra
    document.getElementById("confirmarCompra").onclick = function() {
        const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
        if (carrito.length === 0) {
            mostrarMensaje('info', 'No tienes productos en el carrito.');
        } else {
            mensajeConfirmacion.innerHTML = `
                <p>¿Estás seguro de que deseas confirmar la compra?</p>
                <button id="confirmarSi">Sí, comprar</button>
                <button id="confirmarNo">Cancelar</button>
            `;
            document.getElementById("confirmarSi").onclick = function() {
                carrito = [];
                actualizarCarrito();
                mensajeConfirmacion.innerHTML = '<p>Gracias por tu compra.</p>';
                guardarCarritoEnLocalStorage();
            };
            document.getElementById("confirmarNo").onclick = function() {
                mensajeConfirmacion.innerHTML = '';
            };
        }
    };

    // Mostrar/ocultar carrito
    document.getElementById("mostrarCarrito").onclick = function() {
        const carritoDiv = document.getElementById("carrito");
        carritoDiv.style.display = carritoDiv.style.display === 'none' ? 'block' : 'none';
    };

    // Toggle dark mode
    document.getElementById("modonocturno").onclick = function() {
        document.body.classList.toggle("darkmode");
    };

    // Función para mostrar mensajes
    function mostrarMensaje(tipo, mensaje) {
        const mensajeElement = document.getElementById("mensaje");
        mensajeElement.className = tipo;
        mensajeElement.textContent = mensaje;
        mensajeElement.style.display = 'block';
        setTimeout(() => {
            mensajeElement.style.display = 'none';
        }, 3000); // Limpiar mensaje después de 3 segundos
    }

    // Guardar carrito en localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
});