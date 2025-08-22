import { defineConfig } from 'drizzle-kit';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const isLocal = process.env.NODE_ENV === 'development' || !process.env.CLOUDFLARE_D1_TOKEN;

if (!isLocal && (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_DATABASE_ID || !process.env.CLOUDFLARE_D1_TOKEN)) {
  throw new Error('Missing Cloudflare D1 credentials for production');
}

function getLocalD1Database(): string {
  try {
    const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
    
    // Read directory and filter for .sqlite files
    const files = readdirSync(dbDir)
      .filter(file => file.endsWith('.sqlite'))
      .map(file => join(dbDir, file));
    
    console.log(`Found ${files.length} .sqlite files in ${dbDir}`);
    
    if (files.length === 0) {
      throw new Error(`.sqlite file not found in ${dbDir}`);
    }

    const dbFile = files[0];
    console.log(`Using local D1 database file: ${dbFile}`);
    
    if (!dbFile) {
      throw new Error(`No .sqlite file found in ${dbDir}`);
    }


    // Convert to absolute path and then to file URL
    const absolutePath = join(process.cwd(), dbFile);
    const url = `file://${absolutePath}`;
    
    console.log(`Found local D1 database at: ${url}`);
    
    return url;
  } catch (err) {
    console.log(`No sqlite files found: ${err}`);
    // Return the expected path based on wrangler.jsonc database_id
    const wranglerConfigPath = './wrangler.jsonc';
    const wranglerConfigText = readFileSync(wranglerConfigPath, 'utf-8');
    
    // Strip comments and trailing commas for valid JSON
    const cleanJson = wranglerConfigText
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
      .replace(/\/\/.*$/gm, '')          // Remove // comments
      .replace(/,(\s*[}\]])/g, '$1')     // Remove trailing commas
      .trim();
    
    const wranglerConfig = JSON.parse(cleanJson);
    
    const databaseId = wranglerConfig.d1_databases?.[0]?.database_id;
    if (databaseId) {
      const expectedPath = join(process.cwd(), `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${databaseId}.sqlite`);
      const expectedUrl = `file://${expectedPath}`;
      console.log(`Local D1 database will be created at: ${expectedUrl}`);
      console.log('Run "wrangler d1 migrations apply DB --local" or start the dev server to create it.');
      return expectedUrl;
    }
    
    throw new Error('Unable to determine local D1 database path');
  }
}

const config = isLocal 
  ? {
      out: './drizzle',
      schema: ['./src/app/db/schema.ts'],
      dialect: 'sqlite' as const,
      dbCredentials: {
        url: getLocalD1Database(),
      },
      verbose: true,
      strict: true,
    }
  : {
      out: './drizzle',
      schema: ['./src/app/db/schema.ts'],
      dialect: 'sqlite' as const,
      driver: 'd1-http' as const,
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
      },
      verbose: true,
      strict: true,
    };

export default defineConfig(config);