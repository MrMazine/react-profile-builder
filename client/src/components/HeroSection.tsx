import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  config: {
    name: string;
    title: string;
    profileImage: string;
    skills: {
      primary: string;
      secondary: string;
      tertiary: string;
      framework: string;
      other: string;
      database: string;
    };
  };
}

export function HeroSection({ config }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
    <section id="home" className="min-h-screen flex items-center pt-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              Hello<span className="text-accent">.</span>
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-slate-300">
                I'm <span className="text-white font-semibold">{config.name}</span>
              </p>
              <p className="text-3xl lg:text-4xl font-semibold text-white">
                {config.title}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button
              className="bg-accent hover:bg-accent-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 hover:border-accent text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              My resume
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-slate-400">
            <span>{config.skills.primary}</span>
            <span>{config.skills.secondary}</span>
            <span>{config.skills.tertiary}</span>
            <span>{config.skills.framework}</span>
            <span>{config.skills.other}</span>
            <span>{config.skills.database}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-accent to-accent-secondary p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <img
                  src={config.profileImage}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center"
            >
              <Code className="text-xl text-white" />
            </motion.div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="text-xl text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
