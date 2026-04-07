import { useRef, useEffect, useState } from 'react';
import * as p5lib from 'p5';
import { Client } from '@stomp/stompjs';

const P5 = p5lib.default || p5lib;

const COLORS = [
  'rgb(218, 72, 72)',
  'rgb(255, 217, 61)',
  'rgb(255, 18, 204)',
  'rgb(77, 150, 255)',
  'rgb(18, 233, 72)',
  'rgb(204, 93, 232)',
  'rgb(32, 201, 151)',
  'rgb(37, 88, 164)',
];

function getMyColor() {
  let color = sessionStorage.getItem('myColor');
  if (!color) {
    color = COLORS[Math.floor(Math.random() * COLORS.length)];
    sessionStorage.setItem('myColor', color);
  }
  return color;
}

function App() {
  const containerRef = useRef(null);
  const stompClientRef = useRef(null);
  const linesRef = useRef([]);
  const shouldClearRef = useRef(false);
  const [connected, setConnected] = useState(false);
  const myColor = useRef(getMyColor());

  useEffect(() => {
    const client = new Client({
      brokerURL: import.meta.env.VITE_WS_URL|| 'ws://localhost:8080/ws-board/websocket',
      onConnect: () => {
        setConnected(true);
        client.subscribe('/topic/board', (message) => {
          const data = JSON.parse(message.body);
          if (data.type === 'clear') {
            linesRef.current = [];
            shouldClearRef.current = true;
          } else {
            linesRef.current.push(data);
          }
        });
      },
      onDisconnect: () => setConnected(false),
    });
    client.activate();
    stompClientRef.current = client;
    return () => client.deactivate();
  }, []);

  useEffect(() => {
    const sketch = function (p) {
      p.setup = function () {
        p.createCanvas(350, 410);
        p.background(250);
      };

      p.draw = function () {
        if (shouldClearRef.current) {
          p.background(255);
          shouldClearRef.current = false;
        }

        while (linesRef.current.length > 0) {
          const line = linesRef.current.shift();
          p.fill(line.color);
          p.noStroke();
          p.ellipse(line.x, line.y, 20, 20);
        }

        if (p.mouseIsPressed === true) {
          p.fill(myColor.current);
          p.noStroke();
          p.ellipse(p.mouseX, p.mouseY, 20, 20);

          if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
              destination: '/app/draw',
              body: JSON.stringify({
                x: p.mouseX,
                y: p.mouseY,
                color: myColor.current,
              }),
            });
          }
        }

        if (p.mouseIsPressed === false) {
          p.fill(255, 255, 255);
        }
      };
    };

    const myp5 = new P5(sketch, containerRef.current);
    return () => myp5.remove();
  }, []);

  function handleClear() {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: '/app/clear',
        body: JSON.stringify({ type: 'clear' }),
      });
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 200,
      gap: 16
    }}>
      <h1>Tablero de Dibujo</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          backgroundColor: connected ? 'green' : 'red'
        }} />
        <span>{connected ? 'Conectado' : 'Desconectado'}</span>
        <div style={{
          width: 20, height: 20,
          backgroundColor: myColor.current,
          border: '1px solid black'
        }} />
        <span>Tu color</span>
      </div>

      <div
        ref={containerRef}
        style={{ border: '3px solid black', padding: 12 }}
      />

      <button onClick={handleClear}>Borrar para todos</button>
    </div>
  );
}

export default App;