import React, { useEffect, useState } from "react";
import Navebar from "./Navebar";
import axios from "axios";

export default function Plans() {
  const [category, setCategory] = useState("buildings");
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));

  // Building States
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [buildingname, setBuildingname] = useState("");
  const [estimatecost, setEstimatecost] = useState("");
  const [estimatetime, setEstimatetime] = useState("");
  const [totalarea, setTotalarea] = useState("");
  const [location, setLocation] = useState("");
  const [additionalnotes, setAdditionalnotes] = useState("");
  const [landpaper, setLandpaper] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Villa States
  const [vtype, setVType] = useState("");
  const [vimage, setVImage] = useState(null);
  const [villaname, setVillaname] = useState("");
  const [vestimatecost, setVEstimatecost] = useState("");
  const [vestimatetime, setVEstimatetime] = useState("");
  const [vtotalarea, setVTotalarea] = useState("");
  const [vlocation, setVLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [landpapervilla, setLandpapervilla] = useState(null);
  const [vlocationSuggestions, setVLocationSuggestions] = useState([]);
  const [vselectedCoordinates, setVSelectedCoordinates] = useState(null);

  useEffect(() => {
    // Reset all fields on category change
    setType(""); setImage(null); setBuildingname(""); setEstimatecost(""); setEstimatetime("");
    setTotalarea(""); setLocation(""); setAdditionalnotes(""); setLandpaper(null);
    setSelectedCoordinates(null); setLocationSuggestions([]);

    setVType(""); setVImage(null); setVillaname(""); setVEstimatecost(""); setVEstimatetime("");
    setVTotalarea(""); setVLocation(""); setRequirements(""); setLandpapervilla(null);
    setVSelectedCoordinates(null); setVLocationSuggestions([]);
  }, [category]);

  const handleLocationAutocomplete = async (value, isVilla = false) => {
    const apikey = "n4Yzg7yiZdGPqjicI88XfHyRY7SBuMsaProAtSD0";

    if (isVilla) {
      setVLocation(value);
      if (!value) return setVLocationSuggestions([]);
    } else {
      setLocation(value);
      if (!value) return setLocationSuggestions([]);
    }

    try {
      const response = await axios.get(
        `https://api.olamaps.io/places/v1/autocomplete?input=${value}&api_key=${apikey}`
      );
      const predictions = response.data.predictions;

      if (isVilla) setVLocationSuggestions(predictions);
      else setLocationSuggestions(predictions);
    } catch (error) {
      console.error("Ola Maps error:", error);
    }
  };

  const handleSuggestionSelect = async (suggestion, isVilla = false) => {
    const apikey = "n4Yzg7yiZdGPqjicI88XfHyRY7SBuMsaProAtSD0";
    try {
      const res = await axios.get(
        `https://api.olamaps.io/places/v1/details?place_id=${suggestion.place_id}&api_key=${apikey}`
      );
      const { lat, lng } = res.data.result.geometry.location;

      if (isVilla) {
        setVLocation(suggestion.description);
        setVLocationSuggestions([]);
        setVSelectedCoordinates({ lat, lng });
      } else {
        setLocation(suggestion.description);
        setLocationSuggestions([]);
        setSelectedCoordinates({ lat, lng });
      }
    } catch (err) {
      console.error("Details fetch failed:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uid", auth.userid);
    formData.append("category", category);

    if (category === "buildings") {
      formData.append("type", type);
      formData.append("image", image);
      formData.append("landpaper", landpaper);
      formData.append("buildingname", buildingname);
      formData.append("estimatecost", estimatecost);
      formData.append("estimatetime", estimatetime);
      formData.append("totalarea", totalarea);
      formData.append("location", location);
      formData.append("additionalnotes", additionalnotes);
      if (selectedCoordinates) {
        formData.append("latitude", selectedCoordinates.lat);
        formData.append("longitude", selectedCoordinates.lng);
      }
    } else {
      formData.append("vtype", vtype);
      formData.append("vimage", vimage);
      formData.append("landpapervilla", landpapervilla);
      formData.append("villaname", villaname);
      formData.append("vestimatecost", vestimatecost);
      formData.append("vestimatetime", vestimatetime);
      formData.append("vtotalarea", vtotalarea);
      formData.append("vlocation", vlocation);
      formData.append("requirements", requirements);
      if (vselectedCoordinates) {
        formData.append("latitude", vselectedCoordinates.lat);
        formData.append("longitude", vselectedCoordinates.lng);
      }
    }

    fetch("http://localhost:4000/consultant/buildingregister", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alert("Form submitted successfully!");
      })
      .catch((err) => console.error("Submission error:", err));
  };

  const sharedInputStyle = {
    padding: "10px", marginBottom: "10px", borderRadius: "5px",
    border: "1px solid #ccc", width: "100%", fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 20px", backgroundColor: category === "buildings" ? "#007bff" : "#28a745",
    color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer",
    transition: "background 0.3s ease", fontWeight: "bold",
  };

  const formContainerStyle = {
    maxWidth: "600px", margin: "20px auto", backgroundColor: "#fff", padding: "20px",
    borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", animation: "fadeSlideIn 1s ease",
  };

  const suggestionListStyle = {
    listStyle: "none", padding: 0, margin: 0, border: "1px solid #ccc", borderRadius: "5px",
    background: "#fff", maxHeight: "150px", overflowY: "auto", position: "absolute",
    zIndex: 1000, width: "100%"
  };

  const renderFields = () => {
    return category === "buildings" ? (
      <>
        <select style={sharedInputStyle} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="2-storey">2-storey</option>
          <option value="3-storey">3-storey</option>
        </select>
        <input style={sharedInputStyle} placeholder="Building Name" value={buildingname} onChange={(e) => setBuildingname(e.target.value)} />
        <label>Add-Place-Image</label>
        <input type="file" style={sharedInputStyle} onChange={(e) => setImage(e.target.files[0])} />
        <label>Add-Place-Documents</label>
        <input type="file" style={sharedInputStyle} onChange={(e) => setLandpaper(e.target.files[0])} />
        <input style={sharedInputStyle} placeholder="Estimate Cost" value={estimatecost} onChange={(e) => setEstimatecost(e.target.value)} />
        <input style={sharedInputStyle} placeholder="Estimate Time (months)" value={estimatetime} onChange={(e) => setEstimatetime(e.target.value)} />
        <input style={sharedInputStyle} placeholder="Total Area (sq ft)" value={totalarea} onChange={(e) => setTotalarea(e.target.value)} />

        <div style={{ position: "relative" }}>
          <input
            style={sharedInputStyle}
            placeholder="Location"
            value={location}
            onChange={(e) => handleLocationAutocomplete(e.target.value, false)}
          />
          {locationSuggestions.length > 0 && (
            <ul style={suggestionListStyle}>
              {locationSuggestions.map((s, i) => (
                <li key={i} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                  onClick={() => handleSuggestionSelect(s, false)}>
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <textarea style={sharedInputStyle} placeholder="Additional Notes" value={additionalnotes} onChange={(e) => setAdditionalnotes(e.target.value)} />
        <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
      </>
    ) : (
      <>
        <select style={sharedInputStyle} value={vtype} onChange={(e) => setVType(e.target.value)}>
          <option value="">Select type</option>
          <option value="2-story">2-story</option>
          <option value="3-story">3-story</option>
        </select>
        <input style={sharedInputStyle} placeholder="Villa Name" value={villaname} onChange={(e) => setVillaname(e.target.value)} />
        <label>Add-Land-Image</label>
        <input type="file" style={sharedInputStyle} onChange={(e) => setVImage(e.target.files[0])} />
        <label>Add-Land-Documents</label>
        <input type="file" style={sharedInputStyle} onChange={(e) => setLandpapervilla(e.target.files[0])} />
        <input style={sharedInputStyle} placeholder="Estimate Cost" value={vestimatecost} onChange={(e) => setVEstimatecost(e.target.value)} />
        <input style={sharedInputStyle} placeholder="Estimate Time (months)" value={vestimatetime} onChange={(e) => setVEstimatetime(e.target.value)} />
        <input style={sharedInputStyle} placeholder="Total Area (sq ft)" value={vtotalarea} onChange={(e) => setVTotalarea(e.target.value)} />

        <div style={{ position: "relative" }}>
          <input
            style={sharedInputStyle}
            placeholder="Location"
            value={vlocation}
            onChange={(e) => handleLocationAutocomplete(e.target.value, true)}
          />
          {vlocationSuggestions.length > 0 && (
            <ul style={suggestionListStyle}>
              {vlocationSuggestions.map((s, i) => (
                <li key={i} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                  onClick={() => handleSuggestionSelect(s, true)}>
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <textarea style={sharedInputStyle} placeholder="Special Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
        <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
      </>
    );
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <style>
        {`@keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }`}
      </style>
      <Navebar />
      <div style={{
        backgroundImage: "url('img/banner/slide2.jpg')",
        height: "780px", width: "1465px", backgroundSize: "cover",
        backgroundPosition: "center", backgroundRepeat: "no-repeat"
      }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label style={{ marginRight: "15px", fontWeight: "bold" }}>
            <input type="radio" value="buildings" checked={category === "buildings"} onChange={() => setCategory("buildings")} /> Buildings
          </label>
          <label style={{ fontWeight: "bold" }}>
            <input type="radio" value="villas" checked={category === "villas"} onChange={() => setCategory("villas")} /> Villas
          </label>
        </div>
        <form style={formContainerStyle}>{renderFields()}</form>
      </div>
    </div>
  );
}

