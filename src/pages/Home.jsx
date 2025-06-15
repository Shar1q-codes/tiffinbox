import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Users, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import FadeInView from "../components/FadeInView";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

export default function Home() {
  const features = [
    {
      icon: <Globe size={48} />,
      title: "Global Network",
      description: "Extensive network of verified suppliers and buyers across multiple continents for seamless international trade."
    },
    {
      icon: <Shield size={48} />,
      title: "Verified Partners",
      description: "All our trading partners undergo rigorous verification processes to ensure reliability and quality standards."
    },
    {
      icon: <Users size={48} />,
      title: "Expert Team",
      description: "Experienced trade professionals dedicated to facilitating successful deals and long-term partnerships."
    }
  ];

  const stats = [
    { number: "500+", label: "Global Partners" },
    { number: "50+", label: "Countries" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#webpage",
    "url": "https://phenomenal-gingersnap-e16472.netlify.app/",
    "name": "Corallo Exports and Imports | Global Trade Broker",
    "description": "Leading global trade broker specializing in petrochemicals, aluminium, iron, textiles, and leather. Connect with verified suppliers and buyers worldwide.",
    "isPartOf": {
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#website"
    },
    "about": {
      "@type": "Organization",
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
    },
    "mainEntity": {
      "@type": "Service",
      "name": "International Trade Brokerage",
      "description": "Commission-based trade brokerage services for petrochemicals, metals, textiles, and leather products",
      "serviceType": "Trade Brokerage",
      "provider": {
        "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Corallo Exports and Imports | Petrochemicals, Metals & Textiles Broker"
        description="Leading global trade broker specializing in petrochemicals, aluminium, iron, textiles, and leather. Connect with verified suppliers and buyers worldwide through our commission-based brokerage services."
        keywords="export import broker, petrochemicals trading, aluminium scrap, iron ore, textiles export, leather trading, global trade brokerage, international commerce"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      
      <motion.div
        className={styles.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1>Empowering Global Trade in Petrochemicals, Metals, and Textiles</h1>
              <p className={styles.heroSubtitle}>
                Efficient Trade Brokerage | Verified Suppliers | Transparent Deal-Making
              </p>
              <p className={styles.heroDescription}>
                Corallo is your trusted commission-based trade broker specializing in petrochemicals, 
                aluminium, iron, textiles, and leather. We connect global buyers and sellers through 
                transparent, efficient, and reliable trade solutions.
              </p>
              
              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={styles.statCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className={styles.statNumber}>{stat.number}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.heroActions}>
                <Link 
                  to="/products" 
                  className={styles.startTradingButton}
                  aria-label="Start trading with Corallo - View our products"
                >
                  <span>Start Trading</span>
                  <ArrowRight size={20} />
                </Link>
                <CTAButton 
                  as={Link} 
                  to="/about" 
                  variant="outline" 
                  size="large"
                  aria-label="Learn more about Corallo's trade brokerage services"
                >
                  Learn More
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-primary" aria-labelledby="features-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2 id="features-heading">Why Choose Corallo</h2>
                <p>We provide comprehensive trade brokerage services with a focus on transparency, reliability, and global reach.</p>
              </div>
            </FadeInView>
            
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <FadeInView key={index} delay={0.2 * index}>
                  <article className={styles.featureCard}>
                    <div className={styles.featureIcon} aria-hidden="true">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className={styles.aboutPreview} aria-labelledby="about-preview-heading">
          <div className="container">
            <div className={styles.aboutGrid}>
              <FadeInView>
                <article className={styles.aboutContent}>
                  <h2 id="about-preview-heading">Your Trusted Trade Partner</h2>
                  <p className={styles.aboutDescription}>
                    With over 15 years of experience in international trade, Corallo has established 
                    itself as a reliable bridge between global buyers and sellers. We specialize in 
                    commission-based brokerage services that prioritize transparency and long-term partnerships.
                  </p>
                  <p>
                    Our extensive network spans across 50+ countries, connecting businesses with 
                    verified suppliers and buyers in petrochemicals, metals, textiles, and leather industries. 
                    We don't manufacture or hold inventory – we facilitate successful trade relationships.
                  </p>
                  
                  <div className={styles.aboutHighlights}>
                    <div className={styles.highlight}>
                      <CheckCircle size={20} aria-hidden="true" />
                      <span>Commission-based model</span>
                    </div>
                    <div className={styles.highlight}>
                      <CheckCircle size={20} aria-hidden="true" />
                      <span>Verified global network</span>
                    </div>
                    <div className={styles.highlight}>
                      <CheckCircle size={20} aria-hidden="true" />
                      <span>Transparent processes</span>
                    </div>
                  </div>

                  <CTAButton 
                    as={Link} 
                    to="/about" 
                    variant="secondary" 
                    size="medium"
                    aria-label="Learn more about Corallo's company history and values"
                  >
                    Learn More About Us
                  </CTAButton>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className={styles.aboutImage}>
                  <img 
                    src="/src/assets/home/about-preview.png" 
                    alt="Global trade network showing international business partnerships and export-import connections across continents" 
                    loading="lazy"
                  />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className={styles.servicesPreview} aria-labelledby="services-preview-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2 id="services-preview-heading">Our Trade Services</h2>
                <p>Comprehensive brokerage solutions for international trade</p>
              </div>
            </FadeInView>

            <div className={styles.servicesGrid}>
              <FadeInView delay={0.1}>
                <article className={styles.serviceCard}>
                  <div className={styles.serviceIcon} aria-hidden="true">
                    <CheckCircle size={32} />
                  </div>
                  <h3>Verified Sourcing</h3>
                  <p>Connect with pre-verified suppliers and manufacturers worldwide</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <article className={styles.serviceCard}>
                  <div className={styles.serviceIcon} aria-hidden="true">
                    <TrendingUp size={32} />
                  </div>
                  <h3>Market Intelligence</h3>
                  <p>Real-time market updates and pricing trends for informed decisions</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.3}>
                <article className={styles.serviceCard}>
                  <div className={styles.serviceIcon} aria-hidden="true">
                    <Globe size={32} />
                  </div>
                  <h3>Global Logistics</h3>
                  <p>End-to-end logistics support and documentation assistance</p>
                </article>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className="container text-center">
            <FadeInView>
              <div className={styles.ctaContent}>
                <h2 id="cta-heading">Ready to Expand Your Business?</h2>
                <p className={styles.ctaText}>
                  Let us help you navigate the complexities of international trade with our 
                  expert brokerage services and global network of verified partners.
                </p>
                <Link 
                  to="/contact" 
                  className={styles.contactUsButton}
                  aria-label="Contact Corallo for trade inquiries and business partnerships"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeInView>
          </div>
        </section>
      </motion.div>
    </>
  );
}