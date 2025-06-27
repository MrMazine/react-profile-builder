import { motion } from "framer-motion";
import { Monitor, Smartphone, Server } from "lucide-react";

interface AboutSectionProps {
  config: {
    about: string;
    stats: {
      projects: string;
      satisfaction: string;
      experience: string;
    };
  };
}

export function AboutSection({ config }: AboutSectionProps) {
  const services = [
    {
      icon: Monitor,
      title: "Website Development",
      description: "Full-stack web applications",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Mobile & desktop applications",
    },
    {
      icon: Server,
      title: "Cloud Hosting",
      description: "Deployment & maintenance",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <service.icon className="text-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{service.title}</h3>
                    <p className="text-slate-400 text-sm">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6 text-white">About me</h2>
              <p className="text-slate-300 leading-relaxed">{config.about}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {config.stats.projects}
                </div>
                <div className="text-slate-400 text-sm">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {config.stats.satisfaction}
                </div>
                <div className="text-slate-400 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {config.stats.experience}
                </div>
                <div className="text-slate-400 text-sm">Years of Experience</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
