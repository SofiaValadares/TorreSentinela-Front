export interface TorreSentinelaData {
  torreIP: string;
  latitude: number;
  longitude: number;
  tempoSemChuva?: number;
  erroCode?: string;
}

export interface TorreSentinelaDataInterval {
  data: number;
  duracao: number;
}

export interface TorreSentinelaHistory {
  torreSentinela: TorreSentinelaData;
  dataAdd: number;
  historyChuvas: TorreSentinelaDataInterval[];
  historySecas: TorreSentinelaDataInterval[];

  chovendoAgora?: boolean;
  inicioChuvaAtual?: number | null;
  inicioSecaAtual?: number | null;
}
