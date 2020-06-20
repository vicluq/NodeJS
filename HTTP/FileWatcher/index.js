const fs = require("fs");

const path = "./../../../../../../Downloads";
console.log("Watching: ", path);

const watcher = fs.watch(path, (event, filename) => {
  console.log(event, filename);

  const getExt = filename.trim().split(".");
  const ext = getExt[getExt.length - 1];

  fs.exists(path + `/${filename}`, (exists) => {
    //the event is triggered for before and after the rename, and the before no longer exists so i did this to prevent errors
    if (
      (ext === "png" || ext === "jpg" || ext === "jpeg") &&
      event === "rename" &&
      exists
    ) {
      fs.copyFile(
        path + `/${filename}`,
        `../../../../../Imagens/${filename}`,
        (err) => {
          // copy file finishing callback
          if (err) {
            console.log(err);
          } else {
            console.log("copied file");
            fs.unlink(path + `/${filename}`, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Original Deleted");
              }
            });
          }
        }
      );
    }

    if (
      (ext === "mp4" || ext === "mov" || ext === "avi") &&
      event === "rename" &&
      exists
    ) {
      fs.copyFile(
        path + `/${filename}`,
        `../../../../../../Videos/${filename.trim()}`,
        (err) => {
          // copy file finishing callback
          if (err) {
            console.log(err);
          } else {
            console.log("copied file");
            fs.unlink(path + `/${filename}`, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Original Deleted");
              }
            });
          }
        }
      );
    }
  });
});
