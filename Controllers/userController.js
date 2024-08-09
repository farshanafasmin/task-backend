const users = require("../Models/userSchema")


// logic for register
exports.register=async (req,res)=>{


    // fetch data from req body
    var { username, email, password } = req.body

    try {
        // check user exist in collection      {email(key in model):email(fetched data from api)}
        const existingUser = await users.findOne({ email })
        // if existing user is an object- only if the user present in collection
        if (existingUser) {
            res.status(401).json("Already registered ! please login")
        }
        // user not exist then existingUser content will be null
        else {
            // create an object for user 
            const newUser = new users({
                username, email, password
            })
            // save created object in mongodb 
            await newUser.save()

            res.status(201).json("Account created successfully!")
        }
    }
    catch {
        res.status(400).json("Register api failed")

    }
}


// login logic

exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await users.findOne({ email, password })
        if (user) {
            // token generation for autherization
            // const token=jwt.sign({userId:user._id},process.env.SECRET_KEY)
            res.status(200).json({
                user,
                message:"login success",
                // token
            })
        }
        else {
            res.status(401).json("incorrect email or password")
        }
    }
    catch {
        res.status(400).json("login api failed")

    }

}

