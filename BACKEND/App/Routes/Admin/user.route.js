
"use strict"

const router = require("express").Router()

const { AddEmployee} = require('../../Controllers/Admin/user.controller')



router.get('/add-employee', AddEmployee)


module.exports = router;


