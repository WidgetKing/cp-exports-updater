const config = require("./cp-exports-updater.config.json"),
  getFileName = require("./src/utils/getFileName.js"),
  server = require("./src/server"),
  { watch, series, parallel } = require("gulp");
const { updateGlob } = require("./src/update-tests");
const makeGlob = require("./src/utils/makeGlob");

exports.update = (done) => {
  console.log(config);

  done();
};

exports.server = (done) => {
  server.start(done);
};

exports.watchRepos = (done) => {
  config.watch.forEach((file) => {
    const fileName = getFileName(file);
    const glob = makeGlob(config.server.root, fileName);

    watch(file, { usePolling: true }, (done) => {
      return updateGlob(glob, file, () => {
        console.log("Updated: " + fileName);
        server.reload(file);
        done();
      });
    });
  });
};

module.exports.default = parallel(exports.server, exports.watchRepos);
