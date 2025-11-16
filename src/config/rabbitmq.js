// src/config/rabbitmq.js
import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";

let channel;
let replyQueue;
const pendingResponses = new Map();

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("auth_verify_queue", { durable: true });
    const { queue } = await channel.assertQueue("", { exclusive: true });
    replyQueue = queue;

    console.log("Connecté à RabbitMQ | Reply Queue:", replyQueue);

    channel.consume(
      replyQueue,
      (msg) => {
        if (!msg?.properties?.correlationId) return;
        const correlationId = msg.properties.correlationId;
        const pending = pendingResponses.get(correlationId);
        if (pending) {
          const response = JSON.parse(msg.content.toString());
          pending.resolve(response);
          pendingResponses.delete(correlationId);
        }
      },
      { noAck: true }
    );
  } catch (err) {
    console.error("Erreur connexion RabbitMQ:", err);
    throw err;
  }
};

// CORRIGÉ : on passe token + action
export const publishEvent = async (token, action) => {
  if (!channel) throw new Error("Channel RabbitMQ non initialisé");

  const correlationId = uuidv4();

  const promise = new Promise((resolve, reject) => {
    pendingResponses.set(correlationId, { resolve, reject });

    channel.publish(
      "", // exchange vide
      "auth_verify_queue", // queue directe
      Buffer.from(JSON.stringify({ token, action })), // ENVOIE token + action
      {
        replyTo: replyQueue,
        correlationId,
        persistent: true,
      }
    );

    console.log("Événement publié: VERIFY_TOKEN ID:", correlationId);
  });

  return promise;
};