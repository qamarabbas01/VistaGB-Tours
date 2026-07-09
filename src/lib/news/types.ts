export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  time: string;
  views: number;
  image: string;
  url: string;
};

export type NewsPageResult = {
  items: NewsItem[];
  page: number;
  totalPages: number;
  source: string;
};
