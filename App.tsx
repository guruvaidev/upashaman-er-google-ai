
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import pages directly to avoid dynamic import issues
import Home from './pages/Home';
import Triage from './pages/Triage';
import PatientSearch from './pages/PatientSearch';
import Equity from './pages/Equity';
import ApiTest from './pages/ApiTest';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="triage" element={<Triage />} />
          <Route path="search" element={<PatientSearch />} />
          <Route path="equity" element={<Equity />} />
          <Route path="test" element={<ApiTest />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
