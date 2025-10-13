import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, ClipboardList, Hammer, HardHat, Users,
  FileText, AlarmClock, CheckCircle, MapPin, AlertCircle,
  CalendarDays, Activity, BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: 1,
  minWidth: '200px'
};

const progressData = [
  { name: 'Mon', progress: 40 },
  { name: 'Tue', progress: 55 },
  { name: 'Wed', progress: 60 },
  { name: 'Thu', progress: 70 },
  { name: 'Fri', progress: 90 }
];

const DashboardContent = () => {
  return (
    <div style={{ padding: '30px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '20px', color: '#1e40af' }}>Construction Workflow Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cardStyle}>
          <Building2 size={28} color="#4f46e5" />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Active Projects</h3>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#4f46e5' }}>12</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
          <HardHat size={28} color="#f59e0b" />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Workers On-Site</h3>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>76</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={cardStyle}>
          <ClipboardList size={28} color="#10b981" />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Pending Tasks</h3>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>18</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={cardStyle}>
          <Hammer size={28} color="#ef4444" />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Ongoing Maintenance</h3>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>4</p>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ ...cardStyle, minHeight: '200px' }}>
          <Users size={24} color="#3b82f6" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Team Activity</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', lineHeight: '1.7' }}>
            <li>Supervisor John assigned Task A</li>
            <li>Engineer Lisa updated Blueprint 4</li>
            <li>Manager approved Project Delta</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ ...cardStyle, minHeight: '200px' }}>
          <FileText size={24} color="#16a34a" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Latest Reports</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', lineHeight: '1.7' }}>
            <li>Project Omega Site Report</li>
            <li>Weekly Safety Inspection</li>
            <li>Materials Inventory Log</li>
          </ul>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <AlarmClock size={24} color="#eab308" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Upcoming Deadlines</h3>
          <p style={{ fontSize: '16px' }}>Blueprint Submission - Apr 15</p>
          <p style={{ fontSize: '16px' }}>Safety Audit - Apr 18</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <CheckCircle size={24} color="#22c55e" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Completed Milestones</h3>
          <p style={{ fontSize: '16px' }}>Foundation Completed</p>
          <p style={{ fontSize: '16px' }}>Safety Certification Achieved</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <MapPin size={24} color="#06b6d4" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Site Location</h3>
          <p style={{ fontSize: '16px' }}>Project Gamma - NY, USA</p>
          <p style={{ fontSize: '16px' }}>Project Delta - LA, USA</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <AlertCircle size={24} color="#dc2626" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Alerts & Warnings</h3>
          <p style={{ fontSize: '16px' }}>2 Safety issues flagged today</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <CalendarDays size={24} color="#9333ea" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Calendar</h3>
          <p style={{ fontSize: '16px' }}>4 tasks scheduled for this week</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ ...cardStyle, minHeight: '220px' }}>
          <BarChart3 size={24} color="#3b82f6" />
          <h3 style={{ fontSize: '17px', fontWeight: '600' }}>Progress Chart</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={progressData}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardContent;
