module.exports = function ValidationException(msg){
    this.message = msg;
    this.name = 'ValidationException';
};