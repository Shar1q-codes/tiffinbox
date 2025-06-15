import { motion } from "framer-motion";
import { Shield, Users, Globe, TrendingUp, CheckCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FadeInView from "../components/FadeInView";
import CTAButton from "../components/CTAButton";
import SEOHead from "../components/SEOHead";
import styles from "../styles/About.module.css";

export default function About() {
  const navigate = useNavigate();

  const coreValues = [
    {
      icon: <Shield size={32} />,
      title: "Integrity in every deal",
      description: "We maintain the highest ethical standards in all our business transactions and partnerships."
    },
    {
      icon: <Users size={32} />,
      title: "Transparency in communication",
      description: "Clear, honest communication with all stakeholders throughout the entire trade process."
    },
    {
      icon: <Globe size={32} />,
      title: "Long-term relationships",
      description: "Building lasting partnerships based on trust, reliability, and mutual success."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Customer-centric brokerage",
      description: "Putting our clients' needs first and delivering tailored solutions for their success."
    }
  ];

  const achievements = [
    { number: "500+", label: "Successful Deals" },
    { number: "50+", label: "Countries Served" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const handleStartTrading = () => {
    navigate('/products');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://phenomenal-gingersnap-e16472.netlify.app/about#webpage",
    "url": "https://phenomenal-gingersnap-e16472.netlify.app/about",
    "name": "About Corallo - Global Trade Brokerage Company",
    "description": "Learn about Corallo's 15+ years of experience in international trade brokerage, connecting global buyers and sellers across 50+ countries.",
    "isPartOf": {
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#website"
    },
    "about": {
      "@type": "Organization",
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
    }
  };

  return (
    <>
      <SEOHead
        title="About Corallo - Global Trade Brokerage Company | 15+ Years Experience"
        description="Learn about Corallo's 15+ years of experience in international trade brokerage, connecting global buyers and sellers across 50+ countries in petrochemicals, metals, textiles, and leather industries."
        keywords="about corallo, trade brokerage company, international trade experience, global trade network, export import broker history"
        canonicalUrl="/about"
        structuredData={structuredData}
      />
      
      <motion.div
        className={styles.about}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section with Image */}
        <section className={styles.heroSection} aria-labelledby="about-hero-heading">
          <div className="container">
            <div className={styles.heroGrid}>
              <motion.div
                className={styles.heroContent}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 id="about-hero-heading">About Corallo</h1>
                <p className={styles.subtitle}>
                  Your trusted partner in global trade and commerce
                </p>
                <p className={styles.heroDescription}>
                  Corallo is a specialized trade brokerage firm, not a manufacturer. We serve as the vital 
                  bridge connecting global buyers and sellers in the petrochemicals, metals, textiles, and 
                  leather industries through transparent, commission-based trade solutions.
                </p>
              </motion.div>
              
              <motion.div
                className={styles.heroImage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img 
                  src="/src/assets/about/about-hero-handshake.png" 
                  alt="Professional handshake representing global trade partnerships and business relationships in international commerce"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection} aria-labelledby="mission-heading">
          <div className="container">
            <div className={styles.missionGrid}>
              <FadeInView>
                <article className={styles.missionContent}>
                  <h2 id="mission-heading">Our Mission</h2>
                  <p>
                    To facilitate seamless international trade by connecting verified buyers and sellers 
                    through our extensive global network. We specialize in commission-based brokerage 
                    services that prioritize transparency, efficiency, and long-term partnerships.
                  </p>
                  <p>
                    As trade brokers, we don't manufacture or hold inventory. Instead, we leverage our 
                    deep industry knowledge and global connections to match the right buyers with the 
                    right sellers, ensuring successful transactions for all parties involved.
                  </p>
                  
                  <div className={styles.highlights}>
                    <div className={styles.highlight}>
                      <CheckCircle size={24} aria-hidden="true" />
                      <span>Commission-based brokerage model</span>
                    </div>
                    <div className={styles.highlight}>
                      <CheckCircle size={24} aria-hidden="true" />
                      <span>No inventory or manufacturing</span>
                    </div>
                    <div className={styles.highlight}>
                      <CheckCircle size={24} aria-hidden="true" />
                      <span>Focus on trade facilitation</span>
                    </div>
                  </div>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className={styles.achievementsGrid} role="list" aria-label="Company achievements">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={styles.achievementCard} role="listitem">
                      <div className={styles.achievementNumber}>{achievement.number}</div>
                      <div className={styles.achievementLabel}>{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className={styles.valuesSection} aria-labelledby="values-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2 id="values-heading">Our Core Values</h2>
                <p>The principles that guide every aspect of our brokerage services</p>
              </div>
            </FadeInView>

            <div className={styles.valuesGrid} role="list">
              {coreValues.map((value, index) => (
                <FadeInView key={index} delay={0.1 * index}>
                  <article className={styles.valueCard} role="listitem">
                    <div className={styles.valueIcon} aria-hidden="true">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence Section with Map */}
        <section className={styles.globalSection} aria-labelledby="global-heading">
          <div className="container">
            <div className={styles.globalGrid}>
              <FadeInView>
                <article className={styles.globalContent}>
                  <h2 id="global-heading">Global Trade Network</h2>
                  <p>
                    Our extensive network spans across 50+ countries, connecting businesses with 
                    verified suppliers and buyers worldwide. We have established strong partnerships 
                    in key trading regions including North America, Europe, Asia, and emerging markets.
                  </p>
                  <p>
                    Through our global presence, we facilitate cross-border trade relationships that 
                    drive business growth and create lasting value for our partners. Our deep understanding 
                    of regional markets and trade regulations ensures smooth transactions across continents.
                  </p>
                  
                  <div className={styles.globalHighlights}>
                    <div className={styles.globalItem}>
                      <Globe size={24} aria-hidden="true" />
                      <div>
                        <h4>50+ Countries</h4>
                        <p>Active trading partnerships worldwide</p>
                      </div>
                    </div>
                    <div className={styles.globalItem}>
                      <Award size={24} aria-hidden="true" />
                      <div>
                        <h4>Verified Network</h4>
                        <p>All partners undergo rigorous verification</p>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className={styles.globalImage}>
                  <img 
                    src="/src/assets/about/world-trade-map.png" 
                    alt="World map showing global trade network and international business connections across continents for export-import services"
                    loading="lazy"
                  />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className={styles.experienceSection} aria-labelledby="experience-heading">
          <div className="container">
            <div className={styles.experienceGrid}>
              <FadeInView>
                <article className={styles.experienceContent}>
                  <h2 id="experience-heading">15+ Years of Trade Excellence</h2>
                  <p>
                    Since our establishment, Corallo has built a reputation as a reliable trade broker 
                    in the global marketplace. Our team of experienced professionals understands the 
                    complexities of international trade and works tirelessly to ensure smooth transactions.
                  </p>
                  <p>
                    We have successfully facilitated hundreds of deals across multiple industries, 
                    connecting businesses from over 50 countries. Our commission-based model aligns 
                    our success with our clients' success, ensuring we're always working in your best interest.
                  </p>
                  
                  <div className={styles.experienceHighlights}>
                    <div className={styles.experienceItem}>
                      <Award size={24} aria-hidden="true" />
                      <div>
                        <h4>Industry Recognition</h4>
                        <p>Recognized for excellence in trade brokerage services</p>
                      </div>
                    </div>
                    <div className={styles.experienceItem}>
                      <Globe size={24} aria-hidden="true" />
                      <div>
                        <h4>Global Reach</h4>
                        <p>Active partnerships across 5 continents</p>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className={styles.experienceImage}>
                  <img 
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="International trade professionals working on global export-import business deals and partnerships" 
                    loading="lazy"
                  />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} aria-labelledby="about-cta-heading">
          <div className="container text-center">
            <FadeInView>
              <div className={styles.ctaContent}>
                <h2 id="about-cta-heading">Ready to Partner with Us?</h2>
                <p>
                  Join our network of successful traders and experience the difference that 
                  professional brokerage services can make for your business.
                </p>
                <CTAButton 
                  variant="primary" 
                  size="large"
                  onClick={handleStartTrading}
                  aria-label="Start trading with Corallo - View our products and services"
                >
                  Start Trading Today
                </CTAButton>
              </div>
            </FadeInView>
          </div>
        </section>
      </motion.div>
    </>
  );
}