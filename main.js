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

let quadTree1 = new quadTree(0, 0, 20, 20);
for (let i = 0; i < 8; i++) {
  let point = new Point(2, 2);
  quadTree1.insert(point);
}

console.log(quadTree1);
