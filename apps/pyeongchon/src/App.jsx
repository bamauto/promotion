import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HighPublic from './pages/HighPublic';
import Karaoke from './pages/Karaoke';
import Hostbar from './pages/Hostbar';
import ShirtsRoom from './pages/ShirtsRoom';
import KimonoRoom from './pages/KimonoRoom';
import RoomSalon from './pages/RoomSalon';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import HighPublicFAQ from './pages/faqs/HighPublicFAQ';
import KaraokeFAQ from './pages/faqs/KaraokeFAQ';
import RoomSalonFAQ from './pages/faqs/RoomSalonFAQ';
import PriceGuide from './pages/PriceGuide';
import BeginnerGuide from './pages/BeginnerGuide';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// ScrollToTop component to ensure pages start at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pyeongchon-highpub-guide" element={<HighPublic />} />
          <Route path="/pyeongchon-karaoke-guide" element={<Karaoke />} />
          <Route path="/pyeongchon-hostbar-guide" element={<Hostbar />} />
          <Route path="/pyeongchon-shirtsroom-guide" element={<ShirtsRoom />} />
          <Route path="/pyeongchon-kimono-room-guide" element={<KimonoRoom />} />
          <Route path="/pyeongchon-room-salon-guide" element={<RoomSalon />} />
          <Route path="/contact" element={<Contact />} />

          {/* Phase 3: Content Expansion Routes */}
          <Route path="/pyeongchon-highpub-guide/faq" element={<HighPublicFAQ />} />
          <Route path="/pyeongchon-karaoke-guide/faq" element={<KaraokeFAQ />} />
          <Route path="/pyeongchon-room-salon-guide/faq" element={<RoomSalonFAQ />} />
          <Route path="/pyeongchon-entertainment-price-guide" element={<PriceGuide />} />
          <Route path="/pyeongchon-entertainment-beginner-guide" element={<BeginnerGuide />} />

          {/* Phase 4: Legal Routes */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Fallback for old anchors or direct links */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
