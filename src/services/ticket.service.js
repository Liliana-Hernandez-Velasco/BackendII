import { TicketModel } from '../models/ticket.model.js';
import crypto from 'crypto';

export default class TicketService {
  async createTicket(amount, purchaser) {
    const code = crypto.randomBytes(8).toString('hex');
    return await TicketModel.create({
      code,
      amount,
      purchaser
    });
  }
}