"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDataURI = stringToDataURI;
exports.downloadAsset = downloadAsset;
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
const puppeteer_1 = __importDefault(require("puppeteer"));
// Convert a file to base64 data URI
function stringToDataURI(content, fileName) {
    // Get the MIME type of the file
    const mimeType = mime_1.default.getType(fileName) || "application/octet-stream";
    // Convert the content to base64
    const base64Data = content.toString("base64");
    // Return the data URI
    return `data:${mimeType};base64,${base64Data}`;
}
// Function to download a file from a URL and save it to the output directory
async function downloadAsset(url) {
    // Launch puppeteer and navigate to the URL
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    const viewResponse = await page.goto(url, { waitUntil: "networkidle2" });
    if (!viewResponse || !viewResponse.ok()) {
        throw new Error(`Failed to download asset: ${url}`);
    }
    // Get the response buffer
    const content = await viewResponse.buffer();
    // Get the file name and extension from the URL
    const fileName = path_1.default.basename(url.split("?")[0]);
    const fileExtension = path_1.default.extname(fileName);
    let output = "";
    if (fileExtension === ".js" || fileExtension === ".css" || fileExtension === ".html") {
        // Convert buffer to string for text-based files
        output = content.toString("utf-8");
    }
    else {
        // For other files convert to base64 data URI
        output = stringToDataURI(content, fileName) || "";
    }
    // Close the browser
    await browser.close();
    // Return the path where the file was saved
    return output;
}
//# sourceMappingURL=index.js.map