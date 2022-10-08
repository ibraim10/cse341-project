const express = require('express');

const router = express.Router();
const { ensureGuest, ensureAuth } = require('../helpers/authMiddleware');

const Post = require('../models/posts');

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            posts,
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
});

router.use('/users', require('./users'));

router.use('/auth', require('./auth-routes'));
router.use('/posts', require('./posts'));

module.exports = router;
