
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Key, Bell, Shield, CreditCard, Globe } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Geral
    siteName: "GarapaCRM Community",
    siteDescription: "Marketplace de plugins para GarapaCRM",
    adminEmail: "admin@garapacrm.com",
    
    // Mercado Pago
    mpAccessToken: "",
    mpWebhookUrl: "https://api.garapacrm.com/webhook/mercadopago",
    
    // Licenças
    licenseValidityDays: 365,
    licenseSigningKey: "your-secret-signing-key-here",
    
    // Notificações
    emailNotifications: true,
    salesNotifications: true,
    systemNotifications: false,
    
    // Segurança
    maxLoginAttempts: 5,
    sessionTimeout: 24, // horas
    requireTwoFactor: false,
  });

  const handleSave = (section: string) => {
    // Simular salvamento
    toast.success(`Configurações de ${section} salvas com sucesso!`);
  };

  const generateNewSigningKey = () => {
    const newKey = `garapa_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    setSettings(prev => ({ ...prev, licenseSigningKey: newKey }));
    toast.success("Nova chave de assinatura gerada!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-garapa-blue-dark">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Configure o sistema e integrações do marketplace
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Licenças
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-garapa-blue-dark">Configurações Gerais</CardTitle>
              <CardDescription>
                Informações básicas do marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">E-mail do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                />
              </div>

              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('gerais')}
                  className="bg-garapa-blue hover:bg-garapa-blue/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="text-garapa-blue-dark">Mercado Pago</CardTitle>
              <CardDescription>
                Configure a integração com Mercado Pago para processar pagamentos via Pix
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mpAccessToken">Access Token do Mercado Pago</Label>
                <Input
                  id="mpAccessToken"
                  type="password"
                  value={settings.mpAccessToken}
                  onChange={(e) => setSettings(prev => ({ ...prev, mpAccessToken: e.target.value }))}
                  placeholder="APP_USR-1234567890123456-..."
                />
                <p className="text-xs text-muted-foreground">
                  Obtenha seu token no <a href="https://www.mercadopago.com/developers" target="_blank" className="text-garapa-blue underline">painel do Mercado Pago</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mpWebhookUrl">URL do Webhook</Label>
                <Input
                  id="mpWebhookUrl"
                  value={settings.mpWebhookUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, mpWebhookUrl: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Configure esta URL no painel do Mercado Pago para receber notificações de pagamento
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔧 Configuração do Webhook</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>1. Acesse o painel do Mercado Pago</p>
                  <p>2. Vá em "Suas integrações" → "Webhooks"</p>
                  <p>3. Adicione a URL: <code className="bg-blue-100 px-1 rounded">{settings.mpWebhookUrl}</code></p>
                  <p>4. Selecione os eventos: "Pagamentos" e "Merchant Orders"</p>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('pagamentos')}
                  className="bg-garapa-blue hover:bg-garapa-blue/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses">
          <Card>
            <CardHeader>
              <CardTitle className="text-garapa-blue-dark">Sistema de Licenças</CardTitle>
              <CardDescription>
                Configure como as licenças são geradas e validadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseValidityDays">Validade das Licenças (dias)</Label>
                  <Input
                    id="licenseValidityDays"
                    type="number"
                    value={settings.licenseValidityDays}
                    onChange={(e) => setSettings(prev => ({ ...prev, licenseValidityDays: parseInt(e.target.value) }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Padrão: 365 dias (1 ano)
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseSigningKey">Chave de Assinatura</Label>
                <div className="flex gap-2">
                  <Input
                    id="licenseSigningKey"
                    type="password"
                    value={settings.licenseSigningKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    onClick={generateNewSigningKey}
                    type="button"
                  >
                    Gerar Nova
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Usada para assinar e validar tokens de licença. Mantenha em segredo!
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">⚠️ Importante</h4>
                <p className="text-sm text-amber-800">
                  Ao gerar uma nova chave de assinatura, todas as licenças existentes se tornarão inválidas. 
                  Faça isso apenas se necessário e com cuidado.
                </p>
              </div>

              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('licenças')}
                  className="bg-garapa-blue hover:bg-garapa-blue/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-garapa-blue-dark">Notificações</CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Vendas</Label>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado sobre novas vendas e pagamentos
                    </p>
                  </div>
                  <Switch
                    checked={settings.salesNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, salesNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações do Sistema</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas sobre atualizações e manutenções
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, systemNotifications: checked }))}
                  />
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('notificações')}
                  className="bg-garapa-blue hover:bg-garapa-blue/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-garapa-blue-dark">Segurança</CardTitle>
              <CardDescription>
                Configure as políticas de segurança do painel administrativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (horas)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança ao login
                  </p>
                </div>
                <Switch
                  checked={settings.requireTwoFactor}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireTwoFactor: checked }))}
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">🔒 Recomendações de Segurança</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Use senhas fortes com pelo menos 12 caracteres</li>
                  <li>• Habilite autenticação de dois fatores</li>
                  <li>• Mantenha as chaves de API em segredo</li>
                  <li>• Monitore os logs de acesso regularmente</li>
                </ul>
              </div>

              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('segurança')}
                  className="bg-garapa-blue hover:bg-garapa-blue/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
