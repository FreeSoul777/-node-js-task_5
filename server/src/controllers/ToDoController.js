const { sequelize } = require('../models/ToDo');
const ToDo = require('../models/ToDo');

module.exports = {

    async index(req, res) {
        const cards = await ToDo.findAll();
        if (cards == "" || cards == null) {
            return res.status(200).send(cards);
        }
        return res.status(200).send(cards);
    },

    async index_id(req, res) {
        const { card_id } = req.params;

        const card = await ToDo.findOne({ where: { id: card_id } });
        if(card == "" || card == null) {
            return res.status(200).send({ message: "No registered card" });
        }
        return res.status(200).send(card);
    },

    async store(req, res) {

        const { id, title, description, isDone } = req.body;

        const card = await ToDo.create({ id, title, description, isDone });

        return res.status(200).send({
            status: 1,
            message: 'Card added successfully.',
            card
        });

    },

    async store_all(req, res) {

        await ToDo.bulkCreate(req.body, { validate: true });
        const cards = await ToDo.findAll();

        return res.status(200).send({
            status: 1,
            message: 'Cards added successfully.',
            cards
        });

    },

    async update(req, res) {

        const { title, description, isDone } = req.body;

        const { card_id } = req.params;

        await ToDo.update({
            title, description, isDone
        }, {
            where: {
                id: card_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "The card has been successfully updated!",
        });

    },

    async delete_id(req, res) {

        const { card_id } = req.params;

        await ToDo.destroy({
            where: {
                id: card_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Card successfully deleted!",
        });

    },

    async delete(req, res) {

        await ToDo.destroy({
            truncate: true
        });

        return res.status(200).send({
            status: 1,
            message: "All cards successfully deleted!",
        });

    }
};