
export type ModuleType = 'warehouse' | 'pipes';

export enum Severity {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

export interface Alert {
  id: string;
  location: string;
  confidence: number;
  action: string;
  severity: Severity;
  timestamp: string;
}

export interface WarehouseStats {
  occupancy: number;
  pendingPutaway: number;
}

export interface PipeStats {
  pressure: number;
  flowRate: number;
  stability: number;
}
