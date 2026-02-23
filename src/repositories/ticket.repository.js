class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = (data) =>
    this.dao.create(data);
}

export default TicketRepository;