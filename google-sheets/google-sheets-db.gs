/**
 * INTERNATIONAL PRIVATE SECURITY Z&O
 * ==========================================
 * Google Apps Script - Base de Datos en Google Sheets con CRUD y Seguridad
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Crea una hoja de cálculo en Google Drive.
 * 2. Cambia el nombre de la primera pestaña (hoja) a "Leads".
 * 3. Escribe en la fila 1 los siguientes encabezados en la pestaña "Leads":
 *    A1: Fecha | B1: Nombre | C1: Correo | D1: Teléfono | E1: Servicio | F1: Mensaje
 * 4. Crea una segunda pestaña y cámbiale el nombre a "Faqs". Escribe en la fila 1:
 *    A1: ID | B1: Question | C1: Answer | D1: OrderNum
 * 5. Crea una tercera pestaña y cámbiale el nombre a "BlogPosts". Escribe en la fila 1:
 *    A1: ID | B1: Slug | C1: Title | D1: Summary | E1: Content | F1: Category | G1: Author | H1: Image | I1: Featured | J1: Date | K1: ReadTime | L1: CreatedAt
 * 6. Ve a Extensiones -> Apps Script. Borra todo y pega este código.
 * 7. Edita la constante API_SECRET de abajo con una contraseña muy segura.
 * 8. Guarda y haz clic en "Implementar" -> "Nueva implementación".
 * 9. Tipo de implementación: Aplicación web.
 *    - Ejecutar como: Yo.
 *    - Quién tiene acceso: Cualquier persona.
 * 10. Copia la URL generada y pégala en tu archivo local `.env.local` como `NEXT_PUBLIC_SHEETS_WEBAPP_URL`.
 * 11. Configura la misma contraseña en `.env.local` como `SHEETS_API_SECRET`.
 */

var API_SECRET = "@Jarvis@JC140692@"; // CAMBIA ESTO por una contraseña segura en producción

function doGet(e) {
  var action = e.parameter.action;

  if (action === "get_faqs") {
    return getTableData("Faqs");
  } else if (action === "get_blog_posts") {
    return getTableData("BlogPosts");
  }

  return errorResponse("Acción no válida o faltante.");
}

function doPost(e) {
  try {
    var payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter;
    }

    var action = payload.action;

    // El envío de leads es público (no requiere clave secreta)
    if (action === "add_lead") {
      return addLead(payload);
    }

    // Todas las demás acciones requieren autenticación de API_SECRET
    if (payload.secret !== API_SECRET) {
      return errorResponse("Acceso denegado: Clave secreta inválida.");
    }

    if (action === "add_faq") {
      return addFaq(payload);
    } else if (action === "update_faq") {
      return updateFaq(payload);
    } else if (action === "delete_faq") {
      return deleteFaq(payload);
    } else if (action === "add_blog_post") {
      return addBlogPost(payload);
    } else if (action === "update_blog_post") {
      return updateBlogPost(payload);
    } else if (action === "delete_blog_post") {
      return deleteBlogPost(payload);
    }

    return errorResponse("Acción POST no válida o faltante.");
  } catch (err) {
    return errorResponse(err.toString());
  }
}

// Helpers para responder en formato JSON
function successResponse(data) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "success", data: data }),
  )
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(msg) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "error", message: msg }),
  )
    .setMimeType(ContentService.MimeType.JSON);
}

// Leer datos de una tabla/pestaña
function getTableData(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return errorResponse("La pestaña " + sheetName + " no existe.");

  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var data = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var val = row[j];
      // Si la columna es Content (un array stringified), intentamos parsearlo
      if (headers[j] === "Content" && typeof val === "string") {
        try {
          val = JSON.parse(val);
        } catch (e) {}
      }
      obj[headers[j]] = val;
    }
    data.push(obj);
  }

  return successResponse(data);
}

// Agregar contacto (Lead)
function addLead(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads");
  if (!sheet) return errorResponse("La pestaña Leads no existe.");

  sheet.appendRow([
    new Date(),
    payload.name || "Sin nombre",
    payload.email || "Sin correo",
    payload.phone || "Sin tel",
    payload.service || "N/A",
    payload.message || "Sin msg",
  ]);

  return successResponse("Contacto registrado correctamente.");
}

// FAQ CRUD
function addFaq(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Faqs");
  if (!sheet) return errorResponse("La pestaña Faqs no existe.");

  var id = Utilities.getUuid();
  sheet.appendRow([
    id,
    payload.question,
    payload.answer,
    parseInt(payload.orderNum) || 0,
  ]);

  return successResponse({ id: id });
}

function updateFaq(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Faqs");
  if (!sheet) return errorResponse("La pestaña Faqs no existe.");

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === payload.id) {
      sheet.getRange(i + 1, 2).setValue(payload.question);
      sheet.getRange(i + 1, 3).setValue(payload.answer);
      sheet.getRange(i + 1, 4).setValue(parseInt(payload.orderNum) || 0);
      return successResponse("Pregunta frecuente actualizada.");
    }
  }
  return errorResponse(
    "Pregunta frecuente no encontrada con ID: " + payload.id,
  );
}

function deleteFaq(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Faqs");
  if (!sheet) return errorResponse("La pestaña Faqs no existe.");

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === payload.id) {
      sheet.deleteRow(i + 1);
      return successResponse("Pregunta frecuente eliminada.");
    }
  }
  return errorResponse("Pregunta frecuente no encontrada.");
}

// Blog Posts CRUD
function addBlogPost(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BlogPosts");
  if (!sheet) return errorResponse("La pestaña BlogPosts no existe.");

  var id = Utilities.getUuid();
  var contentStr = JSON.stringify(payload.content || []);

  sheet.appendRow([
    id,
    payload.slug,
    payload.title,
    payload.summary,
    contentStr,
    payload.category,
    payload.author,
    payload.image,
    payload.featured ? "true" : "false",
    payload.date,
    payload.readTime,
    new Date(),
  ]);

  return successResponse({ id: id });
}

function updateBlogPost(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BlogPosts");
  if (!sheet) return errorResponse("La pestaña BlogPosts no existe.");

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === payload.id) {
      var contentStr = JSON.stringify(payload.content || []);

      sheet.getRange(i + 1, 2).setValue(payload.slug);
      sheet.getRange(i + 1, 3).setValue(payload.title);
      sheet.getRange(i + 1, 4).setValue(payload.summary);
      sheet.getRange(i + 1, 5).setValue(contentStr);
      sheet.getRange(i + 1, 6).setValue(payload.category);
      sheet.getRange(i + 1, 7).setValue(payload.author);
      sheet.getRange(i + 1, 8).setValue(payload.image);
      sheet.getRange(i + 1, 9).setValue(payload.featured ? "true" : "false");
      sheet.getRange(i + 1, 10).setValue(payload.date);
      sheet.getRange(i + 1, 11).setValue(payload.readTime);
      return successResponse("Artículo de blog actualizado.");
    }
  }
  return errorResponse("Artículo de blog no encontrado.");
}

function deleteBlogPost(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("BlogPosts");
  if (!sheet) return errorResponse("La pestaña BlogPosts no existe.");

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === payload.id) {
      sheet.deleteRow(i + 1);
      return successResponse("Artículo de blog eliminado.");
    }
  }
  return errorResponse("Artículo de blog no encontrado.");
}
