const { generationModel, modelModel, specificationModel } = require("../models");

function getSpecificationsByGenerationIdAsc(req, res, next) {

    generationModel.findById(req.params.generationId)
        .populate({
            path : 'specifications',
            populate : {
                path : 'userId'
            },
            options: {sort: {'power': -1}}
        })
        .populate({
            path : 'model',
            populate : {
                path : 'brand'
            }
        })
        .then(specifications => {
            res.status(200).json(specifications)
        })
        .catch(next);
}

function createGenerationAsc(req, res, next){
    const { name, imageUrl, yearStarted, yearAborted } = req.body;
    const { _id: userId } = req.user;
    const model = req.params.modelId;

    generationModel.create({name, imageUrl, yearStarted, yearAborted, userId, model, specifications: []})
    .then((generation) => 
        modelModel.findByIdAndUpdate(model, {$push: {generations: generation._id}})
        .then((updatedGeneration) => res.status(200).json(updatedGeneration)))
    .catch(next);
}

function deleteGenerationAsc(req, res, next){
    const id = req.params.generationId;

    Promise.all([
        generationModel.findByIdAndDelete(id),
        modelModel.findOneAndUpdate({generations: id}, {$pull: {generations: id}}),
        specificationModel.deleteMany({generation: id}),
    ])        
        .then((generation) => res.status(200).json(generation))
        .catch(next);
}

function getGenerationForEditAsc(req, res, next){
    generationModel.findById(req.params.generationId)        
    .then(generation => {
        res.status(200).json(generation)
    })
    .catch(next);
}

function editGenerationAsc(req, res, next){
    const { name, imageUrl, yearStarted, yearAborted } = req.body;
    const { _id: userId } = req.user;

    generationModel.findByIdAndUpdate({_id: req.params.generationId}, {name, imageUrl, userId, yearStarted, yearAborted})
        .then((generation) => res.status(200).json(generation))
        .catch(next);
}

module.exports = {
    createGenerationAsc,
    deleteGenerationAsc,
    getGenerationForEditAsc,
    editGenerationAsc,
    getSpecificationsByGenerationIdAsc
}