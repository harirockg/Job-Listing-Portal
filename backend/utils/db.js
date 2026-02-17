import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);

        //do it when needed ok
        // console.log("DB connection failed:", error);
        // process.exit(1); // stop server if DB fails
    }
}
export default connectDB;