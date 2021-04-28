//librerias
var mqtt = require('mqtt');

//Variables MQTT
var hostMQTT = 'localhost';
var port = 1883;
var topic = 'casa/cocina/+';
var message = 'Mensaje de prueba';

function pubTopic(topic, msg) {
  clientMQTT = mqtt.connect({ host: hostMQTT, port: port });
  clientMQTT.on('connect', function () {
    if (clientMQTT.connected) {
      var options = {
        retain: false,
        qos: 1,
      };
      clientMQTT.publish(topic, msg, options);
      //Terminar conexión
      clientMQTT.end();
    }
  });
}
pubTopic(topic, message);