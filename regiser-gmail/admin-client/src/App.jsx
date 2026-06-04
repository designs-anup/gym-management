import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: false });

    try {
      // Change your fetch block to this:
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: data.message, error: false });
        setFormData({ name: '', email: '', role: 'User' }); // Reset Form
      } else {
        setStatus({ loading: false, message: data.message || 'Something went wrong.', error: true });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Could not connect to the server.', error: true });
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Super Admin Dashboard</h2>
      <p style={{ color: '#666' }}>Register a new user and auto-send their login credentials.</p>
      
      <hr />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Assigned Role:</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="User">Standard User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={status.loading}
          style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          {status.loading ? 'Registering & Emailing...' : 'Register User'}
        </button>
      </form>

      {status.message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          borderRadius: '4px', 
          backgroundColor: status.error ? '#F8D7DA' : '#D4EDDA', 
          color: status.error ? '#721C24' : '#155724' 
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
}

export default App;