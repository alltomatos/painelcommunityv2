import { useState } from "react";
import { validateLicenseToken, LicenseToken } from "@/lib/license";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Activate() {
  const [pluginId, setPluginId] = useState("");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleValidate = () => {
    try {
      const parsed: LicenseToken = JSON.parse(atob(token));
      if (parsed.pluginId !== pluginId || parsed.user !== user) {
        setResult("Token não corresponde ao plugin ou usuário.");
        return;
      }
      if (validateLicenseToken(parsed)) {
        setResult("Licença válida! ✅");
      } else {
        setResult("Licença inválida ou expirada.");
      }
    } catch {
      setResult("Token inválido.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6 border-2 border-gray-200 shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Ativação de Plugin</h2>
        <div className="space-y-2">
          <div>
            <label htmlFor="pluginId" className="block text-xs mb-1">Plugin ID</label>
            <input
              id="pluginId"
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
              value={pluginId}
              onChange={e => setPluginId(e.target.value)}
              placeholder="Ex: crm-leads"
            />
          </div>
          <div>
            <label htmlFor="user" className="block text-xs mb-1">Usuário</label>
            <input
              id="user"
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="Seu usuário"
            />
          </div>
          <div>
            <label htmlFor="token" className="block text-xs mb-1">Token de Licença (base64)</label>
            <input
              id="token"
              className="border border-gray-300 rounded px-2 py-1 w-full text-xs"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Cole aqui o token gerado"
            />
          </div>
          <Button className="w-full mt-2" onClick={handleValidate}>Validar Licença</Button>
          {result && <div className="text-center text-sm mt-2">{result}</div>}
        </div>
      </Card>
    </div>
  );
} 