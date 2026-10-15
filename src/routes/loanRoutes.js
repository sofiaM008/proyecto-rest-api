const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.get('/history', loanController.obtenerHistorial);
router.get('/', loanController.obtenerPrestamos);
router.post('/', loanController.crearPrestamo);
router.put('/:id/accept', loanController.aceptarPrestamo);

module.exports = router;
