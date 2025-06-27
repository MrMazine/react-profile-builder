import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioConfig = pgTable("portfolio_config", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  about: text("about").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  profileImage: text("profile_image"),
  theme: text("theme").default("purple"),
  skills: text("skills"), // JSON string for skills object
  stats: text("stats"), // JSON string for stats object
  socialLinks: text("social_links"), // JSON string for social links array
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  technologies: text("technologies").array(),
  liveUrl: text("live_url"),
  codeUrl: text("code_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioConfigSchema = createInsertSchema(portfolioConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertPortfolioConfig = z.infer<typeof insertPortfolioConfigSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type User = typeof users.$inferSelect;
export type PortfolioConfig = typeof portfolioConfig.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Service = typeof services.$inferSelect;
