import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'kailas',
    rating: 5,
    comment: 'Excellent dashboard! Very intuitive and sleek design.',
    date: 'April 7, 2025'
  },
  {
    id: 2,
    name: 'Jagan',
    rating: 4,
    comment: 'Looks professional and works great for my needs.',
    date: 'April 5, 2025'
  },
  {
    id: 3,
    name: 'Ajin',
    rating: 5,
    comment: 'Loved the animations and layout. Great work!',
    date: 'April 2, 2025'
  }
];

const ReviewsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontFamily: 'Inter, sans-serif',
        maxWidth: '900px',
        margin: 'auto'
      }}
    >
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#4f46e5' }}
      >
        User Reviews
      </motion.h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            style={{
              padding: '20px',
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '4px',
                backgroundColor: '#4f46e5'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <strong style={{ color: '#111827' }}>{review.name}</strong>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{review.date}</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
              {[...Array(review.rating)].map((_, idx) => (
                <Star key={idx} size={16} color="#fbbf24" fill="#fbbf24" />
              ))}
            </div>
            <p style={{ color: '#374151', fontSize: '15px' }}>{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReviewsPage;
