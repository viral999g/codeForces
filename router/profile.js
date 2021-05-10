const express = require('express');

const authController = require('../controller/auth');
const problemController = require('../controller/problems');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', isAuth.isAuth, problemController.getUsers)
router.get('/profile/:handle', isAuth.isAuth, problemController.getProfileInfo)
router.get('/problemsets', isAuth.isAuth, problemController.getProblemSet)
router.get('/problems/:problemType', isAuth.isAuth, problemController.getProblems)
router.get('/solutions/contestId/:contestId/index/:index', isAuth.isAuth, problemController.getSolutions)

router.get('/myProfile', isAuth.isAuth, (req, res, next) => {
    var handle = req.user.handle
    res.redirect(`/profile/${handle}`)
})

module.exports = router;