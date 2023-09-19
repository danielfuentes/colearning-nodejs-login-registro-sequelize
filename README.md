Aplicación desarrollada con NodeJs y el framework Express.

CRUD de productos basado en el ORM sequelize y el login y el registro usando archivo en formato JSON.

A continuación se describe el proceso de desarrollo de manera resumida.

La aplicación está desarrollada usando el framework bootstrap. 

Pasos o grupos de pasos ejecutados para el desarrollo del proyecto.

    Creamos el directorio e iniciamos el proyecto de node npm init.
    Instalamos las librerías que vamos a estar utilizando, de momento Express y EJS npm i express ejs.
    Creamos la carpeta src donde irá nuestro código.
    Creamos el archivo index.js dentro de src, dentro requerimos Express e inicializamos un servidor con el método listen().

Corremos la aplicación y verificamos que el servidor corra correctamente. (npm test)
[Opcional] Creamos los scripts para correr la aplicación

    Instalamos nodemon como dependencia de desarrollo npm i nodemon --save-dev
    Agregamos el script de inicio normal "run": "node src/app.js"
    Agregamos el script de inicio para desarrollo "test": "nodemon src/app.js -e js,ejs" Como vamos a trabajar con JSON y no queremos que nodemon reinicie la aplicación cada vez que los modifiquemos, le decimos que sólo mire las extensiones js y ejs.

[Opcional] Preparamos el proyecto para utilizar GIT

    Inicializamos el repositorio
    Creamos el archivo .gitignore e incluimos el directorio de node_modules/

Configuración de Express y vistas iniciales

    Creamos nuestra carpeta de vistas src/views con un archivo index.ejs que servirá de página principal.
    Configuramos Express para que utilice EJS como motor de plantillas y para que tome nuestra carpeta src/views como fuente de plantillas.
    Creamos una ruta que carge nuestra página principal con el método render().

Tener presente que en la carpeta db, se encuentra el script para que puedan en sus equipos crear la base de datos watches y luego importar las estructuras y los datos de las tablas a utilizar: products y category.

Tenga presente que para ejecutar la aplicación, debe ejecutar el comando (npm test) y finalmente en el navegador ejecutar el comando: ( localhost:3001 ).
Verificamos que el servidor levante las vistas de EJS correctamente.
<hr>
<h5>Espero les resulte de utilidad</h5>

<h2 style="text-align:center">Si quieres ir desde 0 a 100 en el <strong>Desarrollo Web FullStack</strong> - (Front-End y Back-End): Aquí te dejo una ruta que te prepare:</h2>
<table>
  <tr>
    <td>
      <a href="https://cedavilu.com/curso-desarrollo-web-detalle.html" target="_blank"> <img src="https://cedavilu.com/assets/img/cursos/cursos-1.png" > </a>      
    </td>
    <td>
       <a href="https://cedavilu.com/curso-javascript-detalle.html" target="_blank"><img style="width:25" src="https://cedavilu.com/assets/img/cursos/cursos-2.png" ></a>      
    </td>
    <td>
      <a href= "https://cedavilu.com/curso-javascript-avanzado-detalle.html" target="_blank"><img style="width:25" src="https://cedavilu.com/assets/img/cursos/cursos-3.png" ></a>
    </td>
    <td>
    <a href="https://cedavilu.com/curso-nodejs-detalle.html" target="_blank"> <img style="width:25" src="https://cedavilu.com/assets/img/cursos/cursos-4.png" ></a>
    </td>
  </tr>
</table>

<table>
  <tr>  
    <td>
       <a href= "https://cedavilu.com/" target="_blank"> <img style="width: 100" src="https://adanielf.files.wordpress.com/2020/04/frase-daniel-fuentes.jpg"></a>
    </td> 
  </tr>
</table>


