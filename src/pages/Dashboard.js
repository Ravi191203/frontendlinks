import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const links = [
    { 
      name: "Portfolio Website", 
      url: "https://rrgs-portfolio.vercel.app/",
      description: "Personal portfolio showcasing projects and skills",
      category: "Portfolio",
      status: "Live",
      lastUpdated: "2 days ago"
    },
    { 
      name: "Blog", 
      url: "https://your-blog-site.com",
      description: "Personal blog with articles and insights",
      category: "Blog",
      status: "Live",
      lastUpdated: "1 week ago"
    },
    { 
      name: "Code Storage Hub", 
      url: "https://comret.vercel.app/",
      description: "Central repository for code snippets and projects",
      category: "Development",
      status: "Live",
      lastUpdated: "3 days ago"
    },
    { 
      name: "File Manager App", 
      url: "https://filemanager-site.com",
      description: "Cloud-based file management system",
      category: "Tools",
      status: "Maintenance",
      lastUpdated: "5 days ago"
    },
  ];

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("https://backend-w3tr.onrender.com/api/auth/verify", {
      headers: { Authorization: token }
    })
    .then(res => setUser(res.data.user.username))
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Portfolio': return '👤';
      case 'Blog': return '📝';
      case 'Development': return '⚙️';
      case 'Tools': return '🛠️';
      default: return '🌐';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌐</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Project Dashboard</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Welcome back, {user} 👋</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16 flex-1">
        {/* Sidebar */}
        <aside className={`bg-white shadow-sm w-64 fixed left-0 top-16 bottom-0 transform transition-transform duration-300 ease-in-out z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="p-4">
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 border-r-2 border-blue-700">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
                </svg>
                <span className="font-medium">All Projects</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add Project</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Settings</span>
              </a>
            </nav>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{links.filter(l => l.status === 'Live').length}</div>
                  <div className="text-sm text-green-600">Live Projects</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{links.length}</div>
                  <div className="text-sm text-blue-600">Total Projects</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Hosted Projects</h2>
              <p className="text-gray-600">Manage and monitor your deployed websites and applications</p>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mb-6">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLinks.map((site, index) => {
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                            {getCategoryEmoji(site.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{site.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(site.status)}`}>
                              {site.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{site.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{site.category}</span>
                        <span>{site.lastUpdated}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => window.open(site.url, '_blank')}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Visit Site</span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLinks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search terms or add a new project.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 lg:ml-64">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 md:mb-0">
              © 2025 Project Dashboard. Manage your hosted projects efficiently.
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Add Project</a>
              <a href="#" className="hover:text-gray-900">Documentation</a>
              <a href="#" className="hover:text-gray-900">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;