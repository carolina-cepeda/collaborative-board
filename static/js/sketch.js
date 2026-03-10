//Esta función se ejecuta una sola vez al inicio del script.
function setup() {
 createCanvas(640, 480);
}
// Esta función se ejecuta repetidas veces indefinidamente.
function draw() {
 if (mouseIsPressed === true) {
 fill(0,0,0);
 ellipse(mouseX, mouseY, 20, 20);
 }
 if (mouseIsPressed === false) {
 fill(255,255,255);
 }

}