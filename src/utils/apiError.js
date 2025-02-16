// It is made to Handle all Errors in the API here so we can handle all erors in ine place and no need to write errors in every file again and again.


class apiError extends Error {
    constructor(
        statusCode,
        message = "Internal Server Error",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.errors = errors,
        this.stack = stack,
        this.message = message;

        if(stack)
        {
            this.stack = stack;
        }
        else
        {
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export default apiError;