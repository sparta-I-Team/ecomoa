export interface Post {
  post_id: string;
  user_id: string;
  post_title: string;
  post_content: string;
  created_at: string;
  updated_at: string;
  like: number;
  comment: number;
  post_img?: string[];
  location: string;
  price: string | number;
  params: { type: string };
  user_info: { user_nickname: string };
}

export interface PostCreateType {
  user_id: string;
  title: string;
  content: string;
  formattedUrls: string;
  price: number;
  location: string;
  type: string;
}

export interface Comment {
  comment_id: string;
  comment_content: string;
  user_id: string;
  user_nickname: string;
  created_at: string;
}

export interface Challenge {
  selected_options: string;
  image_urls: string[];
  content: string;
  created_at: string;
  updated_at: string;
  chall_id: string;
  user_id: string;
  co2: number;
  params: { type: string };
}
