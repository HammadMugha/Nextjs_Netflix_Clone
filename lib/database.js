import mongoose from "mongoose";


export default async function dbConnection(){
    try {
        await mongoose.connect("mongodb://localhost:27017/NetflixClone")
        console.log("database connection successful");
    } catch (error) {
        console.log(error)
    }
}