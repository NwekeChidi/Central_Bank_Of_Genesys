// import dependensies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    fullName : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    cbg_number : {
        type : String,
        unique : true,
        required : true
    },
    account_type : {
        type : String,
        default : "Savings"
    },
    account_number : {
        type : Number,
        unique : true
    },
    account_balance : {
        type : Number,
        default : 0.00
    },
    virtual_card : {
        type : Schema.Types.ObjectId,
        ref : "cards"
    },
    transactions : {
        type : Array,
        default : [] 
    },
    loan : {
        legible : {
            type : String,
            default : "No"
        },
        loans : {
            type : Schema.Types.ObjectId,
            ref : "loans"
        }
    },
    password : {
        type : String,
        required : true
    }
},
{
    timestamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
})

module.exports.User = mongoose.model("user", userSchema);