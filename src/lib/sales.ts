export interface Sale {
  id: number;
  plugin: string;
  buyer: string;
  value: number;
  status: 'pago' | 'pendente' | 'expirado';
  date: string;
  token: string;
}

export const salesMock: Sale[] = [
  {
    id: 1,
    plugin: 'Leads Avançado',
    buyer: 'cliente1',
    value: 99.9,
    status: 'pago',
    date: '2024-06-01',
    token: 'tok_abc123',
  },
  {
    id: 2,
    plugin: 'WhatsApp Business',
    buyer: 'cliente2',
    value: 149.9,
    status: 'pendente',
    date: '2024-06-02',
    token: 'tok_def456',
  },
  {
    id: 3,
    plugin: 'Leads Avançado',
    buyer: 'cliente3',
    value: 99.9,
    status: 'expirado',
    date: '2024-06-03',
    token: 'tok_ghi789',
  },
  {
    id: 4,
    plugin: 'WhatsApp Business',
    buyer: 'cliente4',
    value: 149.9,
    status: 'pago',
    date: '2024-06-04',
    token: 'tok_jkl012',
  },
];

export function filterSales(sales: Sale[], plugin?: string, status?: string, date?: string) {
  return sales.filter(s =>
    (!plugin || s.plugin === plugin) &&
    (!status || s.status === status) &&
    (!date || s.date === date)
  );
}

export function exportSalesToCSV(sales: Sale[]): string {
  const header = 'ID,Plugin,Comprador,Valor,Status,Data,Token';
  const rows = sales.map(s => `${s.id},${s.plugin},${s.buyer},${s.value},${s.status},${s.date},${s.token}`);
  return [header, ...rows].join('\n');
} 