const { generationModel, specificationModel } = require("../models");

function getSpecificationByIdAsc(req, res, next) {

    specificationModel.findById(req.params.specificationId)
        .populate({
            path : 'generation',
            populate : {
                path : 'model',
                populate : {
                    path : 'brand'
                }
            }
        })
        .then(specification => {
            res.status(200).json(specification)
        })
        .catch(next);
}

function createSpecificationAsc(req, res, next){
    const { name, imageUrl, weight, power, torque, engineType, transmission } = req.body;
    const { _id: userId } = req.user;
    const generation = req.params.generationId;

    specificationModel.create({name, imageUrl, weight, power, torque, engineType, transmission, userId, generation})
    .then((specification) => 
        generationModel.findByIdAndUpdate(generation, {$push: {specifications: specification._id}})
        .then((updatedSpecification) => res.status(200).json(updatedSpecification)))
    .catch(next);
}

function getSpecificationForEditAsc(req, res, next){
    specificationModel.findById(req.params.specificationId)        
    .then(specification => {
        res.status(200).json(specification)
    })
    .catch(next);
}

function editSpecificationAsc(req, res, next){
    const { name, imageUrl, weight, power, torque, engineType, transmission } = req.body;
    const { _id: userId } = req.user;

    specificationModel.findByIdAndUpdate({_id: req.params.specificationId}, {name, imageUrl, userId, weight, power, torque, engineType, transmission})
        .then((specification) => res.status(200).json(specification))
        .catch(next);
}

function deleteSpecificationAsc(req, res, next){
    const id = req.params.specificationId;

    Promise.all([
        specificationModel.findByIdAndDelete(id),
        generationModel.findOneAndUpdate({specifications: id}, {$pull: {specifications: id}})
    ])        
        .then((specification) => res.status(200).json(specification))
        .catch(next);
}

module.exports = {
    createSpecificationAsc,
    deleteSpecificationAsc,
    getSpecificationForEditAsc,
    editSpecificationAsc,
    getSpecificationByIdAsc
}