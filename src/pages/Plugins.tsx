
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, Download, Upload } from "lucide-react";
import { toast } from "sonner";

interface Plugin {
  id: number;
  name: string;
  slug: string;
  type: 'free' | 'premium';
  price?: number;
  description: string;
  downloads: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const Plugins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlugin, setEditingPlugin] = useState<Plugin | null>(null);

  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: 1,
      name: "GarapaCRM Advanced Reports",
      slug: "advanced-reports",
      type: "premium",
      price: 299.00,
      description: "Relatórios avançados com gráficos e exportação para PDF",
      downloads: 245,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "GarapaCRM Integration Pack",
      slug: "integration-pack",
      type: "premium",
      price: 149.00,
      description: "Integração com APIs externas e webhooks",
      downloads: 182,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "GarapaCRM Theme Dark",
      slug: "theme-dark",
      type: "free",
      description: "Tema escuro para o GarapaCRM",
      downloads: 1203,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      name: "GarapaCRM Mobile App",
      slug: "mobile-app",
      type: "premium",
      price: 399.00,
      description: "Aplicativo mobile nativo para Android e iOS",
      downloads: 89,
      status: "inactive",
      createdAt: "2024-01-20",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "free" as "free" | "premium",
    price: "",
    description: "",
  });

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || plugin.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.slug || !formData.description) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newPlugin: Plugin = {
      id: editingPlugin ? editingPlugin.id : plugins.length + 1,
      name: formData.name,
      slug: formData.slug,
      type: formData.type,
      price: formData.type === "premium" ? parseFloat(formData.price) : undefined,
      description: formData.description,
      downloads: editingPlugin ? editingPlugin.downloads : 0,
      status: "active",
      createdAt: editingPlugin ? editingPlugin.createdAt : new Date().toISOString().split('T')[0],
    };

    if (editingPlugin) {
      setPlugins(plugins.map(p => p.id === editingPlugin.id ? newPlugin : p));
      toast.success("Plugin atualizado com sucesso!");
    } else {
      setPlugins([...plugins, newPlugin]);
      toast.success("Plugin criado com sucesso!");
    }

    setIsDialogOpen(false);
    setEditingPlugin(null);
    setFormData({ name: "", slug: "", type: "free", price: "", description: "" });
  };

  const handleEdit = (plugin: Plugin) => {
    setEditingPlugin(plugin);
    setFormData({
      name: plugin.name,
      slug: plugin.slug,
      type: plugin.type,
      price: plugin.price?.toString() || "",
      description: plugin.description,
    });
    setIsDialogOpen(true);
  };

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Plugins</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os plugins do marketplace GarapaCRM
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-garapa-blue hover:bg-garapa-blue/90"
              onClick={() => {
                setEditingPlugin(null);
                setFormData({ name: "", slug: "", type: "free", price: "", description: "" });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Plugin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPlugin ? "Editar Plugin" : "Novo Plugin"}
              </DialogTitle>
              <DialogDescription>
                {editingPlugin ? "Atualize as informações do plugin" : "Adicione um novo plugin ao marketplace"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Plugin *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: GarapaCRM Advanced Reports"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Ex: advanced-reports"
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: "free" | "premium") => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Gratuito</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.type === "premium" && (
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="299.00"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva as funcionalidades do plugin..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-garapa-blue hover:bg-garapa-blue/90">
                  {editingPlugin ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="free">Gratuitos</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <Card key={plugin.id} className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-garapa-blue-dark">{plugin.name}</CardTitle>
                  <CardDescription className="mt-1">{plugin.description}</CardDescription>
                </div>
                <Badge variant={plugin.status === "active" ? "default" : "secondary"}>
                  {plugin.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant={plugin.type === "premium" ? "destructive" : "secondary"}>
                      {plugin.type === "premium" ? "Premium" : "Gratuito"}
                    </Badge>
                    {plugin.type === "premium" && (
                      <span className="font-semibold text-garapa-blue-dark">
                        R$ {plugin.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>{plugin.downloads} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(plugin)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(plugin.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {plugin.status === "active" ? "Desativar" : "Ativar"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(plugin.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Nenhum plugin encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Plugins;
