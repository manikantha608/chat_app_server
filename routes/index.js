const express = require("express")
const registerUser = require("../controllers/registerUser")
const checkEmail = require("../controllers/checkEmail")
const checkPassword = require("../controllers/checkPassword")
const userDetails = require("../controllers/userDetails")
const logout = require("../controllers/logout")
const updateUserDetails = require("../controllers/updateUserDetails")
const searchUser = require("../controllers/searchUser")
const router = express.Router()

//for registration
router.post("/register",registerUser)
//for email check
router.post("/email",checkEmail)
//for password
router.post("/password",checkPassword)
//for user details
router.get("/user-details",userDetails)
//for logout
router.get("/logout",logout)
//for update the details
router.post("/update-user",updateUserDetails)
//for search user
router.post("/search-user",searchUser)
module.exports = router;