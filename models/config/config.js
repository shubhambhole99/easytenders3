const { default: mongoose } = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://bztech404:UXh44HexRamOVCSC@ac-xf5kuu1-shard-00-00.kxieenj.mongodb.net:27017,ac-xf5kuu1-shard-00-01.kxieenj.mongodb.net:27017,ac-xf5kuu1-shard-00-02.kxieenj.mongodb.net:27017/test?ssl=true&replicaSet=atlas-ws6uxa-shard-0&authSource=admin&retryWrites=true&w=majority";

// console.log(config)
mongoose.connect(uri).then(() => {
    
    console.log("database connection is established")
}).catch((err) => {
    console.log("error while connecting in database" , err)
})