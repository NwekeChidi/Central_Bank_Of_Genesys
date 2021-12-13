// Import Dependencies
const { User } = require("./../models/user");
const generator = require("./../helpers/generators");
const bcrypt = require("bcrypt"), salt = 15, password = "123456";
const passwordHash = async (password) => { return await bcrypt.hash(password, salt)};

exports.createUser = async (req, res) => {
    const data = req.body;



    try {
        const newUser = await new User({
            firstName : data.firstName,
            lastName : data.lastName,
            fullName : data.firstName+" "+data.lastName,
            email: data.email,
            phone : data.phone,
            address : data.address,
            occupation : data.occupation,
            dob : data.dob,
            cbg_number : generator.cbg_number(),
            account_type : data.account_type,
            account_number : generator.account_number(),
            account_balance : data.account_balance || 0.00,
            account_manager : req.ADMIN_ID,
            password : await passwordHash(password)
        }).save();
    
        res.status(200).send({ message: "User Successfully Created!", data: newUser });
    } catch ( error ) {
        console.log(error)
        if (error.keyPattern) res.status(400).send({ message: "Email Already Exists!", err: error });
        else res.status(400).send({ message: "Could Not Create User!", err: error });
    }

}