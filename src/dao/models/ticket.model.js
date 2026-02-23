import mongoose from 'mongoose';
import crypto from 'crypto';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    default: () => crypto.randomUUID()
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

export const TicketModel = mongoose.model('Tickets', ticketSchema);