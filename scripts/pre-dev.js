#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAPI_FILE = path.join(__dirname, '..', 'api', 'openapi.yaml');
const GENERATED_DIR = path.join(__dirname, '..', 'src', 'generated');

console.log('🔍 Checking OpenAPI setup...');

// Check if OpenAPI file exists
if (!fs.existsSync(OPENAPI_FILE)) {
  console.log('⚠️  OpenAPI file not found at api/openapi.yaml');
  console.log('📁 Checking for existing generated files...');
  
  if (fs.existsSync(GENERATED_DIR)) {
    console.log('✅ Using existing generated API client');
    process.exit(0);
  } else {
    console.log('❌ No OpenAPI file and no generated client found');
    console.log('📝 Please ensure api/openapi.yaml exists or run npm run generate:api manually');
    process.exit(1);
  }
}

// Check if generated directory is newer than OpenAPI file
const openApiStats = fs.statSync(OPENAPI_FILE);
let needsRegeneration = true;

if (fs.existsSync(GENERATED_DIR)) {
  const generatedStats = fs.statSync(GENERATED_DIR);
  needsRegeneration = openApiStats.mtime > generatedStats.mtime;
}

if (needsRegeneration) {
  console.log('🔄 Generating API client from OpenAPI spec...');
  try {
    execSync('npm run generate:api', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log('✅ API client generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate API client:', error.message);
    
    if (fs.existsSync(GENERATED_DIR)) {
      console.log('📁 Using existing generated files as fallback');
    } else {
      console.error('💥 No fallback available - build may fail');
      process.exit(1);
    }
  }
} else {
  console.log('✅ API client is up to date');
}

console.log('🚀 Ready to start development server');
