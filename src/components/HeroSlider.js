import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function HeroSlider() {
    const slideImages = [
        '/images/slides/slide1.png',
        '/images/slides/slide2.png',
        // Add more slides here as needed
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides] = useState(slideImages);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const autoSlideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(autoSlideInterval);
    }, [nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide]);

    return (
        <section className="hero-slider">
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img 
                            src={slide} 
                            alt={`Ashv Ventures - Slide ${index + 1}`}
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect fill="%232c2c2c" width="1920" height="1080"/%3E%3Ctext fill="white" font-family="Arial" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAshv Ventures%3C/text%3E%3C/svg%3E';
                            }}
                        />
                    </div>
                ))}
            </div>
            
            <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
                <i className="fas fa-chevron-right"></i>
            </button>
            
            <div className="slider-indicators">
                {slides.map((_, index) => (
                    <div 
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
            
            <div className="hero-content">
                <h1 className="hero-title">Building Dreams, Creating Excellence</h1>
                <p className="hero-subtitle">Your Trusted Partner in Design, Construction & Material Supply</p>
                <div className="hero-buttons">
                    <Link to="/about" className="btn btn-primary">Learn More</Link>
                    <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSlider;
