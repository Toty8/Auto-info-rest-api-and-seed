const { brandModel, modelModel } = require("../models");

function getBrandsAsc(req, res, next) {

    brandModel.find()
        .populate('userId')
        .sort({ name: 1 })
        .then(brands => {
            res.status(200).json(brands)
        })
        .catch(next);
}

function getModelsByBrandIdAsc(req, res, next) {

    brandModel.findById(req.params.brandId)
        .populate({
            path : 'models',
            populate : {
                path : 'userId'
            },
            options: {sort: {'name': 1}}
        })
        .then(models => {
            res.status(200).json(models)
        })
        .catch(next);
}

function getBrandsForEditAsc(req, res, next){
    brandModel.findById(req.params.brandId)        
    .then(brand => {
        res.status(200).json(brand)
    })
    .catch(next);
}

function createBrandAsc(req, res, next){
    const { name, imageUrl } = req.body;
    const { _id: userId } = req.user;

    brandModel.create({name, imageUrl, userId, models: []})
        .then((brand) => res.status(200).json(brand))
        .catch(next);
}

function editBrandAsc(req, res, next){
    const { name, imageUrl } = req.body;
    const { _id: userId } = req.user;

    brandModel.findByIdAndUpdate({_id: req.params.brandId}, {name, imageUrl, userId})
        .then((brand) => res.status(200).json(brand))
        .catch(next);
}

function deleteBrandAsc(req, res, next){
    const id = req.params.brandId;

    Promise.all([
        brandModel.findByIdAndDelete(id),
        modelModel.deleteMany({brand: id})
    ])        
        .then((brand) => res.status(200).json(brand))
        .catch(next);
}

module.exports = {
    getModelsByBrandIdAsc,
    getBrandsAsc,
    createBrandAsc,
    getBrandsForEditAsc,
    editBrandAsc,
    deleteBrandAsc
}