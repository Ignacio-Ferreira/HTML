const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const aplicacion = express();
const servidor = http.createServer(aplicacion);
const io = socketIo(servidor);

const puerto = 3000;
const historial = [];

// Cargar historial desde archivo JSON
const historialArchivo = 'historial.json';
if (fs.existsSync(historialArchivo)) {
    const datos = fs.readFileSync(historialArchivo);
    historial.push(...JSON.parse(datos));
}

// Guardar historial en archivo JSON 
function guardarHistorial() {
    fs.writeFileSync(historialArchivo, JSON.stringify(historial, null, 2));
}

// Configuración de Multer para mandar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: El archivo debe ser una imagen (jpg, png, gif).');
        }
    }
});

// Ruta para ver todas las imágenes subidas
aplicacion.get('/imagenes', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('No se pudieron cargar las imágenes');
        }
        res.json(files);
    });
});

aplicacion.get('/ver-imagenes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'imagenes.html'));
});

// Acceso a la carpeta uploads para ver las imágenes
aplicacion.use('/images', express.static(path.join(__dirname, 'uploads')));

// Login como página principal
aplicacion.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para la página de chat después del login
aplicacion.get('/chat', (req, res) => {
    const username = req.query.username; 
    const room = req.query.room;

    if (!username || !room) {
        return res.redirect('/'); // Si no pasan un nombre de usuario y un room no te manda al chat
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para subir imágenes
aplicacion.post('/upload', upload.single('image'), (req, res) => {
    const imageUrl = `/images/${req.file.filename}`;
    const mensaje = { tipo: 'imagen', usuario: req.body.usuario, contenido: imageUrl }; // Agregar usuario
    historial.push(mensaje);
    guardarHistorial();
    io.emit('imagen', mensaje);
    io.emit('notificacion', 'Un usuario ha enviado una imagen');
    res.status(200).send('Imagen subida con éxito');
});

// Ruta para archivos estáticos
aplicacion.use(express.static(path.join(__dirname, 'public')));

// Manejo de conexiones Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se conectó');

    // Enviar historial de mensajes al nuevo usuario
    historial.forEach((mensaje) => {
        if (mensaje.tipo === 'texto') {
            socket.emit('mensaje', { usuario: mensaje.usuario, contenido: mensaje.contenido });
        } else if (mensaje.tipo === 'imagen') {
            socket.emit('imagen', mensaje);
        }
    });

    // Notificar a los demás usuarios cuando alguien se conecta
    socket.broadcast.emit('usuario-conectado', 'Un usuario se ha conectado');

    //mensajes de texto
    socket.on('mensaje', (data) => {
        const nuevoMensaje = { tipo: 'texto', usuario: data.usuario, contenido: data.contenido };
        historial.push(nuevoMensaje);
        guardarHistorial();
        io.emit('mensaje', { usuario: data.usuario, contenido: data.contenido });
        io.emit('notificacion', `${data.usuario} ha enviado un mensaje de texto`);
    });

    //desconexiones
    socket.on('disconnect', () => {
        console.log('Un usuario se desconectó');
        socket.broadcast.emit('usuario-desconectado', 'Un usuario se ha desconectado');
    });
});

// Iniciar el servidor
servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
