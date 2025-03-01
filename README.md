# ProyetoWeb2
Clase con el ing walter

## Metodo Post Como Probarlo
Paso 1: encender la maquina virtual y dirigirse a la carpeta donde esta el proyecto
Paso 2: una ves estamos en la carpeta del proyecto ejecutar el comando "nodemon index.js"
Paso 3: abrir la aplicacion postman y navicat para verificar el metodo.
Paso 4: nos ubicamos en postman elegimos el metodo "post" y al lado colocamos la ip-servidor:3000/nombre de tabla(t_clientes, t_productos, t_pedidos)
Paso 5: nos dirigimos siempre en postman a la parte donde dice "body", en este apartado elegimos la opcion "raw"

Paso 6: en la opcion "raw" colocamos los campos de la tabla correspondiente ejemplo : 
//tabla t_clientes
{
    "nombre": "daniel molina",
    "correo": "damolina073@unicah.edu",
    "telefono": 99776655
}

Paso 7: nos dirigimos siempre en postman a la parte donde dice "send" para probar el metodo elegido anteriormente.
Paso 8: para verificar uso correcto del metodo en postamn en la parte de abajo nos tira un mensaje en forma de JSON que el registro se creo existosamente y nos muestra el registro
o nos podemos ir a navicat a verificar esta informacion pulsando f5 en la bdd.

