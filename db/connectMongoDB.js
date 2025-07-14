import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try {
        // Use a default MongoDB URI if not provided in environment
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/skilltracker';
        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
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