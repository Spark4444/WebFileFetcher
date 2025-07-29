# WebDownloader

WebDownloader is an npm package for downloading web content efficiently using TypeScript. It provides a simple API to fetch files from URLs and can be easily integrated into Node.js projects.

## Why should you use this package over fetching files directly?
Since it uses Puppeteer, it can prevents issues with CORS and other restrictions that might block direct HTTP requests, making it a robust solution for downloading web assets directly from the browser context.

## Features
- Download files from URLs
- TypeScript support
- Easy integration into Node.js projects

## Installation

```bash
npm install web-downloader
```

## Usage

Import and use in your TypeScript/JavaScript project:

```typescript
import { fetchFile } from "web-downloader";

const url = "https://example.com/file.zip";

const fileContent = await fetchFile(url);
```

### `fetchFile(url: string): Promise<string>`
Fetches a file from the specified URL and returns its content as a string.

If the file is not an HTML/JS/CSS file, it will return a base64 encoded string of the file content.

## Current state of the project
Finished.