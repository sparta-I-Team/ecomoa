"use client";
import React, { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/utlis/supabase/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient();

const PostPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userNickname, setUserNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();
      if (error) {
        console.error("사용자 정보 가져오기 오류:", error.message);
      } else {
        setUser(user);
        if (user) {
          const { data, error } = await supabase
            .from("user_info")
            .select("user_nickname")
            .eq("user_id", user.id)
            .single();
          if (data) {
            setUserNickname(data.user_nickname);
          } else {
            console.error("닉네임을 가져오는 데 실패했습니다:", error.message);
          }
        }
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreviewUrl(URL.createObjectURL(selectedImage));
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreviewUrl(null);
    setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("사용자가 인증되지 않았습니다.");
      return;
    }

    let imageUrl = null;
    if (image) {
      const uniqueFileName = `public/${Date.now()}_${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(uniqueFileName, image);

      if (uploadError) {
        console.error("업로드 실패:", uploadError.message);
        setErrorMessage("이미지 업로드에 실패했습니다.");
        return;
      }

      imageUrl = `https://${
        supabaseUrl.split("/")[2]
      }/storage/v1/object/public/images/${uploadData.path}`;
    }

    const { error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        post_title: title,
        post_content: content,
        created_at: new Date().toISOString(),
        post_img: imageUrl
      }
    ]);

    if (error) {
      console.error("게시글 생성 오류:", error.message);
      setErrorMessage("게시글 등록에 실패했습니다.");
    } else {
      resetForm();
    }
  };

  return (
    <div>
      <Link href="/community">
        <h3 className="text-xl font-bold mb-4">{"<자유게시판 홈 "} </h3>
      </Link>
      {userNickname && (
        <div className="flex items-center mb-4">
          <span className="font-semibold">{userNickname}님</span>
          <time className="ml-4">{new Date().toLocaleDateString("ko-KR")}</time>
        </div>
      )}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h4 className="font-semibold mb-4">제목</h4>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <h4 className="font-semibold mb-4">내용</h4>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <h4 className="font-semibold mb-4">사진(선택)</h4>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="mb-4 w-[160px] h-[160px] object-cover border-2 border-gray-200 rounded"
          />
        )}
        <button
          type="submit"
          className="p-2 rounded w-[380px] h-[52px] bg-black text-white"
        >
          게시글 등록
        </button>
      </form>
    </div>
  );
};

export default PostPage;
