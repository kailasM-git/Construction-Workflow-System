import { useEffect, useState } from "react";

const AddBiddedWork = () => {
  const [auth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch {
      return null;
    }
  });

  const [location, setLocation] = useState("");
  const [itemsRequired, setItemsRequired] = useState("");
  const [assignedConstructorId, setAssignedConstructorId] = useState("");
  const [username, setUsername] = useState("");
  const [constructorList, setConstructorList] = useState([]);
  const [selectedConstructor, setSelectedConstructor] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/consultant/getconstructors")
      .then((res) => res.json())
      .then((data) => setConstructorList(data))
      .catch((err) => console.error("Error fetching constructors:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      location,
      items: itemsRequired,
      constructorid: assignedConstructorId,
      username,
      consultid: auth?.userid,
    };

    try {
      const response = await fetch("http://localhost:4000/consultant/biddedwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Bidded Work Submitted");
        setLocation("");
        setItemsRequired("");
        setAssignedConstructorId("");
        setUsername("");
        setSelectedConstructor(null);
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting bidded work:", error);
    }
  };

  const handleViewConstructor = () => {
    const selected = constructorList.find(c => c._id === assignedConstructorId);
    setSelectedConstructor(selected || null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Assign Bidded Work</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Details</label>
          <textarea
            value={itemsRequired}
            onChange={(e) => setItemsRequired(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assign Constructor</label>
          <select
            value={assignedConstructorId}
            onChange={(e) => setAssignedConstructorId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Constructor</option>
            {constructorList.map(c => (
              <option key={c._id} value={c._id}>
                {c.userid?.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleViewConstructor}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            View Selected Constructor Details
          </button>
        </div>

        {selectedConstructor && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <p className="text-sm text-gray-800"><strong>Name:</strong> {selectedConstructor.userid.name}</p>
            <p className="text-sm text-gray-800"><strong>Experience:</strong> {selectedConstructor.userid.experience}</p>
            <p className="text-sm text-gray-800"><strong>License:</strong> {selectedConstructor.userid.license}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Bidded Work
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBiddedWork;
