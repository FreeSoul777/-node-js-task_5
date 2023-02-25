const express = require('express');

const ToDoController = require('./src/controllers/ToDoController');

const router = express.Router();

router.get('/cards', ToDoController.index);
router.get('/cards/:card_id', ToDoController.index_id);
router.post('/cards/add', ToDoController.store);
router.post('/cards/data', ToDoController.store_all);
router.put('/cards/update/:card_id', ToDoController.update);
router.delete('/cards/delete/:card_id', ToDoController.delete_id);
router.delete('/cards/delete/', ToDoController.delete);

module.exports = router;