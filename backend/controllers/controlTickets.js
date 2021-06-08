const connection = require('../config/connection');

function listar(req, res) {
    if(connection) {
        let sql = "SELECT * FROM Tickets";
        connection.query(sql, (err, tickets) => {
            if(err) {
                res.json(err);
            } else {
                console.log(tickets);
                res.json(tickets);
            }
        });
    }
}

function crear(req, res){
    if(connection){
        console.log(req.body);
        const ticket = req.body;

        if(!ticket.ticketNom){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(ticket.ticketNom.length > 50){
            return res.status(400).send({error: true, mensaje: "A excedido el numero de caracteres"});
        }

        if(!ticket.ticketPrioridad){
            return res.status(400).send({error: true, mensaje: "Debes seleccionar una prioridad"});
        }

        if(!ticket.ticketEsta){
            return res.status(400).send({error: true, mensaje: "El estatus es obligatorio"});
        }

        let sql = "INSERT INTO Tickets set ?";

        connection.query(sql, [ticket], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Ticket creado con exito."});
            }
        })
    }
}

function obtenerTicket(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM Tickets WHERE ticketID = ${connection.escape(id)}`;
        connection.query(sql, (err, ticket) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(ticket === undefined || ticket.length == 0)
                mensaje1 = "Ticket no encontrada";

                res.json({data: ticket[0], mensaje: mensaje1});
            }
        })
    }

}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const ticket = req.body;

        let sql = "UPDATE Tickets set ? WHERE ticketID = ?";

        connection.query(sql, [ticket, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Ticket actualizada con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )
    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM Tickets WHERE ticketID = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Ticket no encontrado";
                } else {
                    mensaje = "Ticket elimino con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerTicket,
    crear,
    editar,
    eliminar
}