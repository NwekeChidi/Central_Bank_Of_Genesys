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
    occupation: {
        type : String,
        required: true
    },
    dob : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    cbg_number : {
        type : String,
        unique : true,
    },
    account_type : {
        type : String,
        required : true,
    },
    account_number : {
        type : String,
        unique : true
    },
    account_balance : {
        type : Number,
        required : true
    },
    virtual_card : {
        type : Schema.Types.ObjectId,
        ref : "card"
    },
    transactions : {
        type : Array,
        default : [] 
    },
    is_active : {
        type : Boolean,
        default : true
    },
    loan : {
        legible : {
            type : String,
            default : "No"
        },
        loans : {
            type : Schema.Types.ObjectId,
            ref : "loan"
        }
    },
    password : {
        type : String
    },
    account_manager : {
        type : Schema.Types.ObjectId,
        ref : "admin",
    }
},
{
    timestamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
})

module.exports.User = mongoose.model("user", userSchema);