import { User } from "../models/user.models.js"


const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!"});
        }

        // create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        return res.status(201).json({ 
            message: "User registered successfully",
        });

        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});

    }
}

const loginUser = async ( req, res ) => {

    try {

        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });
        
        // check if user exists
        if (!user) return res.status(404).json({
            message: "user not found"
        });

        // compare passwords
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal Sever Error"
        })
        
    }

}

const logoutUser = async ( req, res ) => {
    try {
        
        const { email } = req.body;

        const user = await User.findOne ({
            email: email.toLowerCase()
        });

        if (!User) return res.status(404).json ({
            message: "User not found"
        });
        res.status(200).json ({
            message: "Logout successfull"
        });

    } catch (error) {
        res.status(500).json ({
            message: "Internal Server Error"
        });
        
    }
}


export {
    registerUser,
    loginUser,
    logoutUser
}
