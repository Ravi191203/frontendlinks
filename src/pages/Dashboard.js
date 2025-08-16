import { useEffect, useState } from "react";
import { Star, Globe, Code, Palette, Layout, Settings, Search, Plus, Filter, Grid3X3, List, Calendar, TrendingUp, Eye, Edit, Trash2, Heart, ExternalLink, Moon, Sun, Monitor, Zap, Shield, Cpu, Database, LogOut, User, ChevronDown } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(localStorage.getItem("registeredUser") || "Alex Rivera");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid, list, kanban
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("blue");
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    url: "",
    description: "",
    category: "Development",
    status: "Live",
    techStack: [],
    currentTech: ""
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Code Storage Hub",
      url: "https://comrets.vercel.app",
      description: "",
      category: "NextJS",
      status: "Live",
      lastUpdated: "2 hours ago",
      techStack: ["NextJs"],
      views: 1250,
      favorites: 89,
      performance: 98,
      uptime: "99.9%"
    },
    {
      id: 2,
      name: "Code Storage Hub with AI Features",
      url: "https://coderrgs.vercel.app/",
      description: "Advanced cloud synchronization tool with end-to-end encryption and multi-platform support",
      category: "MongoDB",
      status: "Beta",
      lastUpdated: "1 day ago",
      techStack: ["Node.js", "AWS", "React"],
      views: 890,
      favorites: 67,
      performance: 94,
      uptime: "99.8%"
    },
    {
      id: 3,
      name: "DevTools Suite",
      url: "https://dev-tools-black.vercel.app/",
      description: "Comprehensive development toolkit with code analysis, testing, and deployment features",
      category: "Development",
      status: "Beta",
      lastUpdated: "3 days ago",
      techStack: ["Vue.js", "Docker", "GraphQL"],
      views: 456,
      favorites: 34,
      performance: 91,
      uptime: "98.5%"
    },
    {
      id: 4,
      name: "CryptoTracker Elite",
      url: "https://crypto-elite.finance",
      description: "Professional cryptocurrency tracking and portfolio management platform",
      category: "Finance",
      status: "Maintenance",
      lastUpdated: "5 hours ago",
      techStack: ["Angular", "WebSocket", "MongoDB"],
      views: 2100,
      favorites: 156,
      performance: 96,
      uptime: "99.7%"
    },
    {
      id: 5,
      name: "Social Hub",
      url: "https://social-hub.network",
      description: "Unified social media management platform with advanced scheduling and analytics",
      category: "Social",
      status: "Maintenance",
      lastUpdated: "1 week ago",
      techStack: ["React", "Redis", "PostgreSQL"],
      views: 678,
      favorites: 45,
      performance: 87,
      uptime: "97.2%"
    },
    {
      id: 6,
      name: "EcoMonitor",
      url: "https://eco-monitor.green",
      description: "Environmental monitoring system with IoT integration and sustainability metrics",
      category: "IoT",
      status: "Live",
      lastUpdated: "4 days ago",
      techStack: ["Python", "InfluxDB", "Grafana"],
      views: 334,
      favorites: 28,
      performance: 93,
      uptime: "99.1%"
    }
  ]);

  const themes = {
    dark: { bg: "bg-slate-900", card: "bg-slate-800", text: "text-white", accent: "text-slate-300" },
    light: { bg: "bg-gray-50", card: "bg-white", text: "text-gray-900", accent: "text-gray-600" },
    midnight: { bg: "bg-black", card: "bg-gray-900", text: "text-white", accent: "text-gray-400" },
    ocean: { bg: "bg-blue-950", card: "bg-blue-900", text: "text-blue-50", accent: "text-blue-200" }
  };

  const accentColors = {
    blue: "blue", purple: "purple", green: "green", orange: "orange", 
    pink: "pink", cyan: "cyan", red: "red", yellow: "yellow"
  };

  const categories = ["AI/ML", "Cloud", "Development", "Finance", "Social", "IoT", "E-commerce", "Gaming", "Education", "Healthcare"];
  const filterCategories = ["all", ...categories];

  const techSuggestions = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "JavaScript", "TypeScript", 
    "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "GraphQL", "REST API",
    "TensorFlow", "PyTorch", "Redis", "Elasticsearch", "Firebase", "Supabase"
  ];

  const handleAddProject = () => {
    if (!newProject.name || !newProject.url || !newProject.description) {
      alert("Please fill in all required fields");
      return;
    }

    const project = {
      id: Date.now(),
      ...newProject,
      lastUpdated: "Just now",
      views: Math.floor(Math.random() * 1000),
      favorites: Math.floor(Math.random() * 100),
      performance: Math.floor(Math.random() * 20) + 80,
      uptime: "100%"
    };

    setProjects([project, ...projects]);
    setNewProject({
      name: "",
      url: "",
      description: "",
      category: "Development",
      status: "Live",
      techStack: [],
      currentTech: ""
    });
    setShowAddProject(false);
  };

  const handleAddTech = () => {
    if (newProject.currentTech && !newProject.techStack.includes(newProject.currentTech)) {
      setNewProject({
        ...newProject,
        techStack: [...newProject.techStack, newProject.currentTech],
        currentTech: ""
      });
    }
  };

  const handleRemoveTech = (tech) => {
    setNewProject({
      ...newProject,
      techStack: newProject.techStack.filter(t => t !== tech)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newProject.currentTech) {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    // navigate("/login"); // Uncomment if using React Router
    window.location.href = "/login"; // Simple redirect
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProjects = projects
    .filter(project => 
      (selectedCategory === "all" || project.category === selectedCategory) &&
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "views": return b.views - a.views;
        case "favorites": return b.favorites - a.favorites;
        case "performance": return b.performance - a.performance;
        default: return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
    });

  const getStatusConfig = (status) => {
    const configs = {
      Live: { bg: `bg-${accentColor}-100 dark:bg-${accentColor}-900`, text: `text-${accentColor}-800 dark:text-${accentColor}-200`, dot: `bg-${accentColor}-500` },
      Beta: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-200", dot: "bg-purple-500" },
      Maintenance: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-800 dark:text-yellow-200", dot: "bg-yellow-500" },
      Offline: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200", dot: "bg-red-500" }
    };
    return configs[status] || configs.Live;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "AI/ML": Cpu, "Cloud": Database, "Development": Code, 
      "Finance": TrendingUp, "Social": Heart, "IoT": Zap
    };
    const Icon = icons[category] || Globe;
    return <Icon className="w-4 h-4" />;
  };

  const ProjectCard = ({ project, compact = false }) => {
    const status = getStatusConfig(project.status);
    
    if (compact) {
      return (
        <div className={`${themes[theme].card} border border-opacity-20 rounded-lg p-4 hover:shadow-lg transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 bg-${accentColor}-100 dark:bg-${accentColor}-900 rounded-lg flex items-center justify-center`}>
                {getCategoryIcon(project.category)}
              </div>
              <div>
                <h3 className={`font-semibold ${themes[theme].text}`}>{project.name}</h3>
                <p className={`text-sm ${themes[theme].accent}`}>{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${status.bg} ${status.text}`}>
                <div className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot} mr-1`}></div>
                {project.status}
              </span>
              <button
                onClick={() => window.open(project.url, "_blank")}
                className={`p-2 hover:bg-${accentColor}-100 dark:hover:bg-${accentColor}-900 rounded-lg transition`}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${themes[theme].card} border border-opacity-20 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-${accentColor}-100 dark:bg-${accentColor}-900 rounded-xl flex items-center justify-center`}>
              {getCategoryIcon(project.category)}
            </div>
            <div>
              <h3 className={`font-bold ${themes[theme].text} text-lg`}>{project.name}</h3>
              <span className={`px-3 py-1 text-xs rounded-full ${status.bg} ${status.text} flex items-center w-fit mt-1`}>
                <div className={`w-2 h-2 rounded-full ${status.dot} mr-1.5`}></div>
                {project.status}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className={`p-2 hover:bg-${accentColor}-100 dark:hover:bg-${accentColor}-900 rounded-lg transition`}>
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className={`${themes[theme].accent} text-sm mb-4 leading-relaxed`}>{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className={`px-2 py-1 text-xs bg-${accentColor}-50 dark:bg-${accentColor}-950 text-${accentColor}-600 dark:text-${accentColor}-400 rounded-full`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className={`font-bold ${themes[theme].text}`}>{project.views}</div>
            <div className={`text-xs ${themes[theme].accent}`}>Views</div>
          </div>
          <div>
            <div className={`font-bold ${themes[theme].text}`}>{project.favorites}</div>
            <div className={`text-xs ${themes[theme].accent}`}>Favorites</div>
          </div>
          <div>
            <div className={`font-bold ${themes[theme].text}`}>{project.performance}%</div>
            <div className={`text-xs ${themes[theme].accent}`}>Performance</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className={`p-2 hover:bg-${accentColor}-100 dark:hover:bg-${accentColor}-900 rounded-lg transition flex items-center space-x-1`}>
              <Heart className="w-4 h-4" />
              <span className="text-sm">{project.favorites}</span>
            </button>
            <span className={`text-xs ${themes[theme].accent}`}>Updated {project.lastUpdated}</span>
          </div>
          <button
            onClick={() => window.open(project.url, "_blank")}
            className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2`}
          >
            <span>Launch</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${themes[theme].bg} transition-all duration-300`}>
      {/* Header */}
      <header className={`${themes[theme].card} shadow-lg border-b border-opacity-20 sticky top-0 z-50 backdrop-blur-md bg-opacity-80`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 rounded-xl flex items-center justify-center`}>
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themes[theme].text}`}>Project Command</h1>
                <p className={`text-sm ${themes[theme].accent}`}>Welcome back, {user}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themes[theme].accent}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${themes[theme].card} border border-opacity-20 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 ${themes[theme].text}`}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-opacity-50 rounded-lg p-1 border border-opacity-20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? `bg-${accentColor}-600 text-white` : `${themes[theme].accent} hover:bg-opacity-50`} transition`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? `bg-${accentColor}-600 text-white` : `${themes[theme].accent} hover:bg-opacity-50`} transition`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg hover:bg-opacity-50 ${themes[theme].accent} transition`}
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-${accentColor}-100 dark:hover:bg-${accentColor}-900 transition`}
                >
                  <div className={`w-8 h-8 bg-${accentColor}-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className={`${themes[theme].text} hidden sm:block`}>{user}</span>
                  <ChevronDown className={`w-4 h-4 ${themes[theme].text} transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 ${themes[theme].card} rounded-xl shadow-xl border border-opacity-20 py-2 z-50`}>
                    <div className={`px-4 py-3 border-b border-opacity-20`}>
                      <div className={`font-medium ${themes[theme].text}`}>{user}</div>
                      <div className={`text-sm ${themes[theme].accent}`}>Project Manager</div>
                    </div>
                    <div className="py-1">
                      <button className={`block w-full text-left px-4 py-2 text-sm ${themes[theme].text} hover:bg-${accentColor}-500/10 transition-colors flex items-center space-x-2`}>
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button className={`block w-full text-left px-4 py-2 text-sm ${themes[theme].text} hover:bg-${accentColor}-500/10 transition-colors flex items-center space-x-2`}>
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-opacity-20 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-1 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                >
                  {filterCategories.map(cat => (
                    <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-1 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="name">Name</option>
                <option value="views">Views</option>
                <option value="favorites">Favorites</option>
                <option value="performance">Performance</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddProject(true)}
              className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${themes[theme].card} rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${accentColor}-100 dark:bg-${accentColor}-900 rounded-xl flex items-center justify-center`}>
                  <Plus className={`w-5 h-5 text-${accentColor}-600`} />
                </div>
                <h3 className={`text-xl font-bold ${themes[theme].text}`}>Add New Project</h3>
              </div>
              <button 
                onClick={() => setShowAddProject(false)} 
                className={`${themes[theme].accent} hover:${themes[theme].text} p-2 rounded-lg transition`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="Enter project name"
                    className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 placeholder-gray-400`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                    Project URL *
                  </label>
                  <input
                    type="url"
                    value={newProject.url}
                    onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                    placeholder="https://your-project.com"
                    className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 placeholder-gray-400`}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                  Description *
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Describe your project features and functionality"
                  rows="3"
                  className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 placeholder-gray-400 resize-none`}
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                    Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500`}
                  >
                    <option value="Live">Live</option>
                    <option value="Beta">Beta</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>
                  Tech Stack
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-${accentColor}-100 dark:bg-${accentColor}-900 text-${accentColor}-600 dark:text-${accentColor}-400 rounded-full text-sm flex items-center space-x-2`}
                    >
                      <span>{tech}</span>
                      <button
                        onClick={() => handleRemoveTech(tech)}
                        className="hover:text-red-500 transition"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newProject.currentTech}
                      onChange={(e) => setNewProject({...newProject, currentTech: e.target.value})}
                      onKeyPress={handleKeyPress}
                      placeholder="Add technology (e.g., React, Node.js)"
                      className={`w-full ${themes[theme].card} border border-opacity-20 rounded-lg px-3 py-2 ${themes[theme].text} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 placeholder-gray-400`}
                      list="tech-suggestions"
                    />
                    <datalist id="tech-suggestions">
                      {techSuggestions.map((tech, index) => (
                        <option key={index} value={tech} />
                      ))}
                    </datalist>
                  </div>
                  <button
                    onClick={handleAddTech}
                    className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-4 py-2 rounded-lg transition`}
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {techSuggestions.slice(0, 8).map((tech) => (
                    <button
                      key={tech}
                      onClick={() => {
                        if (!newProject.techStack.includes(tech)) {
                          setNewProject({
                            ...newProject,
                            techStack: [...newProject.techStack, tech]
                          });
                        }
                      }}
                      className={`px-2 py-1 text-xs ${themes[theme].accent} hover:bg-${accentColor}-100 dark:hover:bg-${accentColor}-900 rounded border border-opacity-20 transition`}
                    >
                      + {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-opacity-20">
                <button
                  onClick={() => setShowAddProject(false)}
                  className={`px-6 py-2 ${themes[theme].accent} hover:${themes[theme].text} rounded-lg transition border border-opacity-20`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className={`px-6 py-2 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white rounded-lg transition flex items-center space-x-2`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${themes[theme].card} rounded-xl p-6 w-96 max-h-96 overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${themes[theme].text}`}>Customize Dashboard</h3>
              <button onClick={() => setShowSettings(false)} className={`${themes[theme].accent} hover:${themes[theme].text}`}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(themes).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`p-2 rounded-lg border-2 ${theme === t ? `border-${accentColor}-500` : 'border-transparent'} ${themes[t].bg} ${themes[t].text} capitalize transition`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${themes[theme].text} mb-2`}>Accent Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(accentColors).map(color => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-8 h-8 rounded-full bg-${color}-500 border-2 ${accentColor === color ? 'border-white' : 'border-transparent'} transition`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${themes[theme].text}`}>Compact Mode</span>
                <button
                  onClick={() => setCompactMode(!compactMode)}
                  className={`w-10 h-6 rounded-full ${compactMode ? `bg-${accentColor}-600` : 'bg-gray-300 dark:bg-gray-600'} relative transition`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${compactMode ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${themes[theme].text}`}>Show Statistics</span>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className={`w-10 h-6 rounded-full ${showStats ? `bg-${accentColor}-600` : 'bg-gray-300 dark:bg-gray-600'} relative transition`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${showStats ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Dashboard */}
      {showStats && (
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`${themes[theme].card} border border-opacity-20 rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${themes[theme].text}`}>{projects.length}</div>
                  <div className={`text-sm ${themes[theme].accent}`}>Total Projects</div>
                </div>
                <Globe className={`w-8 h-8 text-${accentColor}-500`} />
              </div>
            </div>
            <div className={`${themes[theme].card} border border-opacity-20 rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${themes[theme].text}`}>{projects.filter(p => p.status === "Live").length}</div>
                  <div className={`text-sm ${themes[theme].accent}`}>Live Projects</div>
                </div>
                <Shield className={`w-8 h-8 text-green-500`} />
              </div>
            </div>
            <div className={`${themes[theme].card} border border-opacity-20 rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${themes[theme].text}`}>{projects.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</div>
                  <div className={`text-sm ${themes[theme].accent}`}>Total Views</div>
                </div>
                <Eye className={`w-8 h-8 text-${accentColor}-500`} />
              </div>
            </div>
            <div className={`${themes[theme].card} border border-opacity-20 rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${themes[theme].text}`}>{Math.round(projects.reduce((sum, p) => sum + p.performance, 0) / projects.length)}%</div>
                  <div className={`text-sm ${themes[theme].accent}`}>Avg Performance</div>
                </div>
                <TrendingUp className={`w-8 h-8 text-green-500`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-6 pb-6">
        {viewMode === "grid" ? (
          <div className={`grid grid-cols-1 ${compactMode ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} compact={compactMode} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} compact={true} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-bold ${themes[theme].text} mb-2`}>No projects found</h3>
            <p className={`${themes[theme].accent} mb-4`}>Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => setShowAddProject(true)}
              className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-6 py-3 rounded-lg transition`}
            >
              Create New Project
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;