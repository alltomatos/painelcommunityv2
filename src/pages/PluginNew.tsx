import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Plus, X, Info } from "lucide-react";
import { toast } from "sonner";
import { PluginFormData, PluginFeature, PluginPermission, PluginRoute, PluginSetting } from "@/types/plugin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  slug: z.string().min(2, "Slug obrigatório"),
  version: z.string().min(1, "Versão obrigatória"),
  description: z.string().min(5, "Descrição obrigatória"),
  author: z.string().min(2, "Autor obrigatório"),
  license: z.enum(["free", "premium"]),
  price: z.string().optional(),
  file: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

const PluginNew = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<PluginFormData>({
    pluginId: "",
    name: "",
    slug: "",
    version: "1.0.0",
    description: "",
    author: "",
    homepage: "",
    
    category: "extension",
    tags: [],
    icon: "Package",
    iconUrl: "",
    
    minimumCoreVersion: "3.18.0",
    dependencies: [],
    conflicts: [],
    
    license: "free",
    price: "",
    currency: "BRL",
    
    features: [],
    permissions: [],
    routes: [],
    hooks: {},
    settings: [],
  });
  
  const [newTag, setNewTag] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleInputChange = (field: keyof PluginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from name
    if (field === "name" && value) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
    
    // Auto-generate pluginId from slug
    if (field === "slug" && value) {
      setFormData(prev => ({ ...prev, pluginId: value }));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/zip" && !file.name.endsWith('.zip')) {
        toast.error("Por favor, selecione um arquivo .zip válido");
        return;
      }
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addFeature = () => {
    const newFeature: PluginFeature = {
      id: `feature-${Date.now()}`,
      name: "",
      description: "",
      type: "component",
      entryPoint: ""
    };
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
  };

  const updateFeature = (index: number, field: keyof PluginFeature, value: any) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const onSubmit = (data: FormData) => {
    // Simula cadastro (mock)
    setTimeout(() => {
      navigate("/plugins");
    }, 800);
  };

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
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Novo Plugin</h1>
          <p className="text-muted-foreground mt-1">
            Adicione um novo plugin ao marketplace GarapaCRM
          </p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="file">Arquivo</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina as informações essenciais do plugin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Plugin *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: GarapaCRM Advanced Reports"
                    {...register("name")}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="advanced-reports"
                    {...register("slug")}
                  />
                  {errors.slug && <span className="text-xs text-red-500">{errors.slug.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="version">Versão *</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => handleInputChange("version", e.target.value)}
                    placeholder="1.0.0"
                    {...register("version")}
                  />
                  {errors.version && <span className="text-xs text-red-500">{errors.version.message}</span>}
                </div>
                <div>
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Seu Nome"
                    {...register("author")}
                  />
                  {errors.author && <span className="text-xs text-red-500">{errors.author.message}</span>}
                </div>
                <div>
                  <Label htmlFor="homepage">Homepage</Label>
                  <Input
                    id="homepage"
                    value={formData.homepage}
                    onChange={(e) => handleInputChange("homepage", e.target.value)}
                    placeholder="https://github.com/user/plugin"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva as funcionalidades do plugin..."
                  rows={3}
                  {...register("description")}
                />
                {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes e Categorização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value: any) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extension">Extensão</SelectItem>
                      <SelectItem value="integration">Integração</SelectItem>
                      <SelectItem value="theme">Tema</SelectItem>
                      <SelectItem value="report">Relatório</SelectItem>
                      <SelectItem value="tool">Ferramenta</SelectItem>
                      <SelectItem value="widget">Widget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="icon">Ícone (Lucide)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                    placeholder="Package"
                  />
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license">Tipo de Licença</Label>
                  <Select value={formData.license} onValueChange={(value: any) => handleInputChange("license", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratuito</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.license === "premium" && (
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="299.00"
                      {...register("price")}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="minimumCoreVersion">Versão Mínima do Core</Label>
                <Input
                  id="minimumCoreVersion"
                  value={formData.minimumCoreVersion}
                  onChange={(e) => handleInputChange("minimumCoreVersion", e.target.value)}
                  placeholder="3.18.0"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features do Plugin</CardTitle>
              <CardDescription>
                Defina as funcionalidades que o plugin oferece
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={addFeature} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Feature
              </Button>

              {formData.features.map((feature, index) => (
                <Card key={feature.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Feature #{index + 1}</CardTitle>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Nome</Label>
                        <Input
                          value={feature.name}
                          onChange={(e) => updateFeature(index, "name", e.target.value)}
                          placeholder="Nome da feature"
                        />
                      </div>
                      <div>
                        <Label>Tipo</Label>
                        <Select 
                          value={feature.type} 
                          onValueChange={(value: any) => updateFeature(index, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="component">Componente</SelectItem>
                            <SelectItem value="service">Serviço</SelectItem>
                            <SelectItem value="hook">Hook</SelectItem>
                            <SelectItem value="route">Rota</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(index, "description", e.target.value)}
                        placeholder="Descreva a feature..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Entry Point</Label>
                      <Input
                        value={feature.entryPoint}
                        onChange={(e) => updateFeature(index, "entryPoint", e.target.value)}
                        placeholder="components/MainPage"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Plugin</CardTitle>
              <CardDescription>
                Defina configurações que podem ser personalizadas pelos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Configurações personalizáveis serão implementadas em uma próxima versão</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Upload do Plugin</CardTitle>
              <CardDescription>
                Envie o arquivo .zip contendo o código do plugin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                {selectedFile ? (
                  <div>
                    <p className="text-lg font-medium text-garapa-blue-dark">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">Arraste o arquivo .zip aqui</p>
                    <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  {selectedFile ? "Trocar Arquivo" : "Selecionar Arquivo"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Estrutura requerida do arquivo:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• plugin.json (manifesto obrigatório)</li>
                  <li>• index.ts (entry point principal)</li>
                  <li>• components/ (componentes React)</li>
                  <li>• services/ (lógica de negócio)</li>
                  <li>• README.md (documentação)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => navigate("/plugins")}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-garapa-blue hover:bg-garapa-blue/90" disabled={isSubmitting}>
          Criar Plugin
        </Button>
      </div>
    </div>
  );
};

export default PluginNew;