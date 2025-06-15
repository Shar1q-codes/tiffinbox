import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Zap, Shirt, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FadeInView from "../components/FadeInView";
import CTAButton from "../components/CTAButton";
import SEOHead from "../components/SEOHead";
import PetrochemicalsDetailView from "../components/PetrochemicalsDetailView";
import PetrochemicalsProductsModal from "../components/PetrochemicalsProductsModal";
import styles from "../styles/Products.module.css";

export default function Products() {
  const navigate = useNavigate();
  const [showPetrochemicalsDetail, setShowPetrochemicalsDetail] = useState(false);
  const [showPetrochemicalsProducts, setShowPetrochemicalsProducts] = useState(false);

  const products = [
    {
      icon: <Droplets size={48} />,
      title: "Petrochemicals",
      description: "Wide range of petrochemical products including polymers, chemicals, and refined petroleum products sourced from verified global suppliers.",
      specifications: "Various grades and specifications",
      applications: "Manufacturing, Industrial, Chemical processing",
      hasDetailView: true,
      hasProductsList: true
    },
    {
      icon: <Zap size={48} />,
      title: "Aluminium Scrap & Ingots",
      description: "High-quality aluminium scrap and ingots from certified suppliers, meeting international standards for purity and composition.",
      specifications: "99.7% purity and above",
      applications: "Automotive, Aerospace, Construction"
    },
    {
      icon: <Package size={48} />,
      title: "Iron & Iron Ore",
      description: "Premium iron ore and iron products sourced from reliable mining operations and steel manufacturers worldwide.",
      specifications: "Fe content 60-67%",
      applications: "Steel production, Construction, Manufacturing"
    },
    {
      icon: <Shirt size={48} />,
      title: "Textiles",
      description: "Diverse range of textile products including fabrics, yarns, and finished garments from established textile manufacturers.",
      specifications: "Various fiber compositions",
      applications: "Fashion, Home textiles, Industrial textiles"
    },
    {
      icon: <Package size={48} />,
      title: "Leather",
      description: "High-quality leather products and raw materials from certified tanneries, meeting international quality and environmental standards.",
      specifications: "Full grain and top grain",
      applications: "Fashion, Automotive, Furniture"
    }
  ];

  const qualityFeatures = [
    "Verified supplier network",
    "Quality certifications",
    "International standards compliance",
    "Regular quality audits",
    "Traceability documentation",
    "Environmental compliance"
  ];

  const handleRequestQuote = () => {
    navigate('/contact');
    // Scroll to form section after navigation
    setTimeout(() => {
      const formSection = document.querySelector('[class*="formSection"]');
      if (formSection) {
        formSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleLearnMore = (productTitle) => {
    if (productTitle === "Petrochemicals") {
      setShowPetrochemicalsDetail(true);
    }
  };

  const handleShowProducts = (productTitle) => {
    if (productTitle === "Petrochemicals") {
      setShowPetrochemicalsProducts(true);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://phenomenal-gingersnap-e16472.netlify.app/products#webpage",
    "url": "https://phenomenal-gingersnap-e16472.netlify.app/products",
    "name": "Buy Petrochemicals, Aluminium, Textiles, Iron, Leather – Global Export Brokerage",
    "description": "Source high-quality petrochemicals, aluminium scrap & ingots, iron ore, textiles, and leather products through our verified global supplier network.",
    "isPartOf": {
      "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#website"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Trade Products",
      "description": "Products available through Corallo's global trade brokerage network",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "Petrochemicals",
          "description": "Wide range of petrochemical products including polymers, chemicals, and refined petroleum products",
          "category": "Petrochemicals",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
            }
          }
        },
        {
          "@type": "Product",
          "name": "Aluminium Scrap & Ingots",
          "description": "High-quality aluminium scrap and ingots from certified suppliers",
          "category": "Metals",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
            }
          }
        },
        {
          "@type": "Product",
          "name": "Iron & Iron Ore",
          "description": "Premium iron ore and iron products from reliable mining operations",
          "category": "Metals",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
            }
          }
        },
        {
          "@type": "Product",
          "name": "Textiles",
          "description": "Diverse range of textile products including fabrics, yarns, and finished garments",
          "category": "Textiles",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
            }
          }
        },
        {
          "@type": "Product",
          "name": "Leather",
          "description": "High-quality leather products and raw materials from certified tanneries",
          "category": "Leather",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://phenomenal-gingersnap-e16472.netlify.app/#organization"
            }
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Buy Petrochemicals, Aluminium, Textiles, Iron, Leather – Global Export Brokerage"
        description="Source high-quality petrochemicals, aluminium scrap & ingots, iron ore, textiles, and leather products through our verified global supplier network. Get competitive prices and reliable delivery worldwide."
        keywords="buy petrochemicals, aluminium scrap export, iron ore trading, textiles export, leather products, global sourcing, export import products"
        canonicalUrl="/products"
        structuredData={structuredData}
      />
      
      <motion.div
        className={styles.products}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Our Products</h1>
              <p className={styles.subtitle}>
                Quality products sourced from trusted global partners
              </p>
              <p className={styles.heroDescription}>
                We specialize in facilitating trade for high-quality petrochemicals, metals, textiles, 
                and leather products through our extensive network of verified suppliers and manufacturers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2>Product Categories</h2>
                <p>Comprehensive range of products across multiple industries</p>
              </div>
            </FadeInView>

            <div className={styles.productsGrid}>
              {products.map((product, index) => (
                <FadeInView key={index} delay={0.1 * index}>
                  <article className={styles.productCard}>
                    <div className={styles.productIcon}>{product.icon}</div>
                    <div className={styles.productContent}>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      
                      <div className={styles.productSpecs}>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Specifications:</span>
                          <span className={styles.specValue}>{product.specifications}</span>
                        </div>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Applications:</span>
                          <span className={styles.specValue}>{product.applications}</span>
                        </div>
                      </div>

                      {(product.hasDetailView || product.hasProductsList) && (
                        <div className={styles.productActions}>
                          {product.hasDetailView && (
                            <button
                              className={styles.learnMoreButton}
                              onClick={() => handleLearnMore(product.title)}
                            >
                              Learn More
                              <ArrowRight size={16} />
                            </button>
                          )}
                          {product.hasProductsList && (
                            <button
                              className={styles.productsButton}
                              onClick={() => handleShowProducts(product.title)}
                            >
                              Products
                              <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className={styles.qualitySection}>
          <div className="container">
            <div className={styles.qualityGrid}>
              <FadeInView>
                <article className={styles.qualityContent}>
                  <h2>Quality Assurance</h2>
                  <p>
                    We maintain the highest quality standards through rigorous supplier verification 
                    and continuous monitoring processes. Our commitment to quality ensures that every 
                    product meets international standards and customer expectations.
                  </p>
                  
                  <div className={styles.qualityFeatures}>
                    {qualityFeatures.map((feature, index) => (
                      <div key={index} className={styles.qualityFeature}>
                        <ArrowRight size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className={styles.qualityImage}>
                  <img 
                    src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Quality assurance process for export-import products including petrochemicals, metals, and textiles" 
                    loading="lazy"
                  />
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className={styles.industriesSection}>
          <div className="container">
            <FadeInView>
              <div className={styles.sectionHeader}>
                <h2>Industries We Serve</h2>
                <p>Our products serve diverse industries across the global marketplace</p>
              </div>
            </FadeInView>

            <div className={styles.industriesGrid}>
              <FadeInView delay={0.1}>
                <article className={styles.industryCard}>
                  <h3>Manufacturing</h3>
                  <p>Raw materials and components for various manufacturing processes</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <article className={styles.industryCard}>
                  <h3>Automotive</h3>
                  <p>High-grade metals and materials for automotive industry applications</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.3}>
                <article className={styles.industryCard}>
                  <h3>Construction</h3>
                  <p>Quality materials for construction and infrastructure projects</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.4}>
                <article className={styles.industryCard}>
                  <h3>Fashion & Textiles</h3>
                  <p>Premium fabrics and leather for fashion and textile industries</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.5}>
                <article className={styles.industryCard}>
                  <h3>Chemical Processing</h3>
                  <p>Petrochemicals and raw materials for chemical processing</p>
                </article>
              </FadeInView>
              
              <FadeInView delay={0.6}>
                <article className={styles.industryCard}>
                  <h3>Energy</h3>
                  <p>Materials and components for energy sector applications</p>
                </article>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container text-center">
            <FadeInView>
              <div className={styles.ctaContent}>
                <h2>Need Specific Products?</h2>
                <p>
                  Contact us to discuss your specific product requirements. Our team will help you 
                  find the right suppliers and ensure quality products for your business needs.
                </p>
                <CTAButton 
                  variant="primary" 
                  size="large"
                  onClick={handleRequestQuote}
                >
                  Request Quote
                </CTAButton>
              </div>
            </FadeInView>
          </div>
        </section>
      </motion.div>

      {/* Petrochemicals Detail View */}
      <PetrochemicalsDetailView
        isOpen={showPetrochemicalsDetail}
        onClose={() => setShowPetrochemicalsDetail(false)}
      />

      {/* Petrochemicals Products Modal */}
      <PetrochemicalsProductsModal
        isOpen={showPetrochemicalsProducts}
        onClose={() => setShowPetrochemicalsProducts(false)}
      />
    </>
  );
}