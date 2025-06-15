import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import styles from "../styles/PetrochemicalsDetailView.module.css";

export default function PetrochemicalsDetailView({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState("fob-procedure");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "fob-procedure", title: "TRANSACTION FOB PROCEDURE" },
    { id: "standard-fob", title: "STANDARD PROCEDURE FOB TRANSACTION" },
    { id: "tto-procedure", title: "TTO TRANSACTION PROCEDURE" },
    { id: "cif-aswp", title: "TRANSACTION PROCEDURES FOR CIF – ASWP & PAYMENT TERM" },
    { id: "cif-procedure", title: "CIF TRANSACTION PROCEDURE" },
    { id: "dip-pay", title: "DIP AND PAY / TANK TO VESSEL OR TANK (SELLER TANK EXTENSION)" }
  ];

  const sectionContent = {
    "fob-procedure": {
      title: "TRANSACTION FOB PROCEDURE",
      content: (
        <div>
          <h3>FOB TRANSACTION PROCEDURE</h3>
          
          <div className={styles.procedureSection}>
            <h4>TRANSACTION FOB PROCEDURE</h4>
            <p>This document outlines the comprehensive procedure for Free on Board (FOB) transactions in international trade, specifically designed for petroleum and petrochemical products.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>1. Pre-Contract Phase</h4>
            <ul>
              <li><strong>Initial Inquiry:</strong> Buyer submits detailed inquiry including product specifications, quantity requirements, and delivery timeline</li>
              <li><strong>Seller Response:</strong> Comprehensive quotation with FOB terms, product specifications, and commercial conditions</li>
              <li><strong>Due Diligence:</strong> Mutual verification of credentials, financial capacity, and operational capabilities</li>
              <li><strong>Preliminary Agreement:</strong> Letter of Intent (LOI) or Memorandum of Understanding (MOU) establishing basic terms</li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>2. Contract Negotiation and Finalization</h4>
            <ul>
              <li><strong>Commercial Terms:</strong>
                <ul>
                  <li>Product grade, specifications, and quality parameters</li>
                  <li>Quantity with acceptable tolerance levels</li>
                  <li>FOB price and pricing mechanisms</li>
                  <li>Port of loading and delivery schedule</li>
                </ul>
              </li>
              <li><strong>Payment Terms:</strong>
                <ul>
                  <li>Payment method (Letter of Credit, Documentary Collection, etc.)</li>
                  <li>Payment timeline and milestones</li>
                  <li>Currency and exchange rate provisions</li>
                  <li>Security and guarantee requirements</li>
                </ul>
              </li>
              <li><strong>Quality and Inspection:</strong>
                <ul>
                  <li>Quality specifications and testing standards</li>
                  <li>Inspection procedures and independent surveyors</li>
                  <li>Sampling protocols and chain of custody</li>
                  <li>Quality dispute resolution mechanisms</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>3. Pre-Shipment Operations</h4>
            <ul>
              <li><strong>Production/Procurement:</strong>
                <ul>
                  <li>Manufacturing or sourcing according to specifications</li>
                  <li>Quality control during production process</li>
                  <li>Packaging and marking requirements</li>
                  <li>Pre-shipment inspection arrangements</li>
                </ul>
              </li>
              <li><strong>Documentation Preparation:</strong>
                <ul>
                  <li>Export licenses and regulatory approvals</li>
                  <li>Commercial invoice and packing list</li>
                  <li>Certificate of origin and quality certificates</li>
                  <li>Insurance documentation (if applicable)</li>
                </ul>
              </li>
              <li><strong>Logistics Coordination:</strong>
                <ul>
                  <li>Transportation to port of loading</li>
                  <li>Port storage and handling arrangements</li>
                  <li>Vessel nomination and booking</li>
                  <li>Loading schedule coordination</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>4. Loading and Shipment</h4>
            <ul>
              <li><strong>Pre-Loading Activities:</strong>
                <ul>
                  <li>Cargo arrival at port and quality verification</li>
                  <li>Tank or warehouse allocation</li>
                  <li>Loading equipment preparation and testing</li>
                  <li>Safety and environmental compliance checks</li>
                </ul>
              </li>
              <li><strong>Loading Operations:</strong>
                <ul>
                  <li>Vessel readiness confirmation</li>
                  <li>Loading supervision by qualified personnel</li>
                  <li>Quantity measurement and documentation</li>
                  <li>Quality sampling during loading</li>
                </ul>
              </li>
              <li><strong>Documentation Completion:</strong>
                <ul>
                  <li>Bill of Lading preparation and signing</li>
                  <li>Loading certificates and quantity statements</li>
                  <li>Quality certificates and analysis reports</li>
                  <li>Customs clearance documentation</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>5. Post-Loading Procedures</h4>
            <ul>
              <li><strong>Document Presentation:</strong>
                <ul>
                  <li>Compilation of shipping documents</li>
                  <li>Presentation to negotiating bank</li>
                  <li>Document examination and discrepancy handling</li>
                  <li>Payment processing and confirmation</li>
                </ul>
              </li>
              <li><strong>Risk Transfer:</strong>
                <ul>
                  <li>Risk passes to buyer when goods cross ship's rail</li>
                  <li>Seller's responsibility ends at port of loading</li>
                  <li>Buyer assumes responsibility for main carriage</li>
                  <li>Insurance arrangements by buyer</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.responsibilityMatrix}>
            <h4>FOB Responsibility Matrix</h4>
            <table className={styles.responsibilityTable}>
              <thead>
                <tr>
                  <th>Responsibility</th>
                  <th>Seller</th>
                  <th>Buyer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Export clearance</td>
                  <td>✓</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Loading costs</td>
                  <td>✓</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Main carriage</td>
                  <td>-</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Marine insurance</td>
                  <td>-</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Import clearance</td>
                  <td>-</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Discharge costs</td>
                  <td>-</td>
                  <td>✓</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.noteBox}>
            <h4>Key Points for FOB Transactions:</h4>
            <ul>
              <li>Seller delivers goods to named port of shipment</li>
              <li>Risk transfers when goods pass ship's rail</li>
              <li>Buyer arranges and pays for main carriage</li>
              <li>Seller handles export formalities</li>
              <li>Clear documentation is essential for smooth transactions</li>
              <li>Quality control throughout the process is critical</li>
            </ul>
          </div>
        </div>
      )
    },
    "standard-fob": {
      title: "STANDARD PROCEDURE FOB TRANSACTION",
      content: (
        <div>
          <h3>STANDARD PROCEDURE FOB TRANSACTION</h3>
          
          <div className={styles.procedureSection}>
            <h4>Overview</h4>
            <p>This document establishes the standard operating procedures for FOB (Free on Board) transactions, ensuring consistency, efficiency, and compliance with international trade practices in the petroleum and petrochemical industry.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase 1: Transaction Initiation</h4>
            <ol>
              <li><strong>Market Research and Analysis</strong>
                <ul>
                  <li>Product demand assessment and market conditions</li>
                  <li>Price analysis and competitive positioning</li>
                  <li>Regulatory environment evaluation</li>
                  <li>Risk assessment and mitigation strategies</li>
                </ul>
              </li>
              <li><strong>Supplier/Buyer Identification</strong>
                <ul>
                  <li>Credential verification and due diligence</li>
                  <li>Financial capacity assessment</li>
                  <li>Operational capability evaluation</li>
                  <li>Reference checks and track record review</li>
                </ul>
              </li>
              <li><strong>Initial Contact and Inquiry</strong>
                <ul>
                  <li>Formal inquiry submission with detailed requirements</li>
                  <li>Product specifications and quality standards</li>
                  <li>Quantity requirements and delivery timeline</li>
                  <li>Commercial terms and conditions outline</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase 2: Commercial Negotiation</h4>
            <ol>
              <li><strong>Quotation and Counter-Offer Process</strong>
                <ul>
                  <li>Detailed quotation with FOB terms</li>
                  <li>Price breakdown and cost components</li>
                  <li>Delivery schedule and logistics arrangements</li>
                  <li>Payment terms and financial conditions</li>
                </ul>
              </li>
              <li><strong>Technical Specifications Agreement</strong>
                <ul>
                  <li>Product grade and quality parameters</li>
                  <li>Testing methods and acceptance criteria</li>
                  <li>Packaging and marking requirements</li>
                  <li>Inspection and sampling procedures</li>
                </ul>
              </li>
              <li><strong>Commercial Terms Finalization</strong>
                <ul>
                  <li>Price and payment mechanism agreement</li>
                  <li>Delivery terms and responsibilities</li>
                  <li>Force majeure and extraordinary circumstances</li>
                  <li>Dispute resolution and governing law</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase 3: Contract Execution</h4>
            <ol>
              <li><strong>Contract Documentation</strong>
                <ul>
                  <li>Sales contract preparation and review</li>
                  <li>Terms and conditions incorporation</li>
                  <li>Signature and execution formalities</li>
                  <li>Contract registration and filing</li>
                </ul>
              </li>
              <li><strong>Financial Arrangements</strong>
                <ul>
                  <li>Letter of Credit opening and confirmation</li>
                  <li>Bank guarantee arrangements</li>
                  <li>Insurance coverage procurement</li>
                  <li>Currency hedging (if applicable)</li>
                </ul>
              </li>
              <li><strong>Operational Planning</strong>
                <ul>
                  <li>Production or procurement scheduling</li>
                  <li>Quality control planning</li>
                  <li>Logistics and transportation arrangements</li>
                  <li>Documentation preparation timeline</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase 4: Pre-Shipment Execution</h4>
            <ol>
              <li><strong>Production and Quality Control</strong>
                <ul>
                  <li>Manufacturing according to specifications</li>
                  <li>In-process quality monitoring</li>
                  <li>Final product testing and certification</li>
                  <li>Quality documentation preparation</li>
                </ul>
              </li>
              <li><strong>Export Documentation</strong>
                <ul>
                  <li>Export license application and approval</li>
                  <li>Commercial invoice preparation</li>
                  <li>Packing list and shipping marks</li>
                  <li>Certificate of origin procurement</li>
                </ul>
              </li>
              <li><strong>Logistics Coordination</strong>
                <ul>
                  <li>Transportation to port arrangement</li>
                  <li>Port storage and handling</li>
                  <li>Vessel nomination and confirmation</li>
                  <li>Loading schedule finalization</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase 5: Shipment and Documentation</h4>
            <ol>
              <li><strong>Loading Operations</strong>
                <ul>
                  <li>Pre-loading inspection and verification</li>
                  <li>Loading supervision and monitoring</li>
                  <li>Quantity measurement and certification</li>
                  <li>Quality sampling and testing</li>
                </ul>
              </li>
              <li><strong>Shipping Documentation</strong>
                <ul>
                  <li>Bill of Lading preparation and signing</li>
                  <li>Loading certificate issuance</li>
                  <li>Quality certificate compilation</li>
                  <li>Customs clearance completion</li>
                </ul>
              </li>
              <li><strong>Financial Settlement</strong>
                <ul>
                  <li>Document presentation to bank</li>
                  <li>Letter of Credit negotiation</li>
                  <li>Payment processing and confirmation</li>
                  <li>Final account settlement</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.timelineBox}>
            <h4>Standard FOB Transaction Timeline</h4>
            <ul>
              <li><strong>Inquiry to Contract:</strong> 10-21 days</li>
              <li><strong>Contract to Production:</strong> 5-15 days</li>
              <li><strong>Production Period:</strong> 15-45 days</li>
              <li><strong>Pre-shipment Activities:</strong> 7-14 days</li>
              <li><strong>Loading and Shipment:</strong> 3-7 days</li>
              <li><strong>Documentation and Payment:</strong> 5-10 days</li>
              <li><strong>Total Transaction Time:</strong> 45-112 days</li>
            </ul>
          </div>

          <div className={styles.criticalPoints}>
            <h4>Critical Success Factors</h4>
            <ul>
              <li>Thorough due diligence and partner verification</li>
              <li>Clear and comprehensive contract terms</li>
              <li>Robust quality control throughout the process</li>
              <li>Effective communication and coordination</li>
              <li>Proper documentation and record keeping</li>
              <li>Compliance with international trade regulations</li>
              <li>Risk management and contingency planning</li>
              <li>Professional logistics and shipping arrangements</li>
            </ul>
          </div>
        </div>
      )
    },
    "tto-procedure": {
      title: "TTO TRANSACTION PROCEDURE",
      content: (
        <div>
          <h3>TTO TRANSACTION PROCEDURE</h3>
          
          <div className={styles.procedureSection}>
            <h4>Tank to Tank Operation (TTO) Overview</h4>
            <p>Tank to Tank Operation (TTO) represents a specialized method of petroleum product transfer where cargo moves directly from the seller's storage tank to the buyer's designated tank or vessel. This procedure minimizes handling, reduces contamination risks, and ensures product integrity throughout the transfer process.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>1. Pre-TTO Planning and Preparation</h4>
            <ul>
              <li><strong>Tank Availability Assessment</strong>
                <ul>
                  <li>Seller confirms product availability in designated storage tank</li>
                  <li>Buyer confirms receiving tank capacity and readiness</li>
                  <li>Tank calibration certificates verification and validation</li>
                  <li>Product compatibility assessment and contamination risk evaluation</li>
                  <li>Tank condition inspection and cleaning verification</li>
                </ul>
              </li>
              <li><strong>Technical Requirements Verification</strong>
                <ul>
                  <li>Pipeline connectivity and transfer system inspection</li>
                  <li>Pumping capacity and transfer rate calculations</li>
                  <li>Measurement systems calibration and accuracy verification</li>
                  <li>Safety systems and emergency procedures review</li>
                  <li>Environmental compliance and permit verification</li>
                </ul>
              </li>
              <li><strong>Quality Assurance Preparation</strong>
                <ul>
                  <li>Pre-transfer product sampling and analysis</li>
                  <li>Laboratory testing and Certificate of Analysis preparation</li>
                  <li>Quality specification compliance verification</li>
                  <li>Contamination prevention measures implementation</li>
                  <li>Quality monitoring equipment calibration</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>2. Authorization and Documentation</h4>
            <ul>
              <li><strong>Transfer Authorization Process</strong>
                <ul>
                  <li>Written transfer authorization from buyer</li>
                  <li>Tank-to-tank transfer agreement execution</li>
                  <li>Insurance coverage confirmation and documentation</li>
                  <li>Safety and environmental clearance certificates</li>
                  <li>Regulatory approvals and permit verification</li>
                </ul>
              </li>
              <li><strong>Operational Clearances</strong>
                <ul>
                  <li>Port authority permissions and notifications</li>
                  <li>Pipeline operator approvals and coordination</li>
                  <li>Safety inspection certificates and compliance verification</li>
                  <li>Environmental impact assessment and clearance</li>
                  <li>Emergency response plan activation and readiness</li>
                </ul>
              </li>
              <li><strong>Commercial Documentation</strong>
                <ul>
                  <li>Transfer agreement terms and conditions</li>
                  <li>Pricing mechanism and payment terms</li>
                  <li>Quantity measurement procedures and standards</li>
                  <li>Quality specifications and acceptance criteria</li>
                  <li>Liability and insurance provisions</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>3. Transfer Operations Execution</h4>
            <ul>
              <li><strong>Pre-Transfer Procedures</strong>
                <ul>
                  <li>Opening tank gauging and measurement recording</li>
                  <li>Temperature and density readings documentation</li>
                  <li>Pipeline flushing and cleaning verification</li>
                  <li>Connection integrity testing and leak detection</li>
                  <li>Safety systems activation and monitoring setup</li>
                </ul>
              </li>
              <li><strong>Transfer Execution and Monitoring</strong>
                <ul>
                  <li>Controlled product transfer initiation with gradual flow increase</li>
                  <li>Continuous flow rate and pressure monitoring</li>
                  <li>Real-time quantity measurement and documentation</li>
                  <li>Quality monitoring during transfer process</li>
                  <li>Safety parameter monitoring and alarm system oversight</li>
                </ul>
              </li>
              <li><strong>Post-Transfer Verification</strong>
                <ul>
                  <li>Final quantity measurement and calculation</li>
                  <li>Closing tank gauging and documentation</li>
                  <li>Quality confirmation sampling and testing</li>
                  <li>Transfer completion certification and sign-off</li>
                  <li>System isolation and securing procedures</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>4. Measurement and Quality Control</h4>
            <ul>
              <li><strong>Quantity Determination Process</strong>
                <ul>
                  <li>Opening and closing tank measurements with witness verification</li>
                  <li>Temperature and density corrections application</li>
                  <li>Net quantity calculation using standard formulas</li>
                  <li>Loss and gain reconciliation and documentation</li>
                  <li>Independent surveyor verification (when required)</li>
                </ul>
              </li>
              <li><strong>Quality Documentation and Certification</strong>
                <ul>
                  <li>Representative sampling procedures following international standards</li>
                  <li>Laboratory analysis and testing protocols</li>
                  <li>Certificate of Quality preparation and issuance</li>
                  <li>Specification compliance verification and documentation</li>
                  <li>Quality dispute resolution procedures</li>
                </ul>
              </li>
              <li><strong>Measurement Standards and Procedures</strong>
                <ul>
                  <li>API (American Petroleum Institute) measurement standards</li>
                  <li>Temperature compensation calculations</li>
                  <li>Density and specific gravity determinations</li>
                  <li>Volume correction factors application</li>
                  <li>Measurement uncertainty assessment</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>5. Commercial Settlement and Documentation</h4>
            <ul>
              <li><strong>Quantity Finalization Process</strong>
                <ul>
                  <li>Agreed measurement procedures implementation</li>
                  <li>Independent surveyor verification and certification</li>
                  <li>Quantity certificate preparation and issuance</li>
                  <li>Commercial quantity determination and agreement</li>
                  <li>Any adjustments or corrections documentation</li>
                </ul>
              </li>
              <li><strong>Financial Settlement Procedures</strong>
                <ul>
                  <li>Invoice preparation based on transferred quantity</li>
                  <li>Price calculation according to contract terms</li>
                  <li>Tax and duty calculations (where applicable)</li>
                  <li>Payment processing according to agreed terms</li>
                  <li>Final settlement and account closure</li>
                </ul>
              </li>
              <li><strong>Title Transfer and Legal Completion</strong>
                <ul>
                  <li>Transfer of title documentation</li>
                  <li>Legal ownership transfer confirmation</li>
                  <li>Insurance coverage transfer (if applicable)</li>
                  <li>Liability transfer documentation</li>
                  <li>Final legal and commercial closure</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.advantagesBox}>
            <h4>TTO Operational Advantages</h4>
            <ul>
              <li><strong>Reduced Contamination Risk:</strong> Direct transfer minimizes exposure to external contaminants</li>
              <li><strong>Enhanced Accuracy:</strong> Precise measurement systems ensure accurate quantity determination</li>
              <li><strong>Cost Efficiency:</strong> Lower handling costs and reduced operational expenses</li>
              <li><strong>Time Optimization:</strong> Faster transfer completion compared to traditional methods</li>
              <li><strong>Quality Preservation:</strong> Maintains product integrity throughout transfer process</li>
              <li><strong>Environmental Protection:</strong> Reduced emissions and environmental impact</li>
              <li><strong>Safety Enhancement:</strong> Minimized handling reduces safety risks</li>
              <li><strong>Operational Flexibility:</strong> Allows for partial transfers and inventory management</li>
            </ul>
          </div>

          <div className={styles.noteBox}>
            <h4>Critical Success Factors for TTO Operations</h4>
            <ul>
              <li>Properly calibrated and maintained measurement systems</li>
              <li>Qualified and experienced operational personnel</li>
              <li>Robust safety and emergency response procedures</li>
              <li>Clear contractual terms and operational procedures</li>
              <li>Effective communication between all parties</li>
              <li>Comprehensive insurance coverage and risk management</li>
              <li>Regular equipment maintenance and calibration</li>
              <li>Detailed documentation and record keeping</li>
              <li>Compliance with environmental and safety regulations</li>
              <li>Continuous monitoring and quality control</li>
            </ul>
          </div>
        </div>
      )
    },
    "cif-aswp": {
      title: "TRANSACTION PROCEDURES FOR CIF – ASWP & PAYMENT TERM",
      content: (
        <div>
          <h3>CIF TRANSACTION PROCEDURES - ASWP & PAYMENT TERMS</h3>
          
          <div className={styles.procedureSection}>
            <h4>CIF (Cost, Insurance & Freight) Overview</h4>
            <p>Under CIF (Cost, Insurance & Freight) terms, the seller assumes responsibility for arranging and paying for transportation and insurance coverage to the named port of destination. This comprehensive approach provides buyers with a complete delivered cost while transferring risk at the point of loading.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>ASWP (All Safe Working Ports) Clause Implementation</h4>
            <p>The ASWP (All Safe Working Ports) clause provides buyers with flexibility in port nomination within agreed geographical ranges, ensuring vessels can safely berth, load/discharge, and depart without unusual delay or hazard.</p>
            
            <ul>
              <li><strong>Port Nomination Criteria and Requirements</strong>
                <ul>
                  <li>Port must be safe for the nominated vessel type and size</li>
                  <li>Adequate water depth and berth availability confirmation</li>
                  <li>Proper cargo handling facilities and equipment</li>
                  <li>No unusual political, commercial, or operational risks</li>
                  <li>Compliance with international maritime safety standards</li>
                </ul>
              </li>
              <li><strong>Nomination Timeline and Procedures</strong>
                <ul>
                  <li>Initial port range specification in sales contract</li>
                  <li>Final port nomination 10-15 days before shipment readiness</li>
                  <li>Seller confirmation of port acceptance within 48 hours</li>
                  <li>Alternative port provision in case of rejection</li>
                  <li>Documentation of port nomination and acceptance</li>
                </ul>
              </li>
              <li><strong>Port Safety Assessment Criteria</strong>
                <ul>
                  <li>Political stability and security conditions</li>
                  <li>Port infrastructure and operational efficiency</li>
                  <li>Weather conditions and seasonal considerations</li>
                  <li>Vessel traffic and congestion levels</li>
                  <li>Emergency services and support facilities</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>1. Contract Establishment and Commercial Terms</h4>
            <ul>
              <li><strong>Product Specifications and Quality Standards</strong>
                <ul>
                  <li>Detailed product grade and specification requirements</li>
                  <li>Quality parameters and testing methodologies</li>
                  <li>Acceptance criteria and tolerance levels</li>
                  <li>Sampling and inspection procedures</li>
                  <li>Quality dispute resolution mechanisms</li>
                </ul>
              </li>
              <li><strong>Quantity and Delivery Terms</strong>
                <ul>
                  <li>Contract quantity with acceptable tolerance ranges</li>
                  <li>Delivery schedule and shipment windows</li>
                  <li>CIF price to named destination port range</li>
                  <li>ASWP clause with geographical limitations and restrictions</li>
                  <li>Force majeure and extraordinary circumstances provisions</li>
                </ul>
              </li>
              <li><strong>Payment Terms and Financial Arrangements</strong>
                <ul>
                  <li>Letter of Credit (LC) requirements and specifications</li>
                  <li>Documentary collection procedures and timelines</li>
                  <li>Payment schedule and milestone conditions</li>
                  <li>Currency designation and exchange rate provisions</li>
                  <li>Bank charges allocation and responsibility</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>2. Seller's Comprehensive Obligations</h4>
            <ul>
              <li><strong>Product Delivery and Quality Assurance</strong>
                <ul>
                  <li>Manufacturing or procurement according to agreed specifications</li>
                  <li>Comprehensive quality control and pre-shipment inspection</li>
                  <li>Packaging suitable for sea transport and destination requirements</li>
                  <li>Timely delivery to designated port of shipment</li>
                  <li>Quality documentation and certification preparation</li>
                </ul>
              </li>
              <li><strong>Transportation and Logistics Arrangements</strong>
                <ul>
                  <li>Vessel booking and freight payment to destination port</li>
                  <li>Loading supervision and operational coordination</li>
                  <li>Bill of Lading procurement and documentation</li>
                  <li>Shipping schedule coordination and communication</li>
                  <li>Transit monitoring and status updates</li>
                </ul>
              </li>
              <li><strong>Insurance Coverage and Risk Management</strong>
                <ul>
                  <li>Marine cargo insurance procurement and payment</li>
                  <li>Minimum 110% of CIF value coverage requirement</li>
                  <li>Institute Cargo Clauses (A) or equivalent comprehensive coverage</li>
                  <li>Insurance certificate preparation and issuance</li>
                  <li>Claims handling procedures and support</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>3. Comprehensive Documentation Requirements</h4>
            <ul>
              <li><strong>Primary Shipping Documents</strong>
                <ul>
                  <li>Clean on-board Bill of Lading (original and copies)</li>
                  <li>Commercial Invoice reflecting CIF value and terms</li>
                  <li>Detailed Packing List with shipping marks</li>
                  <li>Certificate of Origin (preferential or non-preferential)</li>
                  <li>Export license and regulatory clearance documents</li>
                </ul>
              </li>
              <li><strong>Quality and Inspection Documents</strong>
                <ul>
                  <li>Certificate of Analysis (COA) from accredited laboratory</li>
                  <li>Quality Certificate confirming specification compliance</li>
                  <li>Independent Inspection Certificate (when required)</li>
                  <li>Weight and Measurement Certificate</li>
                  <li>Tank calibration and measurement documentation</li>
                </ul>
              </li>
              <li><strong>Insurance and Financial Documents</strong>
                <ul>
                  <li>Marine Insurance Policy or Certificate</li>
                  <li>Coverage details and terms and conditions</li>
                  <li>Claims procedure information and contact details</li>
                  <li>Insurer contact information and emergency procedures</li>
                  <li>Additional coverage certificates (war risks, strikes, etc.)</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>4. Payment Procedures and Financial Settlement</h4>
            <ul>
              <li><strong>Letter of Credit Processing</strong>
                <ul>
                  <li>LC opening by buyer's bank with confirmed terms</li>
                  <li>LC terms verification and amendment procedures</li>
                  <li>Document preparation according to LC requirements</li>
                  <li>Document presentation within specified timeframe</li>
                  <li>Bank examination, payment processing, and confirmation</li>
                </ul>
              </li>
              <li><strong>Documentary Collection Procedures</strong>
                <ul>
                  <li>Documents against Payment (D/P) arrangements</li>
                  <li>Documents against Acceptance (D/A) procedures</li>
                  <li>Collection instruction preparation and transmission</li>
                  <li>Bank-to-bank document handling and processing</li>
                  <li>Payment collection and confirmation procedures</li>
                </ul>
              </li>
              <li><strong>Alternative Payment Methods</strong>
                <ul>
                  <li>Advance payment arrangements and security</li>
                  <li>Open account terms for established relationships</li>
                  <li>Bank guarantee and standby letter of credit</li>
                  <li>Escrow arrangements for high-value transactions</li>
                  <li>Trade finance and structured payment solutions</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>5. Risk Management and Assessment</h4>
            <ul>
              <li><strong>Port Risk Evaluation and Management</strong>
                <ul>
                  <li>Political stability and security risk assessment</li>
                  <li>Commercial viability and operational efficiency</li>
                  <li>Port congestion and potential delays evaluation</li>
                  <li>Cargo handling capabilities and safety standards</li>
                  <li>Emergency response and support services availability</li>
                </ul>
              </li>
              <li><strong>Insurance Considerations and Coverage</strong>
                <ul>
                  <li>War risks and strikes coverage evaluation</li>
                  <li>Delay in start-up (DSU) insurance options</li>
                  <li>General average and salvage coverage</li>
                  <li>Total loss and partial loss protection</li>
                  <li>Extended coverage for special circumstances</li>
                </ul>
              </li>
              <li><strong>Operational Risk Mitigation</strong>
                <ul>
                  <li>Quality control and contamination prevention</li>
                  <li>Transportation and logistics risk management</li>
                  <li>Documentation accuracy and completeness</li>
                  <li>Communication and coordination protocols</li>
                  <li>Contingency planning and alternative arrangements</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.timelineBox}>
            <h4>CIF-ASWP Transaction Timeline</h4>
            <ul>
              <li><strong>Contract Negotiation and Finalization:</strong> 7-21 days</li>
              <li><strong>Letter of Credit Opening and Confirmation:</strong> 5-10 days</li>
              <li><strong>Production/Procurement Period:</strong> 15-60 days</li>
              <li><strong>Shipping and Insurance Arrangements:</strong> 7-14 days</li>
              <li><strong>Port Nomination and Confirmation:</strong> 2-5 days</li>
              <li><strong>Loading and Departure:</strong> 3-7 days</li>
              <li><strong>Transit Time (varies by route):</strong> 10-45 days</li>
              <li><strong>Document Processing and Payment:</strong> 5-10 days</li>
              <li><strong>Total Transaction Duration:</strong> 52-162 days</li>
            </ul>
          </div>

          <div className={styles.noteBox}>
            <h4>Key Considerations for CIF-ASWP Transactions</h4>
            <ul>
              <li>Seller bears cost and risk until goods are loaded on vessel at origin</li>
              <li>Buyer assumes risk during sea transit despite seller paying freight</li>
              <li>Insurance must be in buyer's favor and assignable to protect interests</li>
              <li>Port nomination must be timely, reasonable, and within agreed parameters</li>
              <li>Clear and accurate documentation is essential for smooth payment processing</li>
              <li>ASWP clause provides flexibility but requires careful port selection</li>
              <li>Effective communication between all parties is critical for success</li>
              <li>Proper risk assessment and insurance coverage are essential</li>
            </ul>
          </div>
        </div>
      )
    },
    "cif-procedure": {
      title: "CIF TRANSACTION PROCEDURE",
      content: (
        <div>
          <h3>COMPREHENSIVE CIF TRANSACTION PROCEDURE</h3>
          
          <div className={styles.procedureSection}>
            <h4>CIF Transaction Framework Overview</h4>
            <p>The CIF (Cost, Insurance & Freight) transaction procedure represents a comprehensive approach to international trade where the seller assumes responsibility for product delivery, transportation, and insurance to the named destination port. This document outlines the complete process from initial inquiry to final settlement.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase I: Pre-Contract Preparation and Analysis</h4>
            <ol>
              <li><strong>Market Analysis and Strategic Planning</strong>
                <ul>
                  <li>Comprehensive product requirement analysis and market research</li>
                  <li>Supplier capability assessment and verification procedures</li>
                  <li>Competitive price analysis and market positioning</li>
                  <li>Credit worthiness evaluation and financial due diligence</li>
                  <li>Risk assessment and mitigation strategy development</li>
                </ul>
              </li>
              <li><strong>Initial Commercial Discussions and Negotiations</strong>
                <ul>
                  <li>Detailed product specifications and quality requirements</li>
                  <li>Quantity requirements, delivery schedule, and destination ports</li>
                  <li>CIF pricing structure and cost breakdown analysis</li>
                  <li>Payment terms, currency, and financial arrangements</li>
                  <li>Insurance coverage requirements and shipping arrangements</li>
                </ul>
              </li>
              <li><strong>Technical and Operational Assessment</strong>
                <ul>
                  <li>Product compatibility and technical specification review</li>
                  <li>Logistics feasibility and transportation route analysis</li>
                  <li>Port capabilities and handling requirements assessment</li>
                  <li>Regulatory compliance and documentation requirements</li>
                  <li>Quality control and inspection procedure planning</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase II: Contract Negotiation and Finalization</h4>
            <ol>
              <li><strong>Commercial Terms Agreement and Documentation</strong>
                <ul>
                  <li>Product grade, specification, and quality standards finalization</li>
                  <li>Quantity tolerance levels and measurement procedures</li>
                  <li>CIF price breakdown including cost, insurance, and freight components</li>
                  <li>Destination port(s) specification and delivery terms</li>
                  <li>Delivery schedule, shipment windows, and timeline commitments</li>
                </ul>
              </li>
              <li><strong>Payment and Financial Terms Structuring</strong>
                <ul>
                  <li>Payment method selection (LC, D/P, D/A, or advance payment)</li>
                  <li>Letter of Credit terms, conditions, and bank requirements</li>
                  <li>Currency designation and exchange rate risk management</li>
                  <li>Payment timeline, milestones, and settlement procedures</li>
                  <li>Bank charges allocation and financial cost distribution</li>
                </ul>
              </li>
              <li><strong>Legal and Operational Clauses Integration</strong>
                <ul>
                  <li>Force majeure provisions and extraordinary circumstances</li>
                  <li>Dispute resolution mechanisms and arbitration procedures</li>
                  <li>Governing law, jurisdiction, and legal framework</li>
                  <li>Penalty clauses, liquidated damages, and performance guarantees</li>
                  <li>Termination conditions and contract modification procedures</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase III: Pre-Shipment Operations and Execution</h4>
            <ol>
              <li><strong>Production and Quality Control Management</strong>
                <ul>
                  <li>Manufacturing or procurement according to agreed specifications</li>
                  <li>In-process quality monitoring and control procedures</li>
                  <li>Pre-shipment inspection, testing, and quality verification</li>
                  <li>Certificate of Analysis (COA) preparation and documentation</li>
                  <li>Quality assurance documentation and certification</li>
                </ul>
              </li>
              <li><strong>Packaging, Marking, and Preparation</strong>
                <ul>
                  <li>Packaging design suitable for sea transport and destination</li>
                  <li>Proper marking, labeling, and identification procedures</li>
                  <li>Dangerous goods classification and documentation (if applicable)</li>
                  <li>Packing list preparation with detailed contents description</li>
                  <li>Shipping marks and handling instructions specification</li>
                </ul>
              </li>
              <li><strong>Export Documentation and Regulatory Compliance</strong>
                <ul>
                  <li>Export license application and regulatory approval process</li>
                  <li>Customs declaration preparation and clearance procedures</li>
                  <li>Certificate of origin procurement and authentication</li>
                  <li>Additional regulatory approvals and compliance documentation</li>
                  <li>Export control and restricted goods verification</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase IV: Shipping and Insurance Arrangements</h4>
            <ol>
              <li><strong>Vessel Booking and Freight Management</strong>
                <ul>
                  <li>Shipping line selection and vessel booking procedures</li>
                  <li>Freight rate negotiation and confirmation process</li>
                  <li>Loading port coordination and schedule finalization</li>
                  <li>Special handling requirements communication and arrangement</li>
                  <li>Vessel suitability assessment and cargo compatibility</li>
                </ul>
              </li>
              <li><strong>Marine Insurance Procurement and Coverage</strong>
                <ul>
                  <li>Insurance company selection and policy procurement</li>
                  <li>Coverage amount determination (minimum 110% of CIF value)</li>
                  <li>Institute Cargo Clauses (A) or equivalent comprehensive coverage</li>
                  <li>War risks and strikes coverage evaluation and inclusion</li>
                  <li>Insurance certificate preparation and documentation</li>
                </ul>
              </li>
              <li><strong>Loading Operations and Port Coordination</strong>
                <ul>
                  <li>Cargo delivery to port of loading and storage arrangements</li>
                  <li>Port handling, storage, and pre-loading preparation</li>
                  <li>Loading supervision, monitoring, and quality control</li>
                  <li>Bill of Lading preparation, issuance, and verification</li>
                  <li>Loading completion certification and documentation</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase V: Documentation and Payment Processing</h4>
            <ol>
              <li><strong>Comprehensive Shipping Document Preparation</strong>
                <ul>
                  <li>Clean on-board Bill of Lading (original and required copies)</li>
                  <li>Commercial Invoice reflecting accurate CIF value and terms</li>
                  <li>Detailed Packing List with complete contents description</li>
                  <li>Certificate of Origin (preferential or non-preferential as required)</li>
                  <li>Certificate of Analysis and comprehensive Quality Certificate</li>
                  <li>Marine Insurance Policy or Certificate with full coverage details</li>
                  <li>Weight and Measurement Certificate from authorized surveyors</li>
                </ul>
              </li>
              <li><strong>Document Presentation and Banking Procedures</strong>
                <ul>
                  <li>Document compilation, verification, and accuracy checking</li>
                  <li>Timely presentation to negotiating bank within LC terms</li>
                  <li>Bank examination process and discrepancy identification</li>
                  <li>Discrepancy resolution and document correction procedures</li>
                  <li>Payment processing, confirmation, and fund transfer</li>
                  <li>Document courier to buyer's bank and final settlement</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.procedureSection}>
            <h4>Phase VI: Transit Monitoring and Delivery</h4>
            <ol>
              <li><strong>Voyage Monitoring and Communication</strong>
                <ul>
                  <li>Vessel tracking and estimated time of arrival (ETA) updates</li>
                  <li>Regular communication with buyer regarding shipment progress</li>
                  <li>Weather monitoring and route optimization assessment</li>
                  <li>Delay notification and alternative arrangement coordination</li>
                  <li>Emergency response and contingency plan activation</li>
                </ul>
              </li>
              <li><strong>Arrival and Discharge Coordination</strong>
                <ul>
                  <li>Port arrival notification and berth allocation coordination</li>
                  <li>Customs clearance support and documentation assistance</li>
                  <li>Discharge operations supervision and quality monitoring</li>
                  <li>Delivery completion confirmation and final documentation</li>
                  <li>Post-delivery support and issue resolution</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.responsibilityMatrix}>
            <h4>Comprehensive CIF Responsibility Matrix</h4>
            <table className={styles.responsibilityTable}>
              <thead>
                <tr>
                  <th>Responsibility Area</th>
                  <th>Seller Obligations</th>
                  <th>Buyer Obligations</th>
                  <th>Shared Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Export Clearance</td>
                  <td>Complete responsibility</td>
                  <td>-</td>
                  <td>Documentation support</td>
                </tr>
                <tr>
                  <td>Main Carriage</td>
                  <td>Arrangement and payment</td>
                  <td>-</td>
                  <td>Route coordination</td>
                </tr>
                <tr>
                  <td>Marine Insurance</td>
                  <td>Procurement and payment</td>
                  <td>Beneficiary rights</td>
                  <td>Claims handling</td>
                </tr>
                <tr>
                  <td>Import Clearance</td>
                  <td>Documentation support</td>
                  <td>Complete responsibility</td>
                  <td>Information sharing</td>
                </tr>
                <tr>
                  <td>Risk (during transit)</td>
                  <td>-</td>
                  <td>Assumption upon loading</td>
                  <td>Risk mitigation</td>
                </tr>
                <tr>
                  <td>Discharge Costs</td>
                  <td>-</td>
                  <td>Complete responsibility</td>
                  <td>Coordination support</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.criticalPoints}>
            <h4>Critical Success Points for CIF Transactions</h4>
            <ul>
              <li>Accurate and complete documentation preparation and presentation</li>
              <li>Timely vessel booking and comprehensive freight arrangements</li>
              <li>Adequate insurance coverage with proper documentation and beneficiary designation</li>
              <li>Rigorous quality control throughout the entire process</li>
              <li>Effective communication and coordination with all parties</li>
              <li>Full compliance with international trade regulations and standards</li>
              <li>Proper risk management and comprehensive contingency planning</li>
              <li>Professional logistics coordination and shipping arrangements</li>
              <li>Transparent pricing and cost breakdown communication</li>
              <li>Proactive issue identification and resolution procedures</li>
            </ul>
          </div>
        </div>
      )
    },
    "dip-pay": {
      title: "DIP AND PAY / TANK TO VESSEL OR TANK (SELLER TANK EXTENSION)",
      content: (
        <div>
          <h3>DIP AND PAY / TANK TO VESSEL OR TANK OPERATIONS</h3>
          
          <div className={styles.procedureSection}>
            <h4>Comprehensive Overview of Dip and Pay Operations</h4>
            <p>Dip and Pay operations represent a sophisticated method of petroleum product transactions involving precise measurement (dipping) of products in storage tanks followed by immediate payment based on verified quantities. This procedure is extensively used for tank-to-vessel or tank-to-tank transfers where sellers extend tank storage facilities to facilitate complex commercial arrangements.</p>
          </div>

          <div className={styles.procedureSection}>
            <h4>1. Pre-Operation Requirements and Preparation</h4>
            <ul>
              <li><strong>Tank Preparation and Comprehensive Verification</strong>
                <ul>
                  <li>Tank calibration certificate verification and validation</li>
                  <li>Tank cleaning and preparation certification with quality standards</li>
                  <li>Product compatibility assessment and contamination risk evaluation</li>
                  <li>Tank structural integrity and safety inspection procedures</li>
                  <li>Measurement equipment calibration and accuracy verification</li>
                  <li>Environmental compliance and regulatory approval confirmation</li>
                </ul>
              </li>
              <li><strong>Documentation Prerequisites and Legal Framework</strong>
                <ul>
                  <li>Comprehensive tank extension agreement between all parties</li>
                  <li>Product custody transfer procedures and responsibility matrix</li>
                  <li>Detailed measurement and sampling protocols</li>
                  <li>Payment terms, conditions, and settlement procedures</li>
                  <li>Insurance coverage and comprehensive liability protection</li>
                  <li>Regulatory compliance and permit documentation</li>
                </ul>
              </li>
              <li><strong>Technical Infrastructure and System Readiness</strong>
                <ul>
                  <li>Measurement system calibration and accuracy verification</li>
                  <li>Communication systems and data recording equipment</li>
                  <li>Safety systems activation and emergency response preparation</li>
                  <li>Quality monitoring equipment setup and calibration</li>
                  <li>Environmental monitoring and protection systems</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>2. Dipping and Measurement Procedures</h4>
            <ul>
              <li><strong>Initial Tank Gauging and Baseline Establishment</strong>
                <ul>
                  <li>Opening tank measurement with multiple witness verification</li>
                  <li>Temperature readings at multiple levels and locations</li>
                  <li>Density determination using calibrated instruments</li>
                  <li>Water content analysis and free water determination</li>
                  <li>Sediment testing and contamination assessment</li>
                  <li>Photographic documentation of measurement process</li>
                </ul>
              </li>
              <li><strong>Product Quality Verification and Documentation</strong>
                <ul>
                  <li>Representative sampling procedures following international standards</li>
                  <li>Comprehensive laboratory analysis and testing protocols</li>
                  <li>Specification compliance verification and documentation</li>
                  <li>Certificate of Analysis preparation by accredited laboratory</li>
                  <li>Quality acceptance confirmation by all parties</li>
                  <li>Chain of custody documentation for samples</li>
                </ul>
              </li>
              <li><strong>Transfer Operations and Monitoring</strong>
                <ul>
                  <li>Pipeline connection integrity testing and leak detection</li>
                  <li>Transfer rate optimization and pressure monitoring</li>
                  <li>Continuous quantity measurement and real-time documentation</li>
                  <li>Quality monitoring during transfer process</li>
                  <li>Safety parameter monitoring and alarm system oversight</li>
                  <li>Environmental compliance monitoring throughout operation</li>
                </ul>
              </li>
              <li><strong>Final Measurement and Reconciliation</strong>
                <ul>
                  <li>Closing tank measurement with witness verification</li>
                  <li>Net quantity calculation using standard formulas</li>
                  <li>Temperature and density corrections application</li>
                  <li>Loss and gain reconciliation and analysis</li>
                  <li>Final quantity certification and documentation</li>
                  <li>Independent surveyor verification when required</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>3. Payment Procedures and Financial Settlement</h4>
            <ul>
              <li><strong>Quantity Finalization and Verification Process</strong>
                <ul>
                  <li>Application of agreed measurement procedures and standards</li>
                  <li>Independent surveyor verification and certification</li>
                  <li>Quantity certificate preparation and issuance</li>
                  <li>Commercial quantity determination and agreement</li>
                  <li>Resolution of any measurement discrepancies</li>
                  <li>Final quantity acceptance and sign-off procedures</li>
                </ul>
              </li>
              <li><strong>Invoice Preparation and Documentation</strong>
                <ul>
                  <li>Invoice preparation based on final measured quantity</li>
                  <li>Price calculation according to contract terms and conditions</li>
                  <li>Tax and duty calculations where applicable</li>
                  <li>Supporting documentation attachment and verification</li>
                  <li>Invoice verification, approval, and authorization</li>
                  <li>Distribution to relevant parties and stakeholders</li>
                </ul>
              </li>
              <li><strong>Payment Processing and Settlement</strong>
                <ul>
                  <li>Payment method execution according to contract terms</li>
                  <li>Bank transfer processing or letter of credit negotiation</li>
                  <li>Payment confirmation and receipt documentation</li>
                  <li>Account reconciliation and financial closure</li>
                  <li>Final settlement documentation and record keeping</li>
                  <li>Audit trail maintenance for compliance purposes</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>4. Tank Extension Services and Operational Support</h4>
            <ul>
              <li><strong>Storage Facility Provision and Management</strong>
                <ul>
                  <li>Dedicated tank allocation for buyer's product inventory</li>
                  <li>Tank maintenance and operational services provision</li>
                  <li>Security systems and access control management</li>
                  <li>Environmental protection and safety compliance</li>
                  <li>24/7 monitoring, surveillance, and emergency response</li>
                  <li>Inventory management and reporting systems</li>
                </ul>
              </li>
              <li><strong>Comprehensive Operational Services</strong>
                <ul>
                  <li>Product receipt, storage, and inventory management</li>
                  <li>Quality preservation and continuous monitoring</li>
                  <li>Inventory tracking and regular reporting</li>
                  <li>Loading and discharge operations coordination</li>
                  <li>Documentation preparation and record keeping</li>
                  <li>Customer service and technical support</li>
                </ul>
              </li>
              <li><strong>Commercial Arrangements and Service Agreements</strong>
                <ul>
                  <li>Storage fees structure and operational charges</li>
                  <li>Minimum and maximum storage period agreements</li>
                  <li>Throughput commitments and performance penalties</li>
                  <li>Insurance provisions and liability allocation</li>
                  <li>Termination procedures and handover arrangements</li>
                  <li>Service level agreements and performance metrics</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>5. Risk Management and Safety Protocols</h4>
            <ul>
              <li><strong>Operational Risk Assessment and Mitigation</strong>
                <ul>
                  <li>Product contamination prevention and control measures</li>
                  <li>Quantity loss minimization and monitoring systems</li>
                  <li>Equipment failure contingencies and backup systems</li>
                  <li>Weather and environmental factor considerations</li>
                  <li>Human error prevention and training programs</li>
                  <li>Operational procedure standardization and compliance</li>
                </ul>
              </li>
              <li><strong>Comprehensive Safety Protocols and Procedures</strong>
                <ul>
                  <li>Fire prevention and suppression systems maintenance</li>
                  <li>Gas detection and atmospheric monitoring systems</li>
                  <li>Emergency response procedures and evacuation plans</li>
                  <li>Personnel safety training and certification programs</li>
                  <li>Environmental protection measures and monitoring</li>
                  <li>Regulatory compliance and safety auditing</li>
                </ul>
              </li>
              <li><strong>Insurance Coverage and Risk Protection</strong>
                <ul>
                  <li>Comprehensive product liability insurance coverage</li>
                  <li>Storage and handling operation insurance</li>
                  <li>Environmental liability protection and coverage</li>
                  <li>Business interruption insurance for operational continuity</li>
                  <li>Third-party liability coverage and protection</li>
                  <li>Professional indemnity and errors and omissions coverage</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.advantagesBox}>
            <h4>Comprehensive Advantages of Dip and Pay Operations</h4>
            <ul>
              <li><strong>Enhanced Accuracy:</strong> Precise measurement systems ensure accurate quantity determination and commercial settlement</li>
              <li><strong>Operational Efficiency:</strong> Streamlined processes reduce transaction time and operational complexity</li>
              <li><strong>Flexibility and Convenience:</strong> Allows for partial deliveries, inventory management, and operational flexibility</li>
              <li><strong>Cost Optimization:</strong> Reduces handling costs, transportation expenses, and operational overheads</li>
              <li><strong>Quality Assurance:</strong> Continuous monitoring and control maintains product quality and integrity</li>
              <li><strong>Risk Reduction:</strong> Minimizes exposure to market volatility and operational risks</li>
              <li><strong>Environmental Benefits:</strong> Reduced emissions and environmental impact through efficient operations</li>
              <li><strong>Financial Efficiency:</strong> Immediate payment based on verified quantities improves cash flow</li>
            </ul>
          </div>

          <div className={styles.procedureSection}>
            <h4>6. Documentation and Record Keeping Systems</h4>
            <ul>
              <li><strong>Measurement Records and Documentation</strong>
                <ul>
                  <li>Comprehensive tank gauging sheets and calculation records</li>
                  <li>Temperature and density measurement logs</li>
                  <li>Calibration certificates and correction factor applications</li>
                  <li>Independent surveyor reports and certifications</li>
                  <li>Photographic evidence and visual documentation</li>
                  <li>Electronic data recording and backup systems</li>
                </ul>
              </li>
              <li><strong>Quality Documentation and Certification</strong>
                <ul>
                  <li>Sampling procedures and chain of custody documentation</li>
                  <li>Laboratory analysis reports and test results</li>
                  <li>Certificate of Quality preparation and issuance</li>
                  <li>Specification compliance certificates and verification</li>
                  <li>Quality monitoring logs and trend analysis</li>
                  <li>Non-conformance reports and corrective actions</li>
                </ul>
              </li>
              <li><strong>Commercial Records and Financial Documentation</strong>
                <ul>
                  <li>Quantity certificates and commercial invoices</li>
                  <li>Payment confirmations and financial receipts</li>
                  <li>Contract amendments and variation documentation</li>
                  <li>Correspondence records and communication logs</li>
                  <li>Final settlement statements and account closure</li>
                  <li>Audit trails and compliance documentation</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.noteBox}>
            <h4>Critical Success Factors for Dip and Pay Operations</h4>
            <ul>
              <li>Accurate and properly calibrated measurement systems with regular maintenance</li>
              <li>Qualified and experienced personnel with appropriate training and certification</li>
              <li>Clear and comprehensive contractual terms and operational procedures</li>
              <li>Effective communication and coordination between all parties and stakeholders</li>
              <li>Robust safety protocols and comprehensive environmental protection measures</li>
              <li>Comprehensive insurance coverage and risk management strategies</li>
              <li>Regular equipment maintenance, calibration, and performance verification</li>
              <li>Detailed documentation and record keeping for compliance and audit purposes</li>
              <li>Continuous improvement and operational optimization initiatives</li>
              <li>Regulatory compliance and adherence to industry best practices</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.container}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className={styles.header}>
          <h2>Petrochemicals - INCO TERMS Documentation</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </header>

        <div className={styles.content}>
          <nav className={styles.navigation}>
            <h3>INCO TERMS Procedures</h3>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span>Select Procedure</span>
              {isMobileMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            <ul className={`${styles.navigationList} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`${styles.navItem} ${
                      activeSection === section.id ? styles.active : ""
                    }`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{section.title}</span>
                    <ChevronRight size={16} />
                  </button>
                </li>
              ))}
            </ul>
            
            <button className={styles.backButton} onClick={onClose}>
              Back to Products
            </button>
          </nav>

          <main className={styles.mainContent}>
            <AnimatePresence mode="wait">
              <motion.section
                key={activeSection}
                className={styles.section}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <article>
                  <h2>{sectionContent[activeSection].title}</h2>
                  {sectionContent[activeSection].content}
                </article>
              </motion.section>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
}