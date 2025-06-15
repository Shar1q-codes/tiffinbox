import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import FadeInView from "../components/FadeInView";
import CTAButton from "../components/CTAButton";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "adeel@coralloexim.com",
      description: "Send us an email for detailed inquiries"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+91 9247 885 724",
      description: "Call us during business hours"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      details: "Hyderabad, India",
      description: "Our headquarters and main office"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM IST",
      description: "We're available during these hours"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log("Form submitted");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://phenomenal-gingersnap-e16472.netlify.app/contact#webpage",
    "url": "https://phenomenal-gingersnap-e16472.netlify.app/contact",
    "name": "Contact Corallo Export Import - Get Trade Quotes & Support",
    "description": "Contact Corallo for international trade inquiries, product quotes, and export-import support. Reach our trade experts in Hyderabad, India.",
    "isPartOf": {
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#website"
    },
    "mainEntity": {
      "@type": "ContactPage",
      "name": "Contact Corallo Export Import",
      "description": "Get in touch with our trade experts for international commerce support"
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Corallo Export Import - Get Trade Quotes & Support | Hyderabad, India"
        description="Contact Corallo for international trade inquiries, product quotes, and export-import support. Reach our trade experts in Hyderabad, India. Email: adeel@coralloexim.com | Phone: +91 9247 885 724"
        keywords="contact corallo, export import contact, trade inquiry, get quote, international trade support, hyderabad trade broker"
        canonicalUrl="/contact"
        structuredData={structuredData}
      />
      
      <motion.div
        className={styles.contact}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className={styles.heroSection} aria-labelledby="contact-hero-heading">
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 id="contact-hero-heading">Contact Us</h1>
              <p className={styles.subtitle}>
                Let's talk trade. Reach out to source or sell through verified global partners.
              </p>
              <p className={styles.heroDescription}>
                Ready to expand your business through international trade? Our team of experts 
                is here to help you connect with the right partners and navigate the complexities 
                of global commerce.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className={styles.contactInfoSection} aria-labelledby="contact-info-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2 id="contact-info-heading">Get in Touch</h2>
                <p>Multiple ways to reach our team of trade professionals</p>
              </div>
            </FadeInView>

            <div className={styles.contactGrid} role="list">
              {contactInfo.map((info, index) => (
                <FadeInView key={index} delay={0.1 * index}>
                  <article className={styles.contactCard} role="listitem">
                    <div className={styles.contactIcon} aria-hidden="true">{info.icon}</div>
                    <h3>{info.title}</h3>
                    <p className={styles.contactDetails}>{info.details}</p>
                    <p className={styles.contactDescription}>{info.description}</p>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.formSection} aria-labelledby="contact-form-heading">
          <div className="container">
            <div className={styles.formGrid}>
              <FadeInView>
                <article className={styles.formContent}>
                  <h2 id="contact-form-heading">Send us a Message</h2>
                  <p>
                    Fill out the form below and our team will get back to you within 24 hours. 
                    Please provide as much detail as possible about your trade requirements.
                  </p>
                  
                  <div className={styles.formBenefits} role="list">
                    <div className={styles.benefit} role="listitem">
                      <Send size={20} aria-hidden="true" />
                      <span>Quick response within 24 hours</span>
                    </div>
                    <div className={styles.benefit} role="listitem">
                      <Mail size={20} aria-hidden="true" />
                      <span>Direct connection to trade experts</span>
                    </div>
                    <div className={styles.benefit} role="listitem">
                      <Phone size={20} aria-hidden="true" />
                      <span>Follow-up call if needed</span>
                    </div>
                  </div>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <form className={styles.contactForm} onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Enter your first name"
                        aria-required="true"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Enter your last name"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email address"
                        aria-required="true"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="tradeType">Trade Interest</label>
                    <select id="tradeType" name="tradeType" aria-label="Select your trade interest">
                      <option value="">Select your trade interest</option>
                      <option value="buying">Looking to Buy</option>
                      <option value="selling">Looking to Sell</option>
                      <option value="both">Both Buying and Selling</option>
                      <option value="consultation">Trade Consultation</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="products">Product Categories</label>
                    <select id="products" name="products" aria-label="Select product category">
                      <option value="">Select product category</option>
                      <option value="petrochemicals">Petrochemicals</option>
                      <option value="aluminium">Aluminium Scrap & Ingots</option>
                      <option value="iron">Iron & Iron Ore</option>
                      <option value="textiles">Textiles</option>
                      <option value="leather">Leather</option>
                      <option value="multiple">Multiple Categories</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Please describe your trade requirements, quantities, specifications, and any other relevant details..."
                      aria-required="true"
                    ></textarea>
                  </div>
                  
                  <CTAButton 
                    type="submit" 
                    variant="primary" 
                    size="large" 
                    className={styles.submitButton}
                    aria-label="Send contact form message to Corallo"
                  >
                    Send Message
                  </CTAButton>
                </form>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className={styles.additionalInfo} aria-labelledby="why-contact-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.infoContent}>
                <h2 id="why-contact-heading">Why Contact Corallo?</h2>
                <div className={styles.infoGrid} role="list">
                  <article className={styles.infoCard} role="listitem">
                    <h3>Expert Consultation</h3>
                    <p>Get professional advice on international trade opportunities and market trends</p>
                  </article>
                  <article className={styles.infoCard} role="listitem">
                    <h3>Global Network Access</h3>
                    <p>Connect with our verified network of suppliers and buyers across 50+ countries</p>
                  </article>
                  <article className={styles.infoCard} role="listitem">
                    <h3>Transparent Process</h3>
                    <p>Clear communication and transparent commission-based pricing structure</p>
                  </article>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      </motion.div>
    </>
  );
}