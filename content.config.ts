import { defineCollection, z } from 'astro:content';
import { projectStatuses, legacyStatusMapping } from './src/config/projectStatus';

// Create a status enum from the status IDs
const statusIds = projectStatuses.map(status => status.id);
const StatusEnum = z.enum(statusIds);

// Transformer for legacy and current statuses
const statusTransformer = (val: string) => {
  return legacyStatusMapping[val] ?? val;
};

// Blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false),
      title: z.string(),
      seoTitle: z.string().optional(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      coverImage: image().optional(),
    }),
});

// Projects collection schema
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      demoLink: z.string().optional(),
      githubLink: z.string().optional(),
      status: z.string().transform(statusTransformer).pipe(StatusEnum).default('daydream'),
      relatedPosts: z.array(z.string()).optional(),
      coverImage: image().optional(),
    }),
});

export const collections = { blog, projects };
