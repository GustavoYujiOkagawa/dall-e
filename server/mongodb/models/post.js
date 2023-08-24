import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String, require: true },
    name: {type: String, require: true },
    name: {type: String, require: true },
});



const PostSchema = mongoose.model('Post', Post)


export default PostSchema;