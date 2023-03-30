let murmurhash = require("murmurhash");
class BloomFilters {
  constructor(size, fp_probability) {
    this.fp_probability = fp_probability;
    this.size = this.getSizeArray(size, fp_probability);
    // console.log(this.size);
    this.hash_count = this.getHashCount(this.size, size);
    this.bitArray = new Array(this.size);

    this.bitArray.fill(0);
    // console.log(this);
  }
  add(item) {
    let tmps = [];
    let s = [];
    for (let i = 0; i < this.hash_count; i++) {
      let tmp = murmurhash(item, i) % this.size;
      tmps.push(tmp);

      this.bitArray[tmp] = 1;
      s.push(tmp);
    }
  }
  check(item) {
    let tmps = [];
    for (let i = 0; i < this.hash_count; i++) {
      let tmp = murmurhash(item, i) % this.size;
      if (this.bitArray[tmp] === 0) {
        return false;
      }
      tmps.push(true);
    }
    // console.log(tmps);
    return true;
  }

  getHashCount(m, n) {
    let k = (m / n) * Math.log(2);
    return Math.ceil(k);
  }
  getSizeArray(n, p) {
    let m = -(n * Math.log(p)) / (Math.log(2) * Math.log(2));
    console.log(m);
    return Math.floor(m);
  }
}

module.exports = BloomFilters;
