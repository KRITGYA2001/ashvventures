import React from 'react';

function Contact() {
    return (
        <div className="contact-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd Love to Hear From You</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contact-content">
                <div className="container">
                    <div className="contact-intro">
                        <h2>Get in Touch</h2>
                        <p>Have a project in mind or need more information about our services? Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    <div className="contact-grid">
                        {/* Contact Information */}
                        <div className="contact-info-section">
                            <h3>Contact Information</h3>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="contact-details">
                                    <h4>Our Office</h4>
                                    <p>H. No. 178-B, Ground Floor<br />
                                    Basant Nagar<br />
                                    New Delhi – 110057<br />
                                    India</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-details">
                                    <h4>Email</h4>
                                    <p><a href="mailto:contact@ashvventures.com">contact@ashvventures.com</a></p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className="contact-details">
                                    <h4>Phone</h4>
                                    <p><a href="tel:+918700832180">+91 8700832180</a></p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="contact-details">
                                    <h4>Business Hours</h4>
                                    <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />
                                    Sunday: Closed</p>
                                </div>
                            </div>

                            <div className="social-contact">
                                <h4>Follow Us</h4>
                                <div className="social-links">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* Google Form */}
                        <div className="contact-form-section">
                            <h3>Send Us a Message</h3>
                            <div className="form-notice">
                                <i className="fas fa-info-circle"></i>
                                <p>Please fill out the form below. You'll be redirected to our Google Form.</p>
                            </div>
                            
                            {/* Replace this URL with your actual Google Form URL */}
                            <div className="google-form-container">
                                <iframe 
                                    src="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform?embedded=true" 
                                    width="100%" 
                                    height="800" 
                                    frameBorder="0" 
                                    marginHeight="0" 
                                    marginWidth="0"
                                    className="google-form"
                                    title="Contact Form">
                                    Loading…
                                </iframe>
                            </div>

                            {/* Alternative: Direct Link Button */}
                            <div className="form-alternative">
                                <p>Or click the button below to open the form in a new window:</p>
                                {/* Replace this URL with your actual Google Form URL */}
                                <a href="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="btn btn-primary">
                                    <i className="fas fa-external-link-alt"></i> Open Contact Form
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2>Find Us Here</h2>
                    <div className="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3503.826!2d77.158168!3d28.571209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM0JzE2LjQiTiA3N8KwMDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                            width="100%" 
                            height="450" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ashv Ventures Location Map">
                        </iframe>
                    </div>
                </div>
            </section>

            {/* Quick Contact Cards */}
            <section className="quick-contact">
                <div className="container">
                    <h2>Quick Contact Options</h2>
                    <div className="quick-contact-grid">
                        <div className="quick-card">
                            <i className="fas fa-clipboard-list"></i>
                            <h3>Request a Quote</h3>
                            <p>Get a detailed quote for your project</p>
                            <a href="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Request Quote</a>
                        </div>
                        
                        <div className="quick-card">
                            <i className="fas fa-calendar-check"></i>
                            <h3>Schedule a Meeting</h3>
                            <p>Book a consultation with our team</p>
                            <a href="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Book Meeting</a>
                        </div>
                        
                        <div className="quick-card">
                            <i className="fas fa-question-circle"></i>
                            <h3>General Inquiry</h3>
                            <p>Ask us anything about our services</p>
                            <a href="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Send Inquiry</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
