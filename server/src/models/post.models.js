import mongoose, {Schema} from 'mongoose';

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    postImage:{
        type: String
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true})

export const Post = mongoose.model('Post', postSchema)