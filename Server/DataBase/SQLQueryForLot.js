let express = require('express');
let Promise = require("bluebird");
let getSqlConnection = require("./DataBaseConnection");

exports.getCategory =  () => {
    let sql = "SELECT idCategoryLot, nameCategory FROM CategoryLot ORDER BY nameCategory ASC ";
    return returnPromise(sql);
};

exports.setValueLot = (dataLot) => {
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

exports.setImage = (filesPath, idLot) => {
    let imgLot = [];
    let sql;

    for(let i = 0; i < filesPath.length; i++) {
         imgLot.push([
            filesPath[i],
             idLot,
    ]);
    }
    sql = "INSERT INTO ImagesLot (imagesLotUrl, idLot) VALUES ?";
    return returnPromise(sql, [imgLot]);
};

exports.getLots = (userId) => {
    let sql = "SELECT Lot.idLot, nameLot, startTime, endTime, descriptionLot, priceLot, CategoryLot.nameCategory as categoryLot, nameUser " +
    " FROM Lot left join Action.CategoryLot ON CategoryLot.idCategoryLot = Lot.categoryLot" +
    " WHERE nameUser = " + userId;
    return returnPromise(sql);
};

exports.getLotsImage = (idLot) => {
    let sql = "SELECT idImagesLot, imagesLotUrl, idLot FROM ImagesLot WHERE idLot = " + idLot;
    return returnPromise(sql);
};

exports.getAllLots = () =>{
    let sql = "SELECT idLot, nameLot, startTime, endTime, descriptionLot, priceLot,\n" +
        "         CategoryLot.nameCategory as categoryLot, idCategoryLot, Users.emailUsers as nameUser, BidValue.newBid as newBid,\n" +
        "         BidValue.countBidLot as countBidLot\n" +
        "         FROM Lot LEFT JOIN Action.CategoryLot ON CategoryLot.idCategoryLot = Lot.categoryLot \n" +
        "        LEFT JOIN Action.Users ON Lot.nameUser = Users.idUsers \n" +
        "        left join Action.BidValue on BidValue.idLotBid  = Lot.idLot  order by idLot asc";
    return returnPromise(sql);
};

exports.getPriceLot = (idLot) => {
    let sql = "SELECT newBid FROM BidValue WHERE idLotBid = " + idLot;
    return returnPromise(sql);
};

exports.updatePriceLot = (data) => {
    let dataPrice = {
        newBid: data.bid,
        buyerId: data.buyer,
        countBidLot: data.countBid
    };

    let sql = "UPDATE BidValue SET ? WHERE idLotBid = " +  data.idLot;
    return returnPromise(sql, dataPrice);
};

exports.updateValueLot = (dataLot,lotId) => {

    let data = {
        nameLot: dataLot.nameLot,
        startTime: dataLot.startTime,
        endTime: dataLot.endTime,
        descriptionLot: dataLot.textField,
        priceLot: dataLot.price,
        categoryLot: dataLot.value,
        nameUser: dataLot.idUsers,
    };

    let sql = "UPDATE Lot SET ? WHERE idLot = " +  lotId;
    return returnPromise(sql, data);
};

returnPromise = (sql, dataForDB) => {
    return Promise.using(getSqlConnection(), (connection) => {
        return connection.query(sql, dataForDB).then((rows) => {
            return rows;
        }).catch((error) => {
            console.log(error);
        });
    });
}