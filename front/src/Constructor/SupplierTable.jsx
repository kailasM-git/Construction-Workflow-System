import { useState, useEffect } from 'react';
import { Trash2, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Building', 'Equipment', 'Plumbing', 'Electrical', 'Wood'];

  useEffect(() => {
    fetch('http://localhost:4000/consultant/supplierregisterview')
      .then((res) => res.json())
      .then((result) => setSuppliers(result))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const name = (supplier?.supplierName || '').toLowerCase();
    const type = (supplier?.supplierType || '').toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || type === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleDelete = (delid) => {
    fetch('http://localhost:4000/consultant/supplierdelete', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id: delid })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Refresh the table after delete
        setSuppliers(prev => prev.filter(s => s._id !== delid));
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Registered Suppliers</h2>
        <Link to='/supplier'>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + ADD Suppliers
          </button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="p-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            className="w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Supplier Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Reg. Number</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contractor No</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier, index) => (
                <tr key={supplier._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{supplier.userid.supplierName || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{supplier.userid.supplierType || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{supplier.userid.businessRegNumber || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{supplier.userid.contractorNo || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{supplier.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{supplier.userid.dateOfAssociation || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      className="p-1 text-red-600 hover:text-red-900"
                      title="Delete Supplier"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredSuppliers.length} suppliers
        </div>
      </div>
    </div>
  );
}

