// import dependensies
const mongoose = require("mongoose");
const { Schema } = mongoose;
const date = require("date-and-time");
const now = new Date();


// Withdrawal Model
const BaseTransactions = mongoose.model("base_transactions", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    account_number : {
        type : String
    },
    transaction_type : {
        type : String,
        enum : ["deposit", "withdrawal"],
        trim : true,
        lowercase : true,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    account_balance : {
        type : Number
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
    admin : {
        type : Schema.Types.ObjectId,
        ref : "admin"
    },
    sender : {
        type : String
    },
    account_number : {
        type : String
    },
    reciever_name : {
        type : String
    },
    reciever_acc_no : {
        type : Number,
        required : true
    },
    reciever_bank : {
        type : String,
        required : true
    },
    transaction_type : {
        type : String,
        enum : ["T-CR", "T-DR", "RVSL"],
        trim : true
    },
    amount : {
        type : Number,
        required : true
    },
    narration : {
        type : String
    },
    account_balance : {
        type : Number
    }
},
{
    timestamps : {
        createdAt : "created_at"
    }
}));



// Card Model
const Card = mongoose.model("card", new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    card_iss : {
        type : String,
        enum : ["debit", "credit"],
        lowercase : true,
        required : true,
        trim : true
    },
    card_type : {
        type : String,
        enum : ["visa", "verve", "mastercard", "crypty", "dollar"],
        default : "verve",
        lowercase : true,
        trim : true
    },
    is_active : {
        type : Boolean,
        default : true
    },
    card_number : {
        type : String
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
    BaseTransactions,
    Card,
    Loan,
    Transfer
}