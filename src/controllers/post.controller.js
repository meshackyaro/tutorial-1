import { Post } from "../models/post.models.js"

const createPost = async (req, res) => {
    try {
        
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const newPost = await Post.create({title, description});
        res.status(201).json ({
            message: "Post created successfully",
            newPost
        });        


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
        
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({posts});

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

const updatePost = async (req, res) => {
    try {
        
        // check that request body is not empty
        if (Object.keys(req.body).length === 0) res.status(400).json({
            message: "Update data is required"
        });

        // find the post by id and update
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            {new: true});

        if (!post) res.status(404).json({
            message: "Post not found"
        });
        
        res.status(200).json({
            message: "Post updated successfully", 
            post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) res.status(404).json({
            message: "Post not found"
        });
        res.status(200).json({
            message: "Post deleted successfully",
            deletedPost
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};