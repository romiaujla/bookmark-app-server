const app = require('./app');
const { PORT , DB_URL } = require('./config');

const knex = require('knex');
const db  = knex({
    client: 'pg',
    connection: DB_URL
});

app.set('db', db);

app.use((error, req, res, next) => {
    console.log(error);
    let response = {};
    if(NODE_ENV === 'production'){
        response = {
            error: {
                message: `Server Error`
            }
        }
    }else{
        response = {error}
    }
    res.status(500).json(response);
});


app.listen(PORT, ()=> {
    console.log(`Server listening at port:${PORT}`);
})