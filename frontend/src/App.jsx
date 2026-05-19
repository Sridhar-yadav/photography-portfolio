import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import Store from './pages/Store';
import About from './pages/About';
import Contact from './pages/Contact';
import WhatsAppCTA from './components/WhatsAppCTA';

// Admin Routes
import Login from './pages/auth/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import PortfolioManager from './pages/dashboard/PortfolioManager';
import FilmsManager from './pages/dashboard/FilmsManager';
import InquiryCRM from './pages/dashboard/InquiryCRM';
import StoreManager from './pages/dashboard/StoreManager';
import TestimonialsManager from './pages/dashboard/TestimonialsManager';
import HomepageCMS from './pages/dashboard/HomepageCMS';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Routes (No Public Layout) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Overview />} />
          <Route path="portfolio" element={<PortfolioManager />} />
          <Route path="films" element={<FilmsManager />} />
          <Route path="inquiries" element={<InquiryCRM />} />
          <Route path="products" element={<StoreManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="homepage" element={<HomepageCMS />} />
        </Route>

        {/* Public Routes with Global Layout */}
        <Route path="*" element={
          <div className="flex flex-col min-h-screen bg-background text-textPrimary">
            <Routes>
              <Route path="/admin" element={null} />
              <Route path="*" element={<Navbar />} />
            </Routes>
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/films" element={<Films />} />
                <Route path="/films/:id" element={<FilmDetail />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Login />} />
              </Routes>
            </main>
            
            <Routes>
              <Route path="/admin" element={null} />
              <Route path="*" element={
                <>
                  <Footer />
                  <WhatsAppCTA />
                </>
              } />
            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
