// It is made for handling all responses or the data we get from the api handle in one place.

class apiResponse {
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export default apiResponse;