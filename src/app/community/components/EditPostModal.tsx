import { Post } from "@/types/community";
import { useState } from "react";

const EditPostModal = ({
  post,
  onSave
}: {
  post: Post;
  onSave: (post: Post) => void;
}) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <div>
        <input
          type="text"
          name="post_title"
          value={editedPost.post_title || ""}
          onChange={handleInputChange}
        />
        <textarea
          name="post_content"
          value={editedPost.post_content || ""}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" onClick={() => onSave(editedPost)}>
        수정하기
      </button>
    </form>
  );
};

export default EditPostModal;
