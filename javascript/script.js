    let impresora = parseInt(prompt ("Ingrese la serie de impresora Ender que desea, contamos con las siguientes en nuestro catalogo: • Ender 1\n • Ender 2\n • Ender 3\n • Ender 4\n • Ender 5"))

    if (impresora < 0) {
        alert('Por favor introduzca una Impresora Ender que figure en catalogo')
    } else if (impresora < 3) {
    alert('No hay stock, seleciona una Impresora Ender diferente')
    } else if (impresora > 3) {
        alert('Importada. Las Impresora Ender 4 o superior son solo por encargo.')
    } else if (impresora = 3) {
        alert('En stock 4 unidades.')
    }

    function finalizarCompra (tipoImpresora){
        let dato = ""
        do{
            dato = prompt (`Ingrese su ${tipoImpresora} se le pedira nuevamente que ingrese el dato si no completa la casilla o presiona cancelar.`)
        } while (dato === "" || dato === null)
            alert (`{Su ${tipoImpresora} es ${dato}`)
        return dato
        }
    
        const producto = finalizarCompra ("Impresora")
        const nombre = finalizarCompra ("Nombre")
        const dni = finalizarCompra ("DNI")
        const mail = finalizarCompra ("Mail")

        alert(`Su compra ha sido exitosa:\n • Impresora: ${producto}\n • Nombre: ${nombre}\n • DNI: ${dni}\n • Mail: ${mail}`)