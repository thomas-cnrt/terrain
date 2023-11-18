var cols, rows;
var scl = 20;
var w = 2500;
var h = 2000;

var flying = 0;

var terrain;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cols = w / scl;
    rows = h / scl;
    terrain = new Array(cols);
    for (var i = 0; i < cols; i++) {
        terrain[i] = new Array(rows);
    }
}

function draw() {
    flying -= 0.20;

    var yoff = flying;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
            xoff += 0.15;
        }
        yoff += 0.1;
    }

    background(0);
    stroke(255);
    fill(51);

    // translate(width / 2, height / 2);
    rotateX(PI / 2.3);
    translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
            // rect(x * scl, y * scl, scl, scl);
        }
        endShape();
    }
}
