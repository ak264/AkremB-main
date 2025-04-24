import { defineCollection, z } from 'astro:content';
import { projectStatuses, legacyStatusMapping } from '../config/projectStatus';

// Create a status enum from the status IDs
const statusIds = projectStatuses.map(status => status.id);
const StatusEnum = z.enum(statusIds);

// Backward compatibility transformer for legacy status values
const statusTransformer = (val: string) => {
  if (legacyStatusMapping[val]) {
    return legacyStatusMapping[val];
  }
  return val;
};

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		draft: z.boolean().default(false),
		title: z.string(),
    seoTitle: z.string().optional(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
tags: z.array(z.string()).optional(),
		coverImage: image()
      .refine((img) => img.width >= 960, {
        message: 'Cover image must be at least 960 pixels wide!'
      })
      .optional()
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		draft: z.boolean().default(false),
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		demoLink: z.string().optional(),
		githubLink: z.string().optional(),
		// Updated status field
		status: z.string()
		  .transform(statusTransformer)
		  .pipe(StatusEnum)
		  .default('strategizing'),
		relatedPosts: z.array(z.string()).optional(), // Slugs of related blog posts
		coverImage: image()
	  .refine((img) => img.width >= 960, {
	    message: 'Cover image must be at least 960 pixels wide!'
	  })
	  .optional()
	}),
});

export const collections = { blog, projects };
