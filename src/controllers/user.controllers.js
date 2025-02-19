import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User }  from "../models/user.models.js";
import uploadOnCloudinary from "../utils/fileUpload.js";
import apiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
    // get user data from frontend
    // validation:  user seding empty data in required field
    // check user already exist or not
    // check for images or avatar
    // if images exist then upload it to cloudinary
    // create a user object - create user in mongodb
    // remove password and and refresh token field from response
    // check if user create successfully or not
    // return response

    const{username,fullName,email,password} = req.body;
    console.log("fields: ",req.body);

    // For validation all fields are required

    if([username,fullName,email,password].some((field) => field?.trim() === ""))
    {
        throw new apiError(400,"All fields are required");
    }

    // For checking user already exist

    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser)
    {
        if(existedUser.username)
        {
            throw new apiError(409,"Username already exist")
        }
        if(existedUser.email)
        {
            throw new apiError(409,"Email already exist")
        }
    }

    // check for images or avatar

    const avatarLoacalPath = req.files?.avatar[0]?.path;
    const coverImageLoacalPath = req.files?.coverImage[0]?.path;

    console.log(req.files);
    
    // if images exist then upload it to cloudinary

    const avatar = await uploadOnCloudinary(avatarLoacalPath)
    const coverImage = await uploadOnCloudinary(coverImageLoacalPath)

    if(!avatar)
    {
        throw new apiError(400,"Avatar is required")
    }

    // create a user object - create user in mongodb

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        password
    })

    // Checking is User Created or not 

    const isUserCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!isUserCreated)
    {
        throw new apiError(500,"User not created")
    }

    return res.status(201).json(
        new apiResponse(200, isUserCreated, "User Registered Successfully")
    )
})

export {registerUser}