import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/services", label: "Services" },
        { to: "/products", label: "Products" },
        { to: "/contact", label: "Contact" },
        { to: "/faqs", label: "FAQs" },
      ],
    },
    {
      title: "Services",
      links: [
        { to: "/services", label: "Export Services" },
        { to: "/services", label: "Import Solutions" },
        { to: "/services", label: "Trade Consulting" },
        { to: "/services", label: "Logistics Support" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "adeel@coralloexim.com",
      href: "mailto:adeel@coralloexim.com",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 9247 885 724",
      href: "tel:+919247885724",
    },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: "Hyderabad, India",
    },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <motion.div
            className={styles.brandSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.brandName}>Corallo</h3>
            <p className={styles.brandDescription}>
              Your trusted partner in global trade, connecting businesses 
              worldwide with quality products and reliable services.
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              className={styles.linkSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h4>{section.title}</h4>
              <ul role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            className={styles.contactSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Contact Info</h4>
            <ul role="list">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon} aria-hidden="true">{item.icon}</span>
                    <div>
                      <span className={styles.contactLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} aria-label={`${item.label}: ${item.value}`}>
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className={styles.footerBottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            © {currentYear} Corallo Export & Import. All rights reserved.
          </p>
          <button
            className={styles.scrollToTop}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
          >
            <ArrowUp size={20} />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}