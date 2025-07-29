import mongoose from 'mongoose'

export const connectMongoDB = async () => {
    try {
        // Use a default MongoDB URI if not provided in environment
        const mongoURI = process.env.MONGO_URI ;
        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(mongoURI);
        
        console.log('=================================');
        console.log('MongoDB Connection Status:');
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        console.log('=================================');
        
        return conn;
    } catch (error) {
        console.error('=================================');
        console.error('MongoDB Connection Error:');
        console.error(`Error message: ${error.message}`);
        console.error('=================================');
        throw error; // Re-throw the error to be handled by the server
    }
}

export default connectMongoDB;