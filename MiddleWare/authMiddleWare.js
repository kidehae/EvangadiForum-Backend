const {StatusCodes}=require("http-status-codes")
const jwt=require("jsonwebtoken")


async function authMiddleware(req,res,next) {

const authHeader=req.headers.authorization

if (!authHeader || !authHeader.starsWith('Bearer')){
    
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Authentication invalid'})
}
//  removing bearer prefix from the authHeader

const token = authHeader.slice(7);

try {
const data= jwt.verify(token,process.env.JWT_SECRET)
req.user={username,userid}
next()

}catch (error) {
const message =
    error.name === "TokenExpiredError"
        ? "Token expired"
        : "Authentication invalid";

return res.status (StatusCodes.UNAUTHORIZED).json({msg:message})
}
}

// "data": {
    //     "username": "Gir",
    //     "userid": 10,
    //     "iat": 1696211748,
    //     "exp": 1696298148
    //   }

module.exports=authMiddleware
