import { useState } from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ApiStatusIndicator } from "@/components/ApiStatusIndicator";
import { useApiStatus } from "@/hooks/use-api-status";

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutInner({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const { api, redis, rabbitmq, loading } = useApiStatus();
  const getColor = (online: boolean) =>
    loading ? "bg-yellow-500" : online ? "bg-green-500" : "bg-red-500";
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1 flex items-center gap-6">
            <h1 className="text-xl font-semibold text-garapa-blue-dark">GCA</h1>
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-700">API</span>
                <span className={`w-2 h-2 rounded-full inline-block ${getColor(api)}`} title="API" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-700">Redis</span>
                <span className={`w-2 h-2 rounded-full inline-block ${getColor(redis)}`} title="Redis" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-700">RabbitMQ</span>
                <span className={`w-2 h-2 rounded-full inline-block ${getColor(rabbitmq)}`} title="RabbitMQ" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-700">MongoDB</span>
                <span className="w-2 h-2 rounded-full inline-block bg-red-500" title="MongoDB" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-garapa-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function Layout(props: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutInner {...props} />
    </SidebarProvider>
  );
}
