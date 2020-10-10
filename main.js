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

    //child of the node
    this.northEast = null;
    this.northWest = null;
    this.southWest = null;
    this.southEast = null;
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

  subdivide() {
    console.log("i am subdivided");
  }

  insert(point) {
    // ------------------check if it can contain this point -----------------------------------
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      this.subdivide();
    }
  }
}

let quadTree1 = new quadTree(0, 0, 20, 20);
for (let i = 0; i < 8; i++) {
  let point = new Point(10, 10);
  if (quadTree1.boundaryCheck(point)) {
    quadTree1.insert(point);
  }
}
console.log(quadTree1);
