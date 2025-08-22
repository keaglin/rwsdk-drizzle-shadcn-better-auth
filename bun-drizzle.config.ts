import { defineConfig } from 'drizzle-kit';
import { Glob } from 'bun';
import { readFileSync } from 'node:fs';

const isLocal = process.env.NODE_ENV === 'development' || !process.env.CLOUDFLARE_D1_TOKEN;

if (!isLocal && (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_DATABASE_ID || !process.env.CLOUDFLARE_D1_TOKEN)) {
  throw new Error('Missing Cloudflare D1 credentials for production');
}

function getLocalD1Database(): string {
  try {
    const glob = new Glob('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
    
    // Scan for .sqlite files in the directory
    const files = Array.from(glob.scanSync('.'));
    console.log(`Found ${files.length} .sqlite files in cwd`);
    
    if (files.length === 0) {
      throw new Error(`.sqlite file not found in cwd`);
    }

    const dbFile = files[0];
    console.log(`Using local D1 database file: ${dbFile}`);
    
    if (!dbFile) {
      throw new Error(`No .sqlite file found in cwd`);
    }

    const url = import.meta.resolve(dbFile)
    
    if (!url) {
      throw new Error(`No .sqlite file found in cwd`);
    }

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
      const expectedPath = import.meta.resolve(`.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${databaseId}.sqlite`);
      console.log(`Local D1 database will be created at: ${expectedPath}`);
      console.log('Run "wrangler d1 migrations apply DB --local" or start the dev server to create it.');
      return expectedPath;
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