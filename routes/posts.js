const express = require('express');

const router = express.Router();
const { ensureAuth } = require('../helpers/authMiddleware');

const Post = require('../models/posts');

// Show add page
router.get('/add', ensureAuth, (req, res) => {
    res.render('posts/add');
});

// add form
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Post.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// Show all posts
router.get('/', ensureAuth, async (req, res) => {
    try {
        const posts = await Post.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

        res.render('posts/index', {
            posts,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// Show single Post
// eslint-disable-next-line consistent-return
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user').lean();

        if (!post) {
            return res.render('error/404');
        }

        if (post.user.id !== req.user.id && post.status === 'private') {
            res.render('error/404');
        } else {
            res.render('posts/show', {
                post,
            });
        }
    } catch (err) {
        console.error(err);
        res.render('error/404');
    }
});

// Show edit page
// eslint-disable-next-line consistent-return
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
        }).lean();

        if (!post) {
            return res.render('error/404');
        }

        // eslint-disable-next-line eqeqeq
        if (post.user != req.user.id) {
            res.redirect('/posts');
        } else {
            res.render('posts/edit', {
                post,
            });
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
});

// Update post
// eslint-disable-next-line consistent-return
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id).lean();

        if (!post) {
            return res.render('error/404');
        }

        // eslint-disable-next-line eqeqeq
        if (post.user != req.user.id) {
            res.redirect('/posts');
        } else {
            post = await Post.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                    runValidators: true,
                },
            );

            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
});

// Delete post
// eslint-disable-next-line consistent-return
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();

        if (!post) {
            return res.render('error/404');
        }

        // eslint-disable-next-line eqeqeq
        if (post.user != req.user.id) {
            res.redirect('/posts');
        } else {
            await Post.remove({ _id: req.params.id });
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
});

// user posts
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const post = await Post.find({
            user: req.params.userId,
            status: 'public',
        })
            .populate('user')
            .lean();

        res.render('posts/index', {
            post,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;
