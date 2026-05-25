// mock/aiResponseData.ts
import { VehicleComparison } from '../types/index';

export const COMPETITOR_SPECS_CACHE: Record<string, VehicleComparison> = {
  'toyota-hilux': {
    brand: 'Toyota',
    model: 'Hilux',
    version: '2.8 Diesel',
    specs: [
      { atributo: 'Potência Máxima (hp)', valor: 204 },
      { atributo: 'Torque Máximo (Nm)', valor: 500 },
      { atributo: 'Tipo de Combustível', valor: 'Diesel' },
      { atributo: 'Transmissão', valor: 'Automática 6-marchas' },
      { atributo: 'Tração', valor: '4x4 Seletivo' },
      { atributo: 'Tipo de Suspensão', valor: 'Mola helicoidal dupla' },
      { atributo: 'Altura Livre do Solo (mm)', valor: 225 },
      { atributo: 'Velocidade Máxima (km/h)', valor: null }, // Simulando dados ausentes
      { atributo: 'Aceleração 0-100 km/h (s)', valor: 10.5 },
      { atributo: 'Comprimento (mm)', valor: 5325 },
      { atributo: 'Largura (mm)', valor: 1855 },
      { atributo: 'Capacidade Tanque (L)', valor: 80 },
      { atributo: 'Peso Vazio (kg)', valor: 1845 },
      { atributo: 'Capacidade de Carga (kg)', valor: 575 },
      { atributo: 'Sistema de Frenagem', valor: 'Disco ventilado (dianteiro) + Tambor (traseiro)' },
      { atributo: 'Airbags', valor: null }, // Simulando dados ausentes
      { atributo: 'Controle de Estabilidade', valor: 'Sim' },
      { atributo: 'Tração nas 4 Rodas', valor: 'Manual com Multi-Mode' },
      { atributo: 'Ângulo de Aproximação (°)', valor: null },
      { atributo: 'Ângulo de Saída (°)', valor: 26 }
    ]
  },
  'chevrolet-s10': {
    brand: 'Chevrolet',
    model: 'S10',
    version: '2.5 Diesel',
    specs: [
      { atributo: 'Potência Máxima (hp)', valor: 200 },
      { atributo: 'Torque Máximo (Nm)', valor: 490 },
      { atributo: 'Tipo de Combustível', valor: 'Diesel' },
      { atributo: 'Transmissão', valor: 'Automática 9-marchas' },
      { atributo: 'Tração', valor: '4x4' },
      { atributo: 'Tipo de Suspensão', valor: 'Independente (dianteira) + Multi-link (traseira)' },
      { atributo: 'Altura Livre do Solo (mm)', valor: 230 },
      { atributo: 'Velocidade Máxima (km/h)', valor: 175 },
      { atributo: 'Aceleração 0-100 km/h (s)', valor: 11.2 },
      { atributo: 'Comprimento (mm)', valor: 5345 },
      { atributo: 'Largura (mm)', valor: 1840 },
      { atributo: 'Capacidade Tanque (L)', valor: 70 },
      { atributo: 'Peso Vazio (kg)', valor: 1950 },
      { atributo: 'Capacidade de Carga (kg)', valor: 545 },
      { atributo: 'Sistema de Frenagem', valor: null }, // Simulando dados ausentes
      { atributo: 'Airbags', valor: 6 },
      { atributo: 'Controle de Estabilidade', valor: 'Sim' },
      { atributo: 'Tração nas 4 Rodas', valor: 'Inteligente com bloqueio eletrônico' },
      { atributo: 'Ângulo de Aproximação (°)', valor: 29 },
      { atributo: 'Ângulo de Saída (°)', valor: null }
    ]
  },
  'ram-2500': {
    brand: 'RAM',
    model: '2500',
    version: '6.7 Cummins Diesel',
    specs: [
      { atributo: 'Potência Máxima (hp)', valor: 370 },
      { atributo: 'Torque Máximo (Nm)', valor: 760 },
      { atributo: 'Tipo de Combustível', valor: 'Diesel' },
      { atributo: 'Transmissão', valor: 'Automática 6-marchas' },
      { atributo: 'Tração', valor: '4x4' },
      { atributo: 'Tipo de Suspensão', valor: 'Coil spring com amortecedores' },
      { atributo: 'Altura Livre do Solo (mm)', valor: null },
      { atributo: 'Velocidade Máxima (km/h)', valor: 190 },
      { atributo: 'Aceleração 0-100 km/h (s)', valor: 7.8 },
      { atributo: 'Comprimento (mm)', valor: 5639 },
      { atributo: 'Largura (mm)', valor: 2030 },
      { atributo: 'Capacidade Tanque (L)', valor: 109 },
      { atributo: 'Peso Vazio (kg)', valor: 2400 },
      { atributo: 'Capacidade de Carga (kg)', valor: 775 },
      { atributo: 'Sistema de Frenagem', valor: 'Disco ventilado (4 rodas)' },
      { atributo: 'Airbags', valor: null },
      { atributo: 'Controle de Estabilidade', valor: 'Sim' },
      { atributo: 'Tração nas 4 Rodas', valor: 'Eletrônica com transfer case automático' },
      { atributo: 'Ângulo de Aproximação (°)', valor: 30.1 },
      { atributo: 'Ângulo de Saída (°)', valor: 20.6 }
    ]
  },
  'ram-1500 rebel': {
    brand: 'RAM',
    model: '1500 Rebel',
    version: '5.7 HEMI V8',
    specs: [
      { atributo: 'Potência Máxima (hp)', valor: 395 },
      { atributo: 'Torque Máximo (Nm)', valor: 556 },
      { atributo: 'Tipo de Combustível', valor: 'Gasolina' },
      { atributo: 'Transmissão', valor: 'Automática 8-marchas' },
      { atributo: 'Tração', valor: '4x4' },
      { atributo: 'Tipo de Suspensão', valor: 'Coil spring com amortecedores off-road' },
      { atributo: 'Altura Livre do Solo (mm)', valor: 270 },
      { atributo: 'Velocidade Máxima (km/h)', valor: 180 },
      { atributo: 'Aceleração 0-100 km/h (s)', valor: 6.8 },
      { atributo: 'Comprimento (mm)', valor: 5894 },
      { atributo: 'Largura (mm)', valor: 2026 },
      { atributo: 'Capacidade Tanque (L)', valor: 98 },
      { atributo: 'Peso Vazio (kg)', valor: 2600 },
      { atributo: 'Capacidade de Carga (kg)', valor: 725 },
      { atributo: 'Sistema de Frenagem', valor: 'Disco ventilado (4 rodas)' },
      { atributo: 'Airbags', valor: 6 },
      { atributo: 'Controle de Estabilidade', valor: 'Sim' },
      { atributo: 'Tração nas 4 Rodas', valor: 'Automática com modo off-road' },
      { atributo: 'Ângulo de Aproximação (°)', valor: 32 },
      { atributo: 'Ângulo de Saída (°)', valor: 23 }
    ]
  },
  'toyota-hilux gr sport': {
    brand: 'Toyota',
    model: 'Hilux GR Sport',
    version: '2.8 Diesel',
    specs: [
      { atributo: 'Potência Máxima (hp)', valor: 224 },
      { atributo: 'Torque Máximo (Nm)', valor: 550 },
      { atributo: 'Tipo de Combustível', valor: 'Diesel' },
      { atributo: 'Transmissão', valor: 'Automática 6-marchas' },
      { atributo: 'Tração', valor: '4x4 Seletivo' },
      { atributo: 'Tipo de Suspensão', valor: 'Mola helicoidal com ajuste off-road' },
      { atributo: 'Altura Livre do Solo (mm)', valor: 240 },
      { atributo: 'Velocidade Máxima (km/h)', valor: 180 },
      { atributo: 'Aceleração 0-100 km/h (s)', valor: 10.0 },
      { atributo: 'Comprimento (mm)', valor: 5325 },
      { atributo: 'Largura (mm)', valor: 1855 },
      { atributo: 'Capacidade Tanque (L)', valor: 80 },
      { atributo: 'Peso Vazio (kg)', valor: 1870 },
      { atributo: 'Capacidade de Carga (kg)', valor: 575 },
      { atributo: 'Sistema de Frenagem', valor: 'Disco ventilado (4 rodas)' },
      { atributo: 'Airbags', valor: 7 },
      { atributo: 'Controle de Estabilidade', valor: 'Sim' },
      { atributo: 'Tração nas 4 Rodas', valor: 'Manual com Multi-Mode' },
      { atributo: 'Ângulo de Aproximação (°)', valor: 29 },
      { atributo: 'Ângulo de Saída (°)', valor: 26 }
    ]
  }
};

/**
 * Simula resposta de API de IA com atraso
 * Em produção, isso seria uma chamada real a um modelo híbrido de IA
 */
export const simulateAIResponse = async (
  brand: string,
  model: string
): Promise<VehicleComparison> => {
  return new Promise((resolve) => {
    const delay = Math.random() * 2000 + 1500; // 1.5-3.5 segundos
    setTimeout(() => {
      const key = `${brand.toLowerCase()}-${model.toLowerCase()}`;
      const competitor = COMPETITOR_SPECS_CACHE[key];

      if (competitor) {
        resolve(competitor);
      } else {
        // Resposta padrão se competidor não for encontrado
        resolve({
          brand: brand,
          model: model,
          version: 'N/A',
          specs: [
            { atributo: 'Potência Máxima (hp)', valor: null },
            { atributo: 'Torque Máximo (Nm)', valor: null },
            { atributo: 'Tipo de Combustível', valor: null }
          ]
        });
      }
    }, delay);
  });
};
