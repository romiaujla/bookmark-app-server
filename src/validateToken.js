const { API_TOKEN } = require('./config');
const logger = require('./logger');

function validateToken(req, res, next){

    const apiToken = req.get('Authorization').split(' ')[1];
    if(!apiToken || apiToken !== API_TOKEN){
        logger.error(`Request with unauthorized access`);
        return res
            .status(500)
            .send({error: `Unauthorized access`});
    }
    next();
}

module.exports = validateToken;