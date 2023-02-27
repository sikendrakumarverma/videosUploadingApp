const videoModel = require("../models/videoModel");
const { uploadFile } = require("../aws_connection/aws.js");
const {isValidFile} = require("../validations/validation")

const uploadVideo = async function (req, res) {
    try {
        const {title,description} = req.body;
        let files = req.files
        console.log(files)
        let data = {};
        
        if(!files || files.length===0) return res.status(400).send({ status: false, message: "please provide file " });;
        
        let jsonRegex = /^.*\.(json|JSON)$/
        if (jsonRegex.test(files[0].originalname)) {
            return res.status(400).send({ status: false, message: "json file can't be uploaded ", jsonFile: files[0].originalname });
        }

        if(title) data.title=title;
        if(description) data.description=description;

        let msgForFile = isValidFile(files)
        if(msgForFile){
                return res.status(400).send({ status: false, message: msgForFile });
        }
        let uploadedFileURL = await uploadFile(files[0]);
        data.videoLink = uploadedFileURL
        
        let video = await videoModel.create(data);

        return res.status(201).send({ status: true, message: "video uploaded successfully", data: video });


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getVideos = async function (req, res) {
    try {
       
        let videos = await videoModel.find( );
        return res.status(200).send({ status: true, message: "All videos list", data: videos })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { uploadVideo, getVideos }