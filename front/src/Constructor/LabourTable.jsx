import { useState, useEffect } from 'react';
import { Trash2, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LabourTable() {
  const [labours, setLabours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Mason', 'Electrician', 'Plumber', 'Carpenter', 'Helper']; // Customize as needed

  useEffect(() => {
    fetch('http://localhost:4000/consultant/labourregisterview')
      .then((res) => res.json())
      .then((result) => setLabours(result));
  }, []);

  const filteredLabours = labours.filter((labour) => {
    const matchesSearch = labour.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || labour.labourType === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (delId) => {
    fetch('http://localhost:4000/consultant/labourdelete', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id: delId })
    })
      .then((res) => res.json())
      .then(() => {
        setLabours(prev => prev.filter(l => l._id !== delId));
      });
  };

  const handleStatusToggle = (labour) => {
    const newStatus = labour.labourStatus === 0 ? 1 : 0;

    fetch('http://localhost:4000/consultant/updatelabourstatus', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id: labour._id, labourStatus: newStatus })
    })
      .then((res) => res.json())
      .then(() => {
        setLabours(prev =>
          prev.map((l) =>
            l._id === labour._id ? { ...l, labourStatus: newStatus } : l
          )
        );
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Registered Labours</h2>
        <Link to='/labourreg'>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Labour
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
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Age</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Aadhaar</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLabours.length > 0 ? (
              filteredLabours.map((labour, index) => (
                <tr key={labour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{labour.name}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.labourType}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.age}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.gender}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.mobileNo}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.aadhaarNumber}</td>
                  <td className="px-6 py-4 text-gray-700">{labour.email}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusToggle(labour)}
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          labour.labourStatus === 0
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        {labour.labourStatus === 0 ? 'Assign' : 'Assigned'}
                      </button>
                      <button
                        onClick={() => handleDelete(labour._id)}
                        className="p-1 text-red-600 hover:text-red-900"
                        title="Delete Labour"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                  No labours found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredLabours.length} labours
        </div>
      </div>
    </div>
  );
}
