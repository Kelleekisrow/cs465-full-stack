const mongoose = require('mongoose');
const Model = mongoose.model('trips');
const Trip = require('../models/travlr');


const tripsList = async(req, res) => {
    const q = await Model
        .find({})
        .exec();

        console.log(q);

    if (!q) 
    {
        return res
            .status(404)
            .json(err);
    }
    else {
        return res
            .status(200)
            .json(q);
    }
};
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode})
        .exec();

        console.log(q);

    if (!q) {
        return res
                .status(404)
                .json(err);
            }
    else {
        return res
                .status(200)
                .json(q);
        }
    };
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();
        console.log(q);
        if (!q) {
            return res
                .status(400)
                .json(err);
            }
    else {
        return res
                .status(201)
                .json(q);
        }
};
const tripsUpdateTrip = async(req, res) => {
    console.log(req.params);
    console.log(req.body);

    

    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
    })
    .exec();
    console.log(q);

    if (!q) {
        return res
            .status(400)
            .json(err);
    }else {
        return res
            .status(201)
            .json(q);
        }

};



        

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};