require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432, // Puerto por defecto de PostgreSQL
});

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Respuesta HTML</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Proyecto Equipo 2</h1>
            <p>Este es un Control de Pedidos de Restaurante.</p>
        </div>
    </body>
    </html>`);
});

//metodos get DANIEL PADILLA

app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM t_clientes;');
    res.json({ message: 'Lista de Clientes', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM t_productos;');
    res.json({ message: 'Lista de Productos', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los pedidos con información de cliente y producto
app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, c.nombre AS cliente, pr.nombre AS producto, 
             p.cantidad, p.total, p.fecha
      FROM t_pedidos p
      JOIN t_clientes c ON p.fk_clientes = c.id
      JOIN t_productos pr ON p.fk_productos = pr.id;
    `);
    res.json({ message: 'Lista de Pedidos', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// inician los metodos get daniel molina
// Crear un nuevo cliente
app.post('/t_clientes', async (req, res) => {
  
  const { nombre, correo, telefono} = req.body;  // Usamos req.body para obtener los datos del artÃ­culo.
  
  if (!nombre || !correo || !telefono) {
    return res.status(400).json({ error: 'Faltan datos para crear el cliente' });
  }
      
  try {
    const result = await pool.query(
      `INSERT INTO t_clientes (nombre, correo, telefono) 
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre, correo, telefono]
    );
    
    res.status(201).json({ message: 'Cliente creado exitosamente', articulo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// crear un nuevo producto
app.post('/t_productos', async (req, res) => {
  
  const { nombre, descripcion, precio} = req.body;  // Usamos req.body para obtener los datos del artÃ­culo.
  
  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: 'Faltan datos para crear el producto' });
  }
      
  try {
    const result = await pool.query(
      `INSERT INTO t_productos (nombre, descripcion, precio) 
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre, descripcion, precio]
    );
    
    res.status(201).json({ message: 'Producto creado exitosamente', articulo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// crear un nuevo pedido
app.post('/t_pedidos', async (req, res) => {
  
  const { fk_productos, fk_clientes, cantidad, total, fecha} = req.body;  // Usamos req.body para obtener los datos del artÃ­culo.
  
  if (!fk_productos || !fk_clientes || !cantidad || !total || !fecha) {
    return res.status(400).json({ error: 'Faltan datos para crear el pedido' });
  }
      
  try {
    const result = await pool.query(
      `INSERT INTO t_pedidos (fk_productos, fk_clientes, cantidad, total, fecha) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fk_productos, fk_clientes, cantidad, total, fecha]
    );
    
    res.status(201).json({ message: 'Pedido creado exitosamente', articulo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//terminan los metodos post

//Inician los metodos put
// Actualización de un cliente
app.put('/t_clientes/:id', async (req, res) => {
  console.log("Aquí viene una petición", req);
  const { id } = req.params;
  const { nombre, correo, telefono } = req.body;

  if (!nombre || !correo || !telefono) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el cliente' });
  }

  try {
    const result = await pool.query(
      `UPDATE t_clientes 
       SET nombre = $1, correo = $2, telefono = $3
       WHERE "Id_cliente" = $4 RETURNING *`,
      [nombre, correo, telefono, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente actualizado', cliente: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualización de un producto
app.put('/t_productos/:id', async (req, res) => {
  console.log("Aquí viene una petición", req);
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el producto' });
  }

  try {
    const result = await pool.query(
      `UPDATE t_productos 
       SET nombre = $1, descripcion = $2, precio = $3
       WHERE "id_productos" = $4 RETURNING *`,
      [nombre, descripcion, precio, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado', producto: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualización de un pedido
app.put('/t_pedidos/:id', async (req, res) => {
  console.log("Aquí viene una petición", req);
  const { id } = req.params;
  const { fk_productos, fk_clientes, cantidad, total, fecha } = req.body;

  if (!fk_productos || !fk_clientes || !cantidad || !total || !fecha) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el pedido' });
  }

  try {
    const result = await pool.query(
      `UPDATE t_pedidos 
       SET fk_productos = $1, fk_clientes = $2, cantidad = $3, total = $4, fecha = $5
       WHERE "Id_pedidos" = $6 RETURNING *`,
      [fk_productos, fk_clientes, cantidad, total, fecha, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ message: 'Pedido actualizado', pedido: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Terminan los metodos put


//Eliminar Astrid Rosa
//Eliminar tabla cliente
app.delete('/t_cliente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM t_clientes WHERE "Id_cliente" = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado', cliente: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Eliminar tabla pedido
app.delete('/t_pedido/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM t_pedidos WHERE "Id_pedidos" = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado', pedido: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Eliminar un Producto

app.delete('/t_producto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM t_productos WHERE "id_productos" = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado', producto: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Terminan los metodos Delete

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



