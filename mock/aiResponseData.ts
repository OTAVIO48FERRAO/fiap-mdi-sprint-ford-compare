// mock/aiResponseData.ts
//
// CATÁLOGO TÉCNICO LOCAL — o nome do arquivo é legado do MVP.
// Não existe IA nem chamada de API aqui. Este módulo apenas armazena o catálogo
// local e simula um pequeno atraso assíncrono para manter o fluxo original.
//
// Dados verificados em fontes públicas das fabricantes em 27/09/2026.
import { VehicleComparison } from '../types/index';

const spec = (atributo: string, valor: string | number) => ({ atributo, valor });

export const COMPETITOR_SPECS_CACHE: Record<string, VehicleComparison> = {
  'toyota-hilux': {
    brand: 'Toyota',
    model: 'Hilux',
    version: 'SRX Plus AT 2026',
    source: 'Toyota Brasil — Ficha Técnica Hilux 2026',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2026),
      spec('Categoria', 'Picape média'),
      spec('Motor (Descrição)', '2.8L 16V Turbo Diesel com geometria variável'),
      spec('Cilindrada (cm³)', 2755),
      spec('Número de Cilindros', 4),
      spec('Configuração do Motor', '4 cilindros em linha'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 204),
      spec('Rotação de Potência Máxima (rpm)', 3400),
      spec('Torque Máximo (Nm)', 499),
      spec('Rotação de Torque Máximo (rpm)', 2800),
      spec('Transmissão', 'Automática sequencial de 6 velocidades'),
      spec('Número de Marchas', 6),
      spec('Tração', '4x2 / 4x4 / 4x4 reduzida com acionamento eletrônico'),
      spec('Diferencial', 'A-TRC com bloqueio do diferencial'),
      spec('Suspensão Dianteira', 'Independente, braços duplos triangulares, molas helicoidais e barra estabilizadora'),
      spec('Suspensão Traseira', 'Eixo rígido, molas semielípticas de duplo estágio e barra estabilizadora'),
      spec('Altura Livre do Solo (mm)', 323),
      spec('Ângulo de Ataque (°)', 30),
      spec('Ângulo de Saída (°)', 24),
      spec('Comprimento (mm)', 5325),
      spec('Largura (mm)', 2020),
      spec('Altura (mm)', 1830),
      spec('Distância entre Eixos (mm)', 3085),
      spec('Peso em Ordem de Marcha (kg)', 2175),
      spec('Peso Bruto Total (kg)', 3180),
      spec('Peso Bruto Total Combinado (kg)', 6680),
      spec('Capacidade de Reboque (kg)', 3500),
      spec('Capacidade do Tanque (L)', 80),
      spec('Caçamba — Comprimento (mm)', 1569),
      spec('Caçamba — Largura (mm)', 1645),
      spec('Caçamba — Altura (mm)', 481),
      spec('Rodas', 'Liga leve 18"'),
      spec('Pneus', '265/60 R18'),
      spec('Freios Dianteiros', 'Discos ventilados com ABS, EBD e BAS'),
      spec('Freios Traseiros', 'Discos ventilados com ABS, EBD e BAS'),
      spec('Airbags', 7),
      spec('Central Multimídia', '9"'),
      spec('Segurança', 'Toyota Safety Sense'),
    ],
  },

  'chevrolet-s10': {
    brand: 'Chevrolet',
    model: 'S10',
    version: 'Trail Boss AT 2027',
    source: 'Chevrolet Brasil — S10 Trail Boss 2027',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2027),
      spec('Categoria', 'Picape média off-road'),
      spec('Motor (Descrição)', '2.8L Duramax Turbo Diesel'),
      spec('Cilindrada (cm³)', 2800),
      spec('Número de Cilindros', 4),
      spec('Configuração do Motor', '4 cilindros em linha'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 207),
      spec('Torque Máximo (Nm)', 510),
      spec('Transmissão', 'Automática de 8 velocidades'),
      spec('Número de Marchas', 8),
      spec('Tração', '4x2 / 4x4 / 4x4 reduzida'),
      spec('Suspensão Dianteira', 'Independente, conjunto Ironman específico Trail Boss'),
      spec('Suspensão Traseira', 'Eixo rígido'),
      spec('Altura Livre do Solo (mm)', 324),
      spec('Ângulo de Ataque (°)', 32.5),
      spec('Ângulo de Saída (°)', 22.9),
      spec('Pneus', 'Pirelli Scorpion All-Terrain 18"'),
      spec('Consumo Urbano (km/l)', 8.3),
      spec('Consumo Rodoviário (km/l)', 10.5),
      spec('Capacidade de Reboque (kg)', 3500),
      spec('Airbags', 6),
      spec('Central Multimídia', 'MyLink 11"'),
      spec('Painel de Instrumentos', 'Digital 8"'),
      spec('Sistema Conectado', 'OnStar com Wi-Fi'),
      spec('Segurança', 'Alerta de ponto cego, alerta de tráfego cruzado traseiro, controle de tração/estabilidade'),
    ],
  },

  'volkswagen-amarok': {
    brand: 'Volkswagen',
    model: 'Amarok',
    version: 'V6 Extreme AT 2026',
    source: 'Volkswagen do Brasil — Manual Amarok MY26',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2026),
      spec('Categoria', 'Picape média'),
      spec('Motor (Descrição)', '3.0 V6 TDI'),
      spec('Cilindrada (cm³)', 2967),
      spec('Número de Cilindros', 6),
      spec('Configuração do Motor', 'V6'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 258),
      spec('Rotação de Potência Máxima (rpm)', '3.250–4.000'),
      spec('Torque Máximo (Nm)', 580),
      spec('Rotação de Torque Máximo (rpm)', '1.400–3.000'),
      spec('Transmissão', 'Automática de 8 velocidades'),
      spec('Número de Marchas', 8),
      spec('Tração', '4x4 permanente'),
      spec('Velocidade Máxima (km/h)', 190),
      spec('Aceleração 0-100 km/h (s)', 8.1),
      spec('Suspensão Dianteira', 'Independente'),
      spec('Suspensão Traseira', 'Eixo rígido'),
      spec('Altura Livre do Solo (mm)', 200),
      spec('Comprimento (mm)', 5350),
      spec('Largura (mm)', 1954),
      spec('Largura com Espelhos (mm)', 2228),
      spec('Altura (mm)', 1850),
      spec('Distância entre Eixos (mm)', 3097),
      spec('Peso em Ordem de Marcha (kg)', 2225),
      spec('Peso Bruto Total (kg)', '3295–3330'),
      spec('Capacidade de Reboque com Freio (kg)', '2705–2740'),
      spec('Capacidade de Reboque sem Freio (kg)', 750),
      spec('Capacidade Máxima de Tração (kg)', 6035),
      spec('Capacidade do Tanque (L)', 80),
      spec('AdBlue (L)', 18),
      spec('Rodas/Pneus', 'Conforme configuração de roda/pneu'),
    ],
  },

  'nissan-frontier': {
    brand: 'Nissan',
    model: 'Frontier',
    version: 'PRO-4X AT 4x4 2026',
    source: 'Nissan Brasil — Perguntas Frequentes / concessionárias Nissan',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2026),
      spec('Categoria', 'Picape média off-road'),
      spec('Motor (Descrição)', '2.3L 16V Bi-Turbo Diesel com intercooler e injeção direta'),
      spec('Cilindrada (cm³)', 2298),
      spec('Número de Cilindros', 4),
      spec('Configuração do Motor', '4 cilindros em linha'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 190),
      spec('Rotação de Potência Máxima (rpm)', 3750),
      spec('Torque Máximo (Nm)', 450),
      spec('Rotação de Torque Máximo (rpm)', '1.500–2.500'),
      spec('Transmissão', 'Automática de 7 velocidades'),
      spec('Número de Marchas', 7),
      spec('Tração', '4x4 com reduzida — acionamento eletrônico'),
      spec('Diferencial Traseiro', 'Bloqueio eletrônico'),
      spec('Suspensão Dianteira', 'Independente, braços sobrepostos com molas helicoidais'),
      spec('Suspensão Traseira', 'Eixo rígido com molas helicoidais'),
      spec('Ângulo de Ataque (°)', 31.6),
      spec('Ângulo de Saída (°)', 25.7),
      spec('Comprimento (mm)', 5260),
      spec('Largura (mm)', 1850),
      spec('Altura (mm)', 1860),
      spec('Distância entre Eixos (mm)', 3150),
      spec('Capacidade da Caçamba (L)', 1054),
      spec('Capacidade de Reboque (kg)', 2750),
      spec('Capacidade do Tanque (L)', 73),
      spec('Consumo Urbano (km/l)', 9.1),
      spec('Consumo Rodoviário (km/l)', 11.0),
      spec('Pneus', '255/65 R17 All Terrain'),
      spec('Freios', 'Discos ventilados dianteiros e traseiros'),
      spec('Visão 360°', 'Sim — Intelligent Around View Monitor'),
    ],
  },

  'mitsubishi-triton': {
    brand: 'Mitsubishi',
    model: 'Triton',
    version: 'Katana AT 4x4 2027',
    source: 'Mitsubishi Motors Brasil — Nova Triton 2027 / ficha técnica',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2027),
      spec('Categoria', 'Picape média off-road'),
      spec('Motor (Descrição)', '2.4L Bi-Turbo Diesel Super High Power em alumínio'),
      spec('Cilindrada (cm³)', 2442),
      spec('Número de Cilindros', 4),
      spec('Configuração do Motor', '4 cilindros em linha'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 205),
      spec('Rotação de Potência Máxima (rpm)', 3500),
      spec('Torque Máximo (Nm)', 470),
      spec('Rotação de Torque Máximo (rpm)', '1.500–2.750'),
      spec('Transmissão', 'Automática de 6 velocidades com Sport Mode'),
      spec('Número de Marchas', 6),
      spec('Tração', 'Super Select II 4x4'),
      spec('Modos de Tração', '2H / 4H / 4HLC / 4LLC'),
      spec('Modos de Condução', '7 modos'),
      spec('Diferencial Traseiro', 'Bloqueio do diferencial'),
      spec('Suspensão Dianteira', 'Independente'),
      spec('Suspensão Traseira', 'Eixo rígido'),
      spec('Altura Livre do Solo (mm)', 222),
      spec('Comprimento (mm)', 5360),
      spec('Largura (mm)', 1930),
      spec('Altura (mm)', 1815),
      spec('Distância entre Eixos (mm)', 3130),
      spec('Peso em Ordem de Marcha (kg)', 2130),
      spec('Peso Bruto Total (kg)', 3210),
      spec('Ângulo de Ataque (°)', 29),
      spec('Ângulo de Saída (°)', 23),
      spec('Ângulo de Rampa (°)', 24),
      spec('Capacidade de Carga (kg)', 1080),
      spec('Capacidade de Reboque (kg)', 3500),
      spec('Capacidade do Tanque (L)', 76),
      spec('Rodas', '20" diamantadas escurecidas'),
      spec('Pneus', 'Conforme configuração Katana'),
      spec('Airbags', 7),
      spec('Central Multimídia', '9" wireless'),
      spec('Câmera 360°', 'Sim'),
      spec('ACC', 'Sim'),
    ],
  },

  // Referências full-size: permanecem pesquisáveis, mas não são equivalentes
  // dimensionais diretas às picapes médias.
  'ram-1500': {
    brand: 'RAM',
    model: '1500',
    version: 'Laramie 3.0 Hurricane AT8 2026',
    source: 'RAM Brasil — Família de Picapes RAM',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2026),
      spec('Categoria', 'Picape full-size'),
      spec('Motor (Descrição)', '3.0L Hurricane 6 Biturbo'),
      spec('Cilindrada (cm³)', 3000),
      spec('Número de Cilindros', 6),
      spec('Configuração do Motor', '6 cilindros em linha'),
      spec('Tipo de Combustível', 'Gasolina'),
      spec('Potência Máxima (cv)', 426),
      spec('Torque Máximo (Nm)', 635),
      spec('Transmissão', 'Automática de 8 velocidades'),
      spec('Número de Marchas', 8),
      spec('Tração', '4x4'),
      spec('Aceleração 0-100 km/h (s)', 5.3),
      spec('Capacidade de Carga (kg)', '524–557'),
      spec('Capacidade de Reboque (kg)', 4490),
      spec('Volume da Caçamba (L)', 1200),
      spec('Comprimento (mm)', 5903),
      spec('Largura (mm)', 2062),
      spec('Altura (mm)', 1971),
    ],
  },

  'ram-2500': {
    brand: 'RAM',
    model: '2500',
    version: 'Laramie 6.7 Cummins AT8 2026',
    source: 'RAM Brasil — Família de Picapes RAM',
    lastVerified: '2026-09-27',
    specs: [
      spec('Ano/Modelo', 2026),
      spec('Categoria', 'Picape full-size heavy duty'),
      spec('Motor (Descrição)', '6.7L Cummins Turbodiesel High-Output'),
      spec('Cilindrada (cm³)', 6700),
      spec('Número de Cilindros', 6),
      spec('Configuração do Motor', '6 cilindros em linha'),
      spec('Tipo de Combustível', 'Diesel'),
      spec('Potência Máxima (cv)', 436),
      spec('Torque Máximo (Nm)', 1461),
      spec('Transmissão', 'Automática de 8 velocidades'),
      spec('Número de Marchas', 8),
      spec('Tração', '4x4'),
      spec('Capacidade de Carga (kg)', 1001),
      spec('Capacidade de Reboque (kg)', 8948),
      spec('Volume da Caçamba (L)', 1280),
      spec('Comprimento (mm)', 6266),
      spec('Largura (mm)', 2120),
      spec('Altura (mm)', 1990),
    ],
  },
};

export const normalizeLookup = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const hasValidCharacters = (value: string): boolean =>
  /^[\p{L}\p{N}][\p{L}\p{N}\s.-]*$/u.test(value.trim());

export const getCatalogBrands = (): string[] =>
  Array.from(new Set(Object.values(COMPETITOR_SPECS_CACHE).map((item) => item.brand)));

export interface SearchValidation {
  valid: boolean;
  brandError: string | null;
  modelError: string | null;
  versionError: string | null;
}

export const validateCompetitorSearch = (
  brand: string,
  model: string,
  version = ''
): SearchValidation => {
  const trimmedBrand = brand.trim();
  const trimmedModel = model.trim();
  const trimmedVersion = version.trim();

  if (!trimmedBrand) {
    return { valid: false, brandError: 'Informe uma marca.', modelError: null, versionError: null };
  }

  if (!hasValidCharacters(trimmedBrand)) {
    return { valid: false, brandError: 'Termo inválido. Use letras, números, espaços ou hífen.', modelError: null, versionError: null };
  }

  const brandKey = normalizeLookup(trimmedBrand);
  const brandExact = Object.values(COMPETITOR_SPECS_CACHE).some(
    (item) => normalizeLookup(item.brand) === brandKey
  );

  if (!brandExact) {
    return { valid: false, brandError: 'Marca não encontrada no catálogo.', modelError: null, versionError: null };
  }

  if (!trimmedModel) {
    return { valid: false, brandError: null, modelError: 'Informe um modelo.', versionError: null };
  }

  if (!hasValidCharacters(trimmedModel)) {
    return { valid: false, brandError: null, modelError: 'Termo inválido. Use letras, números, espaços ou hífen.', versionError: null };
  }

  const modelKey = normalizeLookup(trimmedModel);
  const modelExact = Object.values(COMPETITOR_SPECS_CACHE).some(
    (item) => normalizeLookup(item.brand) === brandKey && normalizeLookup(item.model) === modelKey
  );

  if (!modelExact) {
    return { valid: false, brandError: null, modelError: 'Modelo não encontrado para esta marca.', versionError: null };
  }

  if (trimmedVersion && !hasValidCharacters(trimmedVersion)) {
    return { valid: false, brandError: null, modelError: null, versionError: 'Termo inválido. Use letras, números, espaços ou hífen.' };
  }

  if (trimmedVersion) {
    const versionKey = normalizeLookup(trimmedVersion);
    const versionExists = Object.values(COMPETITOR_SPECS_CACHE).some(
      (item) => normalizeLookup(item.brand) === brandKey
        && normalizeLookup(item.model) === modelKey
        && normalizeLookup(item.version).includes(versionKey)
    );

    if (!versionExists) {
      return { valid: false, brandError: null, modelError: null, versionError: 'Versão não encontrada para este veículo.' };
    }
  }

  return { valid: true, brandError: null, modelError: null, versionError: null };
};

export const findCompetitor = (
  brand: string,
  model: string,
  version = ''
): VehicleComparison | null => {
  const normalizedBrand = normalizeLookup(brand);
  const normalizedModel = normalizeLookup(model);
  const normalizedVersion = normalizeLookup(version);

  return Object.values(COMPETITOR_SPECS_CACHE).find((item) => {
    const sameBrand = normalizeLookup(item.brand) === normalizedBrand;
    const sameModel = normalizeLookup(item.model) === normalizedModel;
    const versionMatches = !normalizedVersion || normalizeLookup(item.version).includes(normalizedVersion);
    return sameBrand && sameModel && versionMatches;
  }) ?? null;
};

// Compatibilidade com o código antigo do MVP.
export const simulateAIResponse = async (
  brand: string,
  model: string,
  version?: string
): Promise<VehicleComparison> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const competitor = findCompetitor(brand, model, version ?? '');
      if (competitor) {
        resolve(competitor);
        return;
      }
      reject(new Error('Competidor não encontrado no catálogo local.'));
    }, 180);
  });
};
