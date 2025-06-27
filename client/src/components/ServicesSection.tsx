import { motion } from "framer-motion";
import { services } from "@/config/portfolio";

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I offer comprehensive development services from concept to deployment, 
            ensuring your project meets modern standards and user expectations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <i className={`${service.icon} text-accent text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
