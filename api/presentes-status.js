import { itensPagos, CATEGORIAS_MULTIPLAS } from './_supabase.js';

export default async function handler(req, res) {
  try {
    const linhas = await itensPagos();
    const chaves = linhas
      .filter((l) => !CATEGORIAS_MULTIPLAS.includes(l.categoria))
      .map((l) => `${l.categoria}|${l.item}`);

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json({ pagos: [...new Set(chaves)] });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ pagos: [] }); // se falhar, o site continua funcionando
  }
}