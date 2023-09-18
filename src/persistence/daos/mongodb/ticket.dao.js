import { TicketModel } from "./models/ticket.model.js";

export default class TicketMongoDB {
    async create(obj) {
        try {
            const ticket = await TicketModel.create(obj)
            return ticket
        } catch (error) {
            console.log(error);
        }
    }
}