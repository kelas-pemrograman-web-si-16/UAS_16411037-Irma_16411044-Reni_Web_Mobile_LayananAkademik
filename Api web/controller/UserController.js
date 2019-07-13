'use strict';

const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');


//Registrasi
exports.registerUser = (username, password, email, firstname, lastname, admin) =>
    new Promise((resolve,reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({

            username        : username,
            hashed_password : hash,
            email           : email,
            firstname       : firstname,
            lastname        : lastname,
            admin           : admin,
            created_at      : new Date()
        });

        newUser.save()

            .then(() => resolve({ status: 200, message: 'Berhasil registrasi' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'User atau email sudah terpakai' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

//login
exports.loginUser = (username, password) =>

    new Promise((resolve,reject) => {

        User.find({username: username})

            .then(users => {

                if (users.length == 0) {

                    reject({status: 200, message: 'Periksa username anda' });

                } else {

                    return users[0];

                }
            })

            .then(user => {

                const hashed_password = user.hashed_password;

                if (bcrypt.compareSync(password, hashed_password)) {

                    resolve({ status: 200, message: [ {username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname, admin:user.admin}] });

                } else {

                    reject({status: 200, message: 'Periksa kembali password anda' });
                }
            })

            .catch(err => reject({status: 200, message: 'Internal Server Error !' }));

    });

