
const barraCarritoListaItems = document.getElementById("barraCarrito-listaItems");

async function escribirProductosCarrito () {
    await getProductsCartFromAPI(idCart);
    barraCarritoListaItems.innerHTML = "";
    let total = 0;
    cart.forEach((producto) =>{
        total += (producto.product.precio * producto.quantity);
        let contenedor = document.createElement("div");
        contenedor.className = "row mb-2 barraCarrito-item align-items-center";
        contenedor.innerHTML = `
        <div class="col-4">
        <img class="img-fluid rounded mx-auto d-block" src="${producto.product.foto}" alt="${producto.product.nombre}">
        </div>
        <div class="col-6">
        <p>${producto.product.nombre} x ${producto.quantity}</p>
        <p>$${producto.product.precio}.-</p>
        </div>
        <button id="barraCarrito-borrarItem-${producto.product.id}" class="btn col-2" type="button"><i class="fas fa-trash-alt"></i></button>
        `
        barraCarritoListaItems.appendChild(contenedor);
   
        const borrarProducto = document.getElementById(`barraCarrito-borrarItem-${producto.product.id}`);
      
        borrarProducto.addEventListener("click", async () => {
            await deleteProductCartAPI(idCart, producto.product.id);
            await renderSidebarCart();
        });
    })
    let contenedor = document.createElement("div");
    contenedor.className = "row h5";
    if (!cart.length) {
        contenedor.innerHTML = `<p>El carrito está vacío</p>`
    }
    else{
        contenedor.innerHTML = `<p>TOTAL ${total}.-</p>`
    }
    barraCarritoListaItems.appendChild(contenedor);
}

async function renderSidebarCart() {
    await getProductsCartFromAPI(idCart);
    await escribirProductosCarrito();
  
    navCarrito.innerHTML = `Carrito (${cart.length})`;
}


 const navCarrito = document.getElementById("nav-carrito");

 navCarrito.addEventListener("click", async () => {
     await escribirProductosCarrito();
     barraCarritoContainer.classList.toggle("barraCarrito-active");
})


const barraCarritoContainer = document.getElementById("barraCarrito-container");
const barraCarrito = document.getElementById("barraCarrito");
const barraCarritoCerrar = document.getElementById("barraCarrito-cerrar");
barraCarritoCerrar.addEventListener("click", ()=>{
    barraCarritoContainer.classList.toggle("barraCarrito-active");
});
barraCarritoContainer.addEventListener("click", ()=>{
    barraCarritoContainer.classList.toggle("barraCarrito-active");
});
barraCarrito.addEventListener("click", (e)=>{
    e.stopPropagation();
});

renderSidebarCart();