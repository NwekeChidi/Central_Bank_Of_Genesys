// Import Dependencies
const { User } = require("./../models/user");
const { 
    BaseTransactions,
    Card,
    Loan,
    Transfer } = require("./../models/userAux");


// Deposit Money
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

