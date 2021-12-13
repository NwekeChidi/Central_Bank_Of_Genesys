// import dependensies
const mongoose = require("mongoose");
const { Schema } = mongoose;
const date = require("date-and-time");
const now = new Date();

// Deposit model
const Deposit = mongoose.model("deposit", new Schema({
    
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    account_number : {
        type : String
    },
    transcation_type : {
        type : String,
        default : "deposit"
    },
    amount : {
        type : Number,
        required : true
    },
    account_balance : {
        type : Number
    },
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));


// Withdrawal Model
const Withdrawal = mongoose.model("withrawal", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    transcation_type : {
        type : String,
        default : "withdrawal"
    },
    amount : {
        type : String,
        required : true
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));


// Transfer model
const Transfer = mongoose.model("transfer", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    reciever_acc_no : {
        type : Number,
        required : true
    },
    reciever_bank : {
        type : String,
        required : true
    },
    transcation_type : {
        type : String,
        enum : ["CR", "DR", "RVSL"],
        trim : true
    },
    amount : {
        type : String,
        required : true
    },
    narration : {
        type : String
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));


// Debit Card Model
const DebitCard = mongoose.model("debit_card", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    card_iss : {
        type : String,
        default : "debit"
    },
    card_type : {
        type : String,
        enum : ["visa", "verve", "mastercard", "crypty", "dollar"],
        default : "verve",
        lowercase : true,
        trim : true
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));


// Credit Card Model
const CreditCard = mongoose.model("credit_card", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    card_iss : {
        type : String,
        default : "credit"
    },
    card_type : {
        type : String,
        enum : ["visa", "verve", "mastercard", "crypty", "dollar"],
        default : "verve",
        lowercase : true,
        trim : true
    },
    credit_points : {
        type : Number,
        default : 1000
    },
    valid_thru : {
        type : String,
        default : String(Number(date.format(now, "YY"))+2) + "/" + (date.format(now, 'MM'))
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));


// Loan Model
const Loan = mongoose.model("loan", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    collateral : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        enum : [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
        required : true
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));

module.exports = {
    Deposit,
    Withdrawal,
    CreditCard,
    DebitCard,
    Loan,
    Transfer
}