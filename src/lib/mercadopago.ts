// Mock de integração Mercado Pago Pix

export type PixStatus = 'pending' | 'paid' | 'expired';

export interface PixPayment {
  id: string;
  qrCode: string; // url ou base64
  copyPaste: string;
  status: PixStatus;
  expiresAt: string;
}

export async function createPixPayment(amount: number): Promise<PixPayment> {
  // Simula chamada à API do Mercado Pago
  const id = 'pix_' + Math.random().toString(36).substring(2, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min
  // QR Code fake (poderia ser uma imagem real)
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pagamento-${id}`;
  const copyPaste = `00020126580014BR.GOV.BCB.PIX0136pagamento-${id}5204000053039865405100.005802BR5920GARAPA CRM COMMUNITY6009SAO PAULO62070503***6304B14F`;
  return {
    id,
    qrCode,
    copyPaste,
    status: 'pending',
    expiresAt,
  };
}

export async function getPixStatus(id: string): Promise<PixStatus> {
  // Simula status: após 10s pago, após 5min expirado
  const created = parseInt(id.split('_')[1], 36) || Date.now();
  const now = Date.now();
  if (now - created > 5 * 60 * 1000) return 'expired';
  if (now - created > 10 * 1000) return 'paid';
  return 'pending';
} 