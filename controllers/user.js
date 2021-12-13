// Import Dependencies
const { User } = require("./../models/user");
const { Deposit,
    Withdrawal,
    CreditCard,
    DebitCard,
    Loan,
    Transfer } = require("./../models/userAux");


// Deposit Money
exports.deposit =  async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ _id: req.USER_ID });
    if (!user) return res.status(400).send({ message: "User Not Found" });

    try {
        const newDeposit = await new Deposit({
            user : req.USER_ID,
            amount : data.amount
        }).save();

        user.account_balance += newDeposit.amount;
        user.transactions.push(newDeposit);

        const updatedUser = await User.findOneAndUpdate(
            { _id : req.USER_ID },
            { $set : user });

        if (!updatedUser) return res.status(400).send({ message : "Could Not Update Account"});
        
        newDeposit.account_balance = user.account_balance;
        newDeposit.account_number = user.account_number.substring(0, 3)+"xxxx"+user.account_number.substring(7, 10);
        res.status(200).send({ message : "Deposit Successful!", data : newDeposit })
    } catch (error) {
        res.status(400).send({ message:"Could Not Make Deposit", err:error })
    }
}

