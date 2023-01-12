import mongoose from 'mongoose';
// return a default object from database

mongoose.set('strictQuery', true)

const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)

        if(connection.readyState == 1){
            console.log('Database connected')
        }

    } catch (errors) {
        return Promise.reject(errors)
    }
}

export default connectMongo