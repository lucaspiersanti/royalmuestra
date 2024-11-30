import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import WhatsAppButton_2 from "../../shared/WhatsAppButton_2";

const Hero = ({ heading, message }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden landscape:h-screen">
      <div className="absolute items-center top-0 left-0 right-0 bottom-0" />
      <div className=" 
        xs:landscapes:flex-row xs:landscapes:py-2 
        sm:landscapes:flex-row sm:landscapes:py-2 
        md:landscapes:flex-row md:landscapes:py-2  
        md:flex-row md:h-full md:w-full sm:h-full sm:w-full
        flex items-center justify-center h-screen mt-20 ">

        <div className="text-resaltar z-[2] mt-[-10rem] flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: -500 },
              visible: { opacity: 1, x: 0 }
            }}>
            <img loading="lazy" src="./favicon.ico"
              style={{
                width: "300px",
                height: "300px",
              }} />

          </motion.div>
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: 500 },
              visible: { opacity: 1, x: 0 }
            }}
            className="relative items-center justify-center mt-4 pb-2 text-5xl text-Royal font-serif">
            {heading}
          </motion.h1>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: 500 },
              visible: { opacity: 1, x: 0 }
            }}
            className="pt-2 pb-4 text-xl">{message}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: -500 },
              visible: { opacity: 1, x: 0 }
            }}>
          <WhatsAppButton_2></WhatsAppButton_2>
          </motion.div>
          
        </div>
       
      </div>
    </section>
  );
};

Hero.propTypes = {
  heading: PropTypes.any,
  message: PropTypes.string,
};

export default Hero;
