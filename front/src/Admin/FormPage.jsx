import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gender: '',
    agree: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontFamily: 'Inter, sans-serif',
        maxWidth: '700px',
        margin: 'auto'
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#4f46e5' }}>Contact Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            /> Male
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            /> Female
          </label>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          /> I agree to terms and conditions
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontWeight: '500', color: '#374151' }}>Upload file:</span>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            padding: '14px 20px',
            fontSize: '15px',
            fontWeight: '500',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Send size={16} /> Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default FormPage;
