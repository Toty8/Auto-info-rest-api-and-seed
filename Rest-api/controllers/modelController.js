const { modelModel, brandModel, generationModel } = require("../models");


function getGenerationsByModelIdAsc(req, res, next) {

    modelModel.findById(req.params.modelId)
        .populate({
            path : 'generations',
            populate : {
                path : 'userId'
            },
            options: {sort: {'yearStarted': -1}}
        })
        .populate('brand')
        .then(generations => {
            res.status(200).json(generations)
        })
        .catch(next);
}

function createModelAsc(req, res, next){
    const { name, imageUrl } = req.body;
    const { _id: userId } = req.user;
    const brand = req.params.brandId;

    modelModel.create({name, imageUrl, userId, brand, generations: []})
    .then((model) => 
        brandModel.findByIdAndUpdate(brand, {$push: {models: model._id}})
        .then((updatedModel) => res.status(200).json(updatedModel)))
    .catch(next);

}

function deleteModelAsc(req, res, next){
    const id = req.params.modelId;

    Promise.all([
        modelModel.findByIdAndDelete(id),
        brandModel.findOneAndUpdate({models: id}, {$pull: {models: id}}),
        generationModel.deleteMany({model: id}),
    ])        
        .then((model) => res.status(200).json(model))
        .catch(next);
}

function getModelForEditAsc(req, res, next){
    modelModel.findById(req.params.modelId)        
    .then(model => {
        res.status(200).json(model)
    })
    .catch(next);
}

function editModelAsc(req, res, next){
    const { name, imageUrl } = req.body;
    const { _id: userId } = req.user;

    modelModel.findByIdAndUpdate({_id: req.params.modelId}, {name, imageUrl, userId})
        .then((model) => res.status(200).json(model))
        .catch(next);
}

module.exports = {
    createModelAsc,
    deleteModelAsc,
    getModelForEditAsc,
    editModelAsc,
    getGenerationsByModelIdAsc
}