export interface Project {
  id: string;

  title: string;
  slug: string;

  category: string;

  client: string;
  architect: string;
  location: string;

  area: string;
  duration: string;
  value: string;
  scope: string;

  description: string;

  featured: boolean;

  images: string[];
}