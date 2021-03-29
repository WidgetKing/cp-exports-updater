const serverConfig = require("../cp-exports-updater.config.json").server,
  { src } = require("gulp"),
  callWithCooldown = require("./utils/callWithCooldown.js"),
  connect = require("gulp-connect");

module.exports.start = (done) => {
  connect.server(
    {
      root: serverConfig.root,
      livereload: true,
      port: serverConfig.port,
    },
    function () {
      this.server.on("close", done);
    }
  );
};

module.exports.reload = callWithCooldown((filepath) => {
  console.log("RELOADING TEST SERVER");
  src(filepath, { read: false }).pipe(connect.reload());
});
