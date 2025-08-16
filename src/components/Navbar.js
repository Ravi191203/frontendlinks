import { useState, useEffect } from "react";
import { Menu, X, User, LogIn, UserPlus, Layout, Home, Zap, Moon, Sun, Monitor, ChevronDown, Bell, Settings } from "lucide-react";

function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("blue");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock user state - replace with actual auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "Alex Rivera", avatar: "AR" });

  const themes = {
    dark: { 
      bg: "bg-slate-900/95", 
      card: "bg-slate-800", 
      text: "text-white", 
      accent: "text-slate-300",
      border: "border-slate-700"
    },
    light: { 
      bg: "bg-white/95", 
      card: "bg-gray-50", 
      text: "text-gray-900", 
      accent: "text-gray-600",
      border: "border-gray-200"
    },
    midnight: { 
      bg: "bg-black/95", 
      card: "bg-gray-900", 
      text: "text-white", 
      accent: "text-gray-400",
      border: "border-gray-800"
    }
  };

  const notifications = [
    { id: 1, title: "Project Deployed", message: "Neural Dashboard is now live", time: "2m ago", type: "success" },
    { id: 2, title: "Performance Alert", message: "CloudSync Pro experiencing high load", time: "15m ago", type: "warning" },
    { id: 3, title: "New Comment", message: "Someone commented on your project", time: "1h ago", type: "info" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
      if (!event.target.closest('.notifications-menu')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const themeOptions = Object.keys(themes);
    const currentIndex = themeOptions.indexOf(theme);
    const nextTheme = themeOptions[(currentIndex + 1) % themeOptions.length];
    setTheme(nextTheme);
  };

  const NavLink = ({ to, children, icon: Icon, mobile = false }) => (
    <a
      href={to}
      className={`
        ${mobile ? 'block px-4 py-3 text-base' : 'px-4 py-2 text-sm'} 
        ${themes[theme].text} hover:text-${accentColor}-400 
        font-medium transition-all duration-200 
        hover:bg-${accentColor}-500/10 rounded-lg
        flex items-center space-x-2 group
      `}
      onClick={() => setIsMenuOpen(false)}
    >
      {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
      <span>{children}</span>
    </a>
  );

  const NotificationBadge = ({ count }) => (
    count > 0 && (
      <span className={`absolute -top-1 -right-1 w-5 h-5 bg-${accentColor}-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse`}>
        {count > 9 ? '9+' : count}
      </span>
    )
  );

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${themes[theme].bg} backdrop-blur-md
      ${isScrolled ? 'shadow-lg border-b ' + themes[theme].border : ''}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <a href="/" className={`text-xl font-bold ${themes[theme].text} hover:text-${accentColor}-400 transition-colors`}>
              <span className="bg-gradient-to-r from-${accentColor}-400 to-${accentColor}-600 bg-clip-text text-transparent">
                rrgs_dev_
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={Home}>Home</NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink to="/register" icon={UserPlus}>Register</NavLink>
                <NavLink to="/login" icon={LogIn}>Login</NavLink>
              </>
            ) : (
              <NavLink to="/dashboard" icon={Layout}>Dashboard</NavLink>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2 ${themes[theme].text} hover:text-${accentColor}-400 hover:bg-${accentColor}-500/10 rounded-lg transition-all duration-200 hover:scale-105`}
              title={`Switch to ${Object.keys(themes)[(Object.keys(themes).indexOf(theme) + 1) % Object.keys(themes).length]} theme`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : 
               theme === 'dark' ? <Sun className="w-5 h-5" /> : 
               <Monitor className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative notifications-menu">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 ${themes[theme].text} hover:text-${accentColor}-400 hover:bg-${accentColor}-500/10 rounded-lg transition-all duration-200`}
                  >
                    <Bell className="w-5 h-5" />
                    <NotificationBadge count={notifications.length} />
                  </button>

                  {showNotifications && (
                    <div className={`absolute right-0 mt-2 w-80 ${themes[theme].card} rounded-xl shadow-xl border ${themes[theme].border} py-2 max-h-96 overflow-y-auto`}>
                      <div className={`px-4 py-2 border-b ${themes[theme].border}`}>
                        <h3 className={`font-semibold ${themes[theme].text}`}>Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-${accentColor}-500/5 transition-colors`}>
                          <div className={`font-medium ${themes[theme].text}`}>{notification.title}</div>
                          <div className={`text-sm ${themes[theme].accent} mt-1`}>{notification.message}</div>
                          <div className={`text-xs ${themes[theme].accent} mt-1`}>{notification.time}</div>
                        </div>
                      ))}
                      <div className={`px-4 py-2 border-t ${themes[theme].border}`}>
                        <button className={`text-sm text-${accentColor}-500 hover:text-${accentColor}-400 transition-colors`}>
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Menu */}
                <div className="relative profile-menu">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center space-x-2 p-1.5 rounded-lg hover:bg-${accentColor}-500/10 transition-colors`}
                  >
                    <div className={`w-8 h-8 bg-${accentColor}-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
                      {user.avatar}
                    </div>
                    <ChevronDown className={`w-4 h-4 ${themes[theme].text} transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className={`absolute right-0 mt-2 w-56 ${themes[theme].card} rounded-xl shadow-xl border ${themes[theme].border} py-2`}>
                      <div className={`px-4 py-3 border-b ${themes[theme].border}`}>
                        <div className={`font-medium ${themes[theme].text}`}>{user.name}</div>
                        <div className={`text-sm ${themes[theme].accent}`}>alex@example.com</div>
                      </div>
                      <div className="py-1">
                        <a href="/profile" className={`block px-4 py-2 text-sm ${themes[theme].text} hover:bg-${accentColor}-500/10 transition-colors`}>
                          Profile Settings
                        </a>
                        <a href="/dashboard" className={`block px-4 py-2 text-sm ${themes[theme].text} hover:bg-${accentColor}-500/10 transition-colors`}>
                          Dashboard
                        </a>
                        <a href="/settings" className={`block px-4 py-2 text-sm ${themes[theme].text} hover:bg-${accentColor}-500/10 transition-colors`}>
                          Settings
                        </a>
                      </div>
                      <div className={`border-t ${themes[theme].border} pt-1`}>
                        <button 
                          onClick={() => setIsAuthenticated(false)}
                          className={`block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors`}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className={`px-4 py-2 text-sm font-medium ${themes[theme].text} hover:text-${accentColor}-400 transition-colors`}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className={`px-4 py-2 text-sm font-medium bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Get Started
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 ${themes[theme].text} hover:text-${accentColor}-400 transition-colors`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${themes[theme].text} hover:text-${accentColor}-400 transition-colors`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}
        `}>
          <div className={`pt-4 space-y-1 border-t ${themes[theme].border}`}>
            <NavLink to="/" icon={Home} mobile>Home</NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" icon={Layout} mobile>Dashboard</NavLink>
                <NavLink to="/profile" icon={User} mobile>Profile</NavLink>
                <NavLink to="/settings" icon={Settings} mobile>Settings</NavLink>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 transition-colors rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/register" icon={UserPlus} mobile>Register</NavLink>
                <NavLink to="/login" icon={LogIn} mobile>Login</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;