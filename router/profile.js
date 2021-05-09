const express = require('express');

const authController = require('../controller/auth');
const problemController = require('../controller/problems');

const router = express.Router();

router.get('/', problemController.getUsers)
router.get('/profile/:handle', problemController.getProfileInfo)
router.get('/problemsets', problemController.getProblemSet)
router.get('/problems/:problemType', problemController.getProblems)
router.get('/solutions/contestId/:contestId/index/:index', problemController.getSolutions)

module.exports = router;