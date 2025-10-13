const { ConsultRegModel, LoginModel, ConsultContractorRegModel, ConstructorRegModel, SupplierRegModel, ConsultBiddedWorkModel, ConsultPlanModel } = require('../model/consultmodel');

exports.ConsultRegisterIndex = async (req, res) => {
  try {
    const register = {
      name: req.body.name,
      address: req.body.address,
      license: req.body.license,
      experience: req.body.experience,
      approvestatus: req.body.approvestatus,

    }
    const newreg = await ConsultRegModel.create(register)

    const login = {
      email: req.body.email,
      password: req.body.password,
      userstatus: req.body.userstatus,
      userid: newreg._id,
      regtype: "consultregister"
    }
    await LoginModel.create(login)
    res.json("success")
  }
  catch (err) {
    console.log(err);

  }
}

exports.formView = (async (req, res) => {
  try {
    let data = await LoginModel.find({ userstatus: 1 }).populate("userid")


    res.json(data)
  }
  catch (err) {
    console.log(err);

  }
})


exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await LoginModel.findOne({ email });

    if (!user) {
      console.log("user not found");
      return res.json("user not found");
    }

    if (user.password !== password) {
      console.log("wrong password");
      return res.json("wrong password");
    }

    // Check approvestatus for consultants
    if (user.userstatus === 1) {
      const consult = await ConsultRegModel.findOne({ _id: user.userid, approvestatus: 1 });
      if (!consult) {
        console.log("Consult user not approved");
        return res.json("Consult user not approved");
      }
    }

    // Check approvestatus for constructors
    else if (user.userstatus === 2) {
  const constructor = await ConstructorRegModel.findOne({ _id: user.userid, approvestatus: 1 });

  if (!constructor) {
    // Try checking in ConsultContractorRegModel if not found in ConstructorRegModel
    const backupConstructor = await ConsultContractorRegModel.findOne({ _id: user.userid, approvedby: "2" });

    if (!backupConstructor) {
      console.log("Constructor user not approved in any source");
      return res.json("Constructor user not approved");
    }
  }
}


    // For other valid userstatus (0, 3, 4), no approval needed
    else if (![0, 3, 4].includes(user.userstatus)) {
      console.log("Invalid user status");
      return res.json("Invalid user status");
    }

    // Login successful
    req.session.user = user;
    console.log("success");
    return res.json(user);

  } catch (err) {
    console.log("Error in login:", err);
    return res.status(500).json("Internal server error");
  }
};







exports.approveUpdate = (async (req, res) => {
  try {
    const { id, approvestatus } = req.body;
    const updatedConsult = await ConsultRegModel.findOneAndUpdate({ _id: id }, { approvestatus: approvestatus });

    res.json({ message: "Approval status updated", consult: updatedConsult });

  }
  catch (err) {
    console.error("error occur", err);

  }
})


exports.approveReject = (async (req, res) => {
  try {
    const { id, approvestatus } = req.body;
    const updatedConsult = await ConsultRegModel.findOneAndUpdate({ _id: id }, { approvestatus: approvestatus });
    console.log("updated", updatedConsult);
    res.json({ message: "Approval status Rejected", consult: updatedConsult });

  }
  catch (err) {
    console.error("error occur", err);

  }
})



exports.ConsultConstructorRegisterIndex = async (req, res) => {
  try {
    const register = {
      name: req.body.name,
      address: req.body.address,
      license: req.body.license,
      experience: req.body.experience,
      cid: req.body.cid,
      approvedby: req.body.approvedby,


    }
    const newreg = await ConsultContractorRegModel.create(register)

    const login = {
      email: req.body.email,
      password: req.body.password,
      userstatus: req.body.userstatus,
      userid: newreg._id,
      regtype: "consultcontractorregister"
    }
    await LoginModel.create(login)
    res.json("success")
  }
  catch (err) {
    console.log(err);

  }
}

exports.formViews = (async (req, res) => {
  try {
    let data = await LoginModel.find({ userstatus: 1 }).populate("userid")


    res.json(data)
  }
  catch (err) {
    console.log(err);

  }
})





exports.constructorview = async (req, res) => {
  try {
    const { cid } = req.body;


    const constructor = await ConsultContractorRegModel.find({ cid });

    const results = await Promise.all(constructor.map(async (constructor) => {
      const constructorLogin = await LoginModel.findOne({ userid: constructor._id });

      return {
        ...constructor.toObject(),
        email: constructorLogin?.email || "No email found"
      }; 
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





//supplier regisrrationn

exports.SupplierRegisterIndex = async (req, res) => {
  try {
    const register = {
      supplierType: req.body.supplierType,
      supplierName: req.body.supplierName,
      businessRegNumber: req.body.businessRegNumber,
      dateOfAssociation: req.body.dateOfAssociation,
      contractorNo: req.body.contractorNo,


    }
    const newreg = await SupplierRegModel.create(register)

    const login = {
      email: req.body.email,
      password: req.body.password,
      userstatus: req.body.userstatus,
      userid: newreg._id,
      regtype: "supplierregister"
    }
    await LoginModel.create(login)
    res.json("success")
  }
  catch (err) {
    console.log(err);

  }
}


exports.SupplierformView = (async (req, res) => {
  try {
    let data = await LoginModel.find({ userstatus: 4 }).populate("userid")
    console.log(data, "hello logi");

    res.json(data)
  }
  catch (err) {
    console.log(err);

  }
})

//supplier delete
exports.DeleteSupplier = async (req, res) => {
  try {
    const { id } = req.body;

    // Delete from LoginModel
    await SupplierRegModel.findByIdAndDelete(id);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete" });
  }
};



///   user plan estimatess







exports.submitEstimate = async (req, res) => {
  let { consultid, userid, planid, estimateprice } = req.body;

  if (typeof planid === 'string') {
    try {
      planid = JSON.parse(planid);
    } catch {
      return res.status(400).json({ message: "Invalid planid format." });
    }
  }

  if (!Array.isArray(planid)) {
    return res.status(400).json({ message: "planid must be an array." });
  }

  try {
    const estimate = new ConsultPlanModel({
      consultid,
      userid,
      planid,
      estimateprice,
    });

    await estimate.save();
    res.status(201).json({ message: "Estimate submitted successfully", estimate });
  } catch (error) {
    console.error("Error saving estimate:", error);
    res.status(500).json({ message: "Error saving estimate", error });
  }
};

exports.saveEstimate = async (req, res) => {
  try {
    const { planId, estimatedPrice, consultid, userid } = req.body;
    if (!planId || !estimatedPrice || !consultid || !userid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save the estimate
    const estimate = new ConsultPlanModel({
      planid: planId,
      estimateprice: estimatedPrice,
      consultid,
      userid,
    });

    await estimate.save();
    res.status(201).json({ message: "Estimated price saved!", estimate });
  } catch (err) {
    console.error("Error saving estimate:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getEstimates = async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) {
      return res.status(400).json({ message: "planId is required" });
    }
    // Find all estimates for this plan and populate consultancy name
    const estimates = await ConsultPlanModel.find({ planid: planId })
      .populate({ path: "consultid", select: "name" });

    // Format the response to include consultancy name
    const formatted = estimates.map(est => ({
      consultancyName: est.consultid?.name || "Consultancy",
      estimateprice: est.estimateprice
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching estimates:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// bidded work


// GET all constructors
exports.getConstructors = async (req, res) => {
  try {
    let data = await LoginModel.find({ userstatus: 2 }).populate("userid")
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching constructors' });
  }
};




exports.createBiddedWork = async (req, res) => {
  const { consultid = null, constructorid, username, location, items } = req.body;

  try {
    const newWork = new ConsultBiddedWorkModel({
      consultid,
      constructorid,
      username,
      location,
      items,
    });

    await newWork.save();
    res.status(201).json({ message: 'Bidded Work created successfully' });
  } catch (err) {
    console.error('Error saving bidded work:', err); // <-- ADD THIS LINE
    res.status(500).json({ error: 'Error saving bidded work' });
  }
};

exports.updateWork = async (req, res) => {
  const { workId, status } = req.body;
  try {
    const updatedWork = await ConsultBiddedWorkModel.findByIdAndUpdate(
      workId,
      { status: status }, // Update the status field
      { new: true } // Return the updated document  
    );
    if (!updatedWork) {
      return res.status(404).json({
        message: "Bidded work not found"
      });
    }
    res.json({ message: "Bidded work updated successfully", updatedWork });
  } catch (err) {
    console.error("Error updating bidded work:", err);
    res.status(500).json({ message: "Server error while updating bidded work" });
  }

};




exports.getEstimatesByPlan = async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) {
      return res.status(400).json({ message: "planId is required" });
    }
    // Find all estimates for this plan and populate consultancy name
    const estimates = await ConsultPlanModel.find({ planid: planId })
      .populate({ path: "consultid", select: "name" });

    // Format the response to include consultancy name, status, and consultid
    const formatted = estimates.map(est => ({
      consultancyName: est.consultid?.name || "Consultancy",
      estimateprice: est.estimateprice,
      status: est.status,
      consultid: est.consultid, // populated object (for .name in frontend)
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching estimates:", err);
    res.status(500).json({ message: "Server error" });
  }
};









// Add this endpoint if not present
exports.getSupplierDeliveredWorks = async (req, res) => {
  try {
    const { supplierId } = req.body;
    if (!supplierId) {
      return res.status(400).json({ message: "supplierId is required" });
    }

    const deliveredWorks = await ConsultBiddedWorkModel.find({
      assignedSupplier: supplierId,
      deliveryStatus: "Delivery Completed"
    })
      .populate("constructorid", "name")
      .exec();

    res.json(deliveredWorks);
  } catch (err) {
    console.error("Error fetching delivered works for supplier:", err);
    res.status(500).json({ message: "Server error" });
  }
};