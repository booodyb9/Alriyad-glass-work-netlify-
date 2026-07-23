export interface Message {
  id: number;
  name: string;
  phone: string;
  service?: string;
  message: string;
  createdAt: string;
  is_read?: boolean;
}

export interface Content {
  id?: number;
  key: string;
  title: string;
  body: string;
  type: string;
}

export interface MediaFile {
  id: number;
  name: string;
  url: string;
  storage_path: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  class_name: string;
  order_index: number;
}
