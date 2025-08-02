# Web File Fetcher

WebDownloader is an npm package for fetching web content efficiently using TypeScript. It provides a simple API to fetch files from URLs and can be easily integrated into Node.js projects.

## Why should I use this package over fetching files directly?
Since it uses Puppeteer, it can prevent issues with CORS and other restrictions that might block direct HTTP requests, making it a robust solution for fetching web assets directly from the browser context.

## Features
- Fetch files from URLs
- TypeScript support
- Easy integration into Node.js projects

## Installation

```bash
npm install web-file-fetcher
```

## Usage

Import and use in your TypeScript/JavaScript project:

```typescript
import fetchFile from "web-file-fetcher";

const url = "https://example.com/file.zip";

const fileContent = await fetchFile(url);
```

### `fetchFile(url: string): Promise<string>`
Fetches a file from the specified URL and returns its content as a string.

If the file is not text-based, it will return the content as a base64 data URI.

## Current state of this project
Finished.