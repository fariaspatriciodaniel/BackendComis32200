class Contenedor {

    //constructor que recibe el nombre del archivo, productos.txt
    constructor(ruta){
        this.ruta = ruta
    }
  
    //TODO: VER que no se repita el producto
    //save(Object)
    async save(obj){
        //obtenemos todos los objetos
        const listado = await this.getAll() //[]
  
        //SI existe el producto no agregar nada
        if(listado.length > 0 && listado.some((el) => el.title === obj.title))
        {
            //throw new Error(`El producto ya se encuentra en el catalogo`)
            console.log("El producto ya se encuentra en el catalogo");
            return
        }
  
        //identificamos el ultimo id y lo incrementamos
        let nuevoId //= listado.length + 1
  
        //MANEJAR DOS CASOS
        //CASO1: NO HAY DATA
        if(listado.length == 0){
            nuevoId = 1
        }
        //SI HAY DATA [...] [1] => 0
        else {
            nuevoId = listado[listado.length - 1].id + 1
        }
  
        //ASIGNAR EL NUEVO ID A MI OBJETO
        const nuevoObjConID = {...obj, id: nuevoId}
  
        //INSERTAR MI OBJETO AL LISTADO
        listado.push(nuevoObjConID)
  
        //lo guardamos usando fs y try catch
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null ,2))
            return nuevoId
        } catch (error) {
            throw new Error(`Error al guardar un nuevo objeto: ${error}`)
        }
    }
  
  
    //function para obtener objetos usandy await/async
    //asumimos que tenemos el txt y que tiene data
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }
  
    //function para obtener un objeto por ID
    //TODO: Validar que devuelva el null
    async getById(id) {
        try {
            const listado = await this.getAll() //[]
            return listado.find(item => item.id === id) ?? null
        } catch (error) {
            //TODO: VALIDAR DEAD CODE 
            throw new Error(`No se encontro el dato: ${error}`)
        }
    }
  
    async deleteById(id) {
        const listado = await this.getAll() //[]
  
        //FILTRAMOS EL ID
        const nuevoListado = listado.filter( item=> item.id != id)
  
        //SOBREESCRIBIMOS LA DATA
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null ,2))
        } catch (error) {
            throw new Error(`No se pudo borrar la data: ${error}`)
        }
    }
  
  
    //function para borrar todo
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null ,2))
        } catch (error) {
            throw new Error(`No se pudo borrar la data: ${error}`)
        }
    }
  
  }
  
  const log = (p) => console.log(p)
  //DATOS DE PRUEBA
  const item1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  }
  
  const item2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  }
  
  const item3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  }
  
  const item4 = {
    title: "Escuadra",
    price: 12343,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  }
  
  async function main() {
    //CREANDO INSTANCIA
    const contenedor = new Contenedor('./productos.txt')
  
    //DATA DEBERIA ESTAR VACIA => []
    let datos1 = await contenedor.getAll()
    log(datos1)
  
    //DEBE TENER 1 ELEMENTO Y RETORNAR 1 (ARCHIVO DEBE CREARSE)
    let id1 = await contenedor.save(item1)
    log(id1)
  
    //DEBE TENER 2 ELEMENTO Y RETORNAR 2
    let id2 = await contenedor.save(item2)
    log(id2)
  
    //DATA DEBERIA TENER DOS ELEMENTOS 2
    let datos2 = await contenedor.getAll()
    log(datos2)
  
    //BUSCAR POR ID 1// NAME debe ser escuadra
    let busca1 = await contenedor.getById(1)
    log(busca1)
  
    //BUSCAR POR ID QUE NO EXISTE
    let busca2 = await contenedor.getById(10)
    log(busca2)
  
    //DEBE SALIR UN MENSAJE DE ERROR
    let id3 = await contenedor.save(item4)
    log(id3)
  
    //BORRAR EL ID 1, deberia tener 1 elemento, solamente el id 2
    await contenedor.deleteById(1)
    let delete1 = await contenedor.getAll()
    log(delete1)
  
    //BORRAR TODO no deberia tener elementos
    await contenedor.deleteAll()
    let delete2 = await contenedor.getAll()
    log(delete2)
  
  }
  
  main()