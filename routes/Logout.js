const express = require("express")
const logout = express.Router()
const cors = require('cors')
const passport = require('passport')

logout.get('/', (req, res) => {
    console.log('key: ' + req.session.key)
    //Check if session exists using the session's key
    if(req.session.key !== undefined) {
        //Logout by calling passport's logout function to invalid session id by stripping out serialized user id
        req.logout();
        //Destroy session stored in redis
        req.session.destroy(function(error){
            if (error) {
              res.json({"error" : true ,"message" : error})
            }
            else {
              res.json({"error" : false})
            }
        })
    }
    else {
        res.json({"error" : true ,"message" : "Logout unsuccessful."})
    }
})
module.exports = logout
