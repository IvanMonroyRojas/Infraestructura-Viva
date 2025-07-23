// publicar.js

// Importa el cliente SNS del AWS SDK para JavaScript
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// --- CONFIGURACIÓN ---
// Reemplaza con el ARN de tu Topic SNS
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:968608500385:Notificaciones-Inventario"; 
const AWS_REGION = "us-east-1"; 

// --- Inicializa el cliente SNS ---
// El SDK buscará las credenciales automáticamente en:
// 1. Variables de entorno (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN)
// 2. Archivo de credenciales compartidas (~/.aws/credentials)
// 3. No olvidar el token de AWS Academy
const snsClient = new SNSClient({ region: AWS_REGION });

// --- Función para publicar el mensaje ---
async function publishSnsMessage(subject, messageBody) {
  const params = {
    TopicArn: SNS_TOPIC_ARN,
    Subject: subject,
    Message: messageBody,
  };

  try {
    const command = new PublishCommand(params);
    const data = await snsClient.send(command); // El metodo sen es el que publica el mensaje

    console.log("Mensaje publicado exitosamente.");
    console.log(`ID del mensaje: ${data.MessageId}`);
    console.log("Revisa tu correo electrónico para verificar la notificación.");
    return data.MessageId;
  } catch (error) {
    if (error.name === "NotFoundException") {
      console.error(
        `Error: El Topic ARN '${SNS_TOPIC_ARN}' no fue encontrado. Verifica el ARN y la región. Detalles:`,
        error.message
      );
    } else if (error.name === "AuthorizationErrorException") {
      console.error(
        "Error de autorización: Asegúrate de que tus credenciales de AWS tienen permiso para 'sns:Publish' en este Topic. Detalles:",
        error.message
      );
    } else {
      console.error("Ocurrió un error inesperado al publicar el mensaje:", error);
    }
    throw error; // Propagar el error para manejo externo si es necesario
  }
}

// --- Llama a la función para enviar el mensaje ---
const subjectToSend = "[ACME] Actualización en Inventario";
const messageBodyText = "Estimado equipo, Se ha registrado un nuevo evento en el sistema de inventario de activos tecnológicos. Por favor, revise la plataforma para más detalles o acciones necesarias. \n— Sistema de Notificaciones Automáticas \nSoluciones Digitales ACME";

publishSnsMessage(subjectToSend, messageBodyText)

  .then(() => console.log("\nProceso de envío finalizado."))
  .catch((err) => console.error("Fallo el envío:", err));