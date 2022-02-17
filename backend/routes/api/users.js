const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors, passwordValidator } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Artist, Album, Playlist, Song, Song_User_Join, User_Album_Join } = require('../../db/models');

const router = express.Router();

const validateUserEdit = [
    check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Username must have at least 3 characters.'),
    handleValidationErrors,
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid. Make sure it\'s written like example@email.com'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Username must have at least 3 characters'),
    check('username')
        .isLength({ max: 30 })
        .withMessage('Username must have at most 30 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    check('password')
        .matches("^.*[a-z]+.*$")
        .withMessage("Password must contain at least one lower case character"),
    check('password')
        .matches("^.*[A-Z]+.*$")
        .withMessage("Password must contain at least one upper case character"),
    check('password')
        .matches("^.*\d+.*$")
        .withMessage("Password must contain at least one digit"),
    check('password')
        .matches("^.*[@#$!%*?&]+.*$")
        .withMessage("Password must contain at least one special character (@, #, $, !, %, *, ?, &)"),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findAll({
        include: [
        Artist,
        Playlist,
        Song,
        {model: Album, include: [Artist]}
        ]
    })
    
    return res.json(users)
}));

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
        user,
        });
    }),
);

router.put('/:id', validateUserEdit, asyncHandler(async (req, res) => {
    const userId = +req.params.id
    const user = await User.findByPk(userId, {
        include: [
        Artist,
        Album,
        Playlist,
        ]
    });

    const {username} = req.body

    const updatedUser = await user.update({
        username
    })
    res.json(updatedUser)

}));

router.post('/like-song', asyncHandler(async (req, res) => {
    await Song_User_Join.create(req.body)
    const users = await User.findAll({
        include: [ Song ]
    });
    return res.json(users)
}));

router.delete('/song/:songId/:userId', asyncHandler(async (req, res) => {
    const songId = +req.params.songId;
    const userId = +req.params.userId;
    const songLike = await Song_User_Join.findOne({
        where: {
            songId,
            userId
        }
    });
    await songLike.destroy();

    const users = await User.findAll({
        include: [ Song ]
    });
    return res.json(users)
}))

router.post('/like-album', asyncHandler(async (req, res) => {
    await User_Album_Join.create(req.body)
    const users = await User.findAll({
        include: [ Album ]
    });
    return res.json(users)
}));

router.delete('/album/:albumId/:userId', asyncHandler(async (req, res) => {
    const albumId = +req.params.albumId;
    const userId = +req.params.userId;
    const albumLike = await User_Album_Join.findOne({
        where: {
            albumId,
            userId
        }
    });
    await albumLike.destroy();

    const users = await User.findAll({
        include: [ Album ]
    });
    return res.json(users)
}))

module.exports = router;