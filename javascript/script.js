const header = document.createElement("header")

header.innerHTML = `
 <h1>Impresoras</h1> 
                <ul>
                    <li id="promo">Promos</li>
                    <li class="azul">Impresora Ender 1: $550.000,00</li>
                    <li>Impresora Ender 2: $630.000,00</li>
                    <li>Impresora Ender 3: $750.000,00</li>
                    <li class="azul fondo">BambuLab A1: $1.500.000,00</li>
                    <li>BambuLab A5: $2.100.000,00</li>
                    <li>Prusa: $1.600.000,00</li>
                    <li id="economica">Hellbot: $450.000,00</li>                   
                </ul>
                `

document.body.appendChild(header)
console.log(header)
















/*const economica = document.getElementById("eeconomica")

console.log(economica)
console.log(economica.id)
console.log(economica.innerText)
console.log(economica.innerHTML)
console.log(economica.classList)
console.log(economica.className)

economica.innerText = "Sin stock"*/




/*const azul = document.getElementsByClassName("azul")

console.log("azul")

const query = document.querySelector(".azul.fondo")
const query2 = document.querySelectorAll(".azul")
const query3 = document.querySelectorAll("#encontrame")
const query4 = document.querySelectorAll("li")

console.log(query)
console.log(query2)
console.log(query3)
console.log(query4) 

const header = document.createElement("header")

header.innerText = "Impresoras 3D"

document.body.appendChild(header) */

.............................................................................................................................

/* let impresora = parseInt(prompt("Ingrese la serie de impresora Ender por la cual quiere consultar stock, contamos con las siguientes en nuestro catalogo:\n • Ender 1\n • Ender 2\n • Ender 3\n • Ender 4\n • Ender 5"))

while (isNaN(impresora) || impresora > 5) {
    impresora = parseInt(prompt("Ingrese nuevamente la serie de la impresora"))
}

if (impresora < 0) {
    alert('Por favor introduzca una Impresora Ender que figure en catalogo.')
} else if (impresora < 3) {
    alert('No hay stock, seleciona una Impresora Ender diferente.')
} else if (impresora > 3) {
    alert('Importada. Las Impresora Ender 4 o superior son solo por encargo.')
} else if (impresora = 3) {
    alert('En stock 4 unidades.')
}

function finalizarCompra(tipoImpresora) {
    let dato = ""
    do {
        dato = prompt(`Ingrese su ${tipoImpresora} se le pedira nuevamente que ingrese el dato si no completa la casilla o presiona cancelar.`)
    } while (dato === "" || dato === null)
    alert(`Su ${tipoImpresora} es ${dato}`)
    return dato
}

const finalCompra = [finalizarCompra("Impresora"), finalizarCompra("Nombre"), finalizarCompra("Apellido"), finalizarCompra("DNI"), finalizarCompra("Mail")] 

alert(`Su compra ha sido exitosa:\n • Impresora: ${finalCompra[0]}\n • Nombre: ${finalCompra[1]}\n • Apellido: ${finalCompra[2]}\n • DNI: ${finalCompra[3]}\n • Mail: ${finalCompra[4]}`)
*/



/*
function costosAdicionales(finalCompra){
    console.log("Envio $2400"+finalCompra)
}

costosAdicionales (finalCompra, console.log) 
*/