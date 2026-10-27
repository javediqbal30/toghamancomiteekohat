import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Togh Aman Committee'),
    category: z.string().default('Announcement'),
    pinned: z.boolean().default(false),
    image: z.string().optional()
  })
});

const pillars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pillars' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    urduTitle: z.string().optional(),
    summary: z.string(),
    urduSummary: z.string().optional(),
    urduBody: z.string().optional(),
    icon: z.string(),
    articleRef: z.string()
  })
});

const resolutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resolutions' }),
  schema: z.object({
    resolutionNo: z.string(),
    date: z.coerce.date(),
    subject: z.string(),
    category: z.string(),
    problem: z.string(),
    decision: z.string(),
    responsible: z.string(),
    deadline: z.string(),
    resources: z.string(),
    followup: z.string(),
    status: z.enum(['Approved', 'In Progress', 'Completed', 'Under Review', 'Overdue']),
    visibility: z.enum(['Public', 'Members', 'Private']).default('Public'),
    isSample: z.boolean().default(true)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    resolutionNo: z.string(),
    category: z.string(),
    responsible: z.string(),
    budget: z.string(),
    timeline: z.string(),
    progress: z.number().min(0).max(100),
    problem: z.string(),
    proposal: z.string(),
    status: z.enum(['Proposal', 'Approved', 'In Progress', 'Completed']),
    stages: z.array(z.object({
      name: z.string(),
      status: z.enum(['completed', 'in-progress', 'pending'])
    })),
    completionReport: z.string().optional(),
    isSample: z.boolean().default(true)
  })
});

export const collections = { news, pillars, resolutions, projects };
