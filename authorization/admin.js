// import dependencies
const { User } = require("./../models/user");
const generator = require("./../helpers/generators");

exports.createUser = async ( data ) => {

    const newUser = await new User({
        firstName : data.firstName,
        lastName : data.lastName,
        fullName : data.firstName+" "+data.lastName,
        email: data.email,
        phone : data.phone,
        adddress : data.address,
        occupation : data.occupation,
        dob : data.dob,
        cbg_number : generator.cbg_number(),
        account_type : data.account_type,
        account_number : generator.account_number(),
        account_balance : data.account_balance || 0.00
    }).save();

}