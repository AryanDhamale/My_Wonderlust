const initdata=require('./data.js');
const mongoose=require('mongoose');
const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
const Listening=require("../models/listing.js");
async function main ()
{
    await mongoose.connect(MONGO_URL);
}
main().then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})

async function initData()
{
    await Listening.deleteMany({});
    initdata.data = initdata.data.map((object)=>({...object,owner:"65d1a272ea3ebc8150cc61c8"}));
    console.log("Delete all data");
    await Listening.insertMany(initdata.data);
    console.log("data inserted");
}


 initData();