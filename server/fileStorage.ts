import fs from 'fs/promises';
import path from 'path';

export interface PortfolioConfig {
  name: string;
  title: string;
  about: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  theme: string;
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
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  
  // Portfolio configuration
  getPortfolioConfig(): Promise<PortfolioConfig | undefined>;
  updatePortfolioConfig(config: Partial<PortfolioConfig>): Promise<PortfolioConfig>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  
  // Services
  getServices(): Promise<Service[]>;

  // Image upload
  saveUploadedImage(imageData: string, filename: string): Promise<string>;
}

export class FileStorage implements IStorage {
  private configDir = path.join(process.cwd(), 'config');
  private dataDir = path.join(process.cwd(), 'data');
  private imagesDir = path.join(this.dataDir, 'images');

  constructor() {
    this.ensureDirectories();
  }

  private async ensureDirectories() {
    try {
      await fs.mkdir(this.configDir, { recursive: true });
      await fs.mkdir(this.dataDir, { recursive: true });
      await fs.mkdir(this.imagesDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directories:', error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    // Simple hardcoded admin user for file-based system
    if (id === 1) {
      return {
        id: 1,
        username: 'admin',
        password: 'admin123' // In production, this should be hashed
      };
    }
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Simple hardcoded admin user
    if (username === 'admin') {
      return {
        id: 1,
        username: 'admin',
        password: 'admin123'
      };
    }
    return undefined;
  }

  async getPortfolioConfig(): Promise<PortfolioConfig | undefined> {
    try {
      const configPath = path.join(this.configDir, 'portfolio.json');
      const data = await fs.readFile(configPath, 'utf-8');
      return JSON.parse(data) as PortfolioConfig;
    } catch (error) {
      console.error('Error reading portfolio config:', error);
      return undefined;
    }
  }

  async updatePortfolioConfig(config: Partial<PortfolioConfig>): Promise<PortfolioConfig> {
    try {
      const configPath = path.join(this.configDir, 'portfolio.json');
      let existingConfig: PortfolioConfig;

      try {
        const data = await fs.readFile(configPath, 'utf-8');
        existingConfig = JSON.parse(data);
      } catch {
        // If file doesn't exist, create default config
        existingConfig = {
          name: '',
          title: '',
          about: '',
          email: '',
          theme: 'purple',
          skills: {
            primary: '',
            secondary: '',
            tertiary: '',
            framework: '',
            other: '',
            database: ''
          },
          stats: {
            projects: '',
            satisfaction: '',
            experience: ''
          },
          socialLinks: []
        };
      }

      const updatedConfig = { ...existingConfig, ...config };
      await fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2));
      return updatedConfig;
    } catch (error) {
      console.error('Error updating portfolio config:', error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      const projectsPath = path.join(this.configDir, 'projects.json');
      const data = await fs.readFile(projectsPath, 'utf-8');
      return JSON.parse(data) as Project[];
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  }

  async getServices(): Promise<Service[]> {
    try {
      const servicesPath = path.join(this.configDir, 'services.json');
      const data = await fs.readFile(servicesPath, 'utf-8');
      return JSON.parse(data) as Service[];
    } catch (error) {
      console.error('Error reading services:', error);
      return [];
    }
  }

  async saveUploadedImage(imageData: string, filename: string): Promise<string> {
    try {
      // Extract base64 data from data URL
      const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('Invalid image data format');
      }

      const imageBuffer = Buffer.from(matches[2], 'base64');
      const imagePath = path.join(this.imagesDir, filename);
      
      await fs.writeFile(imagePath, imageBuffer);
      
      // Return relative path that can be served statically
      return `/data/images/${filename}`;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  }
}

export const storage = new FileStorage();