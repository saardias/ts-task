var express = require('express');
var router = express.Router();
import { pagination } from '../../../middlewares/pagination';
import * as searchValidator from '../../../validators/search.validator';
import * as searchServices from '../../../services/search.service';

router.get('/', pagination, searchValidator.validateSearchRequest, searchServices.getSearchResults)
router.post('/records', pagination, searchValidator.validateRecordSearchRequest, searchServices.getRecordSearchResults)
router.get('/records', searchServices.getHistory)

module.exports = router;