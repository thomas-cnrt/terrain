var cols, rows;
var scl = 20;
var w = 2500;
var h = 2000;

var flying = 0;

var terrain;
var is_motion_started = false;

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
    if (is_motion_started) {
        flying -= 0.20;
    }

    var y_offset = flying;
    for (var y = 0; y < rows; y++) {
        var x_offset = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(x_offset, y_offset), 0, 1, -100, 100);
            x_offset += 0.15;
        }
        y_offset += 0.1;
    }

    background(0);
    stroke(255);
    fill(51);

    rotateX(PI / 2.3);
    translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }
}
