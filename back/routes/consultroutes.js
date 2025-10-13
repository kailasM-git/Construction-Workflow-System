var express = require('express');
var router = express.Router();

const consulcontroller = require('../controller/consultcontroller');
const constructorcontroller = require('../controller/constructorcontroller');
const usercontroller = require('../controller/usercontroller');

router.post('/register', consulcontroller.ConsultRegisterIndex);
router.get('/view', consulcontroller.formView);
router.post('/login', consulcontroller.Login);
router.post("/approve", consulcontroller.approveUpdate)
router.post("/reject", consulcontroller.approveReject)


router.post('/registerconstruct', constructorcontroller.ConstructorRegisterIndex);
router.post('/approveconstructor', constructorcontroller.ApproveUpdateConstructor);
router.post('/rejectconstructor', constructorcontroller.ApproveRejectConstructor);
router.get('/viewconstruct', constructorcontroller.ConstructorFirstView);


router.post('/AddConstructor', consulcontroller.ConsultConstructorRegisterIndex);
router.get('/viewconsultconstructor', consulcontroller.formViews);

router.post('/viewconstructor', consulcontroller.constructorview);
router.post('/deleteconstructor', constructorcontroller.formDelete);

router.post('/supplierregister', consulcontroller.SupplierRegisterIndex);
router.get('/supplierregisterview', consulcontroller.SupplierformView);
router.post('/supplierdelete', consulcontroller.DeleteSupplier);

router.post('/labourregister', constructorcontroller.LabourRegisterIndex);
router.get('/labourregisterview', constructorcontroller.LabourformView);
router.post('/labourdelete', constructorcontroller.DeleteLabour);
router.post('/updatelabourstatus', constructorcontroller.updateLabourStatus);

//user
router.post('/userregister', constructorcontroller.UserRegisterIndex);
router.post('/buildingregister', constructorcontroller.BuildingRegisterIndex);
router.post('/userprofiler', usercontroller.userProfile);
router.post('/updateprofile', usercontroller.updateUserProfile);
router.get("/user/:userId", usercontroller.getConsultPlanByUserId);


router.post('/viemyplans', usercontroller.myplanview);
router.post('/plandeletebyuser', usercontroller.PlanDeleteByUser);
router.get('/planview', usercontroller.UserPlanview);
router.post('/userplanview', usercontroller.userplan);
router.post('/viewestimatebyuser', usercontroller.ViewEstimateByUser);
router.post('/selectestimatebyuser', usercontroller.SelectEstimateByUser);
// router.get('/assigned-estimates/:userid',usercontroller.AssignedEstimates);
router.get('/getassinged', usercontroller.GetAssinged);

router.post('/submitestimate', consulcontroller.submitEstimate);
const consultController = require('../controller/consultcontroller');
router.post('/save-estimate', consultController.saveEstimate);
router.post('/get-estimates', consultController.getEstimates);


//bidded work
router.get('/getconstructors', consultController.getConstructors);
router.post('/biddedwork', consultController.createBiddedWork);
router.post('/updateWork', consultController.updateWork);

//contractor
router.post('/getAssignedWorks', constructorcontroller.getAssignedWorks);
router.post('/getWork', constructorcontroller.getWork);
router.post('/assignsupplier', constructorcontroller.assignSupplier);
router.post('/assignlabour', constructorcontroller.assignLabour);
router.post('/updateItemsRequired', constructorcontroller.updateItemsRequired); 
// router.post("/getDeliverySummary", constructorcontroller.getDeliverySummary);


//supplier 
router.post('/viewAssignedWorks', usercontroller.viewAssignedWorks);
router.post('/updateStatus', usercontroller.updateSupplierWorkStatus);


router.post('/get-estimatesbyconsult', consultController.getEstimatesByPlan);
router.post('/getDeliveredWorks', constructorcontroller.getDeliveredWorks);
router.post('/getSupplierDeliveredWorks', require('../controller/consultcontroller').getSupplierDeliveredWorks);

module.exports = router;
