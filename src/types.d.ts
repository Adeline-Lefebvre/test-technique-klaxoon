export type Bookmark = {
  id: number;
  thumbnailVideo?: string;
  thumbnail: string;
  url: string;
  type: string;
  title: string;
  author: string;
  addedAt: number;
  publishedAt?: Date;
  duration?: number;
  size?: number;
};
