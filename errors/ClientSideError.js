class ClientSideError extends Error {
    constructor(message){
        super(message);
        this.statusCode=400;
        this.name='ClientSideError';
    }
}
module.exports=ClientSideError;