const loanService = require('../services/LoanService');

const obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await loanService.obtenerPrestamos();

    res.status(200).json({
      status: 'success',
      data: prestamos
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los préstamos'
    });
  }
};

const crearPrestamo = async (req, res) => {
  try {
    const nuevoPrestamo = await loanService.crearPrestamo(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Préstamo registrado correctamente',
      data: nuevoPrestamo
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Error al registrar el préstamo'
    });
  }
};

const aceptarPrestamo = async (req, res) => {
  try {
    const prestamo = await loanService.aceptarPrestamo(req.params.id);

    if (!prestamo) {
      return res.status(404).json({
        status: 'error',
        message: 'Préstamo no encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Préstamo aceptado correctamente',
      data: prestamo
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Error al aceptar el préstamo'
    });
  }
};

module.exports = {
  obtenerPrestamos,
  crearPrestamo,
  aceptarPrestamo
};