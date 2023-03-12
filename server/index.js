const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const autentifikaciaRoute = require("./routes/autentifikacia.js");
const spravyRoute = require("./routes/spravyRoute.js");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", autentifikaciaRoute);
app.use("/api/spravy", spravyRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Spojenie s DB prebehlo úspešne");
    })
    .catch((err) => {
        console.log(err.message);
    })

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server beží na porte ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: process.env.ORIGIN,
        credentials: true
    }
});

global.onlineUzivatelia = new Map();

io.on("pripájanie", (socket) => {
    global.cetSocket = socket;
    socket.on("pridat-uzivatela", (uzivatelId) => {
        onlineUzivatelia.set(uzivatelId, socket.id);
    });

    socket.on("odoslat-spravu", (data) => {
        // console.log("odoslat-spravu", { data });
        const odosliUzivatelaSocket = onlineUzivatelia.get(data.to);

        if(odosliUzivatelaSocket)
        {
            socket.to(odosliUzivatelaSocket).emit("sprava-prijata", data.sprava);
        }
    });
});