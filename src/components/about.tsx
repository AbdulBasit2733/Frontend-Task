import React from "react";
import "./about.css";
import blackboardIcon from "../assets/012-blackboards.svg";
import telescopeIcon from "../assets/013-telescope-1.svg";

const features = [
  {
    icon: blackboardIcon,
    title: "Expert-Led Learning",
    description:
      "Access courses and resources crafted by industry experts and thought leaders in diverse fields.",
    color: "#96BB7C",
  },
  {
    icon: telescopeIcon,
    title: "Vision & Discovery",
    description:
      "Explore new horizons and discover pathways you never knew existed, guided by our community mentors.",
    color: "#7da063",
  },
  {
    icon: blackboardIcon,
    title: "Collaborative Growth",
    description:
      "Engage in live discussions, group projects, and peer reviews that accelerate your personal and professional growth.",
    color: "#96BB7C",
  },
];

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__layout">
          {/* Left Column - Text */}
          <div className="about__text">
            <span className="tag">About Us</span>
            <h2 className="section-title about__title">
              We Believe in the
              <br />
              <span className="about__title-accent">Power of Community</span>
            </h2>
            <p className="section-subtitle about__subtitle">
              Quvor is an educational community platform built for curious
              minds. We connect learners, educators, and industry professionals
              to foster growth through shared knowledge and genuine connection.
            </p>
            <p className="about__body">
              Our mission is simple: break down barriers to quality education
              and create an environment where everyone can thrive. Whether
              you're a beginner or a seasoned expert, there's a place for you
              here.
            </p>

            <div className="about__highlights">
              <div className="about__highlight-item">
                <div className="about__highlight-dot"></div>
                <span>Peer-to-peer learning model</span>
              </div>
              <div className="about__highlight-item">
                <div className="about__highlight-dot"></div>
                <span>Real-world project experience</span>
              </div>
              <div className="about__highlight-item">
                <div className="about__highlight-dot"></div>
                <span>Industry-recognized certifications</span>
              </div>
            </div>

            <a
              href="#community"
              className="btn btn-primary about__cta"
              id="about-cta-btn"
            >
              Join Our Community
            </a>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="about__features" id="services">
            {features.map((feature, idx) => (
              <div
                className="about__feature-card"
                key={idx}
                id={`feature-card-${idx}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div
                  className="about__feature-icon-wrapper"
                  style={{ background: `${feature.color}20` }}
                >
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="about__feature-icon"
                    style={{
                      filter: `brightness(0) saturate(100%) invert(65%) sepia(30%) saturate(400%) hue-rotate(60deg)`,
                    }}
                  />
                </div>
                <div className="about__feature-content">
                  <h3 className="about__feature-title">{feature.title}</h3>
                  <p className="about__feature-desc">{feature.description}</p>
                </div>
                <div
                  className="about__feature-accent"
                  style={{ background: feature.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
