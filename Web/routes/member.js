var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
    res.render('users/dashboard')
})
router.get('/Login', function(req, res, next) {
    res.render('Login')
})
module.exports = router;

var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Profil = require('../model/profil')
var Khs = require('../model/khs')
var Krs = require('../model/krs')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/member', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    })
});

//profil
/* GET users listing. */
router.get('/dataprofilmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Profil.find({}, function(err, profil) {
        console.log("Data Profile"+ profil);
        res.render('users/profil/table', { session_store: session_store, profils: profil })
    }).select('_id npm nama alamat ttl jenis_kelamin created_at')
});

//khs
/* GET users listing. */
router.get('/datakhsmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Khs.find({}, function(err, khs) {
        console.log(khs);
        res.render('users/khs/table_khs', { session_store: session_store, khss: khs })
    }).select('_id npm nama semester mata_kuliah ips created_at')
});

//krs
/* GET users listing. */
router.get('/datakrsmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Krs.find({}, function(err, krs) {
        console.log(krs);
        res.render('users/krs/table_krs', { session_store: session_store, krss: krs })
    }).select('_id npm nama semester mata_kuliah ips created_at')
});

module.exports = router;