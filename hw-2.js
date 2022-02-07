Array.prototype.includesCI = function (searchTerm) {
  let total = 0;
  let arrayOfIndexes = [];
  this.forEach((item, index) => {
    if (item.toLowerCase() === searchTerm.toLowerCase()) {
      total += 1;
      arrayOfIndexes.push(index);
    }
  });
  if (total > 0) {
    return true;
    // return total;
    // return arrayOfIndexes;
  } else {
    return false;
  }
};

const nameArray = ['jOhn', 'celine', 'doe', 'dion', 'john', 'JOHN'];

console.log(nameArray.includesCI('jOHn'));
