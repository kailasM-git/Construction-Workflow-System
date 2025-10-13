import { useEffect, useState } from 'react';
import { X, Globe, Users, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function CompanyCards() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Building', 'Equipment', 'Plumbing', 'Electrical', 'Wood'];

  useEffect(() => {
    fetch('http://localhost:4000/consultant/supplierregisterview')
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setSuppliers(result);
        } else {
          console.error('Invalid supplier data:', result);
        }
      })
      .catch((err) => console.error('Error fetching suppliers:', err));
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const name = supplier?.supplierName || '';
    const type = supplier?.supplierType || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || type === filterType;
    return matchesSearch && matchesType;
  });

  const companies = [
    {
      id: 1,
      name: 'supplier',
      logo: 'S',
      color: 'bg-gradient-to-r from-blue-500 to-green-500',
      address: 'Google LLC is an American multinational technology company...',
      founded: 'September 4, 1998',
      headquarters: 'Mountain View, California, United States',
      ceo: 'Sundar Pichai',
      employees: '156,500+',
      products: ['Google Search', 'Android', 'YouTube', 'Google Cloud', 'Gmail', 'Google Maps'],
      website: 'google.com',
      email: 'info@google.com',
      phone: '+1 650-253-0000'
    },
    {
      id: 2,
      name: 'Labours',
      logo: 'L',
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      address: 'Microsoft Corporation is an American multinational technology corporation...',
      founded: 'April 4, 1975',
      headquarters: 'Redmond, Washington, United States',
      ceo: 'Satya Nadella',
      employees: '181,000+',
      products: ['Windows', 'Office 365', 'Azure', 'Xbox', 'Surface', 'LinkedIn'],
      website: 'microsoft.com',
      email: 'info@microsoft.com',
      phone: '+1 425-882-8080'
    }
  ];

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tech Companies</h1>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => openModal(company)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all transform hover:scale-105 duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`${company.color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md`}>
                {company.logo}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                <p className="text-gray-500 mt-1">Total {filteredSuppliers.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedCompany.color} p-6 rounded-t-xl relative text-white`}>
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 bg-white bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold shadow-md">
                  <span className={`bg-clip-text text-transparent ${selectedCompany.color}`}>{selectedCompany.logo}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                  <p className="text-white text-opacity-90 mt-1">Company Profile</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6">{selectedCompany.address}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Founded</p>
                    <p className="text-gray-800">{selectedCompany.founded}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Headquarters</p>
                    <p className="text-gray-800">{selectedCompany.headquarters}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employees</p>
                    <p className="text-gray-800">{selectedCompany.employees}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Website</p>
                    <p className="text-gray-800">{selectedCompany.website}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Products & Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.products.map((product, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <p className="text-gray-800">{selectedCompany.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <p className="text-gray-800">{selectedCompany.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
