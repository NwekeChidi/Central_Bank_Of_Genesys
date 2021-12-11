// import dependensies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    fullName : {
        type : String
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
    role : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    adminAccess : {
        type : Boolean,
        default : false
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

exports.Admin = mongoose.model("admin", adminSchema);