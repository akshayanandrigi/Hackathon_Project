// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema.Types;

const foodScema = new mongoose.Schema({
  items:[],
  selected_item:{type:String},
  cost:{type:Number}
}, {timestamps : true})

const tourPlan = new mongoose.Schema({
   from:{type:String},
   to:{type:String},
   start_date_time:{type:Date},
   end_date_time:{type:Date},
   images:{type:[]},
   travel_type:{type:String},
   food:foodScema
}, {timestamps : true})

const tourPostSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: "users",
    index: true
  },
  post_images:[tourPlan],
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  budget:{
      type:Number
  },
  start_date_time:{type:Date},
  end_date_time:{type:Date},
  is_travelling:{type:Boolean},
  privacy:{type:String},
  likes:{type:Number, default: 0},
  comment:{type:Number, default: 0},
  travel_plan:[tourPlan],
  is_active:{type:Boolean, default:true},
  is_deleted:{type:Boolean, default:false},
  extra_cost:{type:Number},
  size:{type:Number, default: 0}
},{timestamps:true});


tourPostSchema.index({user:1, _id:1},{background:true})

module.exports = mongoose.model("tour_post", tourPostSchema);

// {
//     place:"",
//     photos:"",
//     travel_type:"",
//     adventure:"",
//     travel_time:"",
//     travel_expense:"",
//     must_watch:""
// }

// people_joined:[],
// views:[],
// plan:[],
// plan_progress:[],
// comment:[],