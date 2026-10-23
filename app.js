const fs = require('fs');

const opcion = process.argv[2];

// Opción A: Si escribes "listar", leemos todos los avisos guardados
if (opcion === 'listar') {
    fs.readFile('mis-avisos.txt', 'utf8', (error, datos) => {
        if (error) {
            console.log("📂 Aún no hay avisos guardados en el archivo.");
        } else {
            console.log("\n--- 📋 LISTA DE TUS AVISOS ---");
            console.log(datos);
        }
    });
    return; // Paramos aquí para que no intente guardar nada
}

// Opción B: Si no es "listar", guardamos un aviso nuevo
const clienteArg = process.argv[2];
const trabajoArg = process.argv[3];

if (!clienteArg || !trabajoArg) {
    console.log("⚠️ Faltan datos o el comando no es correcto.");
    console.log('👉 Para guardar un aviso: node app.js "Nombre Cliente" "Descripción del trabajo"');
    console.log('👉 Para ver la lista:      node app.js listar');
    return;
}

const nuevoAviso = {
    id: Date.now(),
    cliente: clienteArg,
    trabajo: trabajoArg,
    fecha: new Date().toLocaleString()
};

const lineaRegistro = `[AVISO] ID: ${nuevoAviso.id} | Cliente: ${nuevoAviso.cliente} | Trabajo: ${nuevoAviso.trabajo} | Fecha: ${nuevoAviso.fecha}\n`;

fs.appendFile('mis-avisos.txt', lineaRegistro, (error) => {
    if (error) {
        console.log("Error al guardar:", error);
    } else {
        console.log(`✅ ¡Aviso guardado con éxito para ${nuevoAviso.cliente}!`);
    }
});