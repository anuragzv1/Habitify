const Habit = require('../models/habit');

module.exports.createhabit = async function (req, res) {
    console.log(req.body);
    
    try {
        let newhabit = await Habit.create(req.body);
        res.status(200).send({
            status: 'success',
            data: newhabit
        });
    }
    catch (err) {
        console.log(err);
        return res.status(200).send({ "status": "error", message: "Cannot create Habit" });
    }
}