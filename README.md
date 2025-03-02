# ProyetoWeb2
Clase con el ing walter

## Metodo Post - Cómo Probarlo
Paso 1: encender la maquina virtual y dirigirse a la carpeta donde esta el proyecto
Paso 2: una ves estamos en la carpeta del proyecto ejecutar el comando "nodemon index.js"
Paso 3: abrir la aplicacion postman y navicat para verificar el metodo.
Paso 4: nos ubicamos en postman elegimos el metodo "post" y al lado colocamos la ip-servidor:3000/nombre de tabla(t_clientes, t_productos, t_pedidos)
Paso 5: nos dirigimos siempre en postman a la parte donde dice "body", en este apartado elegimos la opcion "raw"

Paso 6: en la opcion "raw" colocamos los campos de la tabla correspondiente ejemplo : 
//tabla clientes
{
    "nombre": "daniel molina",
    "correo": "damolina073@unicah.edu",
    "telefono": 99776655
}

Paso 7: nos dirigimos siempre en postman a la parte donde dice "send" para probar el metodo elegido anteriormente.
Paso 8: para verificar uso correcto del metodo en postamn en la parte de abajo nos tira un mensaje en forma de JSON que el registro se creo existosamente y nos muestra el registro
o nos podemos ir a navicat a verificar esta informacion pulsando f5 en la bdd.

## Metodo GET - Cómo Probarlo
Paso 1: Abrir Postman.
Paso 2: En la barra de dirección, escribe la URL del endpoint. Ejemplo: 192.168.100.78:3000/Clientes
Paso 3: Cambia el método a GET.
Paso 4: Y dale click a la parte donde dice "send" y si todo esta bien ejemplo:
 "message": "Lista de Clientes",
    "data": [
        {
            "Id_cliente": 1,
            "nombre": "daniel molina",
            "correo": "damolina073@unicah.edu",
            "telefono": 99887766
        }
    ]

## Método PUT - Cómo Probarlo
Paso 1: Abrir Postman.
Paso 2: Elegir el método PUT y en la barra de dirección escribir la URL del endpoint, incluyendo el ID del registro a actualizar.
Ejemplo: 192.168.0.6:3000/pedidos/1
Paso 3: Dirigirse a la pestaña Body, seleccionar la opción raw y asegurarse de que el formato sea JSON.
Paso 4: Ingresar los datos actualizados en formato JSON según la estructura de la tabla.
Ejemplo para pedidos:
{
    "fk_productos": 2,
    "fk_clientes": 1,
    "cantidad": 3,
    "total": 450,
    "fecha": "2024-03-02"
}
Paso 5: Hacer clic en Send para ejecutar la petición.
Paso 6: Verificar la respuesta en la parte inferior de Postman. Si la actualización fue exitosa, se mostrará un mensaje en formato JSON indicando que el registro fue actualizado. También se puede verificar en Navicat actualizando la tabla (F5).

## Método DELETE - Cómo Probarlo
Paso 1: Abrir Postman.
Paso 2: Elegir el método DELETE y en la barra de dirección escribir la URL del endpoint más la tabla que se desea eliminar, incluyendo el ID del registro a eliminar.
Ejemplo para eliminar un cliente: 192.168.0.6:3000/clientes/1
Paso 3: Hacer clic en Send para ejecutar la petición.
Paso 4: Si la eliminación fue exitosa, Postman mostrará una respuesta en formato JSON indicando que el registro fue eliminado. También se puede verificar en Navicat actualizando la tabla (F5).
