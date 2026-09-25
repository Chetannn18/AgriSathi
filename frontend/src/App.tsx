import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { MobileNavigation } from './components/MobileNavigation';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScanPage } from './pages/ScanPage';
import { DiagnosisDetailPage } from './pages/DiagnosisDetailPage';
import { AssistantPage } from './pages/AssistantPage';
import { FarmsPage } from './pages/FarmsPage';
import { HistoryPage } from './pages/HistoryPage';
import { DiseasesPage } from './pages/DiseasesPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';
import { WeatherPage } from './pages/WeatherPage';
import { ExpertPage } from './pages/ExpertPage';
import { ProfilePage } from './pages/ProfilePage';
import { MandiPage } from './pages/MandiPage';
import { CalculatorPage } from './pages/CalculatorPage';

export function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-[#fbfbfa] flex flex-col selection:bg-forest-200 selection:text-forest-900">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/diagnosis/:id" element={<DiagnosisDetailPage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/mandi" element={<MandiPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/farms" element={<FarmsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/diseases" element={<DiseasesPage />} />
              <Route path="/diseases/:id" element={<DiseaseDetailPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/expert" element={<ExpertPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>

          <MobileNavigation />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
