import { Outlet, Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get the path segments for breadcrumbs
  const pathSegments = currentPath.split('/').filter(segment => segment);
  
  // Create breadcrumbs
  const generateBreadcrumbs = () => {
    let path = '';
    return (
      <div className="flex gap-2 text-sm text-muted-foreground mb-6 px-4 py-2">
        {pathSegments.map((segment, index) => {
          path += `/${segment}`;
          
          // Format segment for display
          const displaySegment = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          return (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">&gt;</span>}
              <Link 
                to={path} 
                className={cn(
                  "hover:text-primary",
                  index === pathSegments.length - 1 ? "font-semibold text-primary" : ""
                )}
              >
                {displaySegment}
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationMenu className="py-4 max-w-full overflow-x-auto">
            <NavigationMenuList className="flex space-x-8">
              <NavigationMenuItem>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath === "/dashboard" && "bg-secondary text-primary"
                  )}
                >
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/study-activities" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath.startsWith("/study-activities") && "bg-secondary text-primary"
                  )}
                >
                  Study Activities
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/words" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath.startsWith("/words") && "bg-secondary text-primary"
                  )}
                >
                  Words
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/word-groups" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath.startsWith("/word-groups") && "bg-secondary text-primary"
                  )}
                >
                  Word Groups
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/sessions" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath === "/sessions" && "bg-secondary text-primary"
                  )}
                >
                  Sessions
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/settings" 
                  className={cn(
                    "text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium",
                    currentPath === "/settings" && "bg-secondary text-primary"
                  )}
                >
                  Settings
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto pt-4">
        {generateBreadcrumbs()}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
