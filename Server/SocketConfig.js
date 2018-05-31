const io = require('./server').io;
let user = require('./DataBase/SQLQueryForLot');

module.exports = (socket) => {

        console.log("Connected succesfully to the socket ...");

        socket.on('bidValue', (data) => {
            user.getPriceLot(data.idLot)
                .then(res => {
                    if (!res.length) return null;
                    if (res[0].newBid < data.bid) {
                        const newPriceData = {
                            bid: data.bid,
                            idLot: data.idLot,
                            buyer: data.buyer,
                            countBid: data.countBid,
                        };
                        return newPriceData;
                    }
                    return null;
                })
                .then(newPriceData => {
                    if (!newPriceData) return;
                    user.updatePriceLot(newPriceData)
                        .then((res) => {
                            io.emit('bidValue', newPriceData).to(socket.room);
                            user.getAllBid().then((response) => {
                                console.log(response);
                                io.emit('bidHistory', response).to(socket.room);
                            }).catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        });

        socket.on('room', (room) => {

            if (socket.room)
                socket.leave(socket.room);

            socket.room = room;
            socket.join(room);
            console.log(socket.handshake.address + ' ' + room);
            user.getAllBid().then((response) => {
                console.log(response);
                io.emit('bidHistory', response).to(socket.room);
            }).catch(err => console.log(err));
        });
};