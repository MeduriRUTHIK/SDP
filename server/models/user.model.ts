require('dotenv').config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field cannot be empty']
    },
    email: {
        type: String,
        required: [true, "Email Field Cannot Be Empty"],
        unique: true,
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: "Please enter valid email"
        },
    },
    password: {
        type: String,
        minlength: [6, "Password must be alteast 6 charcters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "User",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String,
        },
    ],
}, { timestamps: true });


// hash password before the saving
userSchema.pre<IUser>('save', async function save(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// sign access token
userSchema.methods.SignAccessToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '',{expiresIn:'5m'});
}

// sign refresh token
userSchema.methods.SignRefreshToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '',{expiresIn:'3d'});
};

// compare password
userSchema.methods.comparePassword = async function (enteredPasswrod: string): Promise<boolean> {
    return await bcrypt.compare(enteredPasswrod, this.password);
};


const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;