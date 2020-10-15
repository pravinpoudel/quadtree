class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class quadTree {
  constructor(x, y, w, h) {
    //dimensional and positional detail

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.splitted = false;

    this.points = [];
    this.capacity = 5;
  }

  boundaryCheck(point) {
    console.log(
      (point.x >= this.x) +
        " and " +
        (point.x <= this.x + this.width) +
        " and " +
        (point.y >= this.y) +
        " and " +
        (point.y <= this.y + this.height)
    );

    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  split(point) {
    if (this.splitted === false) {
      this.splitted = true;
      let widthhalf = this.width / 2;
      let heighthalf = this.height / 2;

      this.northWest = new quadTree(this.x, this.y, widthhalf, heighthalf);

      this.northEast = new quadTree(
        this.x + widthhalf,
        this.y,
        widthhalf,
        heighthalf
      );
      this.southWest = new quadTree(
        this.x,
        this.y + heighthalf,
        widthhalf,
        heighthalf
      );
      this.southEast = new quadTree(
        this.x + widthhalf,
        this.y + heighthalf,
        widthhalf,
        heighthalf
      );
    }
    this.northWest.insert(point);
    this.northEast.insert(point);
    this.southWest.insert(point);
    this.southEast.insert(point);
  }

  insert(point) {
    console.log(this.boundaryCheck(point));
    if (!this.boundaryCheck(point)) {
      return;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      this.split(point);
    }
  }
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.addEventListener("click", (event) => addPoint(event));

let quadTree1 = new quadTree(0, 0, 500, 400);
for (let i = 0; i < 11; i++) {
  let point = new Point(2, 2);
  quadTree1.insert(point);
}

function addPoint(event) {
  let element = event.target.getBoundingClientRect();
  let xPosition = event.clientX - element.left;
  let yPosition = event.clientY - element.top;
  let point = new Point(xPosition, yPosition);
  console.log(xPosition, yPosition);
  quadTree1.insert(point);
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log(quadTree1);
  draw(quadTree1);
}

function draw(obj) {
  context.strokeRect(obj.x, obj.y, obj.width, obj.height);
  if (obj.northEast) {
    draw(obj.northEast);
    draw(obj.northWest);
    draw(obj.southEast);
    draw(obj.southWest);
  }
}

draw(quadTree1);

console.log(quadTree1);
