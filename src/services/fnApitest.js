import puppeteer from "puppeteer";

const style = `<style>
      <style>
      body {
        font-family: Arial, sans-serif;
        color: #000;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 80%;
        margin: 20px auto;
        padding: 20px;
      }
      h1 {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
        text-transform: uppercase;
      }
      .header {
        text-align: right;
        margin-bottom: 20px;
      }
      .header strong {
        font-size: 14px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      table,
      th,
      td {
        border: 1px solid #000;
      }
      th,
      td {
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #d3d3d3;
        text-align: center;
      }
      .wide-col {
        width: 40%;
      }
      .narrow-col {
        width: 20%;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table,
      th,
      td {
        border: 1px solid #000;
      }
      th,
      td {
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #d3d3d3;
        text-align: center;
        font-weight: bold;
      }
      .signature-box {
        width: 100%;
        height: 300px;
        border: 2px solid #000;
        position: relative;
        box-sizing: border-box;
      }

      .signature-label {
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: bold;
      }
      ol {
        margin-left: 20px;
      }
      ol li {
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table,
      th,
      td {
        border: 1px solid #000;
      }
      th,
      td {
        padding: 10px;
        text-align: center;
      }
      th {
        background-color: #d3d3d3;
        font-weight: bold;
      }
      .imgs {
      max-height: 640px;
      max-width: 640px;
      display: flex;
      justify-content: center; 
      align-items: center;
      }
      .observation {
        margin-top: auto;
        font-weight: bold;
      }
    </style>`;

const fnApitest = async (data) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acta de Entrega/Recepción de Vehículos</title>
    ${style}
  </head>
  <body>
    <center>
    <div class="container">
      <div class="header">
        <p><strong>N° pedido asociado:</strong> __________</p>
      </div>
      <h1>ACTA ENTREGA / RECEPCIÓN DE VEHÍCULOS N°: __________</h1>
      <table>
        <tr>
            <td class="half-width"><strong>Preparado por:</strong></td>
            <td class="third-width"><strong>Fecha:</strong></td>
            <td class="third-width"><strong>Hora Recepción:</strong> / <strong>Hora Inspección:</strong></td>
        </tr>
        <tr>
            <td><strong>Patente:</strong></td>
            <td><strong>Marca:</strong></td>
            <td><strong>Modelo:</strong></td>
        </tr>
        <tr>
            <td><strong>Chasis:</strong></td>
            <td><strong>Color:</strong></td>
            <td><strong>Año:</strong></td>
        </tr>
        <tr>
            <td colspan="3"><strong>Cliente:</strong></td>
        </tr>
        <tr>
            <td><strong>Kilometraje:</strong></td>
            <td><strong>Combustible:</strong></td>
            <td><strong>Tipo de Servicio:</strong></td>
        </tr>
        <tr>
            <td><strong>Nombre Chofer:</strong></td>
            <td><strong>Celular:</strong></td>
            <td><strong>Mail:</strong></td>
        </tr>
        <tr>
            <td colspan="3" class="full-width"><strong>Observaciones:</strong></td>
        </tr>
    </table>
  <table>
        <tr>
          <th colspan="2">POR GAMALEASING SPA</th>
          <th colspan="2">USUARIO CLIENTE</th>
        </tr>
        <tr>
          <td>NOMBRE:</td>
          <td></td>
          <td>NOMBRE:</td>
        </tr>
        <tr>
          <td>RUT:</td>
          <td></td>
          <td>RUT:</td>
          <td></td>
        </tr>
      </table>
      <Table border="1" cellPadding="2">
          <thead>
            <tr>
              <th>Nombre del Artículo</th>
              <th>Existe</th>
              <th>Estado</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            ${data.ACCESORIOS_INSPECCION.map(
              (articulo) => `
              <tr>
                <td>${articulo.nombreArticulo}</td>
                <td>${articulo.Existe}</td>
                <td>${articulo.Estado}</td>
                <td>${articulo.Comentario}</td>
              </tr>
            `
            ).join("")}
          </tbody>
        </table>
        <div> 
        <div class="">FIRMA CLIENTE :</div>
        <br>
        <img align='center' src="${'data:image/png;base64,','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'}">
        </div>
        ---------
        ${data.FOTOS_INSPECCION.map(
          (imagen) => `
          <tbody>
          <tr>
          <td>${imagen.nombre_foto}</td>
          
          <img class="imgs" src="${'data:image/png;base64,',imagen.$content}">
      
          <td>Comentario :</td>
          
          <td>${imagen.comentario_foto}</td>
          </tr>
          </tbody>
          `
        ).join("")}
       
        <ol>
        <li>
          Cobertura del Seguro se hará efectiva solamente si se realiza la
          constancia policial inmediatamente ocurrido el Siniestro.
        </li>
        <li>
          Todo vehículo de reemplazo considera depósito de combustible lleno en
          su entrega, el cual debe retornar de igual manera, en caso contrario
          la diferencia será facturado al cliente.
        </li>
      </ol>
    </div>
  </center>
  </body>
</html>
  `;

  async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML dinámico en la página
    await page.setContent(htmlContent);

    // Configurar las opciones del PDF
    await page.pdf({
      path: "dynamic_images.pdf",
      format: "LETTER",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "10px",
        left: "10px",
        right: "10px",
      },
    });

    await page.word;

    await browser.close();
  }
  generatePDF();
};

export default fnApitest;
