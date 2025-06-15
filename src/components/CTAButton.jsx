import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "../styles/CTAButton.module.css";

export default function CTAButton({
  children,
  variant = "primary",
  size = "medium",
  href,
  to,
  as: Component,
  onClick,
  disabled = false,
  className = "",
  icon,
  "aria-label": ariaLabel,
  ...props
}) {
  const baseClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon || <ArrowRight size={20} className={styles.icon} />}
    </>
  );

  // If 'as' prop is provided (like Link), use that component
  if (Component) {
    return (
      <Component
        className={baseClasses}
        to={to}
        href={href}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </Component>
    );
  }

  // Otherwise use motion component as before
  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      className={baseClasses}
      href={href}
      to={to}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}