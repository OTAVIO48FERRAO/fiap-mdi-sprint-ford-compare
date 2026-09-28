// utils/dataFormatter.ts
import { VehicleSpec } from '../types/index';

export const formatSpecValue = (valor: string | number | null | undefined): string => {
  if (valor === null || valor === undefined || valor === '') return '';
  return String(valor);
};

export const isMissingValue = (valor: string | number | null | undefined): boolean =>
  valor === null || valor === undefined || valor === '';

const normalizeAttribute = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\bcapacidade de tanque\b/g, 'capacidade do tanque')
    .replace(/\bcapacidade tanque\b/g, 'capacidade do tanque')
    .trim();

export const alignSpecifications = (
  fordSpecs: VehicleSpec[],
  competitorSpecs: VehicleSpec[]
): Array<{
  atributo: string;
  ford: string;
  competitor: string;
  isFordMissing: boolean;
  isCompetitorMissing: boolean;
}> => {
  const competitorMap = new Map<string, VehicleSpec>();
  competitorSpecs.forEach((item) => {
    if (!isMissingValue(item.valor)) {
      competitorMap.set(normalizeAttribute(item.atributo), item);
    }
  });

  return fordSpecs
    .filter((fordSpec) => !isMissingValue(fordSpec.valor))
    .map((fordSpec) => {
      const competitorSpec = competitorMap.get(normalizeAttribute(fordSpec.atributo));
      if (!competitorSpec || isMissingValue(competitorSpec.valor)) return null;

      return {
        atributo: fordSpec.atributo,
        ford: formatSpecValue(fordSpec.valor),
        competitor: formatSpecValue(competitorSpec.valor),
        isFordMissing: false,
        isCompetitorMissing: false,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
};

export const calculateDifference = (ford: number, competitor: number): number => {
  if (competitor === 0) return 0;
  return ((ford - competitor) / competitor) * 100;
};

export const formatTimestamp = (timestamp: number): string =>
  new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
