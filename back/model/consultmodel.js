const mongoose = require("mongoose");

const ConsultRegSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  approvestatus: {
    type: Number,
    required: true,
  },
});

const LoginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userstatus: {
    type: Number,
    default: 0,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "regtype",
  },
  regtype: {
    type: String,
    enum: [
      "consultregister",
      "constructorregister",
      "consultcontractorregister",
      "userregister",
      "supplierregister",
    ],
    required: true,
  },
});

// Create models for the constructor registration and login schemas

const ConstructorRegSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  approvestatus: {
    type: Number,
    required: true,
  },
});

// Create models for the constructor registration by consultency

const ConsultContractorRegSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "consultregister",
  },
  approvedby: {
    type: String,
    required: true,
  },
});

// Create models for the suppliers registration

const SupplierRegSchema = mongoose.Schema({
  supplierType: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  businessRegNumber: {
    type: String,
    required: true,
  },
  dateOfAssociation: {
    type: String,
    required: true,
  },
  contractorNo: {
    type: String,
    required: true,
  },

  // email:{
  //     type:String,
  //     required:true
  // },
  // password:{
  //     type:String,
  //     required:true
  // }
});

// Create models for the Labour registration

const LabourRegSchema = mongoose.Schema({
  labourType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  aadhaarNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  labourStatus: {
    type: Number,
    default: 0,
  },
});

// Create models for the user registration

const UserRegSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  userstatus: {
    type: Number,
    default: 3,
  },
});

// Create models for the user Plans regisrer
const BuildingRegSchema = mongoose.Schema({
  category: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  landpaper: {
    type: String,
    required: false,
  },
  buildingname: {
    type: String,
    required: false,
  },
  estimatecost: {
    type: String,
    required: false,
  },
  estimatetime: {
    type: String,
    required: false,
  },
  totalarea: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  additionalnotes: {
    type: String,
    required: false,
  },
  vtype: {
    type: String,
    required: false,
  },
  vimage: {
    type: String,
    required: false,
  },
  landpapervilla: {
    type: String,
    required: false,
  },
  villaname: {
    type: String,
    required: false,
  },
  vestimatecost: {
    type: String,
    required: false,
  },
  vestimatetime: {
    type: String,
    required: false,
  },
  vtotalarea: {
    type: String,
    required: false,
  },
  vlocation: {
    type: String,
    required: false,
  },
  requirements: {
    type: String,
    required: false,
  },
  roadtype: {
    type: String,
    required: false,
  },
  roadlength: {
    type: String,
    required: false,
  },
  roadimage: {
    type: String,
    required: false,
  },
  roadestimatecost: {
    type: String,
    required: false,
  },
  roadestimatetime: {
    type: String,
    required: false,
  },
  roadlocation: {
    type: String,
    required: false,
  },
  obstacles: {
    type: String,
    required: false,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userregister",
  },

});

const ConsultPlanSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userregister",
  },
  consultid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "consultregister",
  },
  estimateprice: {
    type: String,
    required: true,
  },
  planid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buildingregister",
  },
  status: {
    type: Number,
    default: 0,
  },
});

//consultancy bidded work

const ConsultBiddedWorkSchema = mongoose.Schema({
  consultid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "consultregister",
  },
  constructorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "constructorregister",
  },

  username: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  items: {
    type: String,
    required: true,
  },
   itemsrequired: {
    type: String,
    required: false,
  },
  assignedSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplierregister",
  },
  assignedLabour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "labourregister",
  },
  deliveryStatus: {
    type: String,
    default: "Pending",
  },
  status: {
    type: Number,
    default: 0,
  },
});

const ConsultBiddedWorkModel = mongoose.model(
  "consultbiddedwork",
  ConsultBiddedWorkSchema
);
const ConsultPlanModel = mongoose.model("consultplan", ConsultPlanSchema);
const BuildingRegModel = mongoose.model("buildingregister", BuildingRegSchema);
const UserRegModel = mongoose.model("userregister", UserRegSchema);
const LabourRegModel = mongoose.model("labourregister", LabourRegSchema);
const SupplierRegModel = mongoose.model("supplierregister", SupplierRegSchema);
const ConsultContractorRegModel = mongoose.model(
  "consultcontractorregister",
  ConsultContractorRegSchema
);
const ConstructorRegModel = mongoose.model(
  "constructorregister",
  ConstructorRegSchema
);
const ConsultRegModel = mongoose.model("consultregister", ConsultRegSchema);
const LoginModel = mongoose.model("login", LoginSchema);
module.exports = {
  ConsultRegModel,
  LoginModel,
  ConstructorRegModel,
  ConsultContractorRegModel,
  SupplierRegModel,
  LabourRegModel,
  UserRegModel,
  BuildingRegModel,
  ConsultPlanModel,
  ConsultBiddedWorkModel,
};
