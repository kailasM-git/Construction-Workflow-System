
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/consultant/supplierregisterview')
      .then((res) => res.json())
      .then((result) => setSuppliers(result));
  }, []);

  const handleDelete = (delid) => {
    const ids = { id: delid };
    fetch('http://localhost:4000/consultant/supplierdelete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ids)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSuppliers(suppliers.filter((s) => s._id !== delid));
      });
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
        boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1e40af'
        }}>Registered Suppliers</h2>
        <Link to='/supplier'>
          <button style={{
            backgroundColor: '#3C4CD0',
            border: 'none',
            color: 'white',
            padding: '10px 14px',
            fontSize: '14px',
            borderRadius: '999px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(60, 76, 208, 0.2)'
          }}>+ ADD Suppliers</button>
        </Link>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              {['#', 'Supplier Name', 'Reg. Number', 'Contractor No', 'Email', 'Date', 'Actions'].map((header, i) => (
                <th key={i} style={{
                  padding: '14px 20px',
                  color: '#475569',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <motion.tr
                  key={supplier._id}
                  whileHover={{ scale: 1.01, backgroundColor: '#f8fafc' }}
                  style={{
                    borderTop: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <td style={{ padding: '14px 20px' }}>{index + 1}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 500 }}>{supplier.userid.supplierName}</td>
                  {/* <td style={{ padding: '14px 20px' }}>{supplier.userid.supplierType}</td> */}
                  <td style={{ padding: '14px 20px' }}>{supplier.userid.businessRegNumber}</td>
                  <td style={{ padding: '14px 20px' }}>{supplier.userid.contractorNo}</td>
                  <td style={{ padding: '14px 20px' }}>{supplier.email}</td>
                  <td style={{ padding: '14px 20px' }}>{supplier.userid.dateOfAssociation}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      title="Delete Supplier"
                      style={{
                        backgroundColor: '#ef4444',
                        border: 'none',
                        color: 'white',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '14px'
                }}>
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#64748b'
      }}>
        Showing {suppliers.length} suppliers
      </div>
    </motion.div>
  );
}

