let express = require('express');
let Promise = require("bluebird");
let getSqlConnection = require("./DataBaseConnection");

exports.pushUrlImageToDatabase = (data, idUsers) => {
    let dataUser = {
        urlImage: data,
        emailIdUser: idUsers
    };

    let sql = "INSERT INTO Images SET ?";
    return returnPromise(sql, dataUser);
}
exports.getUrlImages = (id) => {
    let sql = "SELECT idImages, urlImage, emailIdUser FROM Images WHERE emailIdUser = ?";
    return returnPromise(sql, id);
}

exports.updateUrlImage = (data, idUsers) => {
    let dataUser = {
        urlImage: data,
        emailIdUser: idUsers
    };

    let sql = "UPDATE Images SET ? WHERE emailIdUser = " +  idUsers;
    return returnPromise(sql, dataUser);
}

exports.uploadDataUser = (data, idUsers, password) => {

    let dataUser = {
        emailUsers: data.email,
        passwordUsers: password,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "UPDATE Users SET ? WHERE idUsers = " +  idUsers;
    return returnPromise(sql, dataUser);
}

exports.uploadData = (data, idUsers) => {
    let dataUser = {
        emailUsers: data.email,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "UPDATE Users SET ? WHERE idUsers = " +  idUsers;
    return returnPromise(sql, dataUser);
}

returnPromise = (sql, dataForDB) => {
    return Promise.using(getSqlConnection(), (connection) => {
        return connection.query(sql, dataForDB).then((rows) => {
            return rows;
        }).catch((error) => {
            console.log(error);
        });
    });
}