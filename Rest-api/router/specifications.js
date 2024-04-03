const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { specificationController } = require('../controllers');

router.get('/:specificationId', specificationController.getSpecificationByIdAsc);

router.post('/:generationId/add-specification', auth(), specificationController.createSpecificationAsc);

router.get('/:specificationId/edit', auth(), specificationController.getSpecificationForEditAsc);

router.put('/:specificationId/edit', auth(), specificationController.editSpecificationAsc);

router.delete('/:specificationId', auth(), specificationController.deleteSpecificationAsc);

module.exports = router