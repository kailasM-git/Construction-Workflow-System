const { ConstructorRegModel, LoginModel, ConsultContractorRegModel, LabourRegModel, UserRegModel, ConsultBiddedWorkModel, BuildingRegModel } = require('../model/consultmodel');
const path = require("path")
exports.ConstructorRegisterIndex = async (req, res) => {
  try {
    const register = {
      name: req.body.name,
      address: req.body.address,
      license: req.body.license,
      experience: req.body.experience,
      approvestatus: req.body.approvestatus,

    }
    const newreg = await ConstructorRegModel.create(register)

    const login = {
      email: req.body.email,
      password: req.body.password,
      userstatus: req.body.userstatus,
      userid: newreg._id,
      regtype: "constructorregister"
    }
    await LoginModel.create(login)
    res.json("success")
  }
  catch (err) {
    console.log(err);

  }
}

exports.ConstructorFirstView = (async (req, res) => {
  try {
    let data = await LoginModel.find({ userstatus: 2 }).populate("userid")
    console.log(data);

    res.json(data)
  }
  catch (err) {
    console.log(err);

  }
})

exports.formDelete = async (req, res) => {
  try {
    const { id } = req.body;


    // Also delete from ConsultContractorRegModel (assuming same ID or a related field)
    await ConsultContractorRegModel.findByIdAndDelete(id);


    // Delete from LoginModel
    await LoginModel.findOneAndDelete({ userid: id });


    res.json("Deleted from both models");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete" });
  }
};


exports.formEdit = (async (req, res) => {
  try {
    let e = await LoginModel.findById(req.body.id)
    res.json(e)

  }
  catch (err) {

    console.log(err);

  }
})

exports.formEditByid = (async (req, res) => {

  try {
    let e = await LoginModel.findByIdAndUpdate(req.body.id, req.body)
    console.log(e);

    res.json(e)

  }
  catch (err) {
    console.log(err);

  }
})

//Labour regisrrationn

exports.LabourRegisterIndex = async (req, res) => {
  try {
    const register = {
      labourType: req.body.labourType,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      gender: req.body.gender,
      mobileNo: req.body.mobileNo,
      aadhaarNumber: req.body.aadhaarNumber,
      email: req.body.email,
      password: req.body.password,
      labourStatus: req.body.labourStatus,
    };
    await LabourRegModel.create(register);
    res.json({ message: "Supplier registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};


exports.LabourformView = (async (req, res) => {
  try {
    let data = await LabourRegModel.find()
    console.log(data, "hello logi");

    res.json(data)
  }
  catch (err) {
    console.log(err);

  }
})

//Labour delete
exports.DeleteLabour = async (req, res) => {
  try {
    const { id } = req.body;

    // Delete from LoginModel
    await LabourRegModel.findByIdAndDelete(id);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete" });
  }
};



// Adjust path if needed

// POST /consultant/updatelabourstatus
exports.updateLabourStatus = async (req, res) => {
  const { id, labourStatus } = req.body;

  if (!id || typeof labourStatus !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    const updated = await LabourRegModel.findByIdAndUpdate(
      id,

      { labourStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Labour not found' });
    }

    return res.json({ success: true, message: 'Labour status updated', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


// User registration

exports.UserRegisterIndex = async (req, res) => {
  try {
    const register = {
      name: req.body.name,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      userstatus: req.body.userstatus,


    }
    const newreg = await UserRegModel.create(register)

    const login = {
      email: req.body.email,
      password: req.body.password,
      userstatus: req.body.userstatus,
      userid: newreg._id,
      regtype: "userregister"
    }
    await LoginModel.create(login)
    res.json("success")
  }
  catch (err) {
    console.log(err);

  }
}






exports.BuildingRegisterIndex = async (req, res) => {
  try {
    const category = req.body.category;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    let building = {};

    if (category === "buildings") {
      const file = req?.files?.image;
      const landpaperFile = req?.files?.landpaper;

      if (!file || !landpaperFile) {
        return res.status(400).json({ error: "Image or Landpaper file not provided" });
      }

      const imageFileName = file.name;
      const landpaperFileName = landpaperFile.name;
      const imagePath = path.join(__dirname, "../assect/", imageFileName);
      const landpaperPath = path.join(__dirname, "../assect/", landpaperFileName);

      file.mv(imagePath, (err) => {
        if (err) {
          console.error("Image upload error:", err);
          return res.status(500).json({ error: "Image upload failed" });
        }

        landpaperFile.mv(landpaperPath, async (err2) => {
          if (err2) {
            console.error("Landpaper upload error:", err2);
            return res.status(500).json({ error: "Landpaper upload failed" });
          }

          try {
            building = {
              category,
              type: req.body.type,
              image: imageFileName,
              landpaper: landpaperFileName,
              buildingname: req.body.buildingname,
              estimatecost: req.body.estimatecost,
              estimatetime: req.body.estimatetime,
              totalarea: req.body.totalarea,
              location: req.body.location,
              additionalnotes: req.body.additionalnotes,
              uid: req.body.uid,
            };

            await BuildingRegModel.create(building);
            res.json("Success");
          } catch (dbErr) {
            console.error("Database error:", dbErr);
            res.status(500).json({ error: "Database error" });
          }
        });
      });

    } else if (category === "villas") {
      const file1 = req?.files?.vimage;
      const landpaperVillaFile = req?.files?.landpapervilla;

      if (!file1 || !landpaperVillaFile) { 
        return res.status(400).json({ error: "Villa image or landpapervilla file not provided" });
      }

      const villaImageFileName = file1.name;
      const landpaperVillaFileName = landpaperVillaFile.name;
      const villaImagePath = path.join(__dirname, "../assect/", villaImageFileName);
      const landpaperVillaPath = path.join(__dirname, "../assect/", landpaperVillaFileName);

      file1.mv(villaImagePath, (err) => {
        if (err) {
          console.error("Villa image upload error:", err);
          return res.status(500).json({ error: "Villa image upload failed" });
        }

        landpaperVillaFile.mv(landpaperVillaPath, async (err2) => {
          if (err2) {
            console.error("Landpapervilla upload error:", err2);
            return res.status(500).json({ error: "Landpapervilla upload failed" });
          }

          try {
            building = {
              category,
              vtype: req.body.vtype,
              vimage: villaImageFileName,
              landpapervilla: landpaperVillaFileName,
              villaname: req.body.villaname,
              vestimatecost: req.body.vestimatecost,
              vestimatetime: req.body.vestimatetime,
              vtotalarea: req.body.vtotalarea,
              vlocation: req.body.vlocation,
              requirements: req.body.requirements,
              uid: req.body.uid,
            };

            await BuildingRegModel.create(building);
            res.json("Success");
          } catch (dbErr) {
            console.error("Database error:", dbErr);
            res.status(500).json({ error: "Database error" });
          }
        });
      });

    } else if (category === "roads") {
      const file2 = req?.files?.roadimage;

      if (!file2) {
        return res.status(400).json({ error: "roadImage file not provided" });
      }

      const fileName2 = file2.name;
      const imagePath = path.join(__dirname, "../assect/", fileName2);

      file2.mv(imagePath, async (err) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({ error: "File upload failed" });
        }

        try {
          building = {
            category,
            roadtype: req.body.roadtype,
            roadlength: req.body.roadlength,
            roadimage: fileName2,
            roadestimatecost: req.body.roadestimatecost,
            roadestimatetime: req.body.roadestimatetime,
            roadlocation: req.body.roadlocation,
            obstacles: req.body.obstacles,
            uid: req.body.uid,
          };

          await BuildingRegModel.create(building);
          res.json("Success");
        } catch (dbErr) {
          console.error("Database error:", dbErr);
          res.status(500).json({ error: "Database error" });
        }
      });

    } else {
      return res.status(400).json({ error: "Invalid category" });
    }

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};



//approve reject for constructor by admin

exports.ApproveUpdateConstructor = (async (req, res) => {
  try {
    const { id, approvestatus } = req.body;
    const updatedConstructor = await ConstructorRegModel.findOneAndUpdate({ _id: id }, { approvestatus: approvestatus });

    res.json({ message: "Approval status updated", constructor: updatedConstructor });

  }
  catch (err) {
    console.error("error occur", err);

  }
})


exports.ApproveRejectConstructor = (async (req, res) => {
  try {
    const { id, approvestatus } = req.body;
    const updatedConstructor = await ConstructorRegModel.findOneAndUpdate({ _id: id }, { approvestatus: approvestatus });
    console.log("updated", updatedConsult);
    res.json({ message: "Approval status Rejected", consult: updatedConstructor });

  }
  catch (err) {
    console.error("error occur", err);

  }
})






// Assign Supplier to Bidded Work
exports.assignSupplier = async (req, res) => {
  try {
    const { biddedWorkId, assignedSuppliers } = req.body;

    if (!biddedWorkId || !assignedSuppliers) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const updatedWork = await ConsultBiddedWorkModel.findByIdAndUpdate(
      biddedWorkId,
      { assignedSupplier: assignedSuppliers },
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ error: "Bidded work not found." });
    }

    res.status(200).json({ message: "Supplier assigned successfully.", data: updatedWork });
  } catch (err) {
    console.error("Error assigning supplier:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};






// POST /api/biddedwork/assign-labour/:id
exports.assignLabour = async (req, res) => {
  const { labourId } = req.body;
  try {
    const updated = await ConsultBiddedWorkModel.findByIdAndUpdate(
      req.params.id,
      { assignedLabour: labourId },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign labour" });
  }
};





exports.getAssignedWorks = async (req, res) => {
  try {
    const { constructorid } = req.body;
    if (!constructorid) {
      return res.status(400).json({ error: 'Contractor ID is required' });
    }

    const works = await ConsultBiddedWorkModel.find({ constructorid: constructorid })
      .populate('assignedSupplier', 'supplierName') // only get name
      .populate('assignedLabour', 'name') // only get name
      // .select('items username assignedSupplier assignedLabour');

    res.status(200).json(works);
  } catch (error) {
    console.error("Error fetching assigned works:", error);
    res.status(500).json({ error: 'Failed to fetch assigned works' });
  }
};

exports.getWork = async (req, res) => {
  try {
    const { consultid } = req.body;
    if (!consultid) {
      return res.status(400).json({ error: 'Contractor ID is required' });
    }

    const works = await ConsultBiddedWorkModel.find({ consultid: consultid })
      .populate('assignedSupplier', 'supplierName') // only get name
      .populate('assignedLabour', 'name') // only get name
      // .select('items username assignedSupplier assignedLabour');
    res.status(200).json(works);
  } catch (error) {
    console.error("Error fetching assigned works:", error);
    res.status(500).json({ error: 'Failed to fetch assigned works' });
  }
};

// updting required items

exports.updateItemsRequired = async (req, res) => {
  try {
    const { workId, items } = req.body;

    if (!workId || !items) {
      return res.status(400).json({ message: "Missing workId or items" });
    }

    const updatedWork = await ConsultBiddedWorkModel.findByIdAndUpdate(
      workId,
      { itemsrequired: items }, // ✅ update the correct field
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.status(200).json({
      message: "Items required updated successfully",
      data: updatedWork,
    });
  } catch (error) {
    console.error("Error updating items required:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const mongoose = require('mongoose');

exports.getDeliveredWorks = async (req, res) => {
  try {
    const { contractorId } = req.body;
    console.log("contractorId received:", contractorId, "type:", typeof contractorId);

    if (!contractorId) {
      return res.status(400).json({ error: "Contractor ID is required" });
    }

    // Always convert to ObjectId for querying
    let objectId;
    if (mongoose.Types.ObjectId.isValid(contractorId)) {
      objectId = new mongoose.Types.ObjectId(contractorId);
    } else {
      return res.status(400).json({ error: "Invalid contractor ID" });
    }

    const works = await ConsultBiddedWorkModel.find({
      constructorid: objectId,
      deliveryStatus: { $in: ["Delivered", "Delivery Completed"] }
    }).populate('assignedSupplier');

    console.log("Delivered works found:", works);

    res.json(works);
  } catch (err) {
    console.error("Error in getDeliveredWorks:", err);
    res.status(500).json({ error: "Server error" });
  }
};
