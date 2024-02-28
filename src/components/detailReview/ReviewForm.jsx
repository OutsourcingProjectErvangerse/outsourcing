import React from 'react';
import useInput from '../../hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { createReview } from '../../api/api';
import { useParams } from 'react-router-dom';

function ReviewForm() {
  const [title, onChangeTitleHandler, resetTitle] = useInput();
  const [content, onChangeContentHandler, resetContent] = useInput();
  const [nickname, onChangeNicknameHandler, resetNickname] = useInput();
  const [password, onChangePasswordHandler, resetPassword] = useInput();

  const { id } = useParams();
  const queryClient = useQueryClient();

  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: (review) => createReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  // 게시글 작성
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //게시글 작성 유효성 검사
    if (validation()) {
      const newReview = {
        id: crypto.randomUUID,
        place_id: id,
        nickname,
        password,
        title,
        content,
        createAt: date
      };
      addMutate(newReview);

      resetTitle();
      resetContent();
      resetNickname();
      resetPassword();
    }
  };

  //유효성 검사
  const validation = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    return true;
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <InputField type="text" value={title} onChange={onChangeTitleHandler} placeholder="제목" />
      <TextArea value={content} onChange={onChangeContentHandler} placeholder="내용" />
      <InputField type="text" value={nickname} onChange={onChangeNicknameHandler} placeholder="아이디" />
      <InputField type="password" value={password} onChange={onChangePasswordHandler} placeholder="비밀번호" />
      <Button type="submit">게시글 작성</Button>
    </Form>
  );
}

export default ReviewForm;

const Form = styled.form`
  margin-bottom: 20px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
