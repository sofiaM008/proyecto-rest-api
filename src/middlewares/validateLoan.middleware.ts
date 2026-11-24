import type { RequestHandler } from 'express';
const isUuid = (v: unknown): boolean => typeof v === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
export const validateLoanPayload: RequestHandler = (req, res, next) => {
  const body: unknown = req.body;
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    res.status(400).json({ success: false, error: 'Datos del préstamo inválidos.' }); return;
  }
  const loan = body as Record<string, unknown>;
  const allowed = new Set(['roomId', 'instructorId', 'guardaId', 'numeroPc']);
  if (!Object.keys(loan).every(k => allowed.has(k)) ||
      !isUuid(loan.roomId) || !isUuid(loan.instructorId) || !isUuid(loan.guardaId) ||
      typeof loan.numeroPc !== 'number' || !Number.isSafeInteger(loan.numeroPc)) {
    res.status(400).json({ success: false, error: 'Datos del préstamo inválidos.' }); return;
  }
  next();
};
