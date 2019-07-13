'use strict'

const layanan = require('../model/khsModel')

exports.inputlayanan= (npm, nama, semester, mata_kuliah, ips) =>
    new Promise((resolve,reject) => {


        const data = new layanan({

            npm         : npm,
            nama        : nama,
            semester    : semester,
            mata_kuliah : mata_kuliah,
            ips         : ips,
            created_at  : new Date()
        });

        data.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data khs' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'Npm sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

exports.datakhs = ()=>
    new Promise((resolve, reject)=>{
        inputlayanan.find()
            .then(khss => {
                if (khss.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: khss});
                }
            })

    });

exports.updatekhs = (npm, nama, semester, mata_kuliah, ips) =>
    new Promise((resolve,reject) => {

        const npm = ({
            npm : npm
        });

        const datakhs = ({
            nama        : nama,
            semester    : semester,
            mata_kuliah : mata_kuliah,
            ips         : ips,
            created_at  : new Date()
        });


        krs.updatekhs(npm, datakhs)

            .then(() => resolve({

                status: 200, message: 'Berhasil update data'

            }))

            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.hapuskhs = (npm) =>
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

