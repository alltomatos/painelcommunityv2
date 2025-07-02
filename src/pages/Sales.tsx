
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye, DollarSign, TrendingUp, Users, Package, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Sale {
  id: number;
  pluginName: string;
  userEmail: string;
  value: number;
  status: 'pending' | 'approved' | 'expired' | 'refunded';
  paymentMethod: 'pix';
  transactionId: string;
  createdAt: string;
  licenseToken?: string;
}

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      pluginName: "GarapaCRM Advanced Reports",
      userEmail: "empresa@exemplo.com",
      value: 299.00,
      status: "approved",
      paymentMethod: "pix",
      transactionId: "MP-2024010001",
      createdAt: "2024-01-15T14:32:00",
      licenseToken: "GARAP-ADV-REP-2024-001",
    },
    {
      id: 2,
      pluginName: "GarapaCRM Integration Pack",
      userEmail: "dev@startup.com",
      value: 149.00,
      status: "pending",
      paymentMethod: "pix",
      transactionId: "MP-2024010002",
      createdAt: "2024-01-15T12:15:00",
    },
    {
      id: 3,
      pluginName: "GarapaCRM Mobile App",
      userEmail: "admin@empresa.com.br",
      value: 399.00,
      status: "approved",
      paymentMethod: "pix",
      transactionId: "MP-2024010003",
      createdAt: "2024-01-14T16:45:00",
      licenseToken: "GARAP-MOB-APP-2024-003",
    },
    {
      id: 4,
      pluginName: "GarapaCRM Advanced Reports",
      userEmail: "teste@email.com",
      value: 299.00,
      status: "expired",
      paymentMethod: "pix",
      transactionId: "MP-2024010004",
      createdAt: "2024-01-10T09:20:00",
    },
  ]);

  const stats = [
    {
      title: "Vendas Total",
      value: `R$ ${sales.reduce((acc, sale) => sale.status === 'approved' ? acc + sale.value : acc, 0).toFixed(2)}`,
      change: "+15%",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Vendas do Mês",
      value: sales.filter(s => s.status === 'approved').length.toString(),
      change: "+23%",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Pendentes",
      value: sales.filter(s => s.status === 'pending').length.toString(),
      change: "+5%",
      icon: RefreshCw,
      color: "bg-yellow-500",
    },
    {
      title: "Taxa Aprovação",
      value: "87%",
      change: "+2%",
      icon: Package,
      color: "bg-purple-500",
    },
  ];

  const filteredSales = sales.filter((sale) => {
    const matchesSearch = sale.pluginName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || sale.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Sale['status']) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      approved: { variant: "default" as const, label: "Aprovado", color: "bg-green-100 text-green-800" },
      expired: { variant: "destructive" as const, label: "Expirado", color: "bg-red-100 text-red-800" },
      refunded: { variant: "outline" as const, label: "Reembolsado", color: "bg-gray-100 text-gray-800" },
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

  const handleRefreshStatus = (saleId: number) => {
    // Simular atualização de status via webhook
    setSales(sales.map(sale => 
      sale.id === saleId && sale.status === 'pending' 
        ? { ...sale, status: 'approved', licenseToken: `GARAP-LIC-${Date.now()}` }
        : sale
    ));
    toast.success("Status atualizado via webhook!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Vendas</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe todas as transações e pagamentos
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
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar vendas..."
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
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
                <SelectItem value="refunded">Reembolsado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-garapa-blue-dark">Histórico de Vendas</CardTitle>
          <CardDescription>
            Lista completa de todas as transações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.pluginName}</TableCell>
                  <TableCell>{sale.userEmail}</TableCell>
                  <TableCell className="font-semibold">R$ {sale.value.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>{formatDate(sale.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSale(sale)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes da Venda #{sale.id}</DialogTitle>
                            <DialogDescription>
                              Informações completas da transação
                            </DialogDescription>
                          </DialogHeader>
                          {selectedSale && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Plugin</label>
                                  <p className="text-sm font-semibold">{selectedSale.pluginName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Cliente</label>
                                  <p className="text-sm">{selectedSale.userEmail}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Valor</label>
                                  <p className="text-sm font-semibold">R$ {selectedSale.value.toFixed(2)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <div className="mt-1">{getStatusBadge(selectedSale.status)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">ID Transação</label>
                                  <p className="text-sm font-mono">{selectedSale.transactionId}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Data</label>
                                  <p className="text-sm">{formatDate(selectedSale.createdAt)}</p>
                                </div>
                              </div>
                              {selectedSale.licenseToken && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Token de Licença</label>
                                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                                    {selectedSale.licenseToken}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {sale.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefreshStatus(sale.id)}
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

export default Sales;
