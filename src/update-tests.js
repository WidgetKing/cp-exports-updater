const gglob = require("glob"),
  gulp = require("gulp");

function getFileDirectory(path) {
  var lastSlash = path.lastIndexOf("/");
  return path.substring(0, lastSlash);
}

exports.updateGlob = (glob, newFile, done) => {
  // Convert glob to an array of file paths
  gglob(glob, {}, (er, files) => {
    // Will save the last stream so we can listen for its completion.
    var stream;

    files.forEach((filePath) => {
      // Extract directory from file path
      const fileDirectory = getFileDirectory(filePath);

      // Uncomment if you want to see each update directory listed individually
      console.log("Updating: " + fileDirectory);

      stream = gulp
        .src(newFile)
        // Save the new version over the currently located CpExtra instance
        .pipe(gulp.dest(fileDirectory));
    });

    // This is hte last stream. When it has been completed we will
    // signal that the action is complete.
    if (stream) stream.on("end", done);
  });
};
