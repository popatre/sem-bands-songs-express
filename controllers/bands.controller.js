const { selectBandById } = require("../models/bands.models");

exports.getBandById = (req, res) => {
    const { id } = req.params;

    selectBandById(id).then((band) => {
        res.status(200).send({ band });
    });
};
