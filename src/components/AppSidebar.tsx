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
import { useApiStatus } from "@/hooks/use-api-status";

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
    title: "Email",
    url: "/webmail",
    icon: "📧",
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
    title: "Métricas",
    url: "/metrics",
    icon: "📈",
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: "⚙️",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const { version } = useApiStatus();

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
      <SidebarContent className="p-4 h-full flex flex-col">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 w-full justify-center">
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
                    <NavLink
                      to={item.url}
                      className={
                        getNavClass(item.url) +
                        (collapsed
                          ? " h-12 w-12 flex items-center justify-center p-0"
                          : " h-10 w-full flex items-center gap-3 px-3 py-2")
                      }
                    >
                      <span className="text-lg flex items-center justify-center w-6 h-6 shrink-0">{item.icon}</span>
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Minimizado: mostrar só o logo e ícones, manter espaço para botão de minimizar/expandir se houver */}
        {!collapsed && (
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <div className="text-sidebar-foreground/50 text-xs text-center">
              <p>GarapaCRM Community</p>
              <p>v{version}</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
