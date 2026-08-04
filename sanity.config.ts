import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// 1. Import your post schema file
import post from './schemas/post' 
// Note: If schemas/post.ts uses a named export instead of export default, use:
// import { post } from './schemas/post'

export default defineConfig({
  name: 'default',
  title: 'Dopmin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    // 2. Pass [post] directly in the array
    types: [post],
  },
})