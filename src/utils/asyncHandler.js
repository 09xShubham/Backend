// #USING PROMISES

const asyncHandler = (requestHandler) => (err,req,res,next) => {
    Promise.resolve(requestHandler(err,req,res,next)).catch((err) => next(err));
}

export default asyncHandler;



// #USING TRY-CATCH

// const asyncHandler = (requestHandler) => async (err,req,res,next) => {
//     try {
//         await requestHandler(err,req,res,next)
//     } catch (error) {
//         res.status(error.status || 500).json({
//             success: false,
//             message: error.message || 'Internal server error'
//         })
//     }
// }

// export default asyncHandler;