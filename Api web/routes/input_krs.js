'use strict';

const krsController = require('../controller/krsController')


module.exports = router => {

    //input barang
    router.post('/inputkrs', (req, res) => {

        const npm           = req.body.npm;
        const nama          = req.body.nama;
        const semester      = req.body.semester;
        const mata_kuliah   = req.body.mata_kuliah;
        console.log(req.body);

        if (!npm || !nama || !semester ||  !mata_kuliah || !npm.trim() || !nama.trim()
            || !semester.trim() ||  !mata_kuliah.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            krsController.inputkrs(npm, nama, semester, mata_kuliah)

                .then(result => {

                    //res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })

                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //get barang
    router.get('/datakrs', (req, res) => {

        krsController.datakrs()
            .then(result => {
                console.log(result)
                res.status(result.status).json({message: result.message})
            })

            .catch(err => res.status(err.status).json({message: err.message}));
    });


    //input barang
    router.post('/updatekrs', (req, res) => {

        const npm      = req.body.npm;
        const nama         = req.body.nama;
        const semester      = req.body.semester;
        const mata_kuliah         = req.body.mata_kuliah;

        if (!npm || !nama || !semester ||  !mata_kuliah || !npm.trim() || !nama.trim()
            || !semester.trim() ||  !mata_kuliah.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            krsController.updatekrs(npm, nama, semester, mata_kuliah)

                .then(result => {

                    //res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //input barang
    router.post('/hapuskrs', (req, res) => {

        const npm      = req.body.npm;

        if (!npm || !npm.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            krsController.hapuskrs(kodekrs)

                .then(result => {
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

}
