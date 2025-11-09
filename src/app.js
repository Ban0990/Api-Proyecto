import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar todas las rutas
import rolRoutes from './routes/rol.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import alimentoRoutes from './routes/alimento.routes.js';
import productoRoutes from './routes/producto.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import compraRoutes from './routes/compra.routes.js';
import detalleCompraRoutes from './routes/detalleCompra.routes.js';
import especieRoutes from './routes/especie.routes.js';
import estanqueRoutes from './routes/estanque.routes.js';
import consumoRoutes from './routes/consumo.routes.js';
import auditoriaRoutes from './routes/auditoria.routes.js';

const app = express();

// 🔒 Configurar CORS
const corsOptions = {
  origin: '*', // Cambiar por tu dominio cuando la API esté en producción
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

// ⚙️ Configuración básica
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 📁 Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Carpeta pública (para imágenes o archivos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🚏 Rutas base
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/detalle-compras', detalleCompraRoutes);
app.use('/api/especies', especieRoutes);
app.use('/api/estanques', estanqueRoutes);
app.use('/api/consumos', consumoRoutes);
app.use('/api/auditorias', auditoriaRoutes);

// 🧭 Ruta de prueba del servidor
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Alimentación de Camarones funcionando correctamente 🦐' });
});

// ⚠️ Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: '❌ Endpoint not found'
  });
});

export default app;

















//app.use(cors()); 
//app.use(cors(corsOptions)); 
// Para recibir datos JSON y formularios
//app.use(express.json()) //interpretar objetos json
//app.use(express.urlencoded({extended:true})) //se añade para poder receptar por unidad
// Servir archivos estáticos desde /uploads
//app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//indicar que rutas se utilice ojo

/*app.use((req,res,next)=>{
    res.status(404).json({
        message:' Endponit not fount'
    })
})

export default app;*/