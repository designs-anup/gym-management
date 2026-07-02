import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GymsManagement from "./pages/GymsManagement";
import Subscriptions from "./pages/Subscriptions";
import RevenueBilling from "./pages/RevenueBilling";
import Analytics from "./pages/Analytics";
import GymPerformance from "./pages/GymPerformance";
import UsersRoles from "./pages/UsersRoles";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";
import SecurityBackup from "./pages/SecurityBackup";
import SupportCenter from "./pages/SupportCenter";
import LogsActivity from "./pages/LogsActivity";

function App() {
  return (
    <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="gyms-management"
            element={
              <GymsManagement />
            }
          />

          <Route
            path="subscriptions"
            element={
              <Subscriptions />
            }
          />

          <Route
            path="revenue-billing"
            element={
              <RevenueBilling />
            }
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="gym-performance"
            element={
              <GymPerformance />
            }
          />

          <Route
            path="users-roles"
            element={
              <UsersRoles />
            }
          />

          <Route
            path="announcements"
            element={
              <Announcements />
            }
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="security-backup"
            element={
              <SecurityBackup />
            }
          />

          <Route
            path="support-center"
            element={
              <SupportCenter />
            }
          />

          <Route
            path="logs-activity"
            element={
              <LogsActivity />
            }
          />
        </Route>
      </Routes>
  );
}

export default App;