import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  config: {
    email: string;
    phone: string;
    location: string;
    socialLinks: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
}

export function ContactSection({ config }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6 text-white">Let's work together</h2>
              <p className="text-slate-300 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a project in mind or just want to chat about technology, 
                feel free to reach out.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-slate-400">{config.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-slate-400">{config.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-slate-400">{config.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4">
              {config.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="w-12 h-12 bg-slate-800 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <i className={`${link.icon} text-slate-400 group-hover:text-white`}></i>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-8 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-accent"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-accent"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project discussion"
                  className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-accent"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-accent resize-none"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent-secondary py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
