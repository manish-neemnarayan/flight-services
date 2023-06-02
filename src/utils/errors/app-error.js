class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.explaination = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;