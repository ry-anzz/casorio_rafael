import imgCozinha from '../assets/07_Presentes__cozinha.png';
import imgLavanderia from '../assets/07_Presentes__lavanderia.png';
import imgBanheiros from '../assets/07_Presentes__banheiros.png';
import imgQuarto from '../assets/07_Presentes__quarto.png';
import imgSala from '../assets/07_Presentes__sala.png';
import imgExperiencias from '../assets/07_Presentes__experiencias.png';

// Lê todas as fotos das pastas. (Vite 4 ou anterior: troque `query: '?url'` por `as: 'url'`)
const arquivos = import.meta.glob(
  '../assets/presentes/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' }
);

function interpretarArquivo(caminho, url) {
  const partes = caminho.split('/');
  const pasta = partes[partes.length - 2];
  const arquivo = partes[partes.length - 1].replace(/\.[^.]+$/, '');

  // "Aspirador de pó - R$ 700"  →  nome + preço
  const [nomeBruto, ...resto] = arquivo.split(' - ');
  const trechoPreco = resto.join(' - ');
  const match = trechoPreco.match(/R\$\s*([\d.]+(?:,\d+)?)/);
  const preco = match ? Number(match[1].replace(/\./g, '').replace(',', '.')) : null;

  const nome = nomeBruto
    .replace(/\s*\((foto\s*\d+|item a confirmar)\)/gi, '') // tira "(foto 1)"
    .replace(/\s+\d+$/, '')                                // tira " 1" / " 2" no final
    .trim();

  return { pasta, nome, preco, imagem: url };
}

const todosItens = Object.entries(arquivos).map(([caminho, url]) =>
  interpretarArquivo(caminho, url)
);

export const categorias = [
  { slug: 'cozinha', nome: 'COZINHA', titulo: 'Cozinha', unidade: 'PRESENTES', img: imgCozinha },
  { slug: 'lavanderia', nome: 'LAVANDERIA', titulo: 'Lavanderia', unidade: 'PRESENTES', img: imgLavanderia },
  { slug: 'banheiros', nome: 'BANHEIROS', titulo: 'Banheiros', unidade: 'PRESENTES', img: imgBanheiros },
  { slug: 'quarto', nome: 'QUARTO', titulo: 'Quarto', unidade: 'PRESENTES', img: imgQuarto },
  { slug: 'sala', nome: 'SALA DE ESTAR & JANTAR', titulo: 'Sala de Estar & Jantar', unidade: 'PRESENTES', img: imgSala },
  { slug: 'experiencias', nome: 'EXPERIÊNCIAS & LUA DE MEL', titulo: 'Experiências & Lua de Mel', unidade: 'COTAS', img: imgExperiencias },
];

export function itensDaCategoria(slug) {
  return todosItens
    .filter((i) => i.pasta === slug)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export function contarItens(slug) {
  return todosItens.filter((i) => i.pasta === slug).length;
}

export function formatarPreco(valor) {
  if (valor == null) return 'Valor a confirmar';
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  });
}