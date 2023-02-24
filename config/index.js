const config ={
    port: 8080,
    ip: "http://127.0.0.1",

    dbConfig:{
        connectionString: 'mongodb://127.0.0.1:27017/',
        dbName: "task"

    },

    //define the time after which the number of possible requests are reset
    rateLimiterTimeout: 15,
    token_secret:'secrettareeenkeyveryverysecretohgodwowo',
    tokenExpiry: 15*60*1000


}

module.exports = config