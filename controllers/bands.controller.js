const { selectBandById, selectAllBands } = require("../models/bands.models");

exports.getBandById = (req, res, next) => {
    const { id } = req.params;

    selectBandById(id).then((band) => {
        res.status(200).send({ band });
    });
};

exports.getAllBands = (req, res, next) => {
    const { genre } = req.query;
    selectAllBands(genre).then((bands) => {
        res.status(200).send({ bands });
    });
};
