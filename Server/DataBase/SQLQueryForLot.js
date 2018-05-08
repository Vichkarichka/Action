var express = require('express');
var Promise = require("bluebird");
var getSqlConnection = require("./DataBaseConnection");

exports.getCategory = function getData() {
    let sql = "SELECT idCategoryLot, nameCategory FROM CategoryLot ORDER BY nameCategory ASC ";
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