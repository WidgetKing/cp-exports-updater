module.exports = function (path) {
  const lastSlash = path.lastIndexOf("/");
  return path.substring(lastSlash + 1, path.length);
};
