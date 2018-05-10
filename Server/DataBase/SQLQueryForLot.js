var express = require('express');
var Promise = require("bluebird");
var getSqlConnection = require("./DataBaseConnection");

exports.getCategory = function getData() {
    let sql = "SELECT idCategoryLot, nameCategory FROM CategoryLot ORDER BY nameCategory ASC ";
    return returnPromise(sql);
};

exports.setValueLot = function setData(path, dataLot) {
    let valueLot = {
        nameLot: dataLot.nameLot,
        startTime: dataLot.startTime,
        endTime: dataLot.endTime,
        descriptionLot: dataLot.textField,
        priceLot: dataLot.price,
        categoryLot: dataLot.value,
        ImgLot: path,
        nameUser: dataLot.idUsers,
    };

    let sql = "INSERT INTO Lot SET ?";
    return returnPromise(sql, valueLot);
};

function returnPromise(sql, dataForDB) {
    return Promise.using(getSqlConnection(), function(connection) {
        return connection.query(sql, dataForDB).then(function(rows) {
            return rows;
        }).catch(function(error) {
            console.log(error);
        });
    });
}