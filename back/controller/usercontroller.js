const { ConsultRegModel, LoginModel, ConsultContractorRegModel ,ConstructorRegModel,ConsultPlanModel,BuildingRegModel,ConsultBiddedWorkModel,UserRegModel} = require('../model/consultmodel');

const path= require('path');

exports.myplanview = async (req, res) => {
    try {
        const { uid } = req.body;
        

        const user = await BuildingRegModel.find({ uid });

        const results = await Promise.all(user.map(async (user) => {
            const userLogin = await LoginModel.findOne({ userid: user._id });

            return {
                ...user.toObject(),
                email: userLogin?.email || "No email found"
            };
        }));

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



// exports.myplanview = async (req, res) => {
//   try {
//     const { uid } = req.body;

//     const plans = await BuildingRegModel.find({ uid });

//     const result = await Promise.all(
//       plans.map(async (plan) => {
//         // check if any consultplan with status 1 for this plan
//         const assigned = await ConsultPlanModel.findOne({
//           planid: plan._id,
//           status: 1,
//         });

//         return {
//           ...plan._doc,
//           hasAssignedEstimate: !!assigned,
//           assignedEstimatePrice: assigned?.estimateprice || null,
//         };
//       })
//     );

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch plans" });
//   }
// };



//delete user plans

exports.PlanDeleteByUser = async (req, res) => {
    try {
      const { id } = req.body;
  
      
      // Also delete from BuildingRegModel (assuming same ID or a related field)
      await BuildingRegModel.findByIdAndDelete(id);


      // Delete from LoginModel
      await LoginModel.findOneAndDelete({userid:id});
  
  
      res.json("Deleted from both models");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete" });
    }
  };


exports.planview = async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userPlans = await BuildingRegModel.find({ uid });

    if (!userPlans.length) {
      return res.status(404).json({ message: "No plans found for this user" });
    }

    res.json(userPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// 

exports.UserPlanview= (async (req, res) => {
    try {
        let data = await LoginModel.find({userstatus:3}).populate("userid")
        console.log(data);

        res.json(data)
    }
    catch (err) {
        console.log(err);

    }
})

exports.userplan = async (req, res) => {
  try {
    const { uid } = req.body;

    console.log("UID received:", uid);

    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userPlans = await BuildingRegModel.find({ uid });

    if (!userPlans || userPlans.length === 0) {
      return res.status(404).json({ message: "No plans found for this user." });
    }

    return res.status(200).json(userPlans);
  } catch (err) {
    console.error("Error fetching user plans:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// Get estimates for a specific plan
exports.ViewEstimateByUser=async (req, res) => {
  try {
    const { planid } = req.body;
    const estimates = await ConsultPlanModel.find({ planid }).populate("consultid");
    res.json(estimates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Assign selected estimate (update status)
exports.SelectEstimateByUser= async (req, res) => {
  try {
    const { estimateid } = req.body;
    await ConsultPlanModel.findByIdAndUpdate(estimateid, { status: 1 });
    res.json({ message: "Estimate assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assignment failed" });
  }
};




exports.GetAssinged = async (req, res) => {
  try {
    const { userid } = req.query; // Use req.query or req.body depending on method

    const data = await ConsultPlanModel.find({ status: 1, userid })
      .populate('consultid')
      .populate('userid');
console.log(userid);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
};


//supplier assigned works

exports.viewAssignedWorks = async (req, res) => {
  try {
    const { supplierId } = req.body;
    console.log("Supplier ID received:", supplierId);

    const assignedWorks = await ConsultBiddedWorkModel.find({
      assignedSupplier: supplierId, // ✅ match this to your schema field
    })

    res.json(assignedWorks);
  } catch (error) {
    console.error("Error fetching assigned works:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





// Mark a work as delivered
exports.updateSupplierWorkStatus = async (req, res) => {
  try {
    const { workId, status } = req.body;

    if (!workId || !status) {
      return res.status(400).json({ error: "Work ID and status are required" });
    }

    const updatedWork = await ConsultBiddedWorkModel.findByIdAndUpdate(
      workId,
      { deliveryStatus: status },  //  Correct field
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ error: "Work not found" });
    }

    res.json({ message: "Status updated successfully", updatedWork });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};







///userprofile viewww

exports.userProfile = async (req, res) => {
  try {
    const { userids } = req.body;

    // 1. Fetch user profile
    const user = await UserRegModel.findById(userids);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Fetch email from login model
    const login = await LoginModel.findOne({ userid: userids });
    if (!login) {
      return res.status(404).json({ error: 'Login details not found' });
    }

    // 3. Return combined profile
    res.json({
      name: user.name,
      address: user.address,
      phonenumber: user.phonenumber,
      email: login.email,
    });

  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// UPDATE user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userid, name, address, phonenumber, email } = req.body;

    // 1. Update the user profile
    const updatedUser = await UserRegModel.findByIdAndUpdate(
      userid,
      { name, address, phonenumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found for update' });
    }

    // 2. Update the email in Login model
    const updatedLogin = await LoginModel.findOneAndUpdate(
      { userid },
      { email },
      { new: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({ error: 'Login not found for update' });
    }

    // 3. Send updated profile
    res.json({
      name: updatedUser.name,
      address: updatedUser.address,
      phonenumber: updatedUser.phonenumber,
      email: updatedLogin.email,
    });

  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};





exports.getConsultPlanByUserId = async (req, res) => {
  try {
    // Find the assigned consult plan (status: 1) for this user
    const consultPlan = await ConsultPlanModel.findOne({
      userid: req.params.userId,
      status: 1
    }).populate("consultid");

    if (!consultPlan) {
      return res.status(404).json({ message: "No assigned consult plan found" });
    }

    // Respond with assigned status and plan details
    res.json({
      assigned: true,
      consultPlan
    });
  } catch (error) {
    console.error("Error in getConsultPlanByUserId:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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