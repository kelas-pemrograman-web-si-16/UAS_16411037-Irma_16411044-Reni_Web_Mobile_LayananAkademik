'use strict'

const krs = require('../model/krsModel')

exports.inputkrs= (npm, nama, semester, mata_kuliah) =>
    new Promise((resolve,reject) => {


        const data = new layanan({

            npm         : npm,
            nama        : nama,
            semester    : semester,
            mata_kuliah : mata_kuliah,
            created_at  : new Date()
        });

        data.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data krs' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'Npm sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

exports.datakrs = ()=>
    new Promise((resolve, reject)=>{
        inputkrs.find()
            .then(krss => {
                if (krss.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: khss});
                }
            })

    });

exports.updatekrs = (npm, nama, semester, mata_kuliah) =>
    new Promise((resolve,reject) => {

        const npm = ({
            npm : npm
        });

        const datakrs = ({
            nama        : nama,
            semester    : semester,
            mata_kuliah : mata_kuliah,
            created_at  : new Date()
        });


        krs.updatekhs(npm, datakrs)

            .then(() => resolve({

                status: 200, message: 'Berhasil update data'

            }))

            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.hapuskrs = (npm) =>
    new Promise((resolve,reject) => {

        const npm = ({
            npm : npm
        });

        krs.remove(npm)

            .then(() => resolve({ status: 200, message: 'Data berhasil dihapus' }))

            .catch(err => {

                reject({ status: 200, message: 'Gagal' });
            });
    });

