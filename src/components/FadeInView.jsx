import { motion } from "framer-motion";

export default function FadeInView({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = "up",
  className = "",
  ...props 
}) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: -30 },
    right: { x: 30 },
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}