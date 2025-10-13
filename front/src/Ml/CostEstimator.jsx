
// import React, { useState } from 'react';

// const locations = [
//   { label: 'Location A', value: 0 },
//   { label: 'Location B', value: 1 },
//   { label: 'Location C', value: 2 },
// ];

// const materialQualities = [
//   { label: '1 - Poor', value: 1 },
//   { label: '2 - Fair', value: 2 },
//   { label: '3 - Good', value: 3 },
//   { label: '4 - Very Good', value: 4 },
//   { label: '5 - Excellent', value: 5 },
// ];

// const CostEstimator = () => {
//   const [formData, setFormData] = useState({
//     area_sqft: '',
//     num_floors: '',
//     location_index: '',
//     material_quality: '',
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const isFormValid = () => {
//     return (
//       formData.area_sqft > 0 &&
//       formData.num_floors > 0 &&
//       formData.location_index !== '' &&
//       formData.material_quality !== ''
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setError('Please fill all fields with valid values');
//       return;
//     }
//     setError(null);
//     setLoading(true);
//     setResult(null);

//     try {
//       const response = await fetch('http://localhost:4500/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           area_sqft: Number(formData.area_sqft),
//           num_floors: Number(formData.num_floors),
//           location_index: Number(formData.location_index),
//           material_quality: Number(formData.material_quality),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get prediction');
//       }

//       const data = await response.json();
//       setResult(data.estimated_cost);
//     } catch (err) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 400,
//         margin: '2rem auto',
//         padding: '1rem 2rem',
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         borderRadius: 8,
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
//         Construction Cost Estimator
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: 'grid', gap: '1.25rem' }}
//         noValidate
//       >
//         <label style={{ display: 'flex', flexDirection: 'column' }}>
//           Area (sqft):
//           <input
//             type="number"
//             name="area_sqft"
//             value={formData.area_sqft}
//             onChange={handleChange}
//             min="1"
//             placeholder="Enter area in sqft"
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem', marginTop: 4 }}
//           />
//         </label>

//         <label style={{ display: 'flex', flexDirection: 'column' }}>
//           Number of Floors:
//           <input
//             type="number"
//             name="num_floors"
//             value={formData.num_floors}
//             onChange={handleChange}
//             min="1"
//             placeholder="Enter number of floors"
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem', marginTop: 4 }}
//           />
//         </label>

//         <label style={{ display: 'flex', flexDirection: 'column' }}>
//           Location:
//           <select
//             name="location_index"
//             value={formData.location_index}
//             onChange={handleChange}
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem', marginTop: 4 }}
//           >
//             <option value="" disabled>
//               Select location
//             </option>
//             {locations.map((loc) => (
//               <option key={loc.value} value={loc.value}>
//                 {loc.label}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label style={{ display: 'flex', flexDirection: 'column' }}>
//           Material Quality:
//           <select
//             name="material_quality"
//             value={formData.material_quality}
//             onChange={handleChange}
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem', marginTop: 4 }}
//           >
//             <option value="" disabled>
//               Select material quality
//             </option>
//             {materialQualities.map((mq) => (
//               <option key={mq.value} value={mq.value}>
//                 {mq.label}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button
//           type="submit"
//           disabled={!isFormValid() || loading}
//           style={{
//             backgroundColor: '#3C4CD0',
//             color: 'white',
//             fontSize: '1rem',
//             padding: '0.75rem',
//             border: 'none',
//             borderRadius: 4,
//             cursor: !isFormValid() || loading ? 'not-allowed' : 'pointer',
//             opacity: !isFormValid() || loading ? 0.6 : 1,
//           }}
//         >
//           {loading ? 'Predicting...' : 'Predict Cost'}
//         </button>
//       </form>

//       {error && (
//         <p style={{ color: 'red', marginTop: '1rem', fontWeight: 'bold' }}>
//           {error}
//         </p>
//       )}

//       {result !== null && (
//         <p
//           style={{
//             marginTop: '1.5rem',
//             fontWeight: 'bold',
//             fontSize: '1.25rem',
//             textAlign: 'center',
//             color: '#1a73e8',
//           }}
//         >
//           Estimated Cost: ₹{Number(result).toLocaleString()}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CostEstimator;





import React, { useState } from 'react';
import { Calculator, MapPin, Building, Star, TrendingUp, CheckCircle, AlertCircle, Award, Target, BarChart3, Shield } from 'lucide-react';
import Header from '../components/Header';
import Navebar from '../user/Navebar';

const locations = [
  { label: 'Kozhikode', value: 0, premium: 1.2 },
  { label: 'Thrissur', value: 1, premium: 1.15 },
  { label: 'Kochi', value: 2, premium: 1.1 },
];

const materialQualities = [
  { label: 'Basic - Economy Grade', value: 1, icon: '🏠', color: '#6B7280' },
  { label: 'Standard - Good Quality', value: 2, icon: '🏘️', color: '#10B981' },
  { label: 'Premium - High Quality', value: 3, icon: '🏢', color: '#3B82F6' },
  { label: 'Luxury - Superior Grade', value: 4, icon: '🏛️', color: '#8B5CF6' },
  { label: 'Ultra Luxury - Finest Materials', value: 5, icon: '🏰', color: '#F59E0B' },
];

const CostEstimator = () => {
  const [formData, setFormData] = useState({
    area_sqft: '',
    num_floors: '',
    location_index: '',
    material_quality: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.area_sqft > 0 &&
      formData.num_floors > 0 &&
      formData.location_index !== '' &&
      formData.material_quality !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError('Please fill all fields with valid values');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setShowResults(false);

    try {
      const response = await fetch('http://localhost:4500/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area_sqft: Number(formData.area_sqft),
          num_floors: Number(formData.num_floors),
          location_index: Number(formData.location_index),
          material_quality: Number(formData.material_quality),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data.estimated_cost);
      setTimeout(() => setShowResults(true), 500);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const selectedLocation = locations.find(loc => loc.value === Number(formData.location_index));
  const selectedMaterial = materialQualities.find(mq => mq.value === Number(formData.material_quality));

  return (
    <>
    <Navebar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(147,197,253,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-200 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Professional Header */}

        {/* <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">ConstructAI Pro</h1>
                  <p className="text-sm text-slate-600">Advanced Construction Cost Intelligence</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>AI-Powered Accuracy</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>Industry Standard</span>
                </div>
              </div>
            </div>
          </div>
        </header> */}

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl mb-6 shadow-2xl">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              AI Construction Cost Estimator
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Leverage cutting-edge machine learning algorithms to get precise construction cost predictions. 
              Trusted by professionals across the industry for accurate budgeting and project planning.
            </p>
          </div>

          {/* Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Precision Accuracy</h3>
              </div>
              <p className="text-slate-600">Advanced ML models trained on extensive construction data for reliable estimates.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Real-time Analysis</h3>
              </div>
              <p className="text-slate-600">Instant cost calculations with detailed breakdowns and market insights.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Industry Trusted</h3>
              </div>
              <p className="text-slate-600">Validated by construction professionals and continuously updated.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Project Details</h3>
                  <p className="text-slate-600">Enter your construction project specifications for accurate cost estimation</p>
                </div>
                
                <div className="space-y-8">
                  {/* Area Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <Building className="inline w-4 h-4 mr-2 text-blue-600" />
                      Construction Area (sq ft)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="area_sqft"
                        value={formData.area_sqft}
                        onChange={handleChange}
                        min="1"
                        placeholder="Enter construction area"
                        required
                        className="w-full p-4 bg-white/70 border-2 border-blue-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300 hover:border-blue-200"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 text-sm font-medium">sq ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Number of Floors */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <TrendingUp className="inline w-4 h-4 mr-2 text-blue-600" />
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      name="num_floors"
                      value={formData.num_floors}
                      onChange={handleChange}
                      min="1"
                      placeholder="Enter number of floors"
                      required
                      className="w-full p-4 bg-white/70 border-2 border-blue-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300 hover:border-blue-200"
                    />
                  </div>

                  {/* Location Selection */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <MapPin className="inline w-4 h-4 mr-2 text-blue-600" />
                      Project Location
                    </label>
                    <select
                      name="location_index"
                      value={formData.location_index}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-white/70 border-2 border-blue-100 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300 hover:border-blue-200"
                    >
                      <option value="" disabled className="bg-white text-slate-800">
                        Select project location
                      </option>
                      {locations.map((loc) => (
                        <option key={loc.value} value={loc.value} className="bg-white text-slate-800">
                          {loc.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Material Quality Selection */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <Star className="inline w-4 h-4 mr-2 text-blue-600" />
                      Material Quality Grade
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {materialQualities.map((mq) => (
                        <label
                          key={mq.value}
                          className={`relative flex items-center p-4 bg-white/70 border-2 border-blue-100 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-200 hover:shadow-lg ${
                            formData.material_quality === mq.value.toString()
                              ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50/70'
                              : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="material_quality"
                            value={mq.value}
                            checked={formData.material_quality === mq.value.toString()}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{mq.icon}</span>
                            <div>
                              <div className="text-slate-800 font-medium text-sm">{mq.label}</div>
                              <div className="flex mt-1">
                                {[...Array(mq.value)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          {formData.material_quality === mq.value.toString() && (
                            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-blue-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid() || loading}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
                      !isFormValid() || loading
                        ? 'bg-slate-400 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing Analysis...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Generate Cost Estimate
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Cost Analysis Report
                </h3>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {result !== null && (
                  <div className={`transition-all duration-1000 ${showResults ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-800 mb-2">
                          ₹{Number(result).toLocaleString()}
                        </div>
                        <div className="text-blue-600 text-sm font-medium">Estimated Construction Cost</div>
                        <div className="w-full bg-blue-100 rounded-full h-2 mt-4">
                          <div className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full w-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Project Summary */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-slate-800 border-b border-blue-100 pb-2">Project Summary</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg">
                          <span className="text-slate-600 font-medium">Total Area:</span>
                          <span className="text-slate-800 font-semibold">{formData.area_sqft} sq ft</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-sky-50/50 rounded-lg">
                          <span className="text-slate-600 font-medium">Floors:</span>
                          <span className="text-slate-800 font-semibold">{formData.num_floors}</span>
                        </div>
                        
                        {selectedLocation && (
                          <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg">
                            <span className="text-slate-600 font-medium">Location:</span>
                            <span className="text-slate-800 font-semibold">{selectedLocation.label}</span>
                          </div>
                        )}
                        
                        {selectedMaterial && (
                          <div className="flex justify-between items-center p-3 bg-sky-50/50 rounded-lg">
                            <span className="text-slate-600 font-medium">Quality:</span>
                            <span className="text-slate-800 font-semibold flex items-center">
                              {selectedMaterial.icon} {selectedMaterial.label.split(' - ')[0]}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg border-2 border-blue-200">
                          <span className="text-slate-700 font-semibold">Cost per sq ft:</span>
                          <span className="text-slate-800 font-bold text-lg">
                            ₹{Math.round(Number(result) / Number(formData.area_sqft)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !loading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      Complete the form to generate your professional cost estimate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Professional Footer */}

        {/* <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-200/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-slate-600 font-medium mb-2">
                Powered by Advanced Machine Learning & Real-time Market Data
              </p>
              <p className="text-slate-500 text-sm">
                © 2025 ConstructAI Pro - Professional Construction Cost Intelligence Platform
              </p>
            </div>
          </div>
        </footer> */}

      </div>
    </div>
    </>
  );
};

export default CostEstimator;
