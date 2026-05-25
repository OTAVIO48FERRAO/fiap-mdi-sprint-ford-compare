// mock/fordData.ts
import { VehicleComparison, TelemetryData } from '../types/index';

export const FORD_RANGER_RAPTOR_SPECS: VehicleComparison = {
  brand: 'Ford',
  model: 'Ranger Raptor',
  version: '3.0 V6 EcoBoost',
  specs: [
    { atributo: 'Potência Máxima (hp)', valor: 397 },
    { atributo: 'Torque Máximo (Nm)', valor: 583 },
    { atributo: 'Tipo de Combustível', valor: 'Gasolina' },
    { atributo: 'Transmissão', valor: 'Automática 10-marchas' },
    { atributo: 'Tração', valor: '4x4 AWD Permanente' },
    { atributo: 'Tipo de Suspensão', valor: 'Duplo A-arm com Fox Live Valve' },
    { atributo: 'Altura Livre do Solo (mm)', valor: 272 },
    { atributo: 'Velocidade Máxima (km/h)', valor: 180 },
    { atributo: 'Aceleração 0-100 km/h (s)', valor: 5.8 },
    { atributo: 'Comprimento (mm)', valor: 5381 },
    { atributo: 'Largura (mm)', valor: 2208 },
    { atributo: 'Capacidade Tanque (L)', valor: 77 },
    { atributo: 'Peso Vazio (kg)', valor: 2415 },
    { atributo: 'Capacidade de Carga (kg)', valor: 570 },
    { atributo: 'Sistema de Frenagem', valor: 'Disco ventilado (4 rodas) ABS' },
    { atributo: 'Airbags', valor: 7 },
    { atributo: 'Controle de Estabilidade', valor: 'AdvanceTrac' },
    { atributo: 'Tração nas 4 Rodas', valor: 'Inteligente com bloqueio diferencial' },
    { atributo: 'Ângulo de Aproximação (°)', valor: 31.5 },
    { atributo: 'Ângulo de Saída (°)', valor: 27 }
  ]
};

export const FORD_TELEMETRY: TelemetryData = {
  enginePower: '397 hp',
  engineTorque: '583 Nm',
  fuelType: 'Gasolina',
  driveType: '4x4 AWD Permanente',
  suspensionType: 'Fox Live Valve',
  maxSpeed: '180 km/h',
  acceleration0to100: '5.8s',
  timestamp: Date.now()
};

export const TELEMETRY_UPDATE_INTERVAL = 2000; // Atualiza a cada 2 segundos na simulação
