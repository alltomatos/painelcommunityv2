import { useApiStatus } from "@/hooks/use-api-status";

interface ApiStatusIndicatorProps {
  collapsed?: boolean;
}

export function ApiStatusIndicator({ collapsed }: ApiStatusIndicatorProps) {
  const { redis, rabbitmq, loading } = useApiStatus();

  const getColor = (online: boolean) =>
    loading ? "bg-yellow-500" : online ? "bg-green-500" : "bg-red-500";

  // Exibir apenas pontos para Redis, RabbitMQ e MongoDB (MongoDB sempre offline por enquanto)
  return (
    <div className="flex items-center gap-2">
      {/* Redis */}
      <div className={`w-2 h-2 rounded-full ${getColor(redis)}`} title="Redis" />
      {/* RabbitMQ */}
      <div className={`w-2 h-2 rounded-full ${getColor(rabbitmq)}`} title="RabbitMQ" />
      {/* MongoDB (placeholder) */}
      <div className="w-2 h-2 rounded-full bg-red-500" title="MongoDB" />
    </div>
  );
} 