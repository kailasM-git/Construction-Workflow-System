import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Content from "./components/Content";
import Abouts from "./components/Abouts";
import Login from "./components/Login";
import Home from "./Admin/Home";
import ConsultReg from "./components/ConsultReg";
import ConsultReg2 from "./components/ConsultReg2";
import { useState } from "react";
import ConstructReg from "./components/ConstructReg";
import Feedback from "./consultancy/Feedback";
import AddconstructorForm from "./consultancy/AddconstructorForm";
import ConstructorDash from "./Constructor/ConstructorDash";
import SupplieReg from "./Constructor/SupplieReg";
import LabourReg from "./Constructor/LabourReg";
import UserReg from "./user/UserReg";
import Header from "./components/Header";
import Plans from "./user/Plans";
import ViewPlans from "./user/ViewPlans";
import UserPlanConsultView from "./consultancy/UserPlanConsultView";
import EstimatePrice from "./user/EstimatePrice";
import PaymentForPlan from "./user/PaymentForPlan";
import SupplierAssignedWorks from "./Supplier/SupplierAssignedWorks";
import Chat from "./user/Chat";
import AdminChat from "./Admin/AdminChat";
import Chatbot from "./user/Chatbot";
import UserProfile from "./user/UserProfile";
import Deliveries from "./Constructor/Deliveries";
import Reports from "./user/Reports";
import CostEstimator from "./Ml/CostEstimator"

function App() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("yourstorage"))
  );
  return (
    <div className="App">
      <>
        <BrowserRouter>
          {auth == null ? (
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<Abouts />} />
              <Route path="/admin2" element={<UserReg />} />
              <Route path="/admin1" element={<ConsultReg />} />
            </Routes>
          ) : auth.userstatus == 0 ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin1" element={<ConsultReg />} />
              <Route path="/supplier" element={<SupplieReg />} />
              <Route path="/adminChat" element={<AdminChat />} />
              <Route path="/labourreg" element={<LabourReg />} />
              <Route path="/addconsult" element={<ConsultReg2 />} />
              <Route path="/addconstructor" element={<ConstructReg />} />
            </Routes>
          ) : auth.userstatus == 1 ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/estimate-prices/:planid"
                element={<EstimatePrice />}
              />
              <Route
                path="/addconstructorform"
                element={<AddconstructorForm />}
              />
              <Route
                path="/consultant/userplans/:userid"
                element={<UserPlanConsultView />}
              />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          ) : auth.userstatus == 2 ? (
            <Routes>
              <Route path="/about" element={<Abouts />} />
              <Route path="/" element={<ConstructorDash />} />
              <Route path="/supplier" element={<SupplieReg />} />
              <Route path="/labourreg" element={<LabourReg />} />
              <Route path="/deliveries" element={<Deliveries />} />
            </Routes>
          ) : auth.userstatus == 3 ? (
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/about" element={<Abouts />} />
              <Route path="/header" element={<Header />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/viewplans" element={<ViewPlans />} />
              <Route path="/paymentbyuser" element={<PaymentForPlan />} />
              <Route path="/costestimator" element={<CostEstimator/>} />
            </Routes>
          ) : auth.userstatus == 4 ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/supplierassignedworks"
                element={<SupplierAssignedWorks />}
              />
            </Routes>
          ) : null}
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
