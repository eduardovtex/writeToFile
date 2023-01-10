const newman = require('newman'); // libreria newman para ocupar postman CLI
const fs = require('fs'); // libreria para poder guardar el archivo con los requests
const os = require('os');

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./coleccion.json'), // Coleccion donde se agrega la llamada a las API de VTEX
    iterationData: './data.csv', //archivo donde están las variables del CSV a leer
    delayRequest: 850, //delay de las llamadas en milisegundos, 1000 ms => 1 seg
    reporters: 'cli'
})
.on('request', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    //Varibles para crear nombres random en el archivo
    // const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
    // const randomString = Math.random().toString(36).substring(7);
    // //const fileName = `response-${requestName}-${randomString}.txt`;
    const content = data.response.stream.toString();
    // se crea un archivo TXT por defecto, donde se agrega la información
    fs.appendFile('resultado.txt', content + os.EOL, function (error) {
        if (error) { 
             console.error(error); 
        }
     });

});

// Código para hacer pruebas en otro punto de los requests.
//.on('beforeRequest', (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }

//     if (data.request.body) {
//         const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
//         const randomString = Math.random().toString(36).substring(7);
//         const fileName = `request-${requestName}-${randomString}.txt`;
//         const content = data.request.body.raw;
        
//         fs.writeFile(fileName, content, function (error) {
//             if (error) { 
//                  console.error(error); 
//             }
//          });        
//     }
// })