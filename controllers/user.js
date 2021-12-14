// Import Dependencies
const { User } = require("./../models/user");
const generator = require("./../helpers/generators");
const bcrypt = require("bcrypt");
const { 
    BaseTransactions,
    Card,
    //Loan,
    Transfer } = require("./../models/userAux");



// Deposit / Withdraw Money
exports.base_transactions =  async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ _id: req.USER_ID });
    if (!user) return res.status(400).send({ message: "User Not Found" });

    if (data.transaction_type === "withdrawal"){
        if (user.account_balance < data.amount) return res.status(200).send({ message : "Insufficient Funds!" })
    }
    try {
        const base_transaction = await new BaseTransactions({
            user : req.USER_ID,
            amount : data.amount,
            transaction_type : data.transaction_type
        }).save();

        if (data.transaction_type === "deposit"){
            user.account_balance += base_transaction.amount
        } else {
            user.account_balance -= base_transaction.amount;
        }
        user.transactions.push(base_transaction);

        const updatedUser = await User.findOneAndUpdate(
            { _id : req.USER_ID },
            { $set : user });

        if (!updatedUser) return res.status(400).send({ message : "Could Not Update Account"});
        
        base_transaction.account_balance = user.account_balance;
        base_transaction.account_number = user.account_number.substring(0, 3)+"xxxx"+user.account_number.substring(7, 10);
        res.status(200).send({ message : "Transaction Successful!", data : base_transaction })
    } catch (error) {
        if (error.errors.transaction_type) return res.status(400).send({ message : "Invalid Value For Type Of Transaction!"})
        res.status(400).send({ message:"Transaction Unsuccessful!", err:error })
    }
}


// Transfer Money
exports.transfer =  async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ _id: req.USER_ID });
    if (!user) return res.status(400).send({ message: "User Not Found" });
    
    const reciever = await User.findOne({ account_number: data.reciever_acc_no });
    if (!reciever) return res.status(400).send({ message : "Invalid Reciever's Account Number!" });
    
    if (user.account_balance < data.amount) return res.status(200).send({ message : "Insufficient Funds!" })
    
    try {

        const new_transfer = await new Transfer({
            user : req.USER_ID,
            amount : data.amount,
            reciever_name : reciever.fullName,
            reciever_acc_no : data.reciever_acc_no,
            reciever_bank : data.reciever_bank,
            transaction_type : "T-DR",
            narration : data.narration || "N/A"
        }).save();

        user.account_balance -= new_transfer.amount;
        user.transactions.push(new_transfer);

        const reciever_data = await new Transfer({
            sender : user.fullName,
            amount : data.amount,
            transaction_type : "T-CR",
            narration : new_transfer.narration
        })
        reciever.account_balance += new_transfer.amount;
        reciever.transactions.push(reciever_data);

        const updatedUser = await User.findOneAndUpdate(
            { _id : req.USER_ID },
            { $set : user }), updatedReciever = await User.findOneAndUpdate(
                { account_number : data.reciever_acc_no },
                { $set : reciever });


        if (!updatedUser || !updatedReciever ) return res.status(400).send({ message : "Could Not Update Account"});
        
        new_transfer.account_balance = user.account_balance;
        new_transfer.account_number = user.account_number.substring(0, 3)+"xxxx"+user.account_number.substring(7, 10);
        res.status(200).send({ message : "Transfer Successful!", data : new_transfer })
    
    } catch (error) {
        res.status(400).send({ message:"Transfer Unsuccessful!", err:error })
    }
}


// See A List Of Transactions

exports.getTransactions = async ( req, res ) => {
    const user = await User.findOne({ _id : req.USER_ID });
    if (!user) return res.status(400).send({ message: "User Not Found!" });

    try {
        const transactions = user.transactions;
        if (!transactions) return res.status(400).send({ message: "Transactions Not Found!" });
        if (transactions.length <= 0) return res.status(200).send({ message : "You Have Not Made Any Transactions Yet!" });

        res.status(200).send({ message: "Transactions", data : transactions });
    } catch (error) {
        console.log(error)
        res.status(400).send({ message : "Unable To Get Transactions"})
    }
}


//// Secondary Functions
exports.getCard = async ( req, res ) => {
    const data = req.body;
    const user = await User.findOne({ _id : req.USER_ID });
    if (!user) return res.status(400).send({ message: "User Not Found!" });

    const cards = await Card.findOne({ _id : user.virtual_card });
    if (cards.is_active) return res.status(400).send({ message: "You Already Have An Active Card" });

    if (data.password.length != 4 ) return res.status(401).send({ message : "Password Should Be Only Numbers And Must Be Four In Length!" });
    const salt = 10;
    const passwordHash = async (password) => { return await bcrypt.hash(password, salt)};
    
    try {
        const newCard = await new Card({
            user : req.USER_ID,
            card_iss : data.card_iss,
            card_type : data.card_type,
            credit_points : data.credit_points || null,
            card_number : generator.card_number(data.card_type),
            cvv : generator.cvv(),
            password : await passwordHash(data.password)
        }).save();

        user.virtual_card = newCard._id;
        const updatedUser = await User.findOneAndUpdate(
            { _id : req.USER_ID },
            { $set : user });

        if (!updatedUser) return res.status(400).send({ message : "Could Not Update Account"});

        res.status(200).send({ message: "Virtual Card Issuance Successful!", data: newCard });
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Could Not Issue Card", err: error })
    }
}