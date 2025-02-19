import { v2 } from "cloudinary";
import fs from "fs";

const cloudinary = v2;

//Configuration from cloudinary docs

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(filePath) => {
    if(!filePath)
    {
        return null;
    }
    else
    {
        try {
            const response = await cloudinary.uploader.upload(filePath,
                {
                    resource_type: "auto",
                }
            )
            console.log("File uploaded successfully",response.url);
            fs.unlinkSync(filePath)
            return response;
        } catch (error) {
            fs.unlinkSync(filePath)
            console.error("Error in uploading file to cloudinary", error);
            return null;
        }
    }
}

export default uploadOnCloudinary;