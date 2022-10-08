function error(meg = "some thing went wrong", status = 500) {
  const e = new Error(meg);
  return e;
}
module.exports = error;
