// utils/dataFormatter.ts
import { VehicleSpec } from '../types/index';

/**
 * Formata um valor de especificação, tratando null/undefined como "Não disponível"
 */
export const formatSpecValue = (valor: string | number | null | undefined): string => {
  if (valor === null || valor === undefined || valor === '') {
    return 'Não disponível';
  }
  return String(valor);
};

/**
 * Verifica se um valor de especificação está ausente
 */
export const isMissingValue = (valor: string | number | null | undefined): boolean => {
  return valor === null || valor === undefined || valor === '';
};

/**
 * Alinha especificações entre Ford e veículo concorrente
 * Retorna lista combinada com todos os atributos, preenchendo lacunas
 */
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
  const specMap = new Map<string, VehicleSpec>();

  // Adiciona todas as especificações da Ford
  fordSpecs.forEach(spec => {
    specMap.set(spec.atributo, spec);
  });

  // Adiciona especificações do competidor (sobrescreve se duplicado)
  competitorSpecs.forEach(spec => {
    if (!specMap.has(spec.atributo)) {
      specMap.set(spec.atributo, spec);
    }
  });

  // Constrói lista alinhada
  const aligned: Array<{
    atributo: string;
    ford: string;
    competitor: string;
    isFordMissing: boolean;
    isCompetitorMissing: boolean;
  }> = [];

  fordSpecs.forEach(fordSpec => {
    const competitorSpec = competitorSpecs.find(
      cs => cs.atributo === fordSpec.atributo
    );

    const isFordMissing = isMissingValue(fordSpec.valor);
    const isCompetitorMissing = isMissingValue(competitorSpec?.valor);

    aligned.push({
      atributo: fordSpec.atributo,
      ford: formatSpecValue(fordSpec.valor),
      competitor: formatSpecValue(competitorSpec?.valor),
      isFordMissing,
      isCompetitorMissing
    });
  });

  // Adiciona especificações do competidor que não existem na Ford
  competitorSpecs.forEach(competitorSpec => {
    if (!fordSpecs.some(fs => fs.atributo === competitorSpec.atributo)) {
      aligned.push({
        atributo: competitorSpec.atributo,
        ford: 'Não disponível',
        competitor: formatSpecValue(competitorSpec.valor),
        isFordMissing: true,
        isCompetitorMissing: isMissingValue(competitorSpec.valor)
      });
    }
  });

  return aligned;
};

/**
 * Compara dois valores numéricos e retorna a diferença
 */
export const calculateDifference = (ford: number, competitor: number): number => {
  return ((ford - competitor) / competitor) * 100;
};

/**
 * Formata timestamp para data legível
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
