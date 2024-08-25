import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { mainRouter } from './src/routes/mainRouter.js';
import { modulesRoutes } from './src/routes/modulesRoutes.js';
import { actionRoutes } from './src/routes/actionRoutes.js';
import { notFoundErrorMiddleware } from './src/middlewares/errors/notFoundErrorMiddleware.js';
import { errorHandlerMiddleware } from './src/middlewares/errors/errorHandlerMiddleware.js';

// Crear la aplicación Express
const app = express();

// Middlewares Globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));

// Middleware Recursos Estaticos
app.use('/uploads', express.static('./uploads'));

// Ruta a gestion de personal/clientes/stock
app.use(mainRouter);

// Ruta gestion de Modulos
app.use(modulesRoutes);

// Ruta gestion de diversas acciones
app.use(actionRoutes);

// Middleware 404 Not Found
app.use(notFoundErrorMiddleware);

// Middleware de Gestión de Errores
app.use(errorHandlerMiddleware);

// Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
