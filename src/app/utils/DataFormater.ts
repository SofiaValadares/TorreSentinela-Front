export function formatarDataChuvaFromSegundos(tempoSegundos: number): string {
  if (tempoSegundos < 0 || isNaN(tempoSegundos)) {
    return "Inválido";
  }

  if (tempoSegundos === 0) {
    return "ESTA CHUVENDO AGORA!!!";
  }

  const dias = Math.floor(tempoSegundos / 86400);
  tempoSegundos %= 86400;

  const horas = Math.floor(tempoSegundos / 3600);
  tempoSegundos %= 3600;

  const minutos = Math.floor(tempoSegundos / 60);
  const segundos = tempoSegundos % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  const tempoFormatado = `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;

  if (dias > 0) {
    const plural = dias === 1 ? 'dia' : 'dias';
    return `${dias} ${plural} ${tempoFormatado}`;
  }

  return tempoFormatado;
}

export function formatarDataHoraFromMs(timestamp: number): string {
  const data = new Date(timestamp);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const hora = String(data.getHours()).padStart(2, '0');
  const min = String(data.getMinutes()).padStart(2, '0');
  const seg = String(data.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} às ${hora}:${min}:${seg}`;
}

export function formatarDataFromMs(timestamp: number): string {
  const data = new Date(timestamp);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano} `;
}

export function formatarHoraFromS(seg: number): string {
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;

  const partes = [];
  if (h > 0) partes.push(`${h}h`);
  if (m > 0) partes.push(`${m}m`);
  partes.push(`${s}s`);

  return partes.join(" ");
}

