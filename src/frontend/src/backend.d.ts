import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Post {
    id: bigint;
    title: string;
    content: string;
    slug: string;
    tags: Array<string>;
    publishedAt: string;
    author: string;
    readingTimeMinutes: bigint;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface Category {
    id: bigint;
    icon: string;
    name: string;
    slug: string;
    description: string;
}
export interface backendInterface {
    getAllCategories(): Promise<Array<Category>>;
    getAllPosts(): Promise<Array<Post>>;
    getCategoryBySlug(slug: string): Promise<Category>;
    getPostBySlug(slug: string): Promise<Post>;
    getPostsByCategory(category: string): Promise<Array<Post>>;
}
