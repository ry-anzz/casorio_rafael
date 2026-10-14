import fs from 'node:fs';
import path from 'node:path';

const raiz = 'src/assets/presentes';
const catalogo = {};

const limpar = (txt) =>
  txt
    .replace(/\s*\((foto\s*\d+|item a confirmar)\)/gi, '')
    .replace(/\s+\d+$/, '')
    .trim()
    .normalize('NFC');

for (const pasta of fs.readdirSync(raiz, { withFileTypes: true })) {
  if (!pasta.isDirectory()) continue;
  for (const arq of fs.readdirSync(path.join(raiz, pasta.name))) {
    if (!/\.(jpe?g|png|webp)$/i.test(arq)) continue;
    const base = arq.replace(/\.[^.]+$/, '');
    const [nomeBruto, ...resto] = base.split(' - ');
    const m = resto.join(' - ').match(/R\$\s*([\d.]+(?:,\d+)?)/);
    if (!m) continue; // sem preço: não vai para o checkout
    const preco = Number(m[1].replace(/\./g, '').replace(',', '.'));
    catalogo[`${pasta.name}|${limpar(nomeBruto)}`] = preco;
  }
}

fs.mkdirSync('api', { recursive: true });
fs.writeFileSync('api/_catalogo.js', `export default ${JSON.stringify(catalogo, null, 2)};\n`);
console.log(`Catálogo gerado com ${Object.keys(catalogo).length} itens.`);