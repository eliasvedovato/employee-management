const MONGO_URI = "mongodb+srv://eliasvedo:GCgL59rPJp5PFJk@nextcrud.pyqv3fz.mongodb.net/?retryWrites=true&w=majority"
import mongoose from 'mongoose'
// return a default object from database

const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(MONGO_URI)

        if(connection.readyState == 1){
            console.log('Database connected')
        }

    } catch (errors) {
        return Promise.reject(errors)
    }
}

export default connectMongo