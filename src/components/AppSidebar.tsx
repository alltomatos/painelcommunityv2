
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: "📊",
  },
  {
    title: "Plugins",
    url: "/plugins",
    icon: "🔌",
  },
  {
    title: "Vendas",
    url: "/sales",
    icon: "💰",
  },
  {
    title: "Licenças",
    url: "/licenses",
    icon: "🔑",
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: "⚙️",
  },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClass = (path: string) => {
    const baseClass = "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    return isActive(path)
      ? `${baseClass} bg-sidebar-accent text-sidebar-accent-foreground shadow-sm`
      : `${baseClass} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`;
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar`}>
      <SidebarContent className="p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">G</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sidebar-foreground font-bold text-lg">GarapaCRM</h2>
                <p className="text-sidebar-foreground/70 text-xs">Community Admin</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
            {!collapsed && "Navegação"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <span className="text-lg">{item.icon}</span>
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <div className="text-sidebar-foreground/50 text-xs text-center">
              <p>GarapaCRM Community</p>
              <p>v1.0.0</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
