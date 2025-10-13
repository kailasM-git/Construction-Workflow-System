import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Truck,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronRight,
  LogOut,
  ClipboardCheck,
} from 'lucide-react';
import DashboardPage from './DashboardPage';
import SupplierTable from './SupplierTable';
import LabourTable from './LabourTable';
import ListofLabours from './ListofLabours';
import AssignedWork from './AssignedWork';
import Deliveries from './Deliveries';

export default function ConstructionDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [labourMenuOpen, setLabourMenuOpen] = useState(false);
  const [tailwindReady, setTailwindReady] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      script.onload = () => setTailwindReady(true);
      document.head.appendChild(script);
    } else {
      setTailwindReady(true);
    }

    return () => {
      const script = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
      if (script) {
        document.head.removeChild(script);
        setTailwindReady(false);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
     { id: 'assign', label: 'Assignedwork', icon: ClipboardCheck },
     { id: 'deliveries', label: 'Deliveries', icon: ClipboardCheck },
  ];

  const renderContent = () => {
    if (activeMenu === 'dashboard') return <DashboardPage />;
    if (activeMenu === 'suppliers') return <SupplierTable />;
    if (activeMenu === 'add-labours') return <LabourTable type="add-labours" />;
    if (activeMenu === 'listof-labours') return <ListofLabours type="listof-labours" />;
    if (activeMenu === 'assign') return <AssignedWork />;
    if (activeMenu === 'deliveries') return <Deliveries />;
    return null;
  };

  if (!tailwindReady) return <div>Loading form styles...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white transition-all duration-300 ease-in-out shadow-xl z-20`}
      >
        <div
          className={`p-4 flex items-center justify-between border-b border-indigo-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
        >
          {isSidebarOpen && (
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="font-bold text-xl">CP</span>
              </div>
              <h1 className="text-xl font-bold ml-3 tracking-wide">ConstructPro</h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-all duration-150 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="mt-8 px-3">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`px-4 py-3 flex items-center justify-between mb-2 rounded-lg cursor-pointer transform transition-all duration-200 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              } delay-${index * 100} ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md'
                  : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <item.icon className={`h-5 w-5 ${activeMenu === item.id ? 'text-blue-300' : ''}`} />
                {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
              </div>
              {isSidebarOpen && activeMenu === item.id && (
                <ChevronRight className="h-4 w-4 text-blue-300" />
              )}
            </div>
          ))}

          {/* Labour Dropdown */}
          <div>
            <div
              onClick={() => setLabourMenuOpen(!labourMenuOpen)}
              className={`px-4 py-3 flex items-center justify-between mb-2 rounded-lg cursor-pointer transform transition-all duration-200 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              } delay-200 ${
                activeMenu.includes('labour')
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md'
                  : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Users className={`h-5 w-5 ${activeMenu.includes('labour') ? 'text-blue-300' : ''}`} />
                {isSidebarOpen && <span className="ml-3 font-medium">Labours</span>}
              </div>
              {isSidebarOpen && (
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    labourMenuOpen ? 'rotate-90' : ''
                  }`}
                />
              )}
            </div>

            {labourMenuOpen && isSidebarOpen && (
              <div className="ml-10 space-y-2 transition-all duration-200">
                <div
                  onClick={() => setActiveMenu('add-labours')}
                  className={`text-sm px-3 py-2 rounded-md cursor-pointer ${
                    activeMenu === 'add-labours'
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                  }`}
                >
                  Add Labours
                </div>
                <div
                  onClick={() => setActiveMenu('listof-labours')}
                  className={`text-sm px-3 py-2 rounded-md cursor-pointer ${
                    activeMenu === 'listof-labours'
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                  }`}
                >
                  List of Labours
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sign Out */}
        {isSidebarOpen && (
          <div className="absolute bottom-0 w-64 p-4 border-t border-indigo-800">
            <div
              className="flex items-center text-blue-200 hover:text-white transition-colors cursor-pointer py-3 px-4 rounded-lg hover:bg-blue-800/50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Sign Out</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`bg-white shadow-md z-10 ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          } transition-all duration-500`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800 font-sans tracking-tight">
                {activeMenu.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </h2>
              <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none ml-2 w-48"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative transform hover:scale-105">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3 border-l pl-4 ml-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-400 flex items-center justify-center text-white shadow-md transform hover:scale-105 transition-transform">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Site Manager</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {renderContent() || (
            <div
              className={`flex items-center justify-center h-full ${
                isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              } transition-all duration-700 delay-300`}
            >
              <div className="text-center text-gray-400">
                <h3 className="text-xl font-medium mb-2">Select an option from the sidebar</h3>
                <p>Currently viewing: {activeMenu}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
