export interface PortfolioConfig {
  name: string;
  title: string;
  about: string;
  profileImage: string;
  email: string;
  phone: string;
  location: string;
  skills: {
    primary: string;
    secondary: string;
    tertiary: string;
    framework: string;
    other: string;
    database: string;
  };
  stats: {
    projects: string;
    satisfaction: string;
    experience: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  theme: string;
}

export const defaultConfig: PortfolioConfig = {
  name: "Jensen Omega",
  title: "Software Developer",
  about: "I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this led me to software development as it fulfills my love for learning and building things.",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
  email: "jensen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  skills: {
    primary: "HTML5",
    secondary: "CSS",
    tertiary: "JavaScript",
    framework: "Node.js",
    other: "React",
    database: "MongoDB"
  },
  stats: {
    projects: "120+",
    satisfaction: "95%",
    experience: "10+"
  },
  socialLinks: [
    { platform: "GitHub", url: "#", icon: "fab fa-github" },
    { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
    { platform: "Twitter", url: "#", icon: "fab fa-twitter" },
    { platform: "Dribbble", url: "#", icon: "fab fa-dribbble" }
  ],
  theme: "purple"
};

export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    description: "Mobile app for tracking workouts, nutrition, and health metrics with social features and AI recommendations.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React Native", "Firebase", "ML Kit"],
    liveUrl: "#",
    codeUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts, data visualization, and automated reporting features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Vue.js", "D3.js", "Python"],
    liveUrl: "#",
    codeUrl: "#",
    featured: true
  }
];

export const services = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Creating responsive, interactive user interfaces using modern frameworks like React, Vue, and Angular.",
    icon: "fas fa-code"
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Building robust APIs and server-side applications with Node.js, Python, and various database technologies.",
    icon: "fas fa-database"
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications using React Native and native iOS/Android technologies.",
    icon: "fas fa-mobile-alt"
  },
  {
    id: 4,
    title: "Cloud Services",
    description: "Implementing cloud solutions with AWS, Azure, and Google Cloud for scalable and reliable applications.",
    icon: "fas fa-cloud"
  },
  {
    id: 5,
    title: "DevOps & CI/CD",
    description: "Setting up automated deployment pipelines and infrastructure management for efficient development workflows.",
    icon: "fas fa-cogs"
  },
  {
    id: 6,
    title: "Security & Testing",
    description: "Implementing security best practices and comprehensive testing strategies to ensure application reliability.",
    icon: "fas fa-shield-alt"
  }
];
