const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { brandController } = require('../controllers');


router.get('/', brandController.getBrandsAsc);

router.post('/', auth(), brandController.createBrandAsc);

router.get('/:brandId', brandController.getModelsByBrandIdAsc);

router.delete('/:brandId', auth(), brandController.deleteBrandAsc);

router.get('/:brandId/edit', auth(), brandController.getBrandsForEditAsc);

router.put('/:brandId/edit', auth(), brandController.editBrandAsc);

module.exports = router