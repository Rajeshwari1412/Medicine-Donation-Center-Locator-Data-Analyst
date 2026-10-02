import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Admin from './Components/Admin';
import User from './Components/User';

// Admin Pages
import AddDonationCenter from './Components/Admin-Pages/AddDonationCenters';
import CenterTimings from './Components/Admin-Pages/CenterTimings';
import ManageCenters from './Components/Admin-Pages/ManageCenters';

// User & Feature Pages
import DonationCenters from './Components/UserPages/DonationCenters';
import CategoryGuidelines from './Components/Guidelines/CategoryGuidelines';
import DemandAnalyticsDashboard from './Components/Analytics/DemandAnalyticsDashboard';
import MedicineScanner from './Components/Scanner/MedicineScanner';
import DonationCertificate from './Components/Certificate/DonationCertificate';

function App() {
  const location = useLocation();

  // Header and Footer hide in admin & user dashboard
  const hideChromeRoutes = ["/admin", "/user"];
  const showChrome = !hideChromeRoutes.includes(location.pathname);

  return (
    <div className="app-root-container">
      {/* Header */}
      {showChrome && <Header />}

      <div className="app-main-content">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/guidelines" element={<CategoryGuidelines />} />
          <Route path="/scanner" element={<MedicineScanner />} />
          <Route path="/analytics" element={<DemandAnalyticsDashboard />} />
          <Route path="/certificate" element={<DonationCertificate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboards */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />

          {/* Admin Functional Pages */}
          <Route path="/addcenters" element={<AddDonationCenter />} />
          <Route path="/centertimings" element={<CenterTimings />} />
          <Route path="/managecenters" element={<ManageCenters />} />

          {/* User Functional Page */}
          <Route path="/donation-centers" element={<DonationCenters />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Footer */}
      {showChrome && <Footer />}
    </div>
  );
}

export default App;