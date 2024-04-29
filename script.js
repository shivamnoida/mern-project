const express=require('express');
const productsRouter=require('./routes/productsRoutes')
const mongoose=require('mongoose')
const test=require('./models/productsModel')
const app=express();
app.use(express.json());
app.use('/api/products',productsRouter);
const url='mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.prfguxz.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0'
const databaseUser='root';
const databasePassword='abcd1234';
const databaseName='Amozon-Backend';


let dbLink=url.replace("$_USERNAME_$",databaseUser);
dbLink=dbLink.replace("$_PASSWORD_$",databasePassword);
dbLink=dbLink.replace("$_DB_NAME_$",databaseName);


mongoose.connect(dbLink)
.then(()=>console.log("-------database conncected----------"))

app.listen(1400,()=>console.log('---------APP started-----------'));