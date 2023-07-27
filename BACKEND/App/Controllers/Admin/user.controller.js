"use strict";

const { User_model } = require('../../Models/user.model')


// Product CLASS
class Employee {
    async AddEmployee(req, res) {
        try {
            // Company Information
            const User = new User_model({
                FullName: "sneeh",
                Email: "SnehJAieswal@gmail.com",
                PhoneNo: "1233e21232"
            });

            const userinfo = User.save()
                .then(async (data) => {
                    console.log("data", data);
                    res.send({ status: true, msg: "successfully Add!", data: userinfo })
                })

        }
        catch (error) {
            res.send({ msg: "Error=>", error })
        }

    }




}


module.exports = new Employee();