var express = require('express');
var Promise = require("bluebird");
var getSqlConnection = require("./DataBaseConnection");

exports.pushUrlImageToDatabase = function insertData(data, idUsers) {
    let dataUser = {
        urlImage: data,
        emailIdUser: idUsers
    };

    let sql = "INSERT INTO Images SET ?";
    return returnPromise(sql, dataUser);
}
exports.getUrlImages = function getImages(id) {
    let sql = "SELECT idImages, urlImage, emailIdUser FROM Images WHERE emailIdUser = ?";
    return returnPromise(sql, id);
}

exports.updateUrlImage = function updateData(data, idUsers) {
    let dataUser = {
        urlImage: data,
        emailIdUser: idUsers
    };

    let sql = "UPDATE Images SET ? WHERE emailIdUser = " +  idUsers;
    return returnPromise(sql, dataUser);
}

exports.uploadDataUser = function uploadData(data, idUsers, password) {

    let dataUser = {
        emailUsers: data.email,
        passwordUsers: password,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "UPDATE Users SET ? WHERE idUsers = " +  idUsers;
    return returnPromise(sql, dataUser);
}

exports.uploadData = function editData(data, idUsers) {
    let dataUser = {
        emailUsers: data.email,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "UPDATE Users SET ? WHERE idUsers = " +  idUsers;
    return returnPromise(sql, dataUser);
}


function returnPromise(sql, dataForDB) {
    return Promise.using(getSqlConnection(), function(connection) {
        return connection.query(sql, dataForDB).then(function(rows) {
            return rows;
        }).catch(function(error) {
            console.log(error);
        });
    });
}