"use strict";

const { EmailClient } = require("@azure/communication-email");

// Destinatario fijo del buzón corporativo.
const TO_ADDRESS = "info@quantixanalitic.com";

// Remitente verificado en el recurso ACS de viewQ.
// Se rellena tras detectar el dominio verificado (ver ARCHITECTURE / reporte de despliegue).
// Permite override por app setting opcional ACS_SENDER_ADDRESS sin tocar código.
const SENDER_ADDRESS = process.env.ACS_SENDER_ADDRESS || "__PENDING_VERIFIED_SENDER__";

// Límites de longitud (defensa básica anti-abuso).
const LIMITS = { name: 120, email: 200, message: 5000 };

// Validación de formato de email pragmática (no RFC-completa, suficiente para un form).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

module.exports = async function (context, req) {
  const respond = (status, body) => {
    context.res = {
      status,
      headers: { "Content-Type": "application/json" },
      body,
    };
  };

  try {
    // El body puede venir como objeto (ya parseado) o string.
    let data = req.body;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data || "{}");
      } catch (_) {
        return respond(400, { ok: false, error: "Cuerpo de la solicitud inválido." });
      }
    }
    data = data || {};

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    const company = String(data.company || "").trim(); // honeypot

    // Honeypot: si el campo oculto viene lleno, es un bot. Respondemos 200 sin enviar.
    if (company) {
      context.log("Honeypot activado; descartando envío silenciosamente.");
      return respond(200, { ok: true });
    }

    // Campos requeridos.
    if (!name || !email || !message) {
      return respond(400, { ok: false, error: "Nombre, correo y mensaje son obligatorios." });
    }

    // Límites de longitud.
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return respond(400, { ok: false, error: "Alguno de los campos excede la longitud permitida." });
    }

    // Formato de email.
    if (!EMAIL_RE.test(email)) {
      return respond(400, { ok: false, error: "El correo no tiene un formato válido." });
    }

    const connectionString = process.env.ACS_CONNECTION_STRING;
    if (!connectionString) {
      context.log.error("Falta la app setting ACS_CONNECTION_STRING.");
      return respond(500, { ok: false, error: "Configuración del servidor incompleta." });
    }

    const client = new EmailClient(connectionString);

    const plainText =
      `Nuevo mensaje desde quantixanalitic.com\n\n` +
      `Nombre: ${name}\n` +
      `Contacto: ${email}\n\n` +
      `Mensaje:\n${message}\n`;

    const html =
      `<div style="font-family:Segoe UI,Arial,sans-serif;color:#1c2630;line-height:1.5">` +
      `<h2 style="color:#16263F;margin:0 0 12px">Nuevo mensaje desde quantixanalitic.com</h2>` +
      `<p style="margin:0 0 6px"><strong>Nombre:</strong> ${escapeHtml(name)}</p>` +
      `<p style="margin:0 0 6px"><strong>Contacto:</strong> ${escapeHtml(email)}</p>` +
      `<p style="margin:12px 0 4px"><strong>Mensaje:</strong></p>` +
      `<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>` +
      `</div>`;

    const poller = await client.beginSend({
      senderAddress: SENDER_ADDRESS,
      content: {
        subject: `Nuevo mensaje desde quantixanalitic.com — ${name}`,
        plainText,
        html,
      },
      recipients: {
        to: [{ address: TO_ADDRESS }],
      },
      replyTo: [{ address: email, displayName: name }],
    });

    await poller.pollUntilDone();

    return respond(200, { ok: true });
  } catch (err) {
    context.log.error("Error enviando el correo de contacto:", err && err.message ? err.message : err);
    return respond(500, { ok: false, error: "No se pudo enviar el mensaje. Intente de nuevo más tarde." });
  }
};
