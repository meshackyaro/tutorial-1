import { Post } from "../models/post.models.js"

const createPost = async (req, res) => {
    try {
        
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message:"All fields are required"
            })
            
            const newPost = await Post.create({
                title,
                description
            });

            res.status(201).json ({
                message: "Post created successfully",
                newPost
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
        
    }
}

export {
    createPost
};