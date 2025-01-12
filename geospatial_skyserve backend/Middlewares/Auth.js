const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers('authorization');

    if(!auth){
        return res.status(401).json({message:"Unauthorized, JWT token is Required"});
    }

    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
    } catch(err){
        return res.status(401).json({message:"Unauthorized, JWT token is Wrong"})
    }
}


module.exports = ensureAuthenticated;