const jsonwebtoken=require("jsonwebtoken");

const jwtManager=(user)=>{


    //jsonwebtoken.sign() is used to create a JWT token.
    const accessToken= jsonwebtoken.sign({
        _id:user._id,
        name:user.name,
    },process.env.jwt_salt);



    return accessToken;
}

module.exports=jwtManager;