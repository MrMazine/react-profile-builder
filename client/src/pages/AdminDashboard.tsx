import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { LogOut, Palette, Save } from "lucide-react";
import { type ThemeColor } from "@/hooks/useTheme";

const portfolioConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  profileImage: z.string().url("Valid URL is required").optional(),
  theme: z.enum(["purple", "blue", "green", "red", "yellow"]),
  skills: z.string().optional(),
  stats: z.string().optional(),
  socialLinks: z.string().optional(),
});

type PortfolioConfigForm = z.infer<typeof portfolioConfigSchema>;

const themeColors = {
  purple: { name: "Purple", bg: "bg-purple-500" },
  blue: { name: "Blue", bg: "bg-blue-500" },
  green: { name: "Green", bg: "bg-green-500" },
  red: { name: "Red", bg: "bg-red-500" },
  yellow: { name: "Yellow", bg: "bg-yellow-500" }
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>("purple");

  // Check if user is admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: config, isLoading } = useQuery({
    queryKey: ["/api/config"],
  });

  const form = useForm<PortfolioConfigForm>({
    resolver: zodResolver(portfolioConfigSchema),
    defaultValues: {
      name: "",
      title: "",
      about: "",
      email: "",
      phone: "",
      location: "",
      profileImage: "",
      theme: "purple",
      skills: "",
      stats: "",
      socialLinks: "",
    },
  });

  // Update form when data loads
  useEffect(() => {
    if (config) {
      form.reset({
        name: (config as any).name || "",
        title: (config as any).title || "",
        about: (config as any).about || "",
        email: (config as any).email || "",
        phone: (config as any).phone || "",
        location: (config as any).location || "",
        profileImage: (config as any).profileImage || "",
        theme: (config as any).theme || "purple",
        skills: (config as any).skills || "",
        stats: (config as any).stats || "",
        socialLinks: (config as any).socialLinks || "",
      });
      setCurrentTheme((config as any).theme || "purple");
    }
  }, [config, form]);

  const updateConfigMutation = useMutation({
    mutationFn: async (data: PortfolioConfigForm) => {
      const response = await apiRequest("PUT", "/api/config", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/config"] });
      toast({
        title: "Configuration updated",
        description: "Portfolio settings have been saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update portfolio configuration",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PortfolioConfigForm) => {
    updateConfigMutation.mutate(data);
  };

  const handleThemeChange = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    form.setValue("theme", theme);
    
    // Apply theme immediately
    const root = document.documentElement;
    const themeMap = {
      purple: { primary: 'hsl(262, 80%, 60%)', secondary: 'hsl(258, 74%, 63%)' },
      blue: { primary: 'hsl(217, 91%, 60%)', secondary: 'hsl(224, 76%, 58%)' },
      green: { primary: 'hsl(166, 74%, 37%)', secondary: 'hsl(168, 85%, 31%)' },
      red: { primary: 'hsl(0, 84%, 60%)', secondary: 'hsl(0, 73%, 57%)' },
      yellow: { primary: 'hsl(32, 95%, 44%)', secondary: 'hsl(32, 85%, 50%)' }
    };
    
    const colors = themeMap[theme];
    root.style.setProperty('--accent', colors.primary);
    root.style.setProperty('--accent-secondary', colors.secondary);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="border-b border-slate-800 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="general" className="data-[state=active]:bg-accent">
              General Settings
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-accent">
              Theme Customization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your portfolio information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("name")}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">Professional Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Software Developer"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("title")}
                      />
                      {form.formState.errors.title && (
                        <p className="text-sm text-red-400">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("phone")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">Location (Optional)</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("location")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profileImage" className="text-white">Profile Image URL (Optional)</Label>
                      <Input
                        id="profileImage"
                        placeholder="https://example.com/image.jpg"
                        className="bg-slate-700 border-slate-600 text-white"
                        {...form.register("profileImage")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about" className="text-white">About Me</Label>
                    <Textarea
                      id="about"
                      rows={4}
                      placeholder="Tell visitors about yourself..."
                      className="bg-slate-700 border-slate-600 text-white resize-none"
                      {...form.register("about")}
                    />
                    {form.formState.errors.about && (
                      <p className="text-sm text-red-400">{form.formState.errors.about.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-white">Skills (JSON)</Label>
                      <Textarea
                        id="skills"
                        rows={3}
                        placeholder='{"primary": "React", "secondary": "Node.js"}'
                        className="bg-slate-700 border-slate-600 text-white resize-none"
                        {...form.register("skills")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stats" className="text-white">Stats (JSON)</Label>
                      <Textarea
                        id="stats"
                        rows={3}
                        placeholder='{"projects": "50+", "satisfaction": "98%"}'
                        className="bg-slate-700 border-slate-600 text-white resize-none"
                        {...form.register("stats")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="socialLinks" className="text-white">Social Links (JSON)</Label>
                      <Textarea
                        id="socialLinks"
                        rows={3}
                        placeholder='[{"platform": "GitHub", "url": "https://github.com/username"}]'
                        className="bg-slate-700 border-slate-600 text-white resize-none"
                        {...form.register("socialLinks")}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-accent hover:bg-accent-secondary"
                    disabled={updateConfigMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateConfigMutation.isPending ? "Saving..." : "Save Configuration"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Theme Customization
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Choose the accent color for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white mb-4 block">Accent Color</Label>
                    <div className="grid grid-cols-5 gap-4">
                      {Object.entries(themeColors).map(([key, theme]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleThemeChange(key as ThemeColor)}
                          className={`group relative p-4 rounded-lg border-2 transition-all duration-200 ${
                            currentTheme === key
                              ? "border-white scale-105"
                              : "border-slate-600 hover:border-slate-500 hover:scale-102"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full ${theme.bg} mx-auto mb-2`} />
                          <div className="text-sm text-white font-medium">{theme.name}</div>
                          {currentTheme === key && (
                            <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm">
                      The selected theme will be applied to your portfolio website. 
                      Make sure to save your configuration to persist the changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}