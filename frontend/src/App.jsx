import { useRef, useEffect } from 'react';
import * as p5lib from 'p5';

const P5 = p5lib.default || p5lib;

function App() {
  const containerRef = useRef(null);

  const sketch = function (p) {
    p.setup = function () {
      p.createCanvas(700, 410);
      p.background(255);
    };

    p.draw = function () {
      if (p.mouseIsPressed === true) {
        p.fill(0, 0, 0);
        p.noStroke();
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
      }
      if (p.mouseIsPressed === false) {
        p.fill(255, 255, 255);
      }
    };
  };

  /*useEffect(() => {
    const myp5 = new P5(sketch, containerRef.current);
    return () => myp5.remove();
  }, []);
*/
  useEffect(() => {
    console.log('ref:', containerRef.current); // debe mostrar el div
    console.log('P5:', P5);                    // debe mostrar la función
    const myp5 = new P5(sketch, containerRef.current);
    return () => myp5.remove();
  }, []);
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
      <div
        ref={containerRef}
        style={{
          border: '3px solid black',
          padding: 12
        }}
      />
    </div>
  );
}

export default App;