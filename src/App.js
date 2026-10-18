import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import About from './pages/About';
import Materials from './pages/Materials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Brochure from './pages/Brochure';
import ScrollToTop from './components/ScrollToTop';
import { SiteMotionProvider } from './motion/SiteMotion';
import './App.css';

function SiteLayout() {
    return (
        <SiteMotionProvider>
            <Loader />
            <Cursor />
            <div className="site">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </SiteMotionProvider>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/brochure" element={<Brochure />} />
            </Routes>
        </Router>
    );
}

export default App;
