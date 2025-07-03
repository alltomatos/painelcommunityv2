import { useEffect, useState } from "react";
import { createPixPayment, getPixStatus, PixStatus } from "@/lib/mercadopago";
import { QrCode } from "@/components/ui/QrCode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Checkout() {
  const [payment, setPayment] = useState<any>(null);
  const [status, setStatus] = useState<PixStatus>("pending");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    createPixPayment(100).then((p) => {
      setPayment(p);
      setStatus(p.status);
    });
  }, []);

  useEffect(() => {
    if (!payment) return;
    if (status !== "pending") return;
    const interval = setInterval(async () => {
      const s = await getPixStatus(payment.id);
      setStatus(s);
    }, 2000);
    return () => clearInterval(interval);
  }, [payment, status]);

  const handleCopy = () => {
    if (payment?.copyPaste) {
      navigator.clipboard.writeText(payment.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6 border-2 border-gray-200 shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Checkout Pix</h2>
        {!payment ? (
          <div className="text-center text-gray-400">Gerando pagamento...</div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <QrCode value={payment.qrCode} />
              <div className="text-xs text-gray-500">Escaneie o QR Code no app do seu banco</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs bg-gray-50"
                value={payment.copyPaste}
                readOnly
                aria-label="Código copia e cola Pix"
              />
              <Button size="sm" variant="outline" onClick={handleCopy}>
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
            <div className="text-sm font-medium text-center mt-2">
              {status === "pending" && <span className="text-yellow-600">Aguardando pagamento...</span>}
              {status === "paid" && <span className="text-green-700">Pagamento confirmado! ✅</span>}
              {status === "expired" && <span className="text-red-600">Pagamento expirado. Gere um novo.</span>}
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              Expira em: {new Date(payment.expiresAt).toLocaleTimeString()}
            </div>
          </>
        )}
      </Card>
    </div>
  );
} 