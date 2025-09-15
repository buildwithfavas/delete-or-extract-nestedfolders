const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

// Folder path (change if needed)
const rootFolder = "D:\\Javascript Pro Mastering Advanced Concepts and Techniques(₹599)";

function extractAndDeleteZips(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      extractAndDeleteZips(filePath); // recurse into subfolder
    } else if (file.toLowerCase().endsWith(".zip")) {
      try {
        const zip = new AdmZip(filePath);

        // Extract into folder with same name (without .zip)
        const targetDir = filePath.replace(/\.zip$/i, "");
        zip.extractAllTo(targetDir, true);

        console.log("Extracted:", filePath, "→", targetDir);

        // Delete the zip file
        fs.unlinkSync(filePath);
        console.log("Deleted zip file:", filePath);
      } catch (err) {
        console.error("Error handling zip:", filePath, err);
      }
    }
  });
}

// Start extraction
extractAndDeleteZips(rootFolder);
console.log("All zips extracted and deleted!");
