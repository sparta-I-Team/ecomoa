"use client";
import React from "react";

interface NicknameModalProps {
  onClose: () => void; // 닫기 함수 prop
}

const NicknameModal = ({ onClose }: NicknameModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 닉네임 제출 처리 로직 추가
    // 예: 닉네임 저장 API 호출 등
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit}>
        <div>
          <span className="close" onClick={onClose}>
            &times;
          </span>{" "}
          {/* 모달 닫기 */}
          <h2>닉네임 설정</h2>
          <input type="text" required placeholder="닉네임을 입력하세요" />
        </div>
        <button type="submit">가입 완료</button> {/* 저장 버튼 */}
      </form>
    </div>
  );
};

export default NicknameModal;
