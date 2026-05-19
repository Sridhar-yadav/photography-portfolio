import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  LayoutDashboard, 
  Image, 
  Video, 
  ShoppingBag, 
  MessageSquare, 
  LayoutTemplate,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolios', href: '/dashboard/portfolio', icon: Image },
  { name: 'Films', href: '/dashboard/films', icon: Video },
  { name: 'Store', href: '/dashboard/products', icon: ShoppingBag },
  { name: 'Inquiries', href: '/dashboard/inquiries', icon: MessageSquare },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
  { name: 'Homepage CMS', href: '/dashboard/homepage', icon: LayoutTemplate },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-textPrimary/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-textPrimary/10">
            <h1 className="font-display text-xl tracking-tight">Studio Admin</h1>
            <button className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm uppercase tracking-widest transition-colors ${
                    isActive 
                      ? 'bg-textPrimary text-background' 
                      : 'text-textSecondary hover:bg-textPrimary/5 hover:text-textPrimary'
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-textPrimary/10">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm uppercase tracking-widest text-textSecondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-textPrimary/10 flex items-center px-6 sticky top-0 z-30">
          <button 
            className="md:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="text-sm uppercase tracking-widest text-textSecondary">
            {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
