const logger = require('./logger');
const { NODE_ENV } = require('./config');

function errorhandler(error, req, res, next){
    let response  = '';
    if(NODE_ENV === 'production'){
        response = {
            error: {
                message: `server error`
            }
        }
    } else {
        console.log(error);
        logger.error(`Error: ${error.message}`);
        response = {
            message: error.message, 
            error
        }
    }

    res
        .status(500)
        .json(response);
}

module.exports = errorhandler;