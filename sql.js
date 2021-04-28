//Variables de MQTT

var mqtt = require('mqtt');// obtener el paquete mqtt
var hostMqtt = "localhost";
var port = 1883;
var clientMqtt;

//Variables SQL
var mysql = require('mysql');   
var conexion = mysql.createConnectionSQL({  //Creamos un objeto de conexi�n hacia la base de datos SQL
    host : 'localhost',
    database : 'iotubicuas',
    user : 'root',
    password : '',
});

var topicSubscribe = "casa/cocina/+";

function conectionCreateSQL(error, cliente) {
    
    if (error) throw error;
    console.log('Conectado' + conexion.threadId);

    clientMqtt = mqtt.connect({ host: hostMqtt, port: port });
    clientMqtt.subscribe(topicSubscribe);
    clientMqtt.on("message", function (topic, message) {
        var messageDecrypt = message.toString('utf8');

        try {
            console.log(messageDecrypt);
            messageDecrypt = JSON.parse(messageDecrypt);
            console.log(message, messageDecrypt);
            var objInsert = { topic: topic, data: messageDecrypt };
            var sql = "INSERT INTO topic SET ?";
            conexion.query(sql, messageDecrypt, function (error, results) {
                if (error) throw error;
                console.log("Registrado");
            });

            console.log("Regristro exitoso");
            
        } catch (e) {
            console.log("Error!");
        }
    });
}

conexion.connect(conectionCreateSQL);