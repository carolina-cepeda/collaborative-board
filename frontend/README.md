# Frontend — Tablero Colaborativo

Tecnologías: **React + Vite + p5.js**

---

## p5.js

Librería de dibujo creativo para el navegador. Expone funciones como `createCanvas`, `ellipse`, `fill` y variables como `mouseIsPressed`, `mouseX`, `mouseY`.

En el proyecto se usa en **modo instancia** (no global), lo que permite integrarlo dentro de un componente React sin conflictos:

```js
const sketch = function (p) {
  p.setup = function () { p.createCanvas(700, 410); };
  p.draw  = function () { };
};
```

---

## useRef

Permite guardar un valor que **persiste entre renders sin causar uno nuevo**. Se usa para dos cosas en este proyecto:

**1. Referenciar el div contenedor del canvas:**
```jsx
const containerRef = useRef(null);

<div ref={containerRef} />
```

**2. Guardar la instancia de p5 fuera del control de React:**
```jsx
const myp5 = new P5(sketch, containerRef.current);
```
Si se guardara en `useState`, cada cambio de estado destruiría y recrearía el canvas, lo cual no es 
necesario y gastaría más recursos.

---

## useEffect

Ejecuta código **después de que el componente se monta** en el Document Object Model (DOM). Es el lugar correcto para inicializar p5.js porque el `div` contenedor ya existe en ese momento.

```jsx
useEffect(() => {
  const myp5 = new P5(sketch, containerRef.current); 

  return () => myp5.remove(); 
}, []); 
```

Sin `useEffect`, `new P5(...)` se llamaría durante el render cuando el div todavía no existe en el DOM , lo que llevaría a una pantalla en blanco.

El `return` dentro del effect es la función de **limpieza**: se ejecuta cuando el componente se desmonta y evita que queden múltiples instancias de p5 activas.

---

## Importar p5 en React

p5 v2 cambió su formato de exportación. Para que funcione con ambas versiones:

```jsx
import * as p5lib from 'p5';
const P5 = p5lib.default || p5lib; 
```

---

## Estructura de App.jsx

```jsx
function App() {
  const containerRef = useRef(null);   

  const sketch = function (p) {        
    p.setup = function () { ... };
    p.draw  = function () { ... };
  };

  useEffect(() => {                    
    const myp5 = new P5(sketch, containerRef.current);
    return () => myp5.remove();       
  }, []);

  return <div ref={containerRef} />;   
}
```

--