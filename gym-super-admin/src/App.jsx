import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
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

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"element={<Login />} />

              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route
                  path="/gyms-management"
                  element={<GymsManagement />}
                />

                <Route
                  path="/subscriptions"
                  element={<Subscriptions />}
                />

                <Route
                  path="/revenue-billing"
                  element={<RevenueBilling />}
                />

                <Route
                  path="/analytics"
                  element={<Analytics />}
                />

                <Route
                  path="/gym-performance"
                  element={<GymPerformance />}
                />

                <Route
                  path="/users-roles"
                  element={<UsersRoles />}
                />

                <Route
                  path="/announcements"
                  element={<Announcements />}
                />

                <Route
                  path="/settings"
                  element={<Settings />}
                />

                <Route
                  path="/security-backup"
                  element={<SecurityBackup />}
                />

                <Route
                  path="/support-center"
                  element={<SupportCenter />}
                />

                <Route
                  path="/logs-activity"
                  element={<LogsActivity />}
                />

              </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}