import mongo from "mongoose";
require('dotenv').config(); 
mongo.connect(
    process.env.MONGO_URL as string
, {dbName: 'Attendence'}).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


mongo.connection.on('connected', () => {
    console.log('Mongoose connected to db!!!!');
}
);

mongo.connection.on('error', (err) => {
    console.log(err.message);
}
);

mongo.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected!!!!');
    process.exit(1);
}
);

process.on('SIGINT', async () => {
    await mongo.connection.close();
    process.exit(0);
}
);
