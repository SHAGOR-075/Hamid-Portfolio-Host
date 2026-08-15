import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { HomeManagement } from './pages/HomeManagement';
import { AboutManagement } from './pages/AboutManagement';
import { SkillsManagement } from './pages/SkillsManagement';
import { EducationManagement } from './pages/EducationManagement';
import { ProjectsManagement } from './pages/ProjectsManagement';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { TravelManagement } from './pages/TravelManagement';
import { TravelFormPage } from './pages/TravelFormPage';
import { SocialsManagement } from './pages/SocialsManagement';
import { ContactManagement } from './pages/ContactManagement';
import { SettingsManagement } from './pages/SettingsManagement';
import { ProfileManagement } from './pages/ProfileManagement';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0B1511',
                color: '#fff',
                border: '1px solid #16261F',
                fontSize: '13px',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#07100C',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#07100C',
                },
              },
            }}
          />

          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin CMS Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home" element={<HomeManagement />} />
              <Route path="about" element={<AboutManagement />} />
              <Route path="skills" element={<SkillsManagement />} />
              <Route path="education" element={<EducationManagement />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="projects/new" element={<ProjectFormPage />} />
              <Route path="projects/:id/edit" element={<ProjectFormPage />} />
              <Route path="travel" element={<TravelManagement />} />
              <Route path="travel/new" element={<TravelFormPage />} />
              <Route path="travel/:id/edit" element={<TravelFormPage />} />
              <Route path="socials" element={<SocialsManagement />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="profile" element={<ProfileManagement />} />
            </Route>

            {/* Default Catch-All Redirect */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
