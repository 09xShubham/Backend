import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: 
        {
            typeof: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            minlength: 3,
            maxlength: 20,
            match: /^[a-zA-Z0-9_]+$/,
        },
        email: 
        {
            typeof: String,
            required: true,
            unique: true,
            lowercase: true,
            unique: true,
            trim: true,
            required: true,
        },
        fullName: 
        {
            typeof: String,
            trim: true,
            index: true,
            required: true,
        },
        avatar: 
        {
            typeof: String, //cloudnrinary url
            required: true,
        },
        coverImage: 
        {
            typeof: String, //cloudnrinary url
        },
        password: 
        {
            typeof: String,
            required: [true, "Password is required"],
        },
        refreshToken: 
        {
            typeof: String,
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
    this.password = bcrypt.hash(this.password,10)
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

const User = mongoose.Model("User",userSchema);