export interface Post {
  user_info: { user_nickname: string };
  post_id: string;
  post_title: string;
  post_content: string;
  created_at: string;
  like: number;
  comment: number;
  post_img?: string[]; // 이미지 배열
}

export interface AnaPost extends Post {
  price: string;
}
