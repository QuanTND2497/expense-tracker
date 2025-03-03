import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
        </div>
    );
};

export default LoadingSpinner;
