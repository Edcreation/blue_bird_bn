import mongoose, { Schema } from "mongoose";

const TextSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'user',
        required : true,
    },
    profileId : {
        type: Schema.Types.ObjectId,
        ref: 'profile',
        require: true
    },
    text: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const Text = mongoose.model('text', TextSchema);

export default Text;