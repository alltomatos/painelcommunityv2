import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Plugins from "./pages/Plugins";
import PluginNew from "./pages/PluginNew";
import PluginDetails from "./pages/PluginDetails";
import Sales from "./pages/Sales";
import Licenses from "./pages/Licenses";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ApiDocs from "./pages/ApiDocs";
import { useEffect } from "react";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem("auth") === "true";
  const navigate = window.location;
  useEffect(() => {
    if (!isAuth) {
      window.location.href = "/login";
    }
  }, [isAuth]);
  return isAuth ? <>{children}</> : null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/plugins" element={<Plugins />} />
                    <Route path="/plugins/new" element={<PluginNew />} />
                    <Route path="/plugins/:id" element={<PluginDetails />} />
                    <Route path="/plugins/edit/:id" element={<PluginNew />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/licenses" element={<Licenses />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/apidocs" element={<ApiDocs />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
