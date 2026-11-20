# Painel do Professor

[![Testes do painel](https://github.com/adveduardo/Portuguescards/actions/workflows/testes.yml/badge.svg)](https://github.com/adveduardo/Portuguescards/actions/workflows/testes.yml)

Painel de aula para Língua Portuguesa e Inglês (6º ao 9º ano, EJA, Ensino Médio e alfabetização), feito para
**um projetor e poucos iPads antigos**. Tudo roda no navegador, direto do GitHub Pages: não precisa instalar nada.

## O que tem

- **PortuguêsCards** e centenas de atividades organizadas por assunto no menu (☰).
- **Jogos para a turma no projetor**: Lagoa, Ilha, Meteoros, Minhoca, Zumbis, Labirinto, Pênaltis, Cofre das Palavras,
  Robô Soletrador, Detetive do Mistério, Guardiões da Biblioteca, Ponte das Frases, Ritmo das Sílabas e outros.
- **Jogos com os iPads** (cada iPad é uma equipe, pelo `jogar.html`): Quiz ao Vivo, Stop, Bingo, Escape Room,
  Corrida das Equipes, Duelo de Monstrinhos, Conquista do Mapa…
- **Com o corpo e a voz**: Quatro Cantos, Estátua das Palavras e Karaokê de leitura.
- **Ferramentas da sala**: chamada, fila do banheiro, pote de conquistas, lousa, prova impressa, QR Code e mais.

## Como o conteúdo funciona

Cada jogo lê os arquivos da pasta `dados/` (bancos de questões, grupos de palavras, listas, textos…).
O arquivo `dados/indice.json` lista o que aparece nos seletores. Para criar conteúdo novo, basta copiar
um arquivo parecido, trocar os textos e registrar no índice: todos os jogos daquele tipo passam a usá-lo.

## Testes automáticos

A cada atualização no `main`, o GitHub Actions roda `testes/rodar.js`, que:

1. confere se todos os arquivos de conteúdo (JSON) abrem e se o índice só aponta para arquivos que existem;
2. confere se o menu não tem atividade repetida nem link quebrado;
3. confere se as páginas que rodam nos iPads antigos (iOS 9) usam JavaScript compatível (ES5) e só emoji que eles mostram;
4. abre **todas as páginas** num navegador de verdade e procura erros.

O selo lá em cima fica verde quando está tudo certo. Para rodar no computador:

```
cd testes
npm install
npx playwright install chromium
node rodar.js
```
