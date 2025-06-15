import { motion } from "framer-motion";
import styles from "../styles/Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  href,
  onClick,
  disabled = false,
  className = "",
  icon,
  ...props
}) {
  const baseClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      className={baseClasses}
      href={href}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}