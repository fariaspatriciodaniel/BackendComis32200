class Usuario{
    constructor(nombre, apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return this.nombre + " " + this.apellido;
    }
    countMascotas(){
        return this.mascotas.length;
    }
    
    addbooks(nombre,autor){
        this.libros.push({nombre:nombre,autor:autor});
    }
    getBookNames(){
        return this.libros.map((libro) => libro.nombre);
    }
}
const firstUsuario = new Usuario("Pedro", "Lopez", [{nombre: "El principito", autor: "Antoine de Saint-Exupéry"}, {nombre: "El señor de los anillos", autor: "J.R.R. Tolkien"}], ["Perro", "Gato"]);
console.log(firstUsuario.getFullName());
console.log(firstUsuario.countMascotas());
console.log(firstUsuario.getBookNames());
firstUsuario.addbooks("El principito", "Antoine de Saint-Exupéry");
console.log(firstUsuario.getBookNames());