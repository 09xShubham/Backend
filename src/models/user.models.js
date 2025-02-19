import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: 
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            minlength: 3,
            maxlength: 20,
            match: /^[a-zA-Z0-9_]+$/,
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            unique: true,
            trim: true,
            required: true,
        },
        fullName: 
        {
            type: String,
            trim: true,
            index: true,
            required: true,
        },
        avatar: 
        {
            type: String, //cloudnrinary url
            required: true
        },
        coverImage: 
        {
            type: String, //cloudnrinary url
        },
        password: 
        {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: 
        {
            type: String,
        },
        watchHistory: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videos",
        },
    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
    {
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this.id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);
