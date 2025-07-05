import { useState, useEffect } from 'react';
import { buildApiUrl } from '../config/env';

interface ApiStatus {
  api: boolean;
  redis: boolean;
  rabbitmq: boolean;
  loading: boolean;
  error: string | null;
  version: string;
}

export const useApiStatus = () => {
  const [status, setStatus] = useState<ApiStatus>({
    api: false,
    redis: false,
    rabbitmq: false,
    loading: true,
    error: null,
    version: '',
  });

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setStatus(prev => ({ ...prev, loading: true, error: null }));

        // Verificar API principal
        const response = await fetch(buildApiUrl('health'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`API não está respondendo: ${response.status}`);
        }
        const data = await response.json();

        // Verificar Redis
        const redisResponse = await fetch(buildApiUrl('health/redis'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!redisResponse.ok) {
          throw new Error(`Redis não está respondendo: ${redisResponse.status}`);
        }
        const redisData = await redisResponse.json();

        // Verificar RabbitMQ
        const rabbitmqResponse = await fetch(buildApiUrl('health/rabbitmq'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!rabbitmqResponse.ok) {
          throw new Error(`RabbitMQ não está respondendo: ${rabbitmqResponse.status}`);
        }
        const rabbitmqData = await rabbitmqResponse.json();

        setStatus({
          api: data.status === 'ok',
          redis: redisData.status === 'connected',
          rabbitmq: rabbitmqData.status === 'connected',
          loading: false,
          error: null,
          version: data.version || '',
        });
      } catch (error) {
        console.error('Erro ao verificar status da API:', error);
        setStatus({
          api: false,
          redis: false,
          rabbitmq: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          version: '',
        });
      }
    };

    checkApiStatus();

    // Verificar a cada 30 segundos
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return status;
}; 