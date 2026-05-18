/**
 * INTERNATIONAL PRIVATE SECURITY Z&O
 * ==========================================
 * Google Apps Script - Base de Datos Temporal en Google Sheets
 * 
 * INSTRUCCIONES DE USO:
 * 1. Crea una hoja de cálculo en Google Drive.
 * 2. En la Fila 1 (columnas A a F), escribe exactamente estos encabezados:
 *    A: Fecha | B: Nombre | C: Correo | D: Teléfono | E: Servicio | F: Mensaje
 * 3. Ve al menú superior: Extensiones -> Apps Script.
 * 4. Borra todo el código que aparezca y pega este archivo completo.
 * 5. Haz clic en "Implementar" (Deploy) -> "Nueva implementación" (New deployment).
 * 6. Selecciona "Aplicación web" (Web app).
 * 7. Configura:
 *    - Ejecutar como: Yo (tu correo electrónico).
 *    - Quién tiene acceso: Cualquier persona (Anyone).
 * 8. Haz clic en Implementar, otorga los permisos correspondientes y COPIA la URL generada.
 * 9. Pega esa URL en el archivo `script.js` de tu proyecto.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var parameter = e.parameter;
    
    // Si los datos se envían como JSON directo (AJAX/Fetch)
    if (e.postData && e.postData.contents) {
      try {
        parameter = JSON.parse(e.postData.contents);
      } catch(err) {
        // Fallback si no es un JSON válido
      }
    }
    
    // Agregar nueva fila a la hoja de cálculo
    sheet.appendRow([
      new Date(),                     // Columna A: Fecha y Hora del envío
      parameter.name || "Sin nombre", // Columna B: Nombre completo
      parameter.email || "Sin correo",// Columna C: Correo electrónico
      parameter.phone || "Sin tel",   // Columna D: Teléfono (10 dígitos)
      parameter.service || "N/A",     // Columna E: Tipo de servicio
      parameter.message || "Sin msg"  // Columna F: Mensaje detallado
    ]);
    
    // Retornar respuesta exitosa con cabeceras CORS para AJAX
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Mensaje registrado con éxito en Google Sheets" 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
      
  } catch (error) {
    // Retornar error estructurado en caso de fallo
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "error": error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}
