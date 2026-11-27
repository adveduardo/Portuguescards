# Mapa de Leilões

Mapa de imóveis em leilão com filtros, no estilo dos agregadores de leilão. Roda direto no GitHub Pages
(`/leiloes/`), sem servidor.

## O que já faz
- Mapa (OpenStreetMap + Leaflet) com pinos coloridos pelo desconto (verde ≥ 50%, laranja ≥ 30%, vermelho abaixo) e agrupamento.
- Filtros: estado, cidade, tipo, modalidade, faixa de lance, desconto mínimo, data, leiloeiro, financiamento, FGTS, desocupado, favoritos.
- Lista ordenável (maior desconto, menor lance, data mais próxima…) e ficha de cada imóvel com 1ª/2ª praça.
- Calculadora de custo real: comissão do leiloeiro, ITBI, registro, débitos, desocupação e reforma.
- Cadastro manual de imóveis (com busca do endereço no mapa), favoritos, exportação CSV/JSON e importação.

## Dados
- `dados/imoveis.json`: imóveis coletados. Hoje só tem **exemplos fictícios** (`"exemplo": true`).
- `dados/leiloeiros.json`: sites acompanhados.
- Imóveis adicionados à mão ficam no navegador de quem usa (use ⇅ Dados para backup).

### Formato de um imóvel
```json
{ "id": "leiloeiro-123", "titulo": "Apartamento 2 quartos", "tipo": "Apartamento",
  "modalidade": "Judicial", "leiloeiro": "Nome", "url": "https://...",
  "endereco": "Rua X, 10", "bairro": "Centro", "cidade": "Campinas", "uf": "SP",
  "lat": -22.9, "lng": -47.06, "avaliacao": 500000, "area": 70, "quartos": 2, "vagas": 1,
  "pracas": [{"data": "2027-01-10", "valor": 500000}, {"data": "2027-01-24", "valor": 250000}],
  "financiavel": false, "fgts": false, "ocupado": null, "foto": "https://...", "obs": "" }
```

## Próximo passo
Um coletor por leiloeiro (`coletor/`), rodando todo dia pelo GitHub Actions, que lê os sites e atualiza
`dados/imoveis.json`.
