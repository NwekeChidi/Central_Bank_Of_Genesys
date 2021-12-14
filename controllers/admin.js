// Import Dependencies
const { User } = require("./../models/user");
const generator = require("./../helpers/generators");
const { Transfer } = require("./../models/userAux");
const bcrypt = require("bcrypt"), salt = 15, password = "123456";
const passwordHash = async (password) => { return await bcrypt.hash(password, salt)};


// Create User
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
            gender : data.gender,
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


// Delete User
exports.deleteUser = async ( req, res ) => {
    const users = await User.findOne({ _id : req.params.user_id });
    
    if (!users) res.status(404).send({ message: "User Not Found!" });
    
    try {
        users.remove();
        res.status(200).send({ message: "User Deleted Successfully!" })
    } catch (error) {
        res.status(400).send({ message: "Could Not Delete User!", err: error })
    }
}


// Reverse Transactions
exports.reverse = async ( req, res ) => {
    const transfer = await Transfer.findOne({ _id:req.params.transfer_id });
    if (!transfer) return res.status(400).send({ message : "Transfer Not Found!" });

    const sender = await User.findOne({ _id : transfer.user }), reciever = await User.findOne({ reciever_acc_no: transfer.reciever_acc_no });
    if (!sender || !reciever ) return res.status(400).send({ message : "Sender And Or Reciever Not Found!" });
    try {
        const reversal = await new Transfer({
            admin : req.ADMIN_ID,
            sender : sender.fullName,
            transaction_type : "RVSL",
            reciever_acc_no : transfer.reciever_acc_no,
            reciever_bank : transfer.reciever_bank,
            amount : transfer.amount,
            narration : transfer.narration
        }).save();

        sender.account_balance += transfer.amount; reciever.account_balance -= transfer.amount;
        sender.transactions.push(reversal); reciever.transactions.push(reversal);

        const updatedSender = await User.findOneAndUpdate(
            { _id : sender._id },
            { $set : sender }), updatedReciever = await User.findOneAndUpdate(
                { _id : reciever._id },
                { $set : reciever });

        if (!updatedReciever || !updatedSender) return res.status(400).send({ message: "Could Not Update Account!" });
        


        res.status(200).send({ message : "Transaction Reversal Successful!", data:reversal });
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Unable To Reverse Transaction", err: error})
    }
}