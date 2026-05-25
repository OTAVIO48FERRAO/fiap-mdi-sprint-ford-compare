// types/index.ts
export interface VehicleSpec {
  atributo: string;
  valor: string | number | null;
}

export interface VehicleComparison {
  brand: string;
  model: string;
  version: string;
  specs: VehicleSpec[];
}

export interface ComparisonResult {
  ford: VehicleComparison;
  competitor: VehicleComparison;
  timestamp: number;
}

export interface TelemetryData {
  enginePower: string;
  engineTorque: string;
  fuelType: string;
  driveType: string;
  suspensionType: string;
  maxSpeed: string;
  acceleration0to100: string;
  timestamp: number;
}

export interface ComparisonContextType {
  comparison: ComparisonResult | null;
  setComparison: (comparison: ComparisonResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearComparison: () => void;
}
