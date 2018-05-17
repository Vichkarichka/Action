let express = require('express');
let Promise = require("bluebird");
let getSqlConnection = require("./DataBaseConnection");

exports.pushRegistationDataToDatabase = (data, password) => {
    let dataUser = {
        emailUsers: data.email,
        passwordUsers: password,
        firstNameUsers: data.firstName,
        lastNameUsers: data.lastName,
    };
    let sql = "INSERT INTO Users SET ?";
    return returnPromise(sql, dataUser);
}

exports.loginUserIntoApp = (data) => {
    let sql = "SELECT emailUsers, passwordUsers, firstNameUsers, idUsers, lastNameUsers, Images.urlImage FROM " +
    "Action.Users left join Action.Images ON Users.idUsers = Images.emailIdUser where emailUsers = ?";
    let dataForLogin = [data.email];
    return returnPromise(sql, dataForLogin);
}

exports.checkEmail = (data) => {
    let sql = "SELECT emailUsers, idUsers FROM Users WHERE emailUsers = ?";
    return returnPromise(sql, data.email);
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