import * as service from "../services/ticket.service.js"

export const generateTicket = async(req, res, next) => {
    try {
        const _id = req.session.passport?.user;
        const ticket = await service.generateTicket(_id)
        if(!ticket) res.status(404).json({msg: "Error generating ticket"})
        res.status(200).json(ticket)
    } catch (error) {
        next(error.message)
    }
}