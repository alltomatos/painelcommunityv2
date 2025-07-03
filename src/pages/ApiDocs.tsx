import { Card } from "@/components/ui/card";

export default function ApiDocs() {
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <Card className="p-6 border-2 border-gray-200 shadow-md">
        <h2 className="text-xl font-bold mb-2">API Mock - Integração CRM OSS</h2>
        <div className="space-y-4 text-sm">
          <div>
            <b>Autenticação:</b> <br />
            <code>Authorization: Bearer &lt;token&gt;</code>
          </div>
          <div>
            <b>GET /api/plugins</b> <br />
            <span>Lista plugins disponíveis para download.</span>
            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{`
GET /api/plugins
Authorization: Bearer demo-token

Response:
[
  {
    "pluginId": "crm-leads",
    "name": "Leads Avançado",
    "version": "1.0.0",
    ...
  }
]
`}</pre>
          </div>
          <div>
            <b>POST /api/activate</b> <br />
            <span>Ativa plugin com token de licença.</span>
            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{`
POST /api/activate
Authorization: Bearer demo-token
Content-Type: application/json

{
  "pluginId": "crm-leads",
  "user": "cliente1",
  "licenseToken": "..."
}

Response:
{
  "status": "success",
  "message": "Plugin ativado com sucesso"
}
`}</pre>
          </div>
          <div>
            <b>Validação de Licença:</b> <br />
            <span>O backend valida o token de licença (HMAC, expiração, correspondência plugin/usuário).</span>
          </div>
        </div>
      </Card>
    </div>
  );
} 