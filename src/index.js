const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route");
const {MONGOURI} = require('./config/keys');
//const { AppConfig } = require('aws-sdk');

const cors = require('cors');
const multer= require("multer");

app.use(express.json());

app.use(cors());

app.use( multer().any())

mongoose.connect(MONGOURI,
    {useNewUrlParser:true}
).then(()=>console.log("mongoDb is connected"))
    .catch((err)=>console.log(err))

app.use("/api",route)

// app.use("/*", function (req, res) {
//     return res.status(400).send({status: false,message: "Please Enter Valid Path Or Parameters !!!!",});
//   });
  
    //vercel 

if (process.env.NODE_ENV == 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../client/build/index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            }
        )
    })
}

app.listen(process.env.PORT || 8080, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8080))
});

