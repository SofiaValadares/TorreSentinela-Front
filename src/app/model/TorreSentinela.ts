export interface TorreSentinelaData {
  torreIP: string;
  latitude: number;
  longitude: number;
  tempoSemChuva?: number;
}

export interface TorreSentinelaChuva {
  data: number;
  duracao: number;
}

export interface TorreSentinelaHistory {
  torreSentinela: TorreSentinelaData;
  dataAdd: number;
  historyChuvas: TorreSentinelaChuva[];

  chovendoAgora?: boolean;
  inicioChuvaAtual?: number | null;
}
