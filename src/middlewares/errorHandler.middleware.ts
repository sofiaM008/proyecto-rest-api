import type { ErrorRequestHandler } from 'express';
import { DomainError } from '../errors/domain.error';
const status = { VALIDATION_ERROR: 400, NOT_FOUND: 404, CONFLICT: 409 };
export const globalErrorHandler: ErrorRequestHandler = (err: unknown, _req, res, next) => {
  if (res.headersSent) { next(err); return; }
  if (err instanceof DomainError) {
    res.status(status[err.code]).json({ success: false, code: err.code, error: err.message }); return;
  }
  if (typeof err === 'object' && err !== null && 'type' in err && err.type === 'entity.parse.failed') {
    res.status(400).json({ success: false, error: 'El cuerpo JSON está malformado.' }); return;
  }
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor en ControlLabs',
    timestamp: new Date().toISOString() });
};
