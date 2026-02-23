import React, { useState } from "react";
import "./contact.css";
import locationIcon from "../assets/location.svg";
import emailIcon from "../assets/email.svg";
import contactIcon from "../assets/contact.svg";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__header">
          <span className="tag">Get In Touch</span>
          <h2 className="section-title contact__title">
            Let's Start a<br />
            <span className="contact__title-accent">Conversation</span>
          </h2>
          <p className="section-subtitle contact__subtitle">
            Whether you have a question, want to collaborate, or just want to
            say hello — we'd love to hear from you.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info Cards */}
          <div className="contact__info">
            <div className="contact__info-card" id="location-card">
              <div className="contact__info-icon-wrap">
                <img
                  src={locationIcon}
                  alt="Location"
                  className="contact__info-icon"
                />
              </div>
              <div>
                <h4 className="contact__info-title">Our Location</h4>
                <p className="contact__info-text">
                  123 Innovation Drive,
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>

            <div className="contact__info-card" id="email-card">
              <div className="contact__info-icon-wrap">
                <img
                  src={emailIcon}
                  alt="Email"
                  className="contact__info-icon"
                />
              </div>
              <div>
                <h4 className="contact__info-title">Email Us</h4>
                <p className="contact__info-text">
                  hello@quvor.community
                  <br />
                  support@quvor.community
                </p>
              </div>
            </div>

            <div className="contact__info-card" id="phone-card">
              <div className="contact__info-icon-wrap">
                <img
                  src={contactIcon}
                  alt="Phone"
                  className="contact__info-icon"
                />
              </div>
              <div>
                <h4 className="contact__info-title">Call Us</h4>
                <p className="contact__info-text">
                  +1 (415) 555-0198
                  <br />
                  Mon–Fri, 9am–6pm PST
                </p>
              </div>
            </div>

            <div className="contact__map">
              <div className="contact__map-placeholder">
                <div className="contact__map-pin">📍</div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrapper">
            {submitted && (
              <div className="contact__success" id="contact-success">
                <span className="contact__success-icon">✓</span>
                <div>
                  <strong>Message sent successfully!</strong>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form
              className="contact__form"
              onSubmit={handleSubmit}
              id="contact-form"
            >
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="contact-name" className="contact__form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    className="contact__form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__form-group">
                  <label
                    htmlFor="contact-email"
                    className="contact__form-label"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="your@email.com"
                    className="contact__form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label
                  htmlFor="contact-subject"
                  className="contact__form-label"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="How can we help?"
                  className="contact__form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label
                  htmlFor="contact-message"
                  className="contact__form-label"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  className="contact__form-textarea"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact__form-submit"
                id="contact-submit-btn"
              >
                Send Message
                <span className="contact__arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
