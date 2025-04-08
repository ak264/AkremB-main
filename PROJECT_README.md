# AkremB Projects System

This document provides information about the projects system in your AkremB installation.

## Project Organization

Projects are organized as a content collection in the `/src/content/projects/` directory. Each project should have its own subdirectory with an `index.md` file.

## Project Schema

Each project has the following fields in its frontmatter:

```yaml
---
title: 'Project Title'
description: 'Brief description of the project'
pubDate: 'Apr 04 2025'  # Publication date
tags: ["Tag1", "Tag2"]  # Array of tags
demoLink: 'https://example.com'  # Optional link to live demo
githubLink: 'https://github.com/username/repo'  # Optional link to GitHub repo
status: 'completed'  # One of: 'completed', 'in-progress', 'planned'
relatedPosts: ['blog-post-slug-1', 'blog-post-slug-2']  # Optional array of related blog post slugs
---
```

## Status Types

Projects can have one of three status types:

1. `completed` - Shown with a green badge, indicates a finished project
2. `in-progress` - Shown with a blue badge, indicates work in progress
3. `planned` - Shown with an amber badge, indicates a future project

## Creating a New Project

To create a new project:

1. Create a new directory in `/src/content/projects/` with a descriptive name
2. Create an `index.md` file in that directory
3. Add the required frontmatter (see schema above)
4. Write the project details in Markdown below the frontmatter

Example:

```markdown
---
title: 'AI Marketing Assistant'
description: 'An AI-powered tool to help marketing teams create and optimize content'
pubDate: 'Apr 01 2025'
tags: ["AI", "Marketing", "SaaS"]
demoLink: 'https://ai-marketing-demo.example.com'
status: 'in-progress'
---

## About This Project

The AI Marketing Assistant is a tool designed to help marketing teams...

## Features

- Feature 1
- Feature 2
- Feature 3
```

## Associating Blogs with Projects

To associate blog posts with a project, add the blog post's slug to the `relatedPosts` array in the project's frontmatter. 

You can find a list of all blog post slugs at `/admin/blog-slugs`.

## Project UI & Styling

The project pages use a modern dark UI theme. The styles are defined in:

1. `/src/styles/projects.css` - Global project styles
2. `/src/components/ModernProjectCard.astro` - Card component for the projects list
3. `/src/pages/project/[...slug].astro` - Individual project page

## Customizing Project Appearance

You can customize the appearance of projects by modifying the components and CSS files mentioned above. The status badge colors and other styling elements can be adjusted to match your preferred aesthetic.
