const pool = require('../config/database');

const obtenerPrestamos = async () => {
  const resultado = await pool.query(`
    SELECT *
    FROM loans
    ORDER BY id ASC
  `);

  return resultado.rows;
};

const crearPrestamo = async (datos) => {
  const resultado = await pool.query(
    `
    INSERT INTO loans (
      aula,
      numero_pc,
      mouse,
      teclados,
      cargador,
      numero_tvs,
      control_tv,
      instructor_recibe,
      telefono,
      nombre_guarda_entrega
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
    [
      datos.aula,
      datos.numeroPC,
      datos.mouse,
      datos.teclados,
      datos.teclados,
      datos.cargador,
      datos.numeroTVs,
      datos.controlTV,
      datos.instructorRecibe,
      datos.telefono,
      datos.nombreGuardaEntrega
    ]
  );

  return resultado.rows[0];
};

const aceptarPrestamo = async (id) => {
  const resultado = await pool.query(
    `
    UPDATE loans
    SET estado = 'APROBADO_Y_FIRMADO'
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return resultado.rows[0];
};

const obtenerHistorial = async (filtros) => {
  let consulta = `
    SELECT *
    FROM loans
    WHERE 1 = 1
  `;

  const valores = [];

  if (filtros.room) {
    valores.push(filtros.room);
    consulta += ` AND aula = $${valores.length}`;
  }

  if (filtros.startDate) {
    valores.push(filtros.startDate);
    consulta += ` AND fecha_hora_recibido >= $${valores.length}`;
  }

  if (filtros.endDate) {
    valores.push(filtros.endDate);
    consulta += ` AND fecha_hora_recibido <= $${valores.length}`;
  }

  consulta += ` ORDER BY fecha_hora_recibido DESC`;

  const resultado = await pool.query(consulta, valores);

  return resultado.rows;
};

module.exports = {
  obtenerPrestamos,
  crearPrestamo,
  aceptarPrestamo
};  




