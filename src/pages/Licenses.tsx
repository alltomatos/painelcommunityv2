
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Key, Calendar, CheckCircle, XCircle, RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

interface License {
  id: number;
  pluginName: string;
  token: string;
  userIdentifier: string;
  status: 'active' | 'expired' | 'revoked';
  createdAt: string;
  expiresAt: string;
  lastUsed?: string;
}

const Licenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const [licenses, setLicenses] = useState<License[]>([
    {
      id: 1,
      pluginName: "GarapaCRM Advanced Reports",
      token: "GARAP-ADV-REP-2024-001-XyZ9mN",
      userIdentifier: "empresa@exemplo.com",
      status: "active",
      createdAt: "2024-01-15T14:32:00",
      expiresAt: "2025-01-15T14:32:00",
      lastUsed: "2024-01-20T10:15:00",
    },
    {
      id: 2,
      pluginName: "GarapaCRM Mobile App",
      token: "GARAP-MOB-APP-2024-003-Abc1kL",
      userIdentifier: "admin@empresa.com.br",
      status: "active",
      createdAt: "2024-01-14T16:45:00",
      expiresAt: "2025-01-14T16:45:00",
      lastUsed: "2024-01-22T08:30:00",
    },
    {
      id: 3,
      pluginName: "GarapaCRM Integration Pack",
      token: "GARAP-INT-PAK-2023-156-Def3mQ",
      userIdentifier: "dev@startup.com",
      status: "expired",
      createdAt: "2023-12-01T12:00:00",
      expiresAt: "2024-01-01T12:00:00",
      lastUsed: "2023-12-28T14:20:00",
    },
    {
      id: 4,
      pluginName: "GarapaCRM Advanced Reports",
      token: "GARAP-ADV-REP-2024-002-GhI7nP",
      userIdentifier: "teste@email.com",
      status: "revoked",
      createdAt: "2024-01-10T09:20:00",
      expiresAt: "2025-01-10T09:20:00",
    },
  ]);

  const stats = [
    {
      title: "Licenças Ativas",
      value: licenses.filter(l => l.status === 'active').length.toString(),
      change: "+8",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Expiradas",
      value: licenses.filter(l => l.status === 'expired').length.toString(),
      change: "+2",
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      title: "Revogadas",
      value: licenses.filter(l => l.status === 'revoked').length.toString(),
      change: "+1",
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Total",
      value: licenses.length.toString(),
      change: "+11",
      icon: Key,
      color: "bg-blue-500",
    },
  ];

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch = license.pluginName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.userIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.token.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || license.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: License['status']) => {
    const variants = {
      active: { label: "Ativa", color: "bg-green-100 text-green-800" },
      expired: { label: "Expirada", color: "bg-yellow-100 text-yellow-800" },
      revoked: { label: "Revogada", color: "bg-red-100 text-red-800" },
    };
    
    const config = variants[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Token copiado para a área de transferência!");
  };

  const revokeLicense = (licenseId: number) => {
    setLicenses(licenses.map(license => 
      license.id === licenseId 
        ? { ...license, status: 'revoked' as const }
        : license
    ));
    toast.success("Licença revogada com sucesso!");
  };

  const renewLicense = (licenseId: number) => {
    const currentDate = new Date();
    const newExpiryDate = new Date(currentDate);
    newExpiryDate.setFullYear(currentDate.getFullYear() + 1);
    
    setLicenses(licenses.map(license => 
      license.id === licenseId 
        ? { 
            ...license, 
            status: 'active' as const,
            expiresAt: newExpiryDate.toISOString()
          }
        : license
    ));
    toast.success("Licença renovada por mais 1 ano!");
  };

  const isExpiringSoon = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Licenças</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as licenças de plugins premium
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-garapa-gray">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-garapa-blue-dark">
                {stat.value}
              </div>
              <p className="text-xs text-garapa-success">
                {stat.change} este mês
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expiring Soon Alert */}
      {licenses.some(l => l.status === 'active' && isExpiringSoon(l.expiresAt)) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">
                Atenção: {licenses.filter(l => l.status === 'active' && isExpiringSoon(l.expiresAt)).length} licença(s) expiram em menos de 30 dias
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar licenças..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="expired">Expiradas</SelectItem>
                <SelectItem value="revoked">Revogadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Licenses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-garapa-blue-dark">Lista de Licenças</CardTitle>
          <CardDescription>
            Todas as licenças geradas para plugins premium
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expira em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">{license.pluginName}</TableCell>
                  <TableCell>{license.userIdentifier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {license.token.substring(0, 20)}...
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(license.token)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(license.status)}
                      {license.status === 'active' && isExpiringSoon(license.expiresAt) && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Expira em breve
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(license.expiresAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedLicense(license)}
                          >
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes da Licença #{license.id}</DialogTitle>
                            <DialogDescription>
                              Informações completas da licença
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLicense && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Plugin</label>
                                  <p className="text-sm font-semibold">{selectedLicense.pluginName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Usuário</label>
                                  <p className="text-sm">{selectedLicense.userIdentifier}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedLicense.status)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Criada em</label>
                                  <p className="text-sm">{formatDate(selectedLicense.createdAt)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Expira em</label>
                                  <p className="text-sm">{formatDate(selectedLicense.expiresAt)}</p>
                                </div>
                                {selectedLicense.lastUsed && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Último uso</label>
                                    <p className="text-sm">{formatDate(selectedLicense.lastUsed)}</p>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Token Completo</label>
                                <div className="mt-1 flex items-center gap-2">
                                  <Input 
                                    value={selectedLicense.token} 
                                    readOnly 
                                    className="font-mono text-xs"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(selectedLicense.token)}
                                  >
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {license.status === 'active' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => revokeLicense(license.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {(license.status === 'expired' || license.status === 'revoked') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => renewLicense(license.id)}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Licenses;
