// mock/fordData.ts
// Ranger Raptor + telemetria 100% simulada e local.
// Para a tabela de comparação, mantemos apenas dados que constam na ficha/página oficial da Ford.
import { VehicleComparison, TelemetryData } from '../types/index';

export const FORD_RANGER_RAPTOR_SPECS: VehicleComparison = {
  brand: 'Ford',
  model: 'Ranger Raptor',
  version: '3.0 V6 Bi-Turbo 4WD AT 2026',
  source: 'Ford Brasil — Ranger Raptor 2026 / ficha técnica oficial',
  lastVerified: '2026-09-27',
  specs: [
    { atributo: 'Ano/Modelo', valor: 2026 },
    { atributo: 'Categoria', valor: 'Picape média de alta performance/off-road' },
    { atributo: 'Motor (Descrição)', valor: '3.0L V6 Bi-Turbo' },
    { atributo: 'Cilindrada (cm³)', valor: 2956 },
    { atributo: 'Número de Cilindros', valor: 6 },
    { atributo: 'Configuração do Motor', valor: 'V6' },
    { atributo: 'Tipo de Combustível', valor: 'Gasolina' },
    { atributo: 'Potência Máxima (cv)', valor: 397 },
    { atributo: 'Torque Máximo (Nm)', valor: 583 },
    { atributo: 'Transmissão', valor: 'Automática de 10 velocidades' },
    { atributo: 'Número de Marchas', valor: 10 },
    { atributo: 'Tração', valor: '4WD' },
    { atributo: 'Diferencial Dianteiro', valor: 'Blocante eletrônico' },
    { atributo: 'Diferencial Traseiro', valor: 'Blocante eletrônico' },
    { atributo: 'Suspensão Dianteira', valor: 'Independente + FOX 2.5" Live Valve Racing' },
    { atributo: 'Suspensão Traseira', valor: 'Eixo rígido Watt\'s Link + FOX 2.5" Live Valve Racing' },
    { atributo: 'Altura Livre do Solo (mm)', valor: 272 },
    { atributo: 'Ângulo de Ataque (°)', valor: 32 },
    { atributo: 'Ângulo de Saída (°)', valor: 27 },
    { atributo: 'Capacidade de Imersão (mm)', valor: 850 },
    { atributo: 'Comprimento (mm)', valor: 5381 },
    { atributo: 'Largura com Espelhos (mm)', valor: 2208 },
    { atributo: 'Altura (mm)', valor: 1922 },
    { atributo: 'Distância entre Eixos (mm)', valor: 3270 },
    { atributo: 'Peso em Ordem de Marcha (kg)', valor: 2415 },
    { atributo: 'Capacidade de Carga (kg)', valor: 715 },
    { atributo: 'Capacidade do Tanque (L)', valor: 77 },
    { atributo: 'Freios', valor: 'Discos nas 4 rodas' },
    { atributo: 'Rodas', valor: 'Liga leve 17"' },
    { atributo: 'Pneus', valor: '285/70 R17 General Grabber' },
    { atributo: 'Airbags', valor: 7 },
    { atributo: 'Central Multimídia', valor: 'SYNC 4 — tela HD 12"' },
    { atributo: 'Painel de Instrumentos', valor: 'Raptor 12,4"' },
    { atributo: 'Câmera 360°', valor: 'Sim' },
    { atributo: 'ACC', valor: 'Adaptativo com Stop & Go' },
    { atributo: 'Modos de Condução', valor: '7 modos' },
  ],
};

// Estes valores são usados apenas como parâmetros de uma simulação visual de painel.
export const FORD_TELEMETRY: TelemetryData = {
  enginePower: '397 cv',
  engineTorque: '583 Nm',
  fuelType: 'Gasolina',
  driveType: '4WD 2H / 4H / 4A / 4L',
  suspensionType: 'FOX 2.5" Live Valve Racing',
  maxSpeed: '180 km/h',
  acceleration0to100: '5,8 s',
  timestamp: Date.now(),
  vehicleSpeed: '0 km/h',
  rpm: '850 rpm',
  throttlePosition: '0%',
  engineLoad: '8%',
  currentGear: '1ª',
  engineTemperature: '89°C',
  oilTemperature: '94°C',
  coolantTemperature: '88°C',
  turboBoostPressure: '0,0 bar',
  fuelConsumption: '0,0 km/l',
};

export const TELEMETRY_UPDATE_INTERVAL = 1500;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const numericValue = (value?: string, fallback = 0): number => {
  const parsed = Number.parseFloat((value ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const GEAR_THRESHOLDS = [0, 15, 30, 45, 65, 85, 105, 125, 145, 165];

export const generateLiveTelemetryUpdate = (previous: TelemetryData): TelemetryData => {
  const previousSpeed = numericValue(previous.vehicleSpeed, 0);
  const previousRpm = numericValue(previous.rpm, 850);
  const previousEngineTemp = numericValue(previous.engineTemperature, 89);
  const previousOilTemp = numericValue(previous.oilTemperature, 94);
  const previousCoolantTemp = numericValue(previous.coolantTemperature, 88);

  const throttle = previousSpeed < 8
    ? (Math.random() > 0.25 ? Math.round(25 + Math.random() * 55) : Math.round(Math.random() * 8))
    : previousSpeed > 145
      ? (Math.random() > 0.65 ? Math.round(Math.random() * 18) : Math.round(20 + Math.random() * 35))
      : (Math.random() > 0.28 ? Math.round(15 + Math.random() * 70) : Math.round(Math.random() * 12));

  const driveForce = (throttle - 12) / 16;
  const rollingResistance = previousSpeed > 0 ? 0.15 + previousSpeed / 180 : 0.4;
  const speedDelta = driveForce - rollingResistance + (Math.random() - 0.5) * 1.6;
  const nextSpeed = clamp(previousSpeed + speedDelta, 0, 180);

  const gearIndex = Math.min(
    GEAR_THRESHOLDS.length - 1,
    Math.max(0, GEAR_THRESHOLDS.filter((threshold) => nextSpeed >= threshold).length - 1)
  );
  const gear = gearIndex + 1;

  const currentThreshold = GEAR_THRESHOLDS[gearIndex];
  const nextThreshold = gearIndex < GEAR_THRESHOLDS.length - 1
    ? GEAR_THRESHOLDS[gearIndex + 1]
    : 180;
  const gearSpan = Math.max(15, nextThreshold - currentThreshold);
  const gearProgress = clamp((nextSpeed - currentThreshold) / gearSpan, 0, 1);

  const targetRpm = clamp(
    1050 + gearProgress * 3400 + throttle * 8 + (Math.random() - 0.5) * 180,
    850,
    6200
  );

  const nextRpm = clamp(previousRpm + (targetRpm - previousRpm) * 0.38, 800, 6500);

  const engineLoad = clamp(
    Math.round(throttle * 0.58 + nextSpeed * 0.11 + Math.random() * 5),
    8,
    100
  );

  const turbo = clamp(throttle * 0.012 + engineLoad * 0.0065, 0, 1.8);
  const thermalLoad = engineLoad * 0.08 + nextSpeed * 0.018;

  const nextEngineTemp = clamp(
    previousEngineTemp + (88 + thermalLoad - previousEngineTemp) * 0.08 + (Math.random() - 0.5) * 0.35,
    86,
    104
  );

  const nextOilTemp = clamp(
    previousOilTemp + (93 + thermalLoad * 1.2 - previousOilTemp) * 0.07 + (Math.random() - 0.5) * 0.45,
    90,
    110
  );

  const nextCoolantTemp = clamp(
    previousCoolantTemp + (87 + thermalLoad * 0.65 - previousCoolantTemp) * 0.09 + (Math.random() - 0.5) * 0.25,
    85,
    101
  );

  const consumption = nextSpeed < 2
    ? 0
    : clamp(9.2 - throttle * 0.045 - nextSpeed * 0.014 + (Math.random() - 0.5) * 0.25, 2.5, 12);

  return {
    ...previous,
    timestamp: Date.now(),
    vehicleSpeed: `${Math.round(nextSpeed)} km/h`,
    rpm: `${Math.round(nextRpm)} rpm`,
    throttlePosition: `${throttle}%`,
    engineLoad: `${engineLoad}%`,
    currentGear: `${gear}ª`,
    engineTemperature: `${Math.round(nextEngineTemp)}°C`,
    oilTemperature: `${Math.round(nextOilTemp)}°C`,
    coolantTemperature: `${Math.round(nextCoolantTemp)}°C`,
    turboBoostPressure: `${turbo.toFixed(1).replace('.', ',')} bar`,
    fuelConsumption: `${consumption.toFixed(1).replace('.', ',')} km/l`,
  };
};
