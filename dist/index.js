"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDataURI = stringToDataURI;
exports.default = fetchFile;
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
// Function to download a file from a URL and return its content as a string or base64 data URI
async function fetchFile(url) {
    var _a;
    // Launch puppeteer and use page.evaluate to fetch the file
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    try {
        // Use fetch API within the browser context to download the file
        const { content, responseHeaders } = await page.evaluate(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to download asset: ${url} - ${response.status} ${response.statusText}`);
            }
            const buffer = await response.arrayBuffer();
            const content = Array.from(new Uint8Array(buffer));
            const responseHeaders = {};
            // Get headers
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            return { content, responseHeaders };
        }, url);
        // Convert array back to buffer
        const contentBuffer = Buffer.from(content);
        // Get MIME type from response headers
        const contentType = ((_a = responseHeaders["content-type"]) === null || _a === void 0 ? void 0 : _a.split(";")[0]) || "";
        // Get the file name and extension from the URL
        const fileName = path_1.default.basename(url.split("?")[0]);
        const fileExtension = path_1.default.extname(fileName);
        let output = "";
        // Use content type from headers if no extension, otherwise fall back to extension check
        const isTextBased = contentType.includes("text/") ||
            contentType.includes("application/javascript") ||
            contentType.includes("application/json") ||
            fileExtension === ".js" ||
            fileExtension === ".css" ||
            fileExtension === ".html";
        if (isTextBased) {
            // Convert buffer to string for text-based files
            output = contentBuffer.toString("utf-8");
        }
        else {
            // For other files convert to base64 data URI
            output = stringToDataURI(contentBuffer, fileName);
        }
        // Return the content
        return output;
    }
    catch (error) {
        throw new Error(`Error fetching file: ${error.message}`);
    }
    finally {
        // Close the browser
        await browser.close();
    }
}
//# sourceMappingURL=index.js.map