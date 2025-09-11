const fs = require("fs");
const path = require("path");

// Files to delete (case-insensitive)
const targets = ["IMPORTANT.txt", "README.txt", "README.url"];

function deleteTargets(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      deleteTargets(filePath);
    } else {
      // Check if file matches (case-sensitive)
      if (targets.includes(file)) {
        try {
          fs.unlinkSync(filePath);
          console.log("Deleted file:", filePath);
        } catch (err) {
          console.error("Error deleting file:", filePath, err);
        }
      }
    }
  });
}

// Start cleaning from current directory
deleteTargets("D:\\Javascript Pro Mastering Advanced Concepts and Techniques(₹599)");
console.log("Cleanup finished!");
