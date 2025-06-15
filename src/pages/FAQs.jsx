import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FadeInView from "../components/FadeInView";
import CTAButton from "../components/CTAButton";
import SEOHead from "../components/SEOHead";
import styles from "../styles/FAQs.module.css";

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Are you manufacturers or resellers?",
      answer: "We are trade brokers, not manufacturers or resellers. Corallo specializes in facilitating international trade by connecting verified buyers and sellers through our commission-based brokerage services. We don't manufacture products or hold inventory - instead, we leverage our global network to match the right trading partners."
    },
    {
      question: "What countries do you operate in?",
      answer: "We operate globally with active partnerships across 50+ countries spanning North America, Europe, Asia, Africa, and South America. Our extensive network includes verified suppliers and buyers in major trading hubs worldwide, enabling us to facilitate international trade across multiple continents."
    },
    {
      question: "What's your commission model?",
      answer: "We operate on a transparent commission-based model where our fees are only charged upon successful completion of transactions. Our commission structure is competitive and varies based on the product category, transaction volume, and complexity. We believe in aligning our success with our clients' success - we only earn when you succeed."
    },
    {
      question: "Do you help with documentation and logistics?",
      answer: "Yes, we provide comprehensive support for international trade documentation, customs clearance, and logistics coordination. Our services include assistance with trade documentation, shipping arrangements, insurance, customs procedures, and compliance requirements to ensure smooth transactions from start to finish."
    },
    {
      question: "Do you conduct quality checks?",
      answer: "Absolutely. Quality assurance is a cornerstone of our services. We conduct rigorous supplier verification, quality assessments, and compliance checks. Our network consists only of pre-verified suppliers who meet international quality standards. We also facilitate third-party inspections and quality certifications as needed."
    },
    {
      question: "How long does the trade process typically take?",
      answer: "The timeline varies depending on the product category, quantities, and specific requirements. Typically, initial partner matching takes 3-7 days, negotiations and deal structuring can take 1-2 weeks, and the complete transaction process (including documentation and shipping) usually takes 4-8 weeks. We keep all parties informed throughout the process."
    },
    {
      question: "What products do you specialize in?",
      answer: "We specialize in five main categories: Petrochemicals (polymers, chemicals, refined petroleum products), Aluminium (scrap and ingots), Iron & Iron Ore, Textiles (fabrics, yarns, finished garments), and Leather products. Our expertise in these sectors allows us to provide specialized knowledge and targeted partner matching."
    },
    {
      question: "How do you verify your trading partners?",
      answer: "We have a comprehensive verification process that includes business registration verification, financial background checks, quality certifications review, compliance assessments, reference checks from previous trading partners, and on-site visits when possible. Only partners who pass our rigorous vetting process are included in our network."
    },
    {
      question: "What support do you provide during negotiations?",
      answer: "We provide full support during negotiations including market price analysis, deal structuring advice, contract review assistance, risk assessment, payment terms guidance, and mediation services when needed. Our experienced team helps ensure fair and beneficial terms for all parties involved."
    },
    {
      question: "How do I get started with Corallo?",
      answer: "Getting started is simple: Contact us through our website or phone, schedule an initial consultation to discuss your requirements, provide details about your trade needs (buying/selling, products, quantities, specifications), and we'll begin the partner matching process. Our team will guide you through each step of the process."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://phenomenal-gingersnap-e16472.netlify.app/faqs#webpage",
    "url": "https://phenomenal-gingersnap-e16472.netlify.app/faqs",
    "name": "Frequently Asked Questions - Corallo Export Import",
    "description": "Get answers to common questions about Corallo's trade brokerage services, processes, and international commerce solutions.",
    "isPartOf": {
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#website"
    },
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions - Trade Brokerage Services | Corallo Export Import"
        description="Get answers to common questions about Corallo's trade brokerage services, commission model, quality checks, documentation support, and international commerce processes."
        keywords="trade brokerage FAQ, export import questions, commission model, quality checks, international trade process, corallo services"
        canonicalUrl="/faqs"
        structuredData={structuredData}
      />
      
      <motion.div
        className={styles.faqs}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className={styles.heroSection} aria-labelledby="faqs-hero-heading">
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 id="faqs-hero-heading">Frequently Asked Questions</h1>
              <p className={styles.subtitle}>
                Find answers to common questions about our services
              </p>
              <p className={styles.heroDescription}>
                Get quick answers to the most common questions about our trade brokerage services, 
                processes, and how we can help facilitate your international trade requirements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className={styles.faqsSection} aria-labelledby="common-questions-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2 id="common-questions-heading">Common Questions</h2>
                <p>Everything you need to know about working with Corallo</p>
              </div>
            </FadeInView>

            <div className={styles.faqsContainer} role="list">
              {faqs.map((faq, index) => (
                <FadeInView key={index} delay={0.05 * index}>
                  <article className={styles.faqItem} itemScope itemType="https://schema.org/Question" role="listitem">
                    <button
                      className={`${styles.faqQuestion} ${openFAQ === index ? styles.active : ''}`}
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={openFAQ === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span itemProp="name">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp size={24} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={24} aria-hidden="true" />
                      )}
                    </button>
                    
                    <motion.div
                      id={`faq-answer-${index}`}
                      className={styles.faqAnswer}
                      initial={false}
                      animate={{
                        height: openFAQ === index ? "auto" : 0,
                        opacity: openFAQ === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className={styles.faqAnswerContent} itemScope itemType="https://schema.org/Answer">
                        <p itemProp="text">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className={styles.quickLinksSection} aria-labelledby="still-questions-heading">
          <div className="container">
            <FadeInView>
              <div className={styles.quickLinksContent}>
                <h2 id="still-questions-heading">Still Have Questions?</h2>
                <p>
                  Can't find the answer you're looking for? Our team is here to help you with 
                  any specific questions about our trade brokerage services.
                </p>
                
                <div className={styles.quickLinksGrid} role="list">
                  <article className={styles.quickLinkCard} role="listitem">
                    <h3>Contact Our Team</h3>
                    <p>Speak directly with our trade experts</p>
                    <CTAButton 
                      as={Link}
                      to="/contact"
                      variant="primary" 
                      size="medium"
                      aria-label="Contact Corallo's trade experts for personalized assistance"
                    >
                      Contact Us
                    </CTAButton>
                  </article>
                  
                  <article className={styles.quickLinkCard} role="listitem">
                    <h3>Our Services</h3>
                    <p>Learn more about our brokerage services</p>
                    <CTAButton 
                      as={Link}
                      to="/services"
                      variant="outline" 
                      size="medium"
                      aria-label="Learn more about Corallo's trade brokerage services"
                    >
                      View Services
                    </CTAButton>
                  </article>
                  
                  <article className={styles.quickLinkCard} role="listitem">
                    <h3>Get Started</h3>
                    <p>Ready to begin your trade journey?</p>
                    <CTAButton 
                      as={Link}
                      to="/products"
                      variant="secondary" 
                      size="medium"
                      aria-label="Start trading with Corallo - View our products"
                    >
                      Start Trading
                    </CTAButton>
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