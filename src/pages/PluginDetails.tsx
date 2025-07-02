import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Edit, Eye, Package, Calendar, User, Globe, Tag, Shield, Route, Settings, Code } from "lucide-react";
import { Plugin } from "@/types/plugin";

const PluginDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch plugin details
    const fetchPlugin = async () => {
      setLoading(true);
      // Mock data for demonstration
      const mockPlugin: Plugin = {
        id: parseInt(id || "1"),
        pluginId: "advanced-reports",
        name: "GarapaCRM Advanced Reports",
        slug: "advanced-reports",
        version: "2.1.0",
        description: "Plugin avançado para geração de relatórios personalizados com gráficos interativos, exportação para PDF e integração com APIs externas para análise de dados.",
        author: "GarapaCRM Team",
        homepage: "https://github.com/garapacrm/advanced-reports",
        
        category: "report",
        tags: ["relatórios", "gráficos", "pdf", "analytics", "dashboard"],
        icon: "BarChart3",
        iconUrl: "https://cdn.garapacrm.com/plugins/advanced-reports/icon.png",
        
        minimumCoreVersion: "3.18.0",
        dependencies: ["chart.js", "jspdf"],
        conflicts: ["basic-reports"],
        
        license: "premium",
        price: 299.00,
        currency: "BRL",
        
        features: [
          {
            id: "reports-dashboard",
            name: "Dashboard de Relatórios",
            description: "Interface principal para visualização de relatórios",
            type: "component",
            entryPoint: "components/ReportsDashboard"
          },
          {
            id: "chart-generator",
            name: "Gerador de Gráficos",
            description: "Ferramenta para criação de gráficos interativos",
            type: "service",
            entryPoint: "services/ChartService"
          }
        ],
        permissions: [
          {
            id: "reports.read",
            name: "Leitura de Relatórios",
            description: "Permite visualizar relatórios",
            type: "read",
            resource: "reports"
          },
          {
            id: "reports.create",
            name: "Criação de Relatórios",
            description: "Permite criar novos relatórios",
            type: "write",
            resource: "reports"
          }
        ],
        routes: [
          {
            path: "/reports",
            component: "ReportsDashboard",
            name: "reports.dashboard",
            meta: {
              requiresAuth: true,
              permissions: ["reports.read"],
              layout: "default"
            }
          }
        ],
        hooks: {
          onInstall: "hooks/onInstall",
          onActivate: "hooks/onActivate",
          onDeactivate: "hooks/onDeactivate"
        },
        settings: [
          {
            key: "defaultChartType",
            name: "Tipo de Gráfico Padrão",
            description: "Tipo de gráfico usado por padrão",
            type: "string",
            default: "bar",
            required: false,
            options: [
              { label: "Barras", value: "bar" },
              { label: "Linha", value: "line" },
              { label: "Pizza", value: "pie" }
            ]
          }
        ],
        
        downloads: 1247,
        rating: 4.8,
        status: "active",
        
        fileUrl: "https://cdn.garapacrm.com/plugins/advanced-reports/v2.1.0.zip",
        fileSize: 2457600, // 2.4MB
        
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2025-01-25T14:22:00Z"
      };
      
      setTimeout(() => {
        setPlugin(mockPlugin);
        setLoading(false);
      }, 500);
    };

    fetchPlugin();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 animate-pulse text-garapa-blue" />
          <p className="text-muted-foreground">Carregando plugin...</p>
        </div>
      </div>
    );
  }

  if (!plugin) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Plugin não encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/plugins")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-garapa-blue rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-garapa-blue-dark">{plugin.name}</h1>
              <p className="text-muted-foreground">v{plugin.version} • por {plugin.author}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate(`/plugins/edit/${plugin.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button className="bg-garapa-blue hover:bg-garapa-blue/90">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="permissions">Permissões</TabsTrigger>
              <TabsTrigger value="routes">Rotas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Plugin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{plugin.description}</p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                      <p className="text-2xl font-bold text-garapa-blue-dark">{plugin.downloads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avaliação</p>
                      <p className="text-2xl font-bold text-garapa-blue-dark">{plugin.rating} ⭐</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tamanho</p>
                      <p className="text-2xl font-bold text-garapa-blue-dark">
                        {(plugin.fileSize! / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant={plugin.status === "active" ? "default" : "secondary"}>
                        {plugin.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {plugin.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dependências</h4>
                    {plugin.dependencies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {plugin.dependencies.map((dep, index) => (
                          <Badge key={index} variant="secondary">
                            <Code className="w-3 h-3 mr-1" />
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma dependência</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Features do Plugin</CardTitle>
                  <CardDescription>
                    Funcionalidades oferecidas por este plugin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.features.map((feature, index) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{feature.name}</h4>
                        <Badge variant="outline">{feature.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                      <p className="text-xs text-muted-foreground">
                        <Code className="w-3 h-3 inline mr-1" />
                        {feature.entryPoint}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Permissões Necessárias</CardTitle>
                  <CardDescription>
                    Permissões que o plugin requer para funcionar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.permissions.map((permission, index) => (
                    <div key={permission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          {permission.name}
                        </h4>
                        <Badge variant="outline">{permission.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{permission.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Recurso: {permission.resource}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes">
              <Card>
                <CardHeader>
                  <CardTitle>Rotas do Plugin</CardTitle>
                  <CardDescription>
                    Rotas adicionadas pelo plugin ao sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.routes.map((route, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Route className="w-4 h-4" />
                          {route.path}
                        </h4>
                        <Badge variant="outline">{route.component}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Nome: </span>
                          <span className="text-muted-foreground">{route.name}</span>
                        </div>
                        <div>
                          <span className="font-medium">Auth: </span>
                          <span className="text-muted-foreground">
                            {route.meta.requiresAuth ? "Requerida" : "Não requerida"}
                          </span>
                        </div>
                      </div>
                      {route.meta.permissions.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Permissões: </span>
                          <div className="flex gap-1 mt-1">
                            {route.meta.permissions.map((perm, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Configurações personalizáveis do plugin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plugin.settings.map((setting, index) => (
                    <div key={setting.key} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          {setting.name}
                        </h4>
                        <div className="flex gap-2">
                          <Badge variant="outline">{setting.type}</Badge>
                          {setting.required && (
                            <Badge variant="destructive">Obrigatório</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{setting.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Chave: </span>
                          <span className="text-muted-foreground font-mono">{setting.key}</span>
                        </div>
                        <div>
                          <span className="font-medium">Padrão: </span>
                          <span className="text-muted-foreground">{String(setting.default)}</span>
                        </div>
                      </div>
                      {setting.options && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Opções: </span>
                          <div className="flex gap-1 mt-1">
                            {setting.options.map((option, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {option.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Autor: {plugin.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Criado: {new Date(plugin.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Atualizado: {new Date(plugin.updatedAt).toLocaleDateString()}</span>
              </div>
              {plugin.homepage && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={plugin.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-garapa-blue hover:underline"
                  >
                    Homepage
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compatibilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Core mínimo:</span>
                <p className="text-muted-foreground">{plugin.minimumCoreVersion}</p>
              </div>
              <div>
                <span className="font-medium">Categoria:</span>
                <p className="text-muted-foreground capitalize">{plugin.category}</p>
              </div>
              <div>
                <span className="font-medium">Licença:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={plugin.license === "premium" ? "destructive" : "secondary"}>
                    {plugin.license === "premium" ? "Premium" : "Gratuito"}
                  </Badge>
                  {plugin.license === "premium" && (
                    <span className="font-semibold text-garapa-blue-dark">
                      R$ {plugin.price?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PluginDetails;