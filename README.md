# F1 Dashboard 2026

Dashboard de Fórmula 1 en tiempo real para el campeonato 2026.  
Construido con **React + Vite + Tailwind CSS**, consumiendo la [Jolpica F1 API](https://api.jolpi.ca) (sucesor oficial de Ergast).

![Preview](https://img.shields.io/badge/F1-Dashboard-E10600?style=for-the-badge&logo=react)

---

## Features

- **Campeonato de Pilotos** — tabla completa con colores de escudería, puntos y victorias
- **Campeonato de Constructores** — standings con barra de progreso por equipo
- **Calendario 2025** — todos los GPs con filtros por pasados/próximos
- **Resultados de carrera** — hacé click en cualquier GP pasado para ver el top 10
- Diseño oscuro estilo F1 oficial
- Totalmente responsive

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React 18** | UI components y estado |
| **Vite 5** | Build tool y dev server |
| **Tailwind CSS 3** | Estilos utilitarios |
| **Jolpica F1 API** | Datos en tiempo real |
| **JavaScript ES6+** | Lógica de la app |

---

## API utilizada

**[Jolpica F1 API](https://api.jolpi.ca)** — Open source, sin autenticación, límite de 200 req/hora.

Endpoints principales:
- `GET /ergast/f1/2026/driverStandings.json` — Standings de pilotos
- `GET /ergast/f1/2026/constructorStandings.json` — Standings de constructores
- `GET /ergast/f1/2026.json` — Calendario completo
- `GET /ergast/f1/2026/{round}/results.json` — Resultados por ronda

---

## Licencia

MIT — libre para usar y modificar.
