export interface NewsItem {
  content: string;
  contentSnippet: ReactNode;
  title: string;
  link: string;
  isoDate: string;
  image: string;
  description: string;
}

export interface NewsResponse {
  message: string;
  total: number;
  data: NewsItem[];
}