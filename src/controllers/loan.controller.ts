import { RequestHandler } from 'express';
import { loanService } from '../container';
import { DomainError } from '../errors/domain.error';
export class LoanController {
  static createLoan: RequestHandler = async (req, res) => {
    res.status(201).json({ success: true, data: await loanService.createLoan(req.body) });
  };
  static getLoansByFilter: RequestHandler = async (req, res) => {
    const { roomId } = req.query;
    if (roomId !== undefined && typeof roomId !== 'string')
      throw new DomainError('VALIDATION_ERROR', 'El filtro roomId debe ser un texto.');
    res.json({ success: true, data: await loanService.getLoans({ roomId }) });
  };
  static getLoanById: RequestHandler = async (req, res) => {
    res.json({ success: true, data: await loanService.getLoanDetail(Number(req.params.id)) });
  };
  static acceptLoanInventory: RequestHandler = async (req, res) => {
    res.json({ success: true, data: await loanService.acceptLoan(Number(req.params.id)) });
  };
}
