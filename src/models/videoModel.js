const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema(
    {

        title: {
            type: String,     
            // required: true,    
            // unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },

        videoLink: {
            type: String,
           
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true }
)

module.exports = mongoose.model("Video", videoSchema)