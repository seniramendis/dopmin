import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-04";
const hasSanityConfig = Boolean(projectId);

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : ({ fetch: async () => [] } as unknown as ReturnType<typeof createClient>);

const builder = hasSanityConfig
  ? imageUrlBuilder(client as never)
  : {
      image: () => ({
        width: () => ({
          height: () => ({
            url: () => "",
          }),
        }),
      }),
    };

export function urlFor(source: unknown) {
  return builder.image(source as never);
}

export async function safeSanityFetch<T = unknown>(query: string, params?: Record<string, unknown>) {
  if (!hasSanityConfig) {
    return [] as T;
  }

  try {
    return (await client.fetch<T>(query, params ?? {}, { next: { revalidate: 60 } })) as T;
  } catch {
    return [] as T;
  }
}