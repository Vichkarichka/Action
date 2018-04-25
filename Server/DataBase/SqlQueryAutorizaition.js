var express = require('express');
var Promise = require("bluebird");
var getSqlConnection = require("./DataBaseConnection");

exports.pushRegistationDataToDatabase = function insertData(data, password) {
    let dataUser = {
        emailUsers: data.email,
        passwordUsers: password,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "INSERT INTO Users SET ?";
    return returnPromise(sql, dataUser);
}

exports.loginUserIntoApp = function loginData(data) {
    let sql = "SELECT emailUsers, passwordUsers, firstNameUsers, idUsers, lastNameUsers" +
        " FROM Users WHERE emailUsers = ? ";
    let dataForLogin = [data.email];
    return returnPromise(sql, dataForLogin);
}

exports.checkEmail = function checkEmail(data) {
    let sql = "SELECT emailUsers, idUsers FROM Users WHERE emailUsers = ?";
    return returnPromise(sql, data.email);
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