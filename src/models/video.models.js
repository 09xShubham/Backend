import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        videoFile: 
        {
            typeof: String,
            required: true,
            trim: true,
        },
        thumbnail: 
        {
            typeof: String, //cloudnrinary url
            required: true,
        },
        owner: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title:
        {
            typeof: String,
            required: true,
            trim: true,
            maxlength: 50,
            index: true,
        },
        description:
        {
            typeof: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        duration: 
        {
            typeof: Number,
            required: true,
        },
        views: 
        {
            typeof: Number,
            default: 0,
        },
        isPublished: 
        {
            typeof: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

const Video = mongoose.model("Video",videoSchema)