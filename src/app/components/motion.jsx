import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50, // starts 50 pixels below the final position
  },
  in: {
    opacity: 1,
    y: 0, // final position (original position)
  },
  out: {
    opacity: 0,
    y: -50, // moves 50 pixels up while fading out
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1.2, 
};

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
