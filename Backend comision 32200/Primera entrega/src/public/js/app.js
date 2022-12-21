const rol = sessionStorage.getItem("rol");


let productos = []

let cart = [];

let idCart = JSON.parse(sessionStorage.getItem("idCart")) || 0;


const getProductsFromAPI = async ()=>{
    let res = await fetch("/api/productos");
    const data = await res.json();
    productos = data.products;
}
       
const getProductByIdFromAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`);
    const data = await res.json();
    if (res.status == 404) return alertaInfo(data);
    return data;
}
       
const updateProductAPI = async (id, obj)=>{
    const productUpdateData = JSON.stringify(obj);
    let res = await fetch(`/api/productos/${id}`, {
        method: "PUT",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productUpdateData
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data?.descripcion);
    }
    alertaInfo("producto actualizado exitosamente");
}
    
const addProductAPI = async (obj)=>{
    const productAddData = JSON.stringify(obj);
    let res = await fetch(`/api/productos`, {
        method: "POST",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productAddData
    });
    if (res.status != 201){
        const data = await res.json();
        return alertaInfo(data?.descripcion);
    } 
    alertaInfo("Producto creado exitosamente");
}
      
const deleteProductAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
        headers:{"rol": `${rol}`}
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data?.descripcion);
    }
    alertaInfo("Producto eliminado exitosamente");
}

const getProductsCartFromAPI = async (id)=>{
    let res = await fetch(`/api/carrito/${id}/productos`);
    const data = await res.json();
    if (res.status == 404){
        idCart = await createCartAPI();
        sessionStorage.setItem("idCart", idCart);
    }
    cart = data.products;
}
      
const createCartAPI = async ()=>{
    let res = await fetch("/api/carrito",{
        method: "POST"
    });
    const data = await res.json();
    if (res.status != 201) return alertaInfo(data);
    return data.idCart;
}
const deleteCartAPI = async (id)=>{
    let res = await fetch(`/api/carrito/${id}`,{
        method: "DELETE"
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data);  
    } 
    alertaInfo("Carrito eliminado exitosamente");
}
       
const addProductCartAPI = async (idC, idProd, quantity=1)=>{
    try {
        const obj = {
            idProd: idProd,
            quantity: quantity
        }
        let res = await fetch(`/api/carrito/${idC}/productos`,{
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status != 204){
            const data = await res.json();
            return alertaInfo(data);
        }
        alertaInfo("Producto agregado al carrito exitosamente");
    } catch (error) {
        alertaInfo(error.message)
    }
}
        
const deleteProductCartAPI = async (idC, idP)=>{
    let res = await fetch(`/api/carrito/${idC}/productos/${idP}`,{
        method: "DELETE"
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data);
    } 
    alertaInfo("Producto eliminado exitosamente del carrito");
}


const dialogoInfo = document.getElementById("dialogoInfo");
function verAlerta() {
    dialogoInfo.classList.toggle("dialogoInfo-active");
}
let identificadorDeTemporizador;
function temporizadorAlerta() {
  identificadorDeTemporizador = setTimeout(verAlerta, 2000);
}
function alertaInfo(contenidoHTML){
    dialogoInfo.innerHTML = contenidoHTML;
    verAlerta();
    temporizadorAlerta();
}
