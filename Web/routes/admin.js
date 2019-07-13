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
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    }).select('username email firstname lastname users createdAt updatedAt')
});

//profil
/* GET users listing. */
router.get('/dataprofil', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Profil.find({}, function(err, profil) {
        console.log(profil);
        res.render('users/profil/table', { session_store: session_store, profils: profil })
    }).select('_id npm nama alamat ttl jenis_kelamin created_at')
});

/* GET users listing. */
router.get('/inputprofil', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/profil/input_data', { session_store: session_store})
});

//input data profil
router.post('/inputprofil', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Profil.find({ npm: req.body.npm }, function(err, profil) {
        if (profil.length == 0) {
            var pelayananakademik = new Profil({
                npm: req.body.npm,
                nama: req.body.nama,
                alamat: req.body.alamat,
                ttl: req.body.ttl,
                jenis_kelamin: req.body.jenis_kelamin,
            })
            pelayananakademik.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/dataprofil')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/dataprofil')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, npm sudah ada....')
            res.render('users/profil/input_data', {
                session_store: session_store,
                npm: req.body.npm,
                nama: req.body.nama,
                alamat: req.body.alamat,
                ttl: req.body.ttl,
                jenis_kelamin: req.body.jenis_kelamin,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editprofil', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Profil.findOne({ _id: req.params.id }, function(err, profil) {
        if (profil) {
            console.log("profilssss"+profil);
            res.render('users/profil/edit_data', { session_store: session_store, profils: profil })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/dataprofil')
        }
    })
})

router.post('/:id/editprofil', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Profil.findById(req.params.id, function(err, profil) {
        profil.npm = req.body.npm;
        profil.nama = req.body.nama;
        profil.alamat = req.body.alamat;
        profil.ttl = req.body.ttl;
        profil.jenis_kelamin = req.body.jenis_kelamin;

        profil.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/dataprofil');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Profil.findById(req.params.id, function(err, profil){
        profil.remove(function(err, profil){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data profil berhasil dihapus!');
            }
            res.redirect('/dataprofil');
        })
    })
})

//khs
/* GET users listing. */
router.get('/datakhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Khs.find({}, function(err, khs) {
        console.log(khs);
        res.render('users/khs/table_khs', { session_store: session_store, khss: khs })
    }).select('_id npm nama semester mata_kuliah  ips created_at')
});

/* GET users listing. */
router.get('/inputkhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/khs/input_data_khs', { session_store: session_store})
});

//input data khs
router.post('/inputkhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Khs.find({ npm: req.body.npm }, function(err, khs) {
        if (khs.length == 0) {
            var pelayananakademik = new Khs({
                npm: req.body.npm,
                nama: req.body.nama,
                semester: req.body.semester,
                mata_kuliah: req.body.mata_kuliah,
                ips: req.body.ips,
            })
            pelayananakademik.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datakhs')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datakhs')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, npm sudah ada....')
            res.render('users/khs/input_data_khs', {
                session_store: session_store,
                npm: req.body.npm,
                nama: req.body.nama,
                semester: req.body.semester,
                mata_kuliah: req.body.mata_kuliah,
                ips: req.body.ips,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editkhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Khs.findOne({ _id: req.params.id }, function(err, khs) {
        if (khs) {
            console.log("khsssss"+khs);
            res.render('users/khs/edit_data_khs', { session_store: session_store, khss: khs })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datakhs')
        }
    })
})

router.post('/:id/editkhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Khs.findById(req.params.id, function(err, khs) {
        khs.npm = req.body.npm;
        khs.nama = req.body.nama;
        khs.semester = req.body.semester;
        khs.mata_kuliah = req.body.mata_kuliah;
        khs.ips = req.body.ips;

        khs.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datakhs');

        });
    });
})

router.post('/:id/deletekhs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Khs.findById(req.params.id, function(err, khs){
        khs.remove(function(err, khs){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data khs berhasil dihapus!');
            }
            res.redirect('/datakhs');
        })
    })
})

//krs
/* GET users listing. */
router.get('/datakrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Krs.find({}, function(err, krs) {
        console.log(krs);
        res.render('users/krs/table_krs', { session_store: session_store, krss: krs })
    }).select('_id npm nama semester mata_kuliah created_at')
});

/* GET users listing. */
router.get('/inputkrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/krs/input_data_krs', { session_store: session_store})
});

//input data krs
router.post('/inputkrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Krs.find({ npm: req.body.npm }, function(err, krs) {
        if (krs.length == 0) {
            var pelayananakademik = new Krs({
                npm: req.body.npm,
                nama: req.body.nama,
                semester: req.body.semester,
                mata_kuliah: req.body.mata_kuliah,
            })
            pelayananakademik.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datakrs')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datakrs')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, npm sudah ada....')
            res.render('users/krs/input_data_krs', {
                session_store: session_store,
                npm: req.body.npm,
                nama: req.body.nama,
                semester: req.body.semester,
                mata_kuliah: req.body.mata_kuliah,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editkrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Krs.findOne({ _id: req.params.id }, function(err, krs) {
        if (krs) {
            console.log("krsssss"+krs);
            res.render('users/krs/edit_data_krs', { session_store: session_store, krss: krs })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datakrs')
        }
    })
})

router.post('/:id/editkrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Krs.findById(req.params.id, function(err, krs) {
        krs.npm = req.body.npm;
        krs.nama = req.body.nama;
        krs.semester = req.body.semester;
        krs.mata_kuliah = req.body.mata_kuliah;

        krs.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datakrs');

        });
    });
})

router.post('/:id/deletekrs', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Krs.findById(req.params.id, function(err, krs){
        krs.remove(function(err, krs){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data krs berhasil dihapus!');
            }
            res.redirect('/datakrs');
        })
    })
})

module.exports = router;
