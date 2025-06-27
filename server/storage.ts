import { 
  users, 
  type User, 
  type InsertUser,
  type PortfolioConfig,
  type InsertPortfolioConfig,
  type Project,
  type InsertProject,
  type Service,
  type InsertService
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio configuration
  getPortfolioConfig(): Promise<PortfolioConfig | undefined>;
  updatePortfolioConfig(config: Partial<InsertPortfolioConfig>): Promise<PortfolioConfig>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Services
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioConfig: PortfolioConfig | undefined;
  private projects: Map<number, Project>;
  private services: Map<number, Service>;
  private currentId: number;
  private projectId: number;
  private serviceId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.services = new Map();
    this.currentId = 1;
    this.projectId = 1;
    this.serviceId = 1;
    
    // Initialize with default admin user
    this.initializeAdmin();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  private async initializeAdmin(): Promise<void> {
    const admin: User = {
      id: this.currentId++,
      username: "admin",
      password: "admin123",
      isAdmin: true,
      createdAt: new Date()
    };
    this.users.set(admin.id, admin);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin ?? false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Portfolio configuration methods
  async getPortfolioConfig(): Promise<PortfolioConfig | undefined> {
    return this.portfolioConfig;
  }

  async updatePortfolioConfig(config: Partial<InsertPortfolioConfig>): Promise<PortfolioConfig> {
    if (!this.portfolioConfig) {
      this.portfolioConfig = {
        id: 1,
        name: "",
        title: "",
        about: "",
        email: "",
        phone: null,
        location: null,
        profileImage: null,
        theme: "purple",
        skills: null,
        stats: null,
        socialLinks: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...config
      };
    } else {
      this.portfolioConfig = {
        ...this.portfolioConfig,
        ...config,
        updatedAt: new Date()
      };
    }
    return this.portfolioConfig;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const newProject: Project = {
      id,
      title: project.title,
      description: project.description,
      image: project.image ?? null,
      technologies: project.technologies ?? null,
      liveUrl: project.liveUrl ?? null,
      codeUrl: project.codeUrl ?? null,
      featured: project.featured ?? null,
      createdAt: new Date()
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing) {
      throw new Error(`Project with id ${id} not found`);
    }
    const updated = { ...existing, ...project };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const newService: Service = {
      id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      createdAt: new Date()
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) {
      throw new Error(`Service with id ${id} not found`);
    }
    const updated = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: number): Promise<void> {
    this.services.delete(id);
  }
}

export const storage = new MemStorage();
