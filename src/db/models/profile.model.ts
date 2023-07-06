import mongoose, { Schema } from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'user',
        required : true,
        unique: true,
    },
    image: {
        type : String,
        required : false,
    },
    coverImage: {
        type : String,
        required : false,
    },
    location: {
        type : String,
    },
    bio: {
        type: String,
    },
    name: {
        type: String,
    },
});

const Profile = mongoose.model('profile', ProfileSchema);

export default Profile;