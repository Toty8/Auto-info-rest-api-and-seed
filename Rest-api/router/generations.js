const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { generationController } = require('../controllers');

router.get('/:generationId', generationController.getSpecificationsByGenerationIdAsc);

router.post('/:modelId/add-generation', auth(), generationController.createGenerationAsc);

router.get('/:generationId/edit', auth(), generationController.getGenerationForEditAsc);

router.put('/:generationId/edit', auth(), generationController.editGenerationAsc);

router.delete('/:generationId', auth(), generationController.deleteGenerationAsc);

module.exports = router