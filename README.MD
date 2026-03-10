# Lab 5 — Tablero Colaborativo en Tiempo Real

Aplicación web que permite a múltiples usuarios dibujar simultáneamente en un tablero compartido. Cada usuario tiene un color. Cualquier usuario puede borrar el tablero para todos.

---

## Estructura del proyecto

```
collaborative-board/
├── frontend/                         ← React + Vite + p5.js
│   ├── src/
│   │   ├── App.jsx                   ← Componente principal
│   │   ├── main.jsx                  ← Punto de entrada React
│   │   └── index.css                 ← Estilos globales
│   ├── index.html                    ← Entry point Vite
│   ├── vite.config.js
│   └── package.json
│
├── backend/board/                    ← Spring Boot + WebSocket
│   └── src/main/java/com/lab5/board/
│       ├── BoardApplication.java     ← Clase principal
│       ├── config/
│       │   └── WebSocketConfig.java  ← Configuración WebSocket + CORS
│       ├── controller/
│       │   └── BoardController.java  ← Manejo de mensajes
│       └── model/
│           └── LineMessage.java      ← Modelo de datos
│
└── static/                           ← HTML puro y sketch
    ├── index.html
    └── js/
        └── sketch.js
```

---

## Tecnologías

| Localización | Tecnología | Uso |
|---|---|---|
| Frontend | React + Vite | Componentes y bundling |
| Dibujo | p5.js | Canvas interactivo |
| Comunicación | WebSocket + STOMP | Mensajes en tiempo real |
| Backend | Spring Boot  | Servidor de mensajes |
| Auth config | WebSocketConfig | CORS y endpoints |
| Modelo | Lombok `@Data` | Serialización de mensajes |

---

## Flujo de comunicación

```
Usuario dibuja en p5.js
        ↓
App.jsx publica en /app/draw
        ↓
BoardController recibe y hace @SendTo /topic/board
        ↓
Todos los clientes suscritos reciben el trazo
        ↓
p5.js dibuja el trazo en el canvas de cada usuario
```

---

## Cómo correr localmente

**Terminal 1 — Backend:**
```powershell
cd backend\board
.\mvnw spring-boot:run
```

**Terminal 2 — Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173` en múltiples pestañas para simular varios usuarios.

---

## Tests unitarios

```powershell
cd backend\board
.\mvnw test
```

Cubren: `handleDraw` retorna `type=draw`, `handleClear` retorna `type=clear`, preservación de campos `x`, `y`, `color` y `userId`.

---