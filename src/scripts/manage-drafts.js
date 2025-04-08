#!/usr/bin/env node

/**
 * Manage Drafts Script
 * 
 * This script helps move content between your private-content folder and your regular content folder.
 * Usage:
 *   - To move a draft to public: node manage-drafts.js --publish blog/my-draft-post.md
 *   - To create a new private draft: node manage-drafts.js --create blog "My New Draft Post"
 * 
 * The private-content folder is gitignored, so drafts stored there won't be published.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get the project root directory
const rootDir = path.resolve(__dirname, '../../');
const contentDir = path.join(rootDir, 'src/content');
const privateContentDir = path.join(rootDir, 'private-content');

// Ensure private content directories exist
ensureDirExists(privateContentDir);
ensureDirExists(path.join(privateContentDir, 'blog'));
ensureDirExists(path.join(privateContentDir, 'projects'));

// Parse command-line arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  printHelp();
  process.exit(0);
}

switch (command) {
  case '--publish':
    if (args.length < 2) {
      console.error('Error: Missing file path. Usage: node manage-drafts.js --publish [content-type]/[filename]');
      process.exit(1);
    }
    publishDraft(args[1]);
    break;
    
  case '--privatize':
    if (args.length < 2) {
      console.error('Error: Missing file path. Usage: node manage-drafts.js --privatize [content-type]/[filename]');
      process.exit(1);
    }
    privatizeDraft(args[1]);
    break;
    
  case '--create':
    if (args.length < 3) {
      console.error('Error: Missing content type or title. Usage: node manage-drafts.js --create [blog|projects] "My Title"');
      process.exit(1);
    }
    createNewDraft(args[1], args[2]);
    break;
    
  case '--help':
  case '-h':
    printHelp();
    break;
    
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

// Function to ensure a directory exists
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Function to publish a draft
function publishDraft(filePath) {
  const privatePath = path.join(privateContentDir, filePath);
  const publicPath = path.join(contentDir, filePath);
  
  if (!fs.existsSync(privatePath)) {
    console.error(`Error: Draft file not found at ${privatePath}`);
    process.exit(1);
  }
  
  // Read the content
  let content = fs.readFileSync(privatePath, 'utf8');
  
  // Make sure the draft status is set to false when publishing
  if (content.includes('draft: true')) {
    content = content.replace('draft: true', 'draft: false');
  }
  
  // Create directory if it doesn't exist
  const publicDir = path.dirname(publicPath);
  ensureDirExists(publicDir);
  
  // Write to public directory
  fs.writeFileSync(publicPath, content);
  console.log(`Published: ${filePath} (draft status set to false)`);
  
  // Optionally, ask if they want to delete the private copy
  console.log('NOTE: The original draft is still in your private-content directory.');
  console.log('To delete it, run:');
  console.log(`  rm ${privatePath}`);
}

// Function to privatize a post
function privatizeDraft(filePath) {
  const publicPath = path.join(contentDir, filePath);
  const privatePath = path.join(privateContentDir, filePath);
  
  if (!fs.existsSync(publicPath)) {
    console.error(`Error: File not found at ${publicPath}`);
    process.exit(1);
  }
  
  // Read the content
  let content = fs.readFileSync(publicPath, 'utf8');
  
  // Make sure the draft status is set to true when privatizing
  if (content.includes('draft: false')) {
    content = content.replace('draft: false', 'draft: true');
  } else if (!content.includes('draft:')) {
    // If draft field doesn't exist, add it at the right spot in frontmatter
    const lines = content.split('\n');
    const frontmatterEndIndex = lines.indexOf('---', 1);
    if (frontmatterEndIndex !== -1) {
      lines.splice(frontmatterEndIndex, 0, 'draft: true');
      content = lines.join('\n');
    }
  }
  
  // Create directory if it doesn't exist
  const privateDir = path.dirname(privatePath);
  ensureDirExists(privateDir);
  
  // Write to private directory
  fs.writeFileSync(privatePath, content);
  console.log(`Privatized: ${filePath} (draft status set to true)`);
  
  // Optionally, ask if they want to delete the public copy
  console.log('NOTE: The original file is still in your content directory.');
  console.log('To delete it, run:');
  console.log(`  rm ${publicPath}`);
}

// Function to create a new draft
function createNewDraft(contentType, title) {
  if (!['blog', 'projects'].includes(contentType)) {
    console.error('Error: Content type must be either "blog" or "projects"');
    process.exit(1);
  }
  
  // Generate slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  // Create date strings
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Create filename
  const filename = `${slug}.md`;
  const filePath = path.join(privateContentDir, contentType, filename);
  
  // Create frontmatter based on content type
  let frontmatter = `---
draft: true
title: "${title}"
description: "Add your description here"
pubDate: ${now.toISOString()}
tags: []
`;

  if (contentType === 'projects') {
    frontmatter += `demoLink: ""
githubLink: ""
status: "strategizing"
`;
  }
  
  frontmatter += `---

Write your content here...
`;

  // Create directory if it doesn't exist
  ensureDirExists(path.dirname(filePath));
  
  // Write the file
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created new ${contentType} draft: ${filePath}`);
}

// Function to print help
function printHelp() {
  console.log(`
  AkremB Draft Management Tool
  ============================
  
  This tool helps you manage draft content in your AkremB site.
  
  Commands:
    --create [blog|projects] "Title"   Create a new draft in private-content
    --publish [path]                   Move a draft from private to public content
    --privatize [path]                 Move content from public to private
    --help                             Show this help message
  
  Examples:
    # Create a new blog draft
    node src/scripts/manage-drafts.js --create blog "My Awesome Blog Post"
    
    # Publish a draft
    node src/scripts/manage-drafts.js --publish blog/my-awesome-blog-post.md
    
    # Move a published post back to private drafts
    node src/scripts/manage-drafts.js --privatize blog/published-post.md
  `);
}
