'use strict';

const khsController = require('../controller/khsController')


module.exports = router => {

    //input data
    router.post('/input_khs', (req, res) => {

        const npm           = req.body.npm;
        const nama          = req.body.nama;
        const semester      = req.body.semester;
        const mata_kuliah   = req.body.mata_kuliah;
        const ips           = req.body.ips;
        console.log(req.body);

        if (!npm || !nama || !semester ||  !mata_kuliah || !ips || !npm.trim() || !nama.trim()
            || !semester.trim() ||  !mata_kuliah.trim()  || !ips.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            khsController.inputlayanan(npm, nama, semester, mata_kuliah, ips)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })

                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //get Data
    router.get('/datakhs', (req, res) => {

        khsController.datakhs()
            .then(result => {
                console.log(result)
                res.status(result.status).json({message: result.message})
            })

            .catch(err => res.status(err.status).json({message: err.message}));
    });


    //input data
    router.post('/updatekhs', (req, res) => {

        const npm      = req.body.npm;
        const nama         = req.body.nama;
        const semester      = req.body.semester;
        const mata_kuliah         = req.body.mata_kuliah;
        const ips                   = req.body.ips;

        if (!npm || !nama || !semester ||  !mata_kuliah || !ips.trim || !npm.trim() || !nama.trim()
            || !semester.trim() ||  !mata_kuliah.trim || !ips.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            khsController.updatekhs(npm, nama, semester, mata_kuliah, ips)

                .then(result => {

                    //res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

    //input data
    router.post('/hapuskhs', (req, res) => {

        const npm      = req.body.npm;

        if (!npm || !npm.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            khsController.hapuskhs(npm)

                .then(result => {
                    res.status(result.status).json({message: result.message})
                })
                .catch(err => res.status(err.status).json({message: err.message}));
        }
    });

}
