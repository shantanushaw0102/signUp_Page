const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/User_SignUp_Login_Details")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo:{
    type : Number,
    required:true,
  },
  address:{
    type:String,
    required:false,
  },
  pinCode:{
    type:Number,
    required:false,
  }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
