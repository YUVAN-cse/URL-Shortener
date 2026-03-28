import ErrorClass from "./ErrorClass.js";

export default function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(new ErrorClass(500 , err.message))
        });
    }
}