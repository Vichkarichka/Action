var express = require('express');
var Promise = require("bluebird");
var getSqlConnection = require("./DataBaseConnection");

exports.getCategory = function () {
    let sql = "SELECT idCategoryLot, nameCategory FROM CategoryLot ORDER BY nameCategory ASC ";
    return returnPromise(sql);
};

exports.setValueLot = function (dataLot) {
    let valueLot = {
        nameLot: dataLot.nameLot,
        startTime: dataLot.startTime,
        endTime: dataLot.endTime,
        descriptionLot: dataLot.textField,
        priceLot: dataLot.price,
        categoryLot: dataLot.value,
        nameUser: dataLot.idUsers,
    };

    let sql = "INSERT INTO Lot SET ?";
    return returnPromise(sql, valueLot);
};

exports.setImage = function(filesPath, idLot) {
    let imgLot = [];
    let sql;

    for(let i = 0; i < filesPath.length; i++) {
         imgLot.push([
            filesPath[i],
             idLot,
    ]);
    }
    console.log(imgLot);
    sql = "INSERT INTO ImagesLot (imagesLotUrl, idLot) VALUES ?";
    return returnPromise(sql, [imgLot]);
};

exports.getLots = function (userId) {
    let sql = "SELECT idLot, nameLot, startTime, endTime, descriptionLot, priceLot, CategoryLot.nameCategory as categoryLot, nameUser " +
    " FROM Lot left join Action.CategoryLot ON CategoryLot.idCategoryLot = Lot.categoryLot" +
    " WHERE nameUser = " + userId;
    return returnPromise(sql);
};

exports.getLotsImage = function (idLot) {
    let sql = "SELECT idImagesLot, imagesLotUrl, idLot FROM ImagesLot WHERE idLot = " + idLot;
    return returnPromise(sql);
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