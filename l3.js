const camera = new Float64Array(18);
camera.update = function() {
  let a = this[0] - this[3], b = this[1] - this[4], c = this[2] - this[5],
    temp = Math.sqrt(a * a + b * b + c * c);
  this[7] = a / temp;
  this[8] = b / temp;
  this[9] = c / temp;
  a = Math.sqrt(this[7] * this[7] + this[9] * this[9]);
  b = this[8] / a;
  this[10] = this[9] / -a;
  this[11] = this[7] / a;
  this[12] = this[7] * b;
  this[13] = -a;
  this[14] = this[9] * b;
  this[15] = this[7] * this[6] + this[0];
  this[16] = this[8] * this[6] + this[1];
  this[17] = this[9] * this[6] + this[2];
};
camera.project = function(x, y, z) {
  x -= this[15];
  y -= this[16];
  z -= this[17];
  const camDist = -this[6] / (this[7] * x + this[8] * y + this[9] * z), absDist = Math.abs(camDist);
  return [(x * this[10] + z * this[11]) * absDist, (x * this[12] + y * this[13] + z * this[14]) * absDist, camDist];
};
camera.orthProject = function(x, y, z) {
  x -= this[3];
  y -= this[4];
  z -= this[5];
  return [x * this[10] + z * this[11], x * this[12] + y * this[13] + z * this[14], x * this[7] + y * this[8] + z * this[9]];
}
Object.defineProperties(camera, {
  x: {
    get: function() { return this[0]; },
    set: function(x) { return this[0] = x; }
  },
  y: {
    get: function() { return this[1]; },
    set: function(y) { return this[1] = y; }
  },
  z: {
    get: function() { return this[2]; },
    set: function(z) { return this[2] = z; }
  },
  lx: {
    get: function() { return this[3]; },
    set: function(lx) { return this[3] = lx; }
  },
  ly: {
    get: function() { return this[4]; },
    set: function(ly) { return this[4] = ly; }
  },
  lz: {
    get: function() { return this[5]; },
    set: function(lz) { return this[5] = lz; }
  },
  p: {
    get: function() { return this[6]; },
    set: function(p) { return this[6] = p; }
  }
});
camera.x = camera.p = 1024;
camera.y = camera.z = camera.lx = camera.ly = camera.lz = 0;
camera.update();