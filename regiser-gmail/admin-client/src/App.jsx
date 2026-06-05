import React, { useState, useEffect } from 'react';
import Login from './Login';
import ResetPassword from './ResetPassword';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [status, setStatus] = useState({ loading: false, message: '', error: false });
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch all profiles from backend database directory
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setFetching(false);
    }
  };

  // Only query the full directory if the authenticated user is an Admin
  useEffect(() => {
    if (currentUser?.role === 'Admin') {
      fetchUsers();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: false });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: data.message, error: false });
        setFormData({ name: '', email: '', role: 'User' });
        fetchUsers(); // Refresh the table automatically
      } else {
        setStatus({ loading: false, message: data.message || 'Error occurred.', error: true });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Could not connect to server.', error: true });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // ==========================================
  // VIEW RENDER BLOCK (SEQUENTIAL GATEWAYS)
  // ==========================================

  // GATEWAY 1: User is completely anonymous -> Send to Login screen
  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // GATEWAY 2: User is authenticated but logging in for the FIRST time -> Intercept with Reset Password
  if (currentUser.isFirstLogin) {
    return (
      <ResetPassword 
        userId={currentUser.id} 
        onPasswordUpdated={() => setCurrentUser({ ...currentUser, isFirstLogin: false })} 
      />
    );
  }

  // GATEWAY 3: User is authenticated, has permanent password, but is a regular Client/Trainer (Not Admin)
  if (currentUser.role !== 'Admin') {
    return (
      <div style={{ maxWidth: '500px', margin: '100px auto', padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h2>Hello, {currentUser.name}!</h2>
        <p>Welcome to your personal Gym Member Portal.</p>
        <div style={{ padding: '15px', background: '#e9ecef', borderRadius: '4px', margin: '20px 0' }}>
          <strong>Assigned Account Permissions Profile:</strong> {currentUser.role}
        </div>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    );
  }

  // GATEWAY 4: User is fully authorized and has the Admin profile -> Show complete Admin Control Panel
  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gym Super Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Log Out ({currentUser.name})
        </button>
      </div>
      <p style={{ color: '#666' }}>Manage your team profiles, database accounts, and access parameters.</p>
      
      <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ccc' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        
        {/* Left Side Component: Registration Submission Portal */}
        <div>
          <h3>Register New Member</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assigned Role:</label>
              <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Trainer">Fitness Trainer</option>
                <option value="Manager">Gym Manager</option>
                <option value="Admin">Admin Staff</option>
                <option value="Member">Standard Member</option>
              </select>
            </div>
            <button type="submit" disabled={status.loading} style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
              {status.loading ? 'Processing...' : 'Add User & Send Email'}
            </button>
          </form>
          {status.message && (
            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '4px', backgroundColor: status.error ? '#F8D7DA' : '#D4EDDA', color: status.error ? '#721C24' : '#155724', fontSize: '14px' }}>
              {status.message}
            </div>
          )}
        </div>

        {/* Right Side Component: Live PostgreSQL Database Table Output */}
        <div>
          <h3>Registered System Accounts Directory</h3>
          {fetching ? (
            <p>Loading database directory records...</p>
          ) : users.length === 0 ? (
            <p style={{ color: '#777', fontStyle: 'italic', marginTop: '15px' }}>No users registered in the database yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{user.name}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                        backgroundColor: user.role === 'Admin' ? '#D1ECF1' : user.role === 'Manager' ? '#FFF3CD' : '#E2E3E5',
                        color: user.role === 'Admin' ? '#0C5460' : user.role === 'Manager' ? '#856404' : '#383D41'
                      }}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;