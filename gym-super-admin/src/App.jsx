import './App.css'
import Sidebar from "./components/Sidebar";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

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
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/gyms"
            element={<GymsManagement />}
          />
          <Route
            path="/subscriptions"
            element={<Subscriptions />}
          />
          <Route
            path="/revenue"
            element={<RevenueBilling />}
          />
          <Route
            path="/analytics"
            element={<Analytics />}
          />
          <Route
            path="/performance"
            element={<GymPerformance />}
          />
          <Route
            path="/users"
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
            path="/security"
            element={<SecurityBackup />}
          />
          <Route
            path="/support"
            element={<SupportCenter />}
          />
          <Route
            path="/logs"
            element={<LogsActivity />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
