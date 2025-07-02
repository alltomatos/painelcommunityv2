import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, Download, Package, Calendar, User, BarChart3, Star, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Plugin } from "@/types/plugin";

const Plugins = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Updated mock data with new Plugin interface
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: 1,
      pluginId: "advanced-reports",
      name: "GarapaCRM Advanced Reports",
      slug: "advanced-reports",
      version: "2.1.0",
      description: "Relatórios avançados com gráficos interativos, exportação para PDF e análise de dados em tempo real",
      author: "GarapaCRM Team",
      homepage: "https://github.com/garapacrm/advanced-reports",
      category: "report",
      tags: ["relatórios", "gráficos", "pdf", "analytics"],
      icon: "BarChart3",
      minimumCoreVersion: "3.18.0",
      dependencies: [],
      conflicts: [],
      license: "premium",
      price: 299.00,
      currency: "BRL",
      features: [],
      permissions: [],
      routes: [],
      hooks: {},
      settings: [],
      downloads: 1247,
      rating: 4.8,
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2025-01-25T14:22:00Z"
    },
    {
      id: 2,
      pluginId: "integration-pack",
      name: "GarapaCRM Integration Pack",
      slug: "integration-pack",
      version: "1.5.2",
      description: "Pacote completo de integrações com APIs externas, webhooks e sincronização de dados",
      author: "TechFlow Solutions",
      homepage: "https://techflow.com/integration-pack",
      category: "integration",
      tags: ["api", "webhook", "integração", "sync"],
      icon: "Package",
      minimumCoreVersion: "3.16.0",
      dependencies: ["axios"],
      conflicts: [],
      license: "premium",
      price: 149.00,
      currency: "BRL",
      features: [],
      permissions: [],
      routes: [],
      hooks: {},
      settings: [],
      downloads: 892,
      rating: 4.5,
      status: "active",
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2025-01-20T11:45:00Z"
    },
    {
      id: 3,
      pluginId: "theme-dark",
      name: "GarapaCRM Dark Theme",
      slug: "theme-dark",
      version: "1.2.1",
      description: "Tema escuro elegante e moderno para o GarapaCRM com suporte a customização de cores",
      author: "DesignPro",
      category: "theme",
      tags: ["tema", "dark", "ui", "design"],
      icon: "Eye",
      minimumCoreVersion: "3.15.0",
      dependencies: [],
      conflicts: ["light-theme"],
      license: "free",
      currency: "BRL",
      features: [],
      permissions: [],
      routes: [],
      hooks: {},
      settings: [],
      downloads: 2156,
      rating: 4.9,
      status: "active",
      createdAt: "2024-01-05T14:20:00Z",
      updatedAt: "2025-01-18T16:30:00Z"
    },
    {
      id: 4,
      pluginId: "mobile-companion",
      name: "Mobile Companion",
      slug: "mobile-companion",
      version: "0.9.8",
      description: "Aplicativo mobile nativo para Android e iOS com sincronização em tempo real",
      author: "MobileDev Inc",
      category: "tool",
      tags: ["mobile", "app", "android", "ios"],
      icon: "User",
      minimumCoreVersion: "3.19.0",
      dependencies: ["react-native"],
      conflicts: [],
      license: "premium",
      price: 399.00,
      currency: "BRL",
      features: [],
      permissions: [],
      routes: [],
      hooks: {},
      settings: [],
      downloads: 234,
      rating: 4.2,
      status: "inactive",
      createdAt: "2024-01-20T08:45:00Z",
      updatedAt: "2025-01-15T13:22:00Z"
    },
  ]);

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || plugin.license === filterType;
    const matchesCategory = filterCategory === "all" || plugin.category === filterCategory;
    const matchesStatus = filterStatus === "all" || plugin.status === filterStatus;
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const handleDelete = (id: number) => {
    setPlugins(plugins.filter(p => p.id !== id));
    toast.success("Plugin removido com sucesso!");
  };

  const toggleStatus = (id: number) => {
    setPlugins(plugins.map(p => 
      p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
    ));
    toast.success("Status do plugin atualizado!");
  };

  const handleViewDetails = (plugin: Plugin) => {
    navigate(`/plugins/${plugin.id}`);
  };

  const handleEdit = (plugin: Plugin) => {
    navigate(`/plugins/edit/${plugin.id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Plugins</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os plugins do marketplace GarapaCRM Community
          </p>
        </div>
        <Button 
          className="bg-garapa-blue hover:bg-garapa-blue/90"
          onClick={() => navigate("/plugins/new")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Plugin
        </Button>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de licença" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="free">Gratuitos</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                <SelectItem value="extension">Extensão</SelectItem>
                <SelectItem value="integration">Integração</SelectItem>
                <SelectItem value="theme">Tema</SelectItem>
                <SelectItem value="report">Relatório</SelectItem>
                <SelectItem value="tool">Ferramenta</SelectItem>
                <SelectItem value="widget">Widget</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Plugins Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <Card key={plugin.id} className="card-hover group cursor-pointer" onClick={() => handleViewDetails(plugin)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-garapa-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-garapa-blue-dark group-hover:text-garapa-blue transition-colors truncate">
                      {plugin.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {plugin.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={plugin.status === "active" ? "default" : "secondary"} className="ml-2">
                  {plugin.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span className="truncate">{plugin.author}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>v{plugin.version}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={plugin.license === "premium" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {plugin.license === "premium" ? "Premium" : "Gratuito"}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {plugin.category}
                  </Badge>
                </div>
                {plugin.license === "premium" && (
                  <span className="font-semibold text-garapa-blue-dark text-sm">
                    R$ {plugin.price?.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{plugin.downloads.toLocaleString()} downloads</span>
                </div>
                {plugin.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{plugin.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                {plugin.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {plugin.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{plugin.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="pt-2 border-t flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(plugin);
                  }}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(plugin);
                  }}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(plugin.id);
                  }}
                  className="flex-1"
                >
                  {plugin.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(plugin.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum plugin encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos plugins que correspondam aos seus filtros.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterCategory("all");
                  setFilterStatus("all");
                }}
              >
                Limpar Filtros
              </Button>
              <Button 
                className="bg-garapa-blue hover:bg-garapa-blue/90"
                onClick={() => navigate("/plugins/new")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Plugin
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {plugins.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-garapa-blue-dark">{plugins.length}</p>
                <p className="text-sm text-muted-foreground">Total de Plugins</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-garapa-blue-dark">
                  {plugins.filter(p => p.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Plugins Ativos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-garapa-blue-dark">
                  {plugins.reduce((acc, p) => acc + p.downloads, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total de Downloads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-garapa-blue-dark">
                  {plugins.filter(p => p.license === "premium").length}
                </p>
                <p className="text-sm text-muted-foreground">Plugins Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Plugins;