const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");



const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email:{
        type:String,
        required: [true,"Please provide your email"],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide  valid email"
        ]
    },
    password:{
        type:String,
        minlength:[6,"Please provide a password with min length"],
        required:[true,"Please provide a password"],
        select:false
    },
    confirmPassword:{
        type:String,
        minlength:[6,"Please provide a password with min length"],
        required:[true,"Please provide a password"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }

});

UserSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        email:this.email
    };

    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token
};

UserSchema.pre("save",function (next) {
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) next(err);
            this.password=hash;
            next();
        });
    });
});


module.exports=mongoose.model("User",UserSchema);
