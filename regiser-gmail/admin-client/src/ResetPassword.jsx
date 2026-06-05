import React, { useState } from 'react';

function ResetPassword({ userId, onPasswordUpdated }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setStatus({ loading: false, error: 'Passwords do not match!' });
    }
    if (password.length < 6) {
      return setStatus({ loading: false, error: 'Password must be at least 6 characters long.' });
    }

    setStatus({ loading: true, error: '' });

    try {
      const response = await fetch('/api/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        onPasswordUpdated(); // Transition the user into their dashboard!
      } else {
        setStatus({ loading: false, error: data.message || 'Failed to update.' });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Network communication failure.' });
    }
  };

  return (
    <div style={{ maxWidth: '380px', margin: '100px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ textAlign: 'center', color: '#d9534f' }}>Secure Your Account</h3>
      <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>This is your first time logging in. Please set a permanent password to secure your portal access.</p>
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>New Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        {status.error && <p style={{ color: '#dc3545', margin: '0', fontSize: '13px' }}>{status.error}</p>}
        <button 
          type="submit" 
          disabled={status.loading}
          style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {status.loading ? 'Saving...' : 'Update Password & Enter'}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;