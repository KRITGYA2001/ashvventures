import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
    useEffect(() => {
        // Scroll animations
        const animateElements = document.querySelectorAll('.detail-card, .partner-card, .value-card, .scope-item');
        
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

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>About Ashv Ventures</h1>
                    <p>Building Excellence Since December 2025</p>
                </div>
            </section>

            {/* About Content */}
            <section className="about-content">
                <div className="container">
                    <div className="about-intro">
                        <div className="about-intro-text">
                            <h2>Who We Are</h2>
                            <p>Ashv Ventures is a dynamic partnership firm specializing in <strong>Design, Construction, and Material Supply</strong>. Based in the heart of New Delhi, we bring together expertise, innovation, and commitment to deliver exceptional results for our clients.</p>
                            <p>Founded on <strong>19th December 2025</strong>, our firm represents the perfect blend of vision and execution, driven by our dedicated partners who bring years of experience and passion to every project.</p>
                        </div>
                        <div className="about-intro-image">
                            <img src="/images/slides/slide1.png" alt="Ashv Ventures Projects" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Details */}
            <section className="business-details">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Business</h2>
                        <p className="section-subtitle">Comprehensive solutions across multiple domains</p>
                    </div>
                    
                    <div className="details-grid">
                        <div className="detail-card">
                            <div className="detail-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <h3>Firm Name</h3>
                            <p>M/S ASHV Ventures</p>
                        </div>
                        
                        <div className="detail-card">
                            <div className="detail-icon">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3>Structure</h3>
                            <p>Partnership Firm</p>
                        </div>
                        
                        <div className="detail-card">
                            <div className="detail-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <h3>Location</h3>
                            <p>Basant Nagar, New Delhi</p>
                        </div>
                        
                        <div className="detail-card">
                            <div className="detail-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <h3>Established</h3>
                            <p>19th December 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Scope */}
            <section className="services-scope">
                <div className="container">
                    <h2>Our Services Scope</h2>
                    <p className="scope-intro">Ashv Ventures carries on business across multiple domains:</p>
                    
                    <div className="scope-grid">
                        <div className="scope-item">
                            <div className="scope-number">01</div>
                            <h3>Design Services</h3>
                            <p>Creating innovative and functional designs that blend aesthetics with practicality, tailored to meet client specifications and regulatory requirements.</p>
                        </div>
                        
                        <div className="scope-item">
                            <div className="scope-number">02</div>
                            <h3>Construction</h3>
                            <p>End-to-end construction management with a focus on quality, safety, and timely project delivery. We handle projects of varying scales with equal dedication.</p>
                        </div>
                        
                        <div className="scope-item">
                            <div className="scope-number">03</div>
                            <h3>Material Supply</h3>
                            <p>Sourcing and supplying premium quality construction materials from trusted manufacturers, ensuring consistency and reliability for your projects.</p>
                        </div>
                        
                        <div className="scope-item">
                            <div className="scope-number">04</div>
                            <h3>Related Business Activities</h3>
                            <p>We expand into other construction and infrastructure activities as mutually agreed, ensuring we grow with our clients' evolving needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Partners</h2>
                        <p className="section-subtitle">The driving force behind our success</p>
                    </div>
                    
                    <div className="partners-grid">
                        <div className="partner-card">
                            <div className="partner-info">
                                <h3>Ashwini Singh</h3>
                                <p className="partner-role">Working Partner</p>
                            </div>
                        </div>
                        
                        <div className="partner-card">
                            <div className="partner-info">
                                <h3>Varun Kumar</h3>
                                <p className="partner-role">Working Partner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2>Our Core Values</h2>
                    
                    <div className="values-grid">
                        <div className="value-card">
                            <i className="fas fa-handshake"></i>
                            <h3>Integrity</h3>
                            <p>Conducting business with transparency and honesty in all our dealings</p>
                        </div>
                        
                        <div className="value-card">
                            <i className="fas fa-award"></i>
                            <h3>Excellence</h3>
                            <p>Striving for the highest quality in every aspect of our work</p>
                        </div>
                        
                        <div className="value-card">
                            <i className="fas fa-users"></i>
                            <h3>Collaboration</h3>
                            <p>Working together with clients and stakeholders for mutual success</p>
                        </div>
                        
                        <div className="value-card">
                            <i className="fas fa-lightbulb"></i>
                            <h3>Innovation</h3>
                            <p>Embracing new ideas and technologies to deliver better solutions</p>
                        </div>
                        
                        <div className="value-card">
                            <i className="fas fa-shield-alt"></i>
                            <h3>Reliability</h3>
                            <p>Delivering on our commitments with consistency and dependability</p>
                        </div>
                        
                        <div className="value-card">
                            <i className="fas fa-leaf"></i>
                            <h3>Sustainability</h3>
                            <p>Building responsibly with consideration for environmental impact</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registered Office */}
            <section className="registered-office">
                <div className="container">
                    <div className="office-content">
                        <div className="office-info">
                            <h2>Registered Office</h2>
                            <div className="office-address">
                                <i className="fas fa-building"></i>
                                <div>
                                    <h3>Ashv Ventures</h3>
                                    <p>H. No. 178-B, Ground Floor</p>
                                    <p>Basant Nagar</p>
                                    <p>New Delhi – 110057</p>
                                    <p>India</p>
                                </div>
                            </div>
                            <div className="office-contact">
                                <p><i className="fas fa-envelope"></i> contact@ashvventures.com</p>
                                <p><i className="fas fa-phone"></i> +91 8700832180</p>
                            </div>
                        </div>
                        
                        <div className="office-map">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3503.826!2d77.158168!3d28.571209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM0JzE2LjQiTiA3N8KwMDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                                width="100%" 
                                height="400" 
                                style={{border:0}} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ashv Ventures Location">
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Let's Build Something Great Together</h2>
                        <p>Partner with us for your next project</p>
                        <Link to="/contact" className="btn btn-light">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
