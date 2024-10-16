import puppeteer from "puppeteer";

const style = `<style>
    /* margenes predeterminados */
* {
    margin: 10px 10px;
    font-size: 7px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
}
/* ------------------------- */
/* ------------------------------ */
/* img  imagenes de la pagina*/
img{
    max-height: 800px;
    max-width: 800px;
  }
/* ------------------------------ */
/* contenedorflex contenedor base de los items*/
.contenedorflex{
display: flex;
justify-content: center;
}
/* ------------------------------ */
.contenedorflex .item{
    display: flex;
    flex-flow: column;
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
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
    
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
    height: 100%;
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
  max-height: 1000px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .observation {
    margin-top: display;
    font-weight: bold;
  }
    .page-break {
        page-break-before: always; /* Forzar un salto de página antes de este elemento */
    }
    </style>`;

const fnApitest = async (data) => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="es">
 
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css.css">
    ${style}
</head>
 
<body>
    <center>
        <section class="section">
            <div class="contenedorflex">
                <div class="item">
                    <div class="informacionPersonal">
                        <div class="container">
                            <div class="header">
                                <center>
                                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI4MCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4MCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMyRDJEMkQ7fQ0KCS5zdDF7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NC43LDM0LjFMNjQuNywzNC4xbC0xNC43LDB2OC44aDZ2MS45YzAsMS42LTAuMSwzLTAuNCw0Yy0wLjMsMS0wLjcsMS44LTEuMywyLjRjLTAuNiwwLjYtMS40LDAuOS0yLjQsMS4yDQoJCQljLTEsMC4yLTIuMiwwLjMtMy43LDAuM0gzMC44Yy0xLjUsMC0yLjctMC4xLTMuOC0wLjNjLTEtMC4yLTEuOC0wLjYtMi40LTEuMXMtMS0xLjMtMS4zLTIuM2MtMC4yLTEtMC40LTIuMi0wLjQtMy44di0xNA0KCQkJYzAtMS40LDAuMS0yLjYsMC40LTMuNWMwLjItMSwwLjctMS43LDEuMi0yLjNjMC42LTAuNiwxLjQtMSwyLjQtMS4yYzEtMC4yLDIuMy0wLjQsMy44LTAuNGgzNC41di04LjlIMzAuMw0KCQkJYy0zLjQsMC02LjIsMC4zLTguNSwwLjljLTIuMywwLjYtNC4xLDEuNS01LjQsMi43Yy0xLjQsMS4yLTIuMywyLjktMi45LDQuOWMtMC42LDItMC45LDQuNS0wLjksNy40djE0LjljMCwyLjksMC4zLDUuNCwwLjksNy40DQoJCQljMC42LDIsMS41LDMuNiwyLjksNC45YzEuNCwxLjIsMy4yLDIuMiw1LjQsMi43YzIuMiwwLjYsNS4xLDAuOCw4LjUsMC44aDE4LjJjMy40LDAsNi4zLTAuMyw4LjYtMC44YzIuMy0wLjYsNC4xLTEuNSw1LjUtMi43DQoJCQljMS4zLTEuMiwyLjMtMi45LDIuOS00LjljMC42LTIsMC44LTQuNSwwLjgtNy40VjM0LjFINjQuN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExMS4xLDQ0LjVIODQuNWMtMS4yLDAtMi4yLDAuMy0yLjgsMC44Yy0wLjcsMC41LTEsMS41LTEsM3YyLjZjMCwxLjMsMC40LDIuMywxLjEsMi44DQoJCQljMC43LDAuNSwxLjgsMC44LDMuMSwwLjhoMTkuM2MxLjIsMCwyLjItMC4xLDMuMS0wLjNjMC45LTAuMiwxLjYtMC41LDIuMS0xYzAuNi0wLjUsMS0xLjIsMS4yLTJjMC4zLTAuOSwwLjQtMiwwLjQtMy40VjQ0LjV6DQoJCQkgTTg0LjEsNjEuNWMtMi43LDAtNS0wLjItNi43LTAuN2MtMS44LTAuNS0zLjItMS4xLTQuMi0yYy0xLTAuOC0xLjgtMS45LTIuMi0zLjFjLTAuNC0xLjItMC42LTIuNi0wLjYtNC4xVjQ4DQoJCQljMC0xLjYsMC4yLTMsMC42LTQuMmMwLjQtMS4yLDEuMS0yLjMsMi0zLjFjMS0wLjgsMi4zLTEuNSw0LTEuOWMxLjctMC40LDMuOC0wLjcsNi40LTAuN2gyNy44di0wLjhjMC0yLjQtMC41LTQtMS40LTQuOA0KCQkJYy0xLTAuOC0yLjYtMS4yLTQuOS0xLjJINzMuN3YtNy4zaDMxLjFjMywwLDUuNiwwLjMsNy43LDAuOGMyLjEsMC41LDMuOCwxLjQsNS4yLDIuNWMxLjMsMS4xLDIuMywyLjYsMi45LDQuMw0KCQkJYzAuNiwxLjcsMC45LDMuOCwwLjksNi4ydjkuMWMwLDIuNy0wLjMsNS0wLjgsNi44Yy0wLjUsMS44LTEuNCwzLjQtMi44LDQuNWMtMS4zLDEuMi0zLjEsMi01LjMsMi41Yy0yLjIsMC41LTQuOSwwLjctOC4zLDAuNw0KCQkJTDg0LjEsNjEuNUw4NC4xLDYxLjV6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNTcsNDQuNWgtMjYuNmMtMS4yLDAtMi4xLDAuMy0yLjgsMC44cy0xLDEuNS0xLDN2Mi42YzAsMS4zLDAuNCwyLjMsMS4xLDIuOGMwLjcsMC41LDEuOCwwLjgsMy4xLDAuOGgxOS40DQoJCQljMS4yLDAsMi4yLTAuMSwzLjEtMC4zYzAuOS0wLjIsMS42LTAuNSwyLjEtMWMwLjYtMC41LDEtMS4yLDEuMi0yYzAuMy0wLjksMC40LTIsMC40LTMuNEwyNTcsNDQuNUwyNTcsNDQuNXogTTIyOS45LDYxLjUNCgkJCWMtMi43LDAtNS0wLjItNi43LTAuN2MtMS44LTAuNS0zLjEtMS4xLTQuMi0yYy0xLTAuOC0xLjgtMS45LTIuMi0zLjFzLTAuNi0yLjYtMC42LTQuMVY0OGMwLTEuNiwwLjItMywwLjYtNC4yDQoJCQljMC40LTEuMiwxLjEtMi4zLDItMy4xYzEtMC44LDIuMy0xLjUsNC0xLjljMS43LTAuNCwzLjgtMC43LDYuNC0wLjdoMjcuOHYtMC44YzAtMi40LTAuNS00LTEuNC00LjhjLTEtMC44LTIuNi0xLjItNC45LTEuMmgtMzEuMQ0KCQkJdi03LjNoMzEuMWMzLDAsNS41LDAuMyw3LjYsMC44czMuOCwxLjQsNS4yLDIuNWMxLjMsMS4xLDIuMywyLjYsMi45LDQuM3MwLjksMy44LDAuOSw2LjJ2OS4xYzAsMi43LTAuMyw1LTAuOCw2LjgNCgkJCWMtMC41LDEuOC0xLjUsMy40LTIuOCw0LjVjLTEuMywxLjItMy4xLDItNS4zLDIuNWMtMi4yLDAuNS00LjksMC43LTguMywwLjdMMjI5LjksNjEuNUwyMjkuOSw2MS41eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjExLjMsMzIuNmMtMC42LTIuMS0xLjYtMy44LTIuOS01Yy0xLjQtMS4zLTMuMi0yLjItNS42LTIuOGMtMi4zLTAuNi01LjItMC45LTguOC0wLjloLTEyLjYNCgkJCWMtMy41LDAtNi40LDAuMy04LjcsMC45Yy0xLjYsMC40LTMuMSwxLTQuMiwxLjhjLTEuMi0wLjgtMi42LTEuNC00LjItMS44Yy0yLjMtMC42LTUuMi0wLjktOC44LTAuOUgxNDNjLTMuNSwwLTYuNCwwLjMtOC43LDAuOQ0KCQkJYy0yLjMsMC42LTQuMiwxLjUtNS42LDIuOGMtMS40LDEuMy0yLjQsMy0zLDVjLTAuNiwyLjEtMC45LDQuNi0wLjksNy42djIxLjNoMTAuNHYtMjFjMC0xLjYsMC4xLTIuOSwwLjQtMy44DQoJCQljMC4zLTEsMC43LTEuOCwxLjQtMi40YzAuNi0wLjYsMS41LTEsMi42LTEuMmMxLjEtMC4yLDIuNC0wLjMsNC4xLTAuM0gxNTVjMS43LDAsMywwLjEsNC4xLDAuM2MxLjEsMC4yLDEuOSwwLjYsMi42LDEuMg0KCQkJYzAuNiwwLjYsMS4xLDEuNCwxLjMsMi40YzAuMiwxLDAuNCwyLjMsMC40LDMuOHYyMWgwLjFoMTAuM2gwLjF2LTIxYzAtMS42LDAuMS0yLjksMC40LTMuOGMwLjMtMSwwLjctMS44LDEuNC0yLjRzMS41LTEsMi42LTEuMg0KCQkJYzEuMS0wLjIsMi40LTAuMyw0LjEtMC4zaDExLjJjMS43LDAsMywwLjEsNC4xLDAuM2MxLjEsMC4yLDEuOSwwLjYsMi42LDEuMmMwLjYsMC42LDEuMSwxLjQsMS4zLDIuNGMwLjIsMSwwLjQsMi4zLDAuNCwzLjh2MjENCgkJCWgxMC4zVjQwLjJDMjEyLjIsMzcuMiwyMTEuOSwzNC42LDIxMS4zLDMyLjYiLz4NCgk8L2c+DQoJPGcgY2xhc3M9InN0MSI+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTAuNyw4MC45VjY4LjNoMi4zbDcuMSw5LjlsNy4xLTkuOWgyLjN2MTIuNUgxNjd2LTguM2wtNS45LDguM0gxNTlsLTUuOS04LjN2OC4zSDE1MC43eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTc0LjYsNjguM2gxMC44YzIsMCwzLjQsMS40LDMuNCwzLjR2NS44YzAsMi0xLjQsMy40LTMuNCwzLjRoLTEwLjhjLTIsMC0zLjQtMS40LTMuNC0zLjR2LTUuOA0KCQkJQzE3MS4yLDY5LjgsMTcyLjYsNjguMywxNzQuNiw2OC4zeiBNMTczLjcsNzcuNmMwLDAuOCwwLjQsMS4yLDEuMywxLjJoMTAuMWMwLjgsMCwxLjItMC40LDEuMi0xLjJ2LTZjMC0wLjgtMC40LTEuMi0xLjItMS4yDQoJCQloLTEwLjFjLTAuOCwwLTEuMywwLjQtMS4zLDEuMlY3Ny42eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjMsNjguM2MyLDAsMy40LDEuNCwzLjQsMy40djAuNmMwLDAuOC0wLjIsMS41LTAuNiwyLjFjMC43LDAuNiwxLjEsMS41LDEuMSwyLjZsMCwwLjYNCgkJCWMwLDItMS40LDMuNC0zLjQsMy40aC0xMy4zbDAtMTIuNUgyMDMuM3ogTTE5Myw3My42aDEwYzAuOCwwLDEuMy0wLjQsMS4zLTEuMnYtMC43YzAtMC44LTAuNC0xLjItMS4zLTEuMmgtMTBWNzMuNnogTTE5Myw3NS42DQoJCQl2My4yaDEwLjVjMC44LDAsMS4zLTAuNCwxLjMtMS4ydi0wLjhjMC0wLjgtMC40LTEuMi0xLjMtMS4ySDE5M3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxMS4yLDY4LjN2MTIuNWgtMi41VjY4LjNIMjExLjJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMTUuNCw2OC4zdjEwLjVoMTIuMnYySDIxM1Y2OC4zSDIxNS40eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjMxLjksNjguM3YxMi41aC0yLjVWNjguM0gyMzEuOXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0OS43LDY4LjN2MmgtNy4xdjEwLjVoLTIuNVY3MC40aC03LjF2LTJIMjQ5Ljd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDkuNSw2OC4zaDMuNGw1LjQsNWw1LjQtNWgzLjRsLTcuNiw3LjF2NS41aC0yLjV2LTUuNUwyNDkuNSw2OC4zeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K">
                                </center>
                                <p><strong>N° pedido asociado:</strong> __________</p>
                            </div>
                            <h1>ACTA ENTREGA / RECEPCIÓN DE VEHÍCULOS N°: __________</h1>
                            <table>
                                <tr>
                                    <td class="half-width"><strong>Preparado por:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td class="third-width"><strong>Fecha:</strong>${data.DATOS_INSPECCION.fecha_inspeccion}</td>
                                    <td class="third-width"><strong>Hora Recepción:</strong> / <strong>Hora Inspección:</strong>${data.DATOS_INSPECCION.hora_recepcion}</td>
                                </tr>
                                <tr>
                                    <td><strong>Patente:</strong>${data.DATOS_INSPECCION.patente_vehiculo}</td>
                                    <td><strong>Marca:</strong>${data.DATOS_INSPECCION.marca_vehiculo}</td>
                                    <td><strong>Modelo:</strong>${data.DATOS_INSPECCION.modelo_vehiculo}</td>
                                </tr>
                                <tr>
                                    <td><strong>Chasis:</strong>${data.DATOS_INSPECCION.chasis_vehiculo}</td>
                                    <td><strong>Color:</strong>${data.DATOS_INSPECCION.color_vehiculo}</td>
                                    <td><strong>Año:</strong>${data.DATOS_INSPECCION.anio_vehiculo}</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><strong>Cliente:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                </tr>
                                <tr>
                                    <td><strong>Kilometraje:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td><strong>Combustible:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td><strong>Tipo de Servicio:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                </tr>
                                <tr>
                                    <td><strong>Nombre Chofer:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td><strong>Celular:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td><strong>Mail:</strong>${data.DATOS_INSPECCION.preparado_por}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="full-width"><strong>Observaciones:</strong>${data.DATOS_INSPECCION.observaciones_inspeccion}</td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th colspan="2">POR GAMALEASING SPA</th>
                                    <th colspan="2">USUARIO CLIENTE</th>
                                </tr>
                                <tr>
                                    <td>NOMBRE:${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td>NOMBRE:${data.DATOS_INSPECCION.preparado_por}</td>
                                </tr>
                                <tr>
                                    <td>RUT:${data.DATOS_INSPECCION.preparado_por}</td>
                                    <td>RUT:${data.DATOS_INSPECCION.preparado_por}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="articulos">
 
                            <Table border="1" cellPadding="2">
                                <thead>
                                    <tr>
                                        <th>Nombre del Artículo</th>
                                        <th>Existe</th>
                                        <th>Estado</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody class="page-break">
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
                        </div>
                        <div class="firma page-break">
                            <div>
                                <div class="">FIRMA CLIENTE :</div>
                                <br>
                                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI4MCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4MCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMyRDJEMkQ7fQ0KCS5zdDF7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NC43LDM0LjFMNjQuNywzNC4xbC0xNC43LDB2OC44aDZ2MS45YzAsMS42LTAuMSwzLTAuNCw0Yy0wLjMsMS0wLjcsMS44LTEuMywyLjRjLTAuNiwwLjYtMS40LDAuOS0yLjQsMS4yDQoJCQljLTEsMC4yLTIuMiwwLjMtMy43LDAuM0gzMC44Yy0xLjUsMC0yLjctMC4xLTMuOC0wLjNjLTEtMC4yLTEuOC0wLjYtMi40LTEuMXMtMS0xLjMtMS4zLTIuM2MtMC4yLTEtMC40LTIuMi0wLjQtMy44di0xNA0KCQkJYzAtMS40LDAuMS0yLjYsMC40LTMuNWMwLjItMSwwLjctMS43LDEuMi0yLjNjMC42LTAuNiwxLjQtMSwyLjQtMS4yYzEtMC4yLDIuMy0wLjQsMy44LTAuNGgzNC41di04LjlIMzAuMw0KCQkJYy0zLjQsMC02LjIsMC4zLTguNSwwLjljLTIuMywwLjYtNC4xLDEuNS01LjQsMi43Yy0xLjQsMS4yLTIuMywyLjktMi45LDQuOWMtMC42LDItMC45LDQuNS0wLjksNy40djE0LjljMCwyLjksMC4zLDUuNCwwLjksNy40DQoJCQljMC42LDIsMS41LDMuNiwyLjksNC45YzEuNCwxLjIsMy4yLDIuMiw1LjQsMi43YzIuMiwwLjYsNS4xLDAuOCw4LjUsMC44aDE4LjJjMy40LDAsNi4zLTAuMyw4LjYtMC44YzIuMy0wLjYsNC4xLTEuNSw1LjUtMi43DQoJCQljMS4zLTEuMiwyLjMtMi45LDIuOS00LjljMC42LTIsMC44LTQuNSwwLjgtNy40VjM0LjFINjQuN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExMS4xLDQ0LjVIODQuNWMtMS4yLDAtMi4yLDAuMy0yLjgsMC44Yy0wLjcsMC41LTEsMS41LTEsM3YyLjZjMCwxLjMsMC40LDIuMywxLjEsMi44DQoJCQljMC43LDAuNSwxLjgsMC44LDMuMSwwLjhoMTkuM2MxLjIsMCwyLjItMC4xLDMuMS0wLjNjMC45LTAuMiwxLjYtMC41LDIuMS0xYzAuNi0wLjUsMS0xLjIsMS4yLTJjMC4zLTAuOSwwLjQtMiwwLjQtMy40VjQ0LjV6DQoJCQkgTTg0LjEsNjEuNWMtMi43LDAtNS0wLjItNi43LTAuN2MtMS44LTAuNS0zLjItMS4xLTQuMi0yYy0xLTAuOC0xLjgtMS45LTIuMi0zLjFjLTAuNC0xLjItMC42LTIuNi0wLjYtNC4xVjQ4DQoJCQljMC0xLjYsMC4yLTMsMC42LTQuMmMwLjQtMS4yLDEuMS0yLjMsMi0zLjFjMS0wLjgsMi4zLTEuNSw0LTEuOWMxLjctMC40LDMuOC0wLjcsNi40LTAuN2gyNy44di0wLjhjMC0yLjQtMC41LTQtMS40LTQuOA0KCQkJYy0xLTAuOC0yLjYtMS4yLTQuOS0xLjJINzMuN3YtNy4zaDMxLjFjMywwLDUuNiwwLjMsNy43LDAuOGMyLjEsMC41LDMuOCwxLjQsNS4yLDIuNWMxLjMsMS4xLDIuMywyLjYsMi45LDQuMw0KCQkJYzAuNiwxLjcsMC45LDMuOCwwLjksNi4ydjkuMWMwLDIuNy0wLjMsNS0wLjgsNi44Yy0wLjUsMS44LTEuNCwzLjQtMi44LDQuNWMtMS4zLDEuMi0zLjEsMi01LjMsMi41Yy0yLjIsMC41LTQuOSwwLjctOC4zLDAuNw0KCQkJTDg0LjEsNjEuNUw4NC4xLDYxLjV6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNTcsNDQuNWgtMjYuNmMtMS4yLDAtMi4xLDAuMy0yLjgsMC44cy0xLDEuNS0xLDN2Mi42YzAsMS4zLDAuNCwyLjMsMS4xLDIuOGMwLjcsMC41LDEuOCwwLjgsMy4xLDAuOGgxOS40DQoJCQljMS4yLDAsMi4yLTAuMSwzLjEtMC4zYzAuOS0wLjIsMS42LTAuNSwyLjEtMWMwLjYtMC41LDEtMS4yLDEuMi0yYzAuMy0wLjksMC40LTIsMC40LTMuNEwyNTcsNDQuNUwyNTcsNDQuNXogTTIyOS45LDYxLjUNCgkJCWMtMi43LDAtNS0wLjItNi43LTAuN2MtMS44LTAuNS0zLjEtMS4xLTQuMi0yYy0xLTAuOC0xLjgtMS45LTIuMi0zLjFzLTAuNi0yLjYtMC42LTQuMVY0OGMwLTEuNiwwLjItMywwLjYtNC4yDQoJCQljMC40LTEuMiwxLjEtMi4zLDItMy4xYzEtMC44LDIuMy0xLjUsNC0xLjljMS43LTAuNCwzLjgtMC43LDYuNC0wLjdoMjcuOHYtMC44YzAtMi40LTAuNS00LTEuNC00LjhjLTEtMC44LTIuNi0xLjItNC45LTEuMmgtMzEuMQ0KCQkJdi03LjNoMzEuMWMzLDAsNS41LDAuMyw3LjYsMC44czMuOCwxLjQsNS4yLDIuNWMxLjMsMS4xLDIuMywyLjYsMi45LDQuM3MwLjksMy44LDAuOSw2LjJ2OS4xYzAsMi43LTAuMyw1LTAuOCw2LjgNCgkJCWMtMC41LDEuOC0xLjUsMy40LTIuOCw0LjVjLTEuMywxLjItMy4xLDItNS4zLDIuNWMtMi4yLDAuNS00LjksMC43LTguMywwLjdMMjI5LjksNjEuNUwyMjkuOSw2MS41eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjExLjMsMzIuNmMtMC42LTIuMS0xLjYtMy44LTIuOS01Yy0xLjQtMS4zLTMuMi0yLjItNS42LTIuOGMtMi4zLTAuNi01LjItMC45LTguOC0wLjloLTEyLjYNCgkJCWMtMy41LDAtNi40LDAuMy04LjcsMC45Yy0xLjYsMC40LTMuMSwxLTQuMiwxLjhjLTEuMi0wLjgtMi42LTEuNC00LjItMS44Yy0yLjMtMC42LTUuMi0wLjktOC44LTAuOUgxNDNjLTMuNSwwLTYuNCwwLjMtOC43LDAuOQ0KCQkJYy0yLjMsMC42LTQuMiwxLjUtNS42LDIuOGMtMS40LDEuMy0yLjQsMy0zLDVjLTAuNiwyLjEtMC45LDQuNi0wLjksNy42djIxLjNoMTAuNHYtMjFjMC0xLjYsMC4xLTIuOSwwLjQtMy44DQoJCQljMC4zLTEsMC43LTEuOCwxLjQtMi40YzAuNi0wLjYsMS41LTEsMi42LTEuMmMxLjEtMC4yLDIuNC0wLjMsNC4xLTAuM0gxNTVjMS43LDAsMywwLjEsNC4xLDAuM2MxLjEsMC4yLDEuOSwwLjYsMi42LDEuMg0KCQkJYzAuNiwwLjYsMS4xLDEuNCwxLjMsMi40YzAuMiwxLDAuNCwyLjMsMC40LDMuOHYyMWgwLjFoMTAuM2gwLjF2LTIxYzAtMS42LDAuMS0yLjksMC40LTMuOGMwLjMtMSwwLjctMS44LDEuNC0yLjRzMS41LTEsMi42LTEuMg0KCQkJYzEuMS0wLjIsMi40LTAuMyw0LjEtMC4zaDExLjJjMS43LDAsMywwLjEsNC4xLDAuM2MxLjEsMC4yLDEuOSwwLjYsMi42LDEuMmMwLjYsMC42LDEuMSwxLjQsMS4zLDIuNGMwLjIsMSwwLjQsMi4zLDAuNCwzLjh2MjENCgkJCWgxMC4zVjQwLjJDMjEyLjIsMzcuMiwyMTEuOSwzNC42LDIxMS4zLDMyLjYiLz4NCgk8L2c+DQoJPGcgY2xhc3M9InN0MSI+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTAuNyw4MC45VjY4LjNoMi4zbDcuMSw5LjlsNy4xLTkuOWgyLjN2MTIuNUgxNjd2LTguM2wtNS45LDguM0gxNTlsLTUuOS04LjN2OC4zSDE1MC43eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTc0LjYsNjguM2gxMC44YzIsMCwzLjQsMS40LDMuNCwzLjR2NS44YzAsMi0xLjQsMy40LTMuNCwzLjRoLTEwLjhjLTIsMC0zLjQtMS40LTMuNC0zLjR2LTUuOA0KCQkJQzE3MS4yLDY5LjgsMTcyLjYsNjguMywxNzQuNiw2OC4zeiBNMTczLjcsNzcuNmMwLDAuOCwwLjQsMS4yLDEuMywxLjJoMTAuMWMwLjgsMCwxLjItMC40LDEuMi0xLjJ2LTZjMC0wLjgtMC40LTEuMi0xLjItMS4yDQoJCQloLTEwLjFjLTAuOCwwLTEuMywwLjQtMS4zLDEuMlY3Ny42eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjMsNjguM2MyLDAsMy40LDEuNCwzLjQsMy40djAuNmMwLDAuOC0wLjIsMS41LTAuNiwyLjFjMC43LDAuNiwxLjEsMS41LDEuMSwyLjZsMCwwLjYNCgkJCWMwLDItMS40LDMuNC0zLjQsMy40aC0xMy4zbDAtMTIuNUgyMDMuM3ogTTE5Myw3My42aDEwYzAuOCwwLDEuMy0wLjQsMS4zLTEuMnYtMC43YzAtMC44LTAuNC0xLjItMS4zLTEuMmgtMTBWNzMuNnogTTE5Myw3NS42DQoJCQl2My4yaDEwLjVjMC44LDAsMS4zLTAuNCwxLjMtMS4ydi0wLjhjMC0wLjgtMC40LTEuMi0xLjMtMS4ySDE5M3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxMS4yLDY4LjN2MTIuNWgtMi41VjY4LjNIMjExLjJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMTUuNCw2OC4zdjEwLjVoMTIuMnYySDIxM1Y2OC4zSDIxNS40eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjMxLjksNjguM3YxMi41aC0yLjVWNjguM0gyMzEuOXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0OS43LDY4LjN2MmgtNy4xdjEwLjVoLTIuNVY3MC40aC03LjF2LTJIMjQ5Ljd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDkuNSw2OC4zaDMuNGw1LjQsNWw1LjQtNWgzLjRsLTcuNiw3LjF2NS41aC0yLjV2LTUuNUwyNDkuNSw2OC4zeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K">
                                
                            </div>
                            <div class="coberturaSeguro">
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
                        </div>
                        <div class="imagenes">
                            
                                ${data.FOTOS_INSPECCION.map(
                                  (imagen) => `
 
                                <div class="page-break";>
                                <div>${imagen.nombre_foto}</div>
 
                                <img align='center' src="${
                                  ("data:image/png;base64,", imagen.$content)
                                }" padding: 4em;>
 
                                <div>Comentario :</div>
 
                                <div padding: 4em;>${
                                  imagen.comentario_foto
                                }</div>
                                </div>
                                `
                                ).join("")}
                        </div>                       
                    </div>
                </div>
 
        </section>
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
