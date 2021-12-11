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
    email : {
        type : String,
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
    adminAccess : {
        type : String,
        default : "false"
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

module.exports.Admin = mongoose.model("admin", adminSchema);