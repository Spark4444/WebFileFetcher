import path from "path";
import mime from "mime";
import puppeteer from "puppeteer";

// Convert a file to base64 data URI
export function stringToDataURI(content: Buffer, fileName: string): string {
    // Get the MIME type of the file
    const mimeType = mime.getType(fileName) || "application/octet-stream";

    // Convert the content to base64
    const base64Data = content.toString("base64");

    // Return the data URI
    return `data:${mimeType};base64,${base64Data}`;
}

// Function to download a file from a URL and save it to the output directory
export async function fetchFile(url: string): Promise<string> {
    // Launch puppeteer and navigate to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const viewResponse = await page.goto(url, { waitUntil: "networkidle2" });
    if (!viewResponse || !viewResponse.ok()) {
        throw new Error(`Failed to download asset: ${url}`);
    }

    // Get the response buffer
    const content = await viewResponse.buffer();

    // Get the file name and extension from the URL
    const fileName = path.basename(url.split("?")[0]);
    const fileExtension = path.extname(fileName);

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