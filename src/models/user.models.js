import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 18,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 24
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }
},
    { 
        timestamps: true 
    }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);