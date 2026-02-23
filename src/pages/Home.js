import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';

function Home() {
    const [countersAnimated, setCountersAnimated] = useState(false);

    useEffect(() => {
        // Scroll animations
        const animateElements = document.querySelectorAll('.service-card, .stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });

        // Counter animation
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    setCountersAnimated(true);
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));

        return () => {
            observer.disconnect();
            counterObserver.disconnect();
        };
    }, [countersAnimated]);

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target;
            }
        };
        updateCounter();
    };

    return (
        <div className="home-page">
            <HeroSlider />

            {/* Services Section */}
            <section className="services">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-subtitle">Comprehensive Solutions for Your Construction Needs</p>
                    </div>
                    
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-pencil-ruler"></i>
                            </div>
                            <h3>Design</h3>
                            <p>Innovative and functional design solutions tailored to your vision and requirements.</p>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-hard-hat"></i>
                            </div>
                            <h3>Construction</h3>
                            <p>Expert construction services with attention to quality, safety, and timely delivery.</p>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-cubes"></i>
                            </div>
                            <h3>Material Supply</h3>
                            <p>Premium quality construction materials sourced from trusted manufacturers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose">
                <div className="container">
                    <div className="why-choose-content">
                        <div className="why-choose-text">
                            <h2>Why Choose Ashv Ventures?</h2>
                            <p>Since our inception in December 2025, we've been committed to delivering excellence in every project.</p>
                            
                            <div className="features-list">
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Expert Team</h4>
                                        <p>Skilled professionals dedicated to your project's success</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Quality Assurance</h4>
                                        <p>Uncompromising commitment to quality in every aspect</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Timely Delivery</h4>
                                        <p>Projects completed on schedule, every time</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Competitive Pricing</h4>
                                        <p>Best value for your investment without hidden costs</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Link to="/about" className="btn btn-primary">Discover More</Link>
                        </div>
                        
                        <div className="why-choose-stats">
                            <div className="stat-card">
                                <h3><span className="counter" data-target="100">0</span>%</h3>
                                <p>Client Satisfaction</p>
                            </div>
                            <div className="stat-card">
                                <h3><span className="counter" data-target="3">0</span></h3>
                                <p>Core Services</p>
                            </div>
                            <div className="stat-card">
                                <h3><span className="counter" data-target="2">0</span></h3>
                                <p>Dedicated Partners</p>
                            </div>
                            <div className="stat-card">
                                <h3>Since <span className="counter" data-target="2025">0</span></h3>
                                <p>Years of Trust</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Next Project?</h2>
                        <p>Let's work together to bring your vision to life</p>
                        <Link to="/contact" className="btn btn-light">Contact Us Today</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
