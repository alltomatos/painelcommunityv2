
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, Package, DollarSign } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Plugins Ativos",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Vendas do Mês",
      value: "R$ 8.450",
      change: "+23%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Usuários Ativos",
      value: "1.247",
      change: "+5%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "-1%",
      changeType: "negative" as const,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentSales = [
    {
      plugin: "GarapaCRM Advanced Reports",
      user: "empresa@exemplo.com",
      value: "R$ 299,00",
      status: "Aprovado",
      date: "Hoje, 14:32",
    },
    {
      plugin: "GarapaCRM Integration Pack",
      user: "dev@startup.com",
      value: "R$ 149,00",
      status: "Pendente",
      date: "Hoje, 12:15",
    },
    {
      plugin: "GarapaCRM Mobile App",
      user: "admin@empresa.com.br",
      value: "R$ 399,00",
      status: "Aprovado",
      date: "Ontem, 16:45",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-garapa-blue-dark">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao painel administrativo do GarapaCRM Community
          </p>
        </div>
        <Button className="bg-garapa-blue hover:bg-garapa-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Plugin
        </Button>
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
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-garapa-success' : 'text-garapa-error'
              }`}>
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2 card-hover">
          <CardHeader>
            <CardTitle className="text-garapa-blue-dark">Vendas Recentes</CardTitle>
            <CardDescription>
              Últimas transações de plugins premium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-medium text-garapa-blue-dark">{sale.plugin}</h4>
                    <p className="text-sm text-muted-foreground">{sale.user}</p>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-garapa-blue-dark">{sale.value}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sale.status === 'Aprovado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-garapa-blue-dark">Ações Rápidas</CardTitle>
            <CardDescription>
              Operações mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Plugin
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Package className="w-4 h-4 mr-2" />
              Gerenciar Licenças
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Ver Relatórios
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Usuários Ativos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-garapa-blue-dark">Atividade Recente</CardTitle>
          <CardDescription>
            Últimas ações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Plugin 'Advanced Reports' foi aprovado", time: "2 horas atrás", type: "success" },
              { action: "Nova licença gerada para 'Integration Pack'", time: "4 horas atrás", type: "info" },
              { action: "Pagamento via Pix processado com sucesso", time: "6 horas atrás", type: "success" },
              { action: "Plugin 'Mobile App' foi atualizado", time: "1 dia atrás", type: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-garapa-success' : 'bg-garapa-blue'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-garapa-blue-dark">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
