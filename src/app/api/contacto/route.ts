import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Google Sheets URL config
const GOOGLE_SHEETS_URL =
  process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbxXMKjJ2u-PLwvpKbHjBF6LcsyK9Ky08QFHXfExGW8EmT2dLJRo1gz-_mbNmAmwI8FhIw/exec";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    // 1. Registrar en Google Sheets de forma asíncrona
    let sheetsSuccess = false;
    try {
      const payload = {
        action: "add_lead",
        name,
        email,
        phone,
        service,
        message,
      };

      const sheetsRes = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      if (sheetsRes.ok) {
        sheetsSuccess = true;
      }
    } catch (sheetsErr) {
      console.error("Error al registrar en Google Sheets:", sheetsErr);
      // Continuamos para intentar enviar el correo aunque falle el Sheets temporalmente
    }

    // 2. Enviar correos si las credenciales SMTP están configuradas
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || `"International Private Security Z&O" <${smtpUser}>`;
    const notificationEmails = process.env.NOTIFICATION_EMAILS || smtpUser || "contacto@internationalprivatesecurityzyo.com.mx";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true para puerto 465, false para otros
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            // No rechazar certificados no autorizados si el servidor de Neubox usa uno autofirmado
            rejectUnauthorized: false,
          },
        });

        // A. Enviar correo de notificación a los dueños / administradores
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; border: 1px solid #d4af37; border-radius: 8px; background-color: #0c121e; color: #ffffff;">
            <h2 style="color: #d4af37; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 12px; margin-top: 0; letter-spacing: 0.5px;">
              <i class="fas fa-shield-halved"></i> Nuevo Registro de Contacto
            </h2>
            <p style="color: #e0e0e0; font-size: 0.95rem; line-height: 1.5;">Se ha recibido una nueva solicitud de cotización o contacto desde el sitio web:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; color: #ffffff; font-size: 0.95rem;">
              <tr>
                <td style="padding: 10px; font-weight: bold; width: 140px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d4af37;">Fecha:</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d4af37;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d4af37;">Correo:</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d4af37;">Teléfono:</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="tel:${phone}" style="color: #ffffff; text-decoration: underline;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d4af37;">Servicio:</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${service}</td>
              </tr>
            </table>
            <h3 style="color: #d4af37; margin-top: 25px; margin-bottom: 10px; font-size: 1.05rem;">Mensaje / Necesidades del Cliente:</h3>
            <div style="padding: 15px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; white-space: pre-wrap; line-height: 1.5; color: #d0d0d0; font-size: 0.92rem;">
              ${message}
            </div>
            <p style="font-size: 0.78rem; color: #a0a0a0; margin-top: 30px; border-top: 1px solid rgba(212,175,55,0.2); padding-top: 15px; text-align: center; line-height: 1.4;">
              Este es un correo de notificación generado automáticamente. Los datos se han almacenado en la hoja de cálculo de Google Sheets.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: smtpFrom,
          to: notificationEmails,
          subject: `Nuevo Lead de Ventas: ${name} (${service})`,
          text: `Nuevo Registro de Contacto:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nServicio: ${service}\nMensaje: ${message}`,
          html: adminHtml,
        });

        // B. Enviar correo de confirmación al cliente
        if (email) {
          const clientHtml = `
            <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; border: 1px solid #d4af37; border-radius: 8px; background-color: #0c121e; color: #ffffff;">
              <h2 style="color: #d4af37; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 12px; margin-top: 0; letter-spacing: 0.5px; text-align: center;">
                Solicitud Recibida
              </h2>
              <p style="color: #e0e0e0; font-size: 0.95rem; line-height: 1.6; margin-top: 15px;">
                Hola <strong>${name}</strong>,
              </p>
              <p style="color: #e0e0e0; font-size: 0.95rem; line-height: 1.6;">
                Gracias por ponerse en contacto con <strong>International Private Security Z&O</strong>. Confirmamos que hemos recibido su solicitud de información y necesidades de seguridad correctamente.
              </p>
              <p style="color: #e0e0e0; font-size: 0.95rem; line-height: 1.6;">
                Uno de nuestros asesores especializados en análisis de riesgos se pondrá en contacto con usted a la brevedad para brindarle atención personalizada y realizar una cotización formal.
              </p>
              
              <div style="margin: 25px 0; padding: 18px; background-color: rgba(255, 255, 255, 0.02); border-left: 4px solid #d4af37; border-radius: 4px;">
                <h4 style="color: #d4af37; margin: 0 0 10px 0; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">Resumen del Registro:</h4>
                <table style="width: 100%; border-collapse: collapse; color: #d0d0d0; font-size: 0.9rem; line-height: 1.6;">
                  <tr>
                    <td style="font-weight: bold; width: 150px; color: #ffffff;">Servicio Solicitado:</td>
                    <td>${service}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #ffffff;">Teléfono de Contacto:</td>
                    <td>${phone}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #e0e0e0; font-size: 0.95rem; line-height: 1.6;">
                Si requiere atención inmediata o una cotización de emergencia 24/7, por favor no dude en comunicarse directamente mediante nuestras líneas de atención telefónica o vía WhatsApp en nuestro portal web.
              </p>
              
              <p style="margin-top: 30px; line-height: 1.5;">
                Atentamente,<br>
                <strong style="color: #d4af37; font-size: 1rem;">El Equipo de International Private Security Z&O</strong><br>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Sede CDMX y Sede Monterrey</span><br>
                <a href="https://internationalprivatesecurityzyo.com.mx" style="color: #d4af37; text-decoration: none; font-size: 0.85rem; font-weight: bold;">internationalprivatesecurityzyo.com.mx</a>
              </p>
              
              <p style="font-size: 0.72rem; color: #a0a0a0; margin-top: 35px; border-top: 1px solid rgba(212,175,55,0.1); padding-top: 15px; text-align: center; line-height: 1.4;">
                Este es un mensaje automatizado de confirmación de recepción. Por favor, no responda directamente a este correo, ya que la casilla no es monitoreada para respuestas directas.
              </p>
            </div>
          `;

          await transporter.sendMail({
            from: smtpFrom,
            to: email,
            subject: `Confirmación de Recepción - International Private Security Z&O`,
            text: `Hola ${name},\n\nHemos recibido tu solicitud para el servicio de ${service}.\n\nUn asesor se pondrá en contacto contigo a la brevedad.\n\nAtentamente,\nInternational Private Security Z&O.`,
            html: clientHtml,
          });
        }
      } catch (smtpErr) {
        console.error("Error al enviar correos mediante SMTP de Neubox:", smtpErr);
        // Retornamos éxito de todas formas porque el registro en Sheets o el intento se completó,
        // pero podemos agregar un flag de advertencia en logs
      }
    } else {
      console.warn("SMTP no está completamente configurado en .env.local. Saltando envío de correos.");
    }

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("Error en API de Contacto:", err);
    return NextResponse.json(
      { status: "error", message: "Ocurrió un error al procesar el mensaje." },
      { status: 500 }
    );
  }
}
