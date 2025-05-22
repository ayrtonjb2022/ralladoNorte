import PDFDocument from 'pdfkit';
import Movimiento from "../models/movimientoModel.js";
import { Op } from "sequelize";

export const generarReportePDF = async (req, res) => {
  const { fechaInicio, tipo } = req.body;
  const userId = req.user.id;

  if (!fechaInicio || !tipo) {
    return res.status(400).json({ mensaje: 'Fecha y tipo son requeridos' });
  }

  try {
    const movimientos = await Movimiento.findAll({
      where: {
        usuario_id: userId,
        tipo: tipo,
        fecha: {
          [Op.gte]: new Date(fechaInicio),
        },
      },
      order: [['fecha', 'ASC']],
    });

    // Crear documento PDF
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
    doc.pipe(res);

    // Título
    doc
      .fontSize(20)
      .fillColor('#333333')
      .text('Reporte de Movimientos', { align: 'center' })
      .moveDown();

    // Subtítulo
    doc
      .fontSize(12)
      .fillColor('#666666')
      .text(`Tipo: ${tipo}`, { align: 'left' })
      .text(`Desde: ${new Date(fechaInicio).toLocaleDateString()}`, { align: 'left' })
      .moveDown();

    // Encabezado de tabla ajustado
    doc
      .fontSize(10)
      .fillColor('#000000')
      .text('Fecha', 50, doc.y, { continued: true })
      .text('Descripción', 120, doc.y, { continued: true })
      .text('Categoría', 300, doc.y, { continued: true })
      .text('Monto', 400, doc.y)
      .moveDown(0.2);

    // Línea separadora
    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#000000')
      .lineWidth(1)
      .stroke()
      .moveDown(0.5);

    // Datos ajustados
    movimientos.forEach((mov) => {
      const monto = parseFloat(mov.monto);
      const fecha = new Date(mov.fecha).toLocaleDateString();

      doc
        .fontSize(9)
        .fillColor('#000000')
        .text(fecha, 50, doc.y, { continued: true })
        .text(mov.descripcion.slice(0, 30), 120, doc.y, { continued: true }) // Máx 30 caracteres
        .text(mov.categoria, 300, doc.y, { continued: true })
        .text(`$${!isNaN(monto) ? monto.toFixed(2) : '0.00'}`, 400, doc.y)
        .moveDown(0.2);

      // Línea separadora fina
      doc
        .moveTo(50, doc.y + 2)
        .lineTo(550, doc.y + 2)
        .strokeColor('#e0e0e0')
        .lineWidth(0.4)
        .stroke()
        .moveDown(0.2);
    });

    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};
