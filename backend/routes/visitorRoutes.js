const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.post('/visitors', visitorController.addVisitor);
router.get('/visitors', visitorController.getVisitors);
router.put('/visitors/approve/:id', visitorController.approveVisitor);
router.get('/approved-visitors', visitorController.getApprovedVisitors);
router.get('/visitors/manager/:userId', visitorController.getVisitorsByManager);
router.get('/visitors/approved-visitors/:userId', visitorController.getApprovedVisitorsByManager);

module.exports = router;
