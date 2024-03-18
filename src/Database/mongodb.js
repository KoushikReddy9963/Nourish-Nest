import mongoose from "mongoose";

const loginsignupSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const loginsignup = mongoose.model('loginsignup', loginsignupSchema);
async function signUp(email, password) {
    try {
        const existingloginsignup = await loginsignup.findOne({ email });
        if (existingloginsignup) {
            return { success: false, message: 'email already exists' };
        }
        const newloginsignup = new loginsignup({email, password});
        await newloginsignup.save();
        console.log(email, password);
        return { success: true, message: 'loginsignup created successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export default signUp
