import { useQuery } from "@tanstack/react-query";
import {
  type Category,
  type Post,
  STATIC_CATEGORIES,
  STATIC_POSTS,
} from "../data/posts";
import { useActor } from "./useActor";

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return STATIC_POSTS;
      try {
        const result = await actor.getAllPosts();
        if (!result || result.length === 0) return STATIC_POSTS;
        return result.map((p) => ({
          ...p,
          id: Number(p.id),
          readingTimeMinutes: Number(p.readingTimeMinutes),
        })) as Post[];
      } catch {
        return STATIC_POSTS;
      }
    },
    enabled: !isFetching,
    initialData: STATIC_POSTS,
  });
}

export function useGetAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return STATIC_CATEGORIES;
      try {
        const result = await actor.getAllCategories();
        if (!result || result.length === 0) return STATIC_CATEGORIES;
        return result.map((c) => ({ ...c, id: Number(c.id) })) as Category[];
      } catch {
        return STATIC_CATEGORIES;
      }
    },
    enabled: !isFetching,
    initialData: STATIC_CATEGORIES,
  });
}

export function useGetPostBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post | null>({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!actor) return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
      try {
        const result = await actor.getPostBySlug(slug);
        return {
          ...result,
          id: Number(result.id),
          readingTimeMinutes: Number(result.readingTimeMinutes),
        } as Post;
      } catch {
        return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
      }
    },
    enabled: !isFetching && !!slug,
    initialData: STATIC_POSTS.find((p) => p.slug === slug) ?? null,
  });
}

export function useGetPostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      if (!actor)
        return STATIC_POSTS.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        );
      try {
        const result = await actor.getPostsByCategory(category);
        if (!result || result.length === 0)
          return STATIC_POSTS.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase(),
          );
        return result.map((p) => ({
          ...p,
          id: Number(p.id),
          readingTimeMinutes: Number(p.readingTimeMinutes),
        })) as Post[];
      } catch {
        return STATIC_POSTS.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        );
      }
    },
    enabled: !isFetching && !!category,
    initialData: STATIC_POSTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    ),
  });
}
