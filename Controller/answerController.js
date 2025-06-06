//This file contains the logic for handling the incoming answer data, validating it, and storing it in the database.
const dbconnection = require ('../Db/dbConfig')
const StatusCodes = require ('http-status-codes')

async function postAnswer (req,res) {
    //1. get data from request body
    const {answer, questionid, userid} = req.body;
    

    //2.input validation
    if (!answer || !questionid || !userid) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'Please provide answer!'})
    }
    try {
        //3.database insertion
        await dbconnection.query(
            "INSERT INTO answer(userid, questionid, answer) VALUES (?,?,?)",[userid,questionid,answer]
        );
        //4. send success response
        return res.status (StatusCodes.CREATED).json({msg:"Answer posted successfully!"})
    }catch(error){
        //5.handle errors
        console.error("Error posting answer:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"An unexpected error occurred."})
    }
}
module.exports = {postAnswer};