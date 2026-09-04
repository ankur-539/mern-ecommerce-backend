import mongoose, { model } from 'mongoose'

const schema = new mongoose.Schema({
    username:{
        type:String
    },
    pass:{
        type:String
    },
    dob:{
        type:String
    },
    emailid:{
        type:String
    },
    userphone:{
        type:Number
    },
    profileurl:{
        type:String
    },
    gender:{
        type:String
    },
    role:{
        type:String
    }
});


const mymodel = mongoose.model("info",schema);

export default mymodel;