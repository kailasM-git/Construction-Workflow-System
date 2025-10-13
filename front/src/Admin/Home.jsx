import React, { useState } from "react";
import Register from "../components/Register";
import DashboardContent from "./DashboaedPage";
import FormPage from "./FormPage";
import TablePage from "./TablePage";
import ReviewsPage from "./ReviewsPage";
import Login from "../components/Login";
import {
  LayoutDashboard,
  BarChart,
  BookText,
  ClipboardList,
  FileEdit,
  Star,
  Lock,
  UserPlus,
  Bell,
  LogOut,
  View,
} from "lucide-react";
import { motion } from "framer-motion";
import ConstructorTable from "./ConstructorTable";
import LabourTable from "./LabourTable";
import SuppliesTable from "./SuppliesTable";
import ConsultReg2 from "../components/ConsultReg2";
import Feedback from "../consultancy/Feedback";
import AdminContractor from "../consultancy/AdminContractor";
import AddConstructor from "../consultancy/AddConstructor";
import UserPlans from "../consultancy/UserPlans";
import UserPlanConsultView from "../consultancy/UserPlanConsultView";
import AddBiddedWork from "../consultancy/AddBiddedWork";
import SupplierAssignedWorks from "../Supplier/SupplierAssignedWorks";
import PaymentView from "../consultancy/PaymentView";
import AdminChat from "./AdminChat";
import ViewDelivery from "../Supplier/ViewDelivery";
import WorkStatus from "../consultancy/WorkStatus";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("yourstorage"))
  );

  console.log(auth, "kailas");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderContent = () => {
    if (auth.userstatus === 0) {
      switch (activeItem) {
        case "Dashboard":
          return <DashboardContent />;
        case "Consultancies":
          return <TablePage />;
        case "Constructor":
          return <ConstructorTable />;
        case "Labour":
          return <LabourTable />;
        case "Supplies":
          return <SuppliesTable />;
        case "Reviews":
          return <ReviewsPage />;
        case "Form":
          return <FormPage />;
        case "Register":
          return <ConsultReg2 />;
        case "Chat":
          return <AdminChat />;
        default:
          return <div>Select a page</div>;
      }
    } else if (auth.userstatus === 1) {
      switch (activeItem) {
        case "Dashboard":
          return <DashboardContent />;
        case "Adminconstruct":
          return <AdminContractor />;
        case "AddConstructors":
          return <AddConstructor />;
        case "UserPlans":
          return <UserPlans /> || <UserPlanConsultView />;
        case "Messages":
          return <Feedback />;
        case "Payments":
          return <PaymentView />;
        case "Assign Works":
          return <AddBiddedWork />;
        case "Work Status":
          return <WorkStatus />;

        default:
          return <div>Select a page</div>;
      }
    }
    //  else {
    //   return <div>You are not authorized.</div>;
    // }
    else if (auth.userstatus === 4) {
      switch (activeItem) {
        case "Dashboard":
          return <DashboardContent />;

        case "works":
          return <SupplierAssignedWorks />;
        // case 'AddConstructors': return <AddConstructor/>;
        // case 'UserPlans': return <UserPlans/> || <UserPlanConsultView/>;
        // case 'Messages': return <Feedback/>;
        // case 'Add Bidded Work': return  <AddBiddedWork/>;
        case "ViewDelivery":
          return <ViewDelivery />;
        default:
          return <div>Select a page</div>;
      }
    }
  };

  let sidebarItems = [];

  if (auth.userstatus === 0) {
    sidebarItems = [
      { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { label: "Consultancies", icon: <UserPlus size={18} /> },
      { label: "Constructor", icon: <UserPlus size={18} /> },
      { label: "Labour", icon: <UserPlus size={18} /> },
      { label: "Supplies", icon: <UserPlus size={18} /> },
      { label: "Reviews", icon: <Star size={18} /> },
      { label: "Chat", icon: <Star size={18} /> },
      // { label: 'Form', icon: <FileEdit size={18} /> },
      // { label: 'Register', icon: <UserPlus size={18} /> },
    ];
  } else if (auth.userstatus === 1) {
    sidebarItems = [
      { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { label: "Adminconstruct", icon: <UserPlus size={18} /> },
      { label: "AddConstructors", icon: <UserPlus size={18} /> },
      { label: "UserPlans", icon: <ClipboardList size={18} /> },
      { label: "Messages", icon: <BookText size={18} /> },
      { label: "Assign Works", icon: <FileEdit size={18} /> },
      { label: "Payments", icon: <BookText size={18} /> },
      { label: "Work Status", icon: <BookText size={18} /> },
    ];
  } else if (auth.userstatus === 4) {
    sidebarItems = [
      { label: "Dashboard", icon: <LayoutDashboard size={18} /> },

      { label: "works", icon: <UserPlus size={18} /> },
      // { label: 'AddConstructors', icon: <UserPlus size={18} /> },
      //  { label: 'UserPlans', icon: <ClipboardList size={18} /> },
      // { label: 'Messages', icon: <BookText size={18} /> },
      //  { label: 'Add Bidded Work', icon: <FileEdit size={18} /> },
      { label: "ViewDelivery", icon: <UserPlus size={18} /> },
    ];
  }

  const navbarStyle = {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#f3f4f6" : "#1f2937",
    padding: "16px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const iconStyle = { marginRight: "12px" };

  return (
    <>
      {/* <Loader/> */}
      <div
        style={{
          display: "flex",
          backgroundColor: isDark ? "#111827" : "#f3f4f6",
          color: isDark ? "#f3f4f6" : "#111827",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: collapsed ? "70px" : "260px",
            transition: "width 0.3s",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            padding: "20px",
            boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "space-between",
                marginBottom: "30px",
              }}
            >
              {!collapsed && (
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#6366f1",
                  }}
                >
                  Dashboard
                </h2>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                {collapsed ? "▶" : "◀"}
              </button>
            </div>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {sidebarItems.map(({ label, icon }) => (
                <li
                  key={label}
                  onClick={() => setActiveItem(label)}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor:
                      activeItem === label ? "#e0e7ff" : "transparent",
                    color:
                      activeItem === label
                        ? "#4338ca"
                        : isDark
                          ? "#d1d5db"
                          : "#374151",
                    fontWeight: activeItem === label ? "600" : "normal",
                    transition: "all 0.2s",
                    fontSize: "14px",
                  }}
                >
                  <span style={iconStyle}>{icon}</span>
                  {!collapsed && label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Navbar */}
          <div style={navbarStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: isDark ? "#374151" : "#f9fafb",
                  color: isDark ? "#f3f4f6" : "#111827",
                  marginRight: "20px",
                  fontSize: "14px",
                  minWidth: "200px",
                }}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  position: "relative",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              >
                <Bell size={20} />
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "10px",
                    padding: "2px 5px",
                  }}
                >
                  3
                </span>
              </motion.div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setIsDark(!isDark)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#6366f1",
                  color: "#fff",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: isDark ? "#374151" : "#f1f5f9",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://thaka.bing.com/th/id/OIP.qcyUxL7Ne26QOz0wY1y9QAHaLQ?w=130&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="avatar"
                  style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    height: "40px",
                    width: "40px",
                  }}
                />
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Hii</span>
              </motion.div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <LogOut size={16} style={{ marginRight: "6px" }} /> Logout
              </button>
            </div>
          </div>

          <div style={{ flex: 1, padding: "30px 40px" }}>
            <div
              style={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                padding: "30px",
                borderRadius: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                minHeight: "300px",
              }}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
