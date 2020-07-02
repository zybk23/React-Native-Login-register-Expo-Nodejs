const CustomError=require("./CutomError");

const customErrorHandler=((err,req,res,next)=>{
    if(err.name==="SyntaxError"){
        err=new CustomError("Unexpected Syntax",400)
    }
    if(err.name==="CastError"){
        err=new CustomError("Please provide a valid id",400)
    }
    if(err.name==="ValidationError"){
        err=new CustomError(err.message,400)
    }

    res.status(200)
        .json({
            success:true,
            message:err.message
        })
});

module.exports=customErrorHandler;
