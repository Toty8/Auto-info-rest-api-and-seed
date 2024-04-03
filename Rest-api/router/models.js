const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { modelController } = require('../controllers');

router.get('/:modelId', modelController.getGenerationsByModelIdAsc);

router.post('/:brandId/add-model', auth(), modelController.createModelAsc);

router.get('/:modelId/edit', auth(), modelController.getModelForEditAsc);

router.put('/:modelId/edit', auth(), modelController.editModelAsc);

router.delete('/:modelId', auth(), modelController.deleteModelAsc);

module.exports = router