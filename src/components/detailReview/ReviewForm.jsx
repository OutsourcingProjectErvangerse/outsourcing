import React from 'react';
import useInput from '../../hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { createReview } from '../../api/api';
import { useParams } from 'react-router-dom';
import { getFormMattedDate } from '../../util/date';

function ReviewForm() {
  const [title, onChangeTitleHandler, resetTitle] = useInput('');
  const [content, onChangeContentHandler, resetContent] = useInput('');
  const [nickname, onChangeNicknameHandler, resetNickname] = useInput('');
  const [password, onChangePasswordHandler, resetPassword] = useInput('');

  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: addMutate } = useMutation({
    mutationFn: (review) => createReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  // 게시글 작성
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const date = new Date();
    //게시글 작성 유효성 검사
    if (validation()) {
      const newReview = {
        id: crypto.randomUUID(),
        place_id: id,
        nickname,
        password,
        title,
        content,
        createAt: getFormMattedDate(date)
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
    <>
      <ReviewTitle>리뷰작성</ReviewTitle>
      <Form onSubmit={onSubmitHandler}>
        {/* <lebel htmlFor="" /> */}
        <InputField type="text" value={title} onChange={onChangeTitleHandler} placeholder="제목" />
        <TextArea value={content} onChange={onChangeContentHandler} placeholder="내용" />
        <InputField type="text" value={nickname} onChange={onChangeNicknameHandler} placeholder="닉네임" />
        <InputField type="password" value={password} onChange={onChangePasswordHandler} placeholder="비밀번호" />
        <Button type="submit">게시글 작성</Button>
      </Form>
    </>
  );
}

export default ReviewForm;

const ReviewTitle = styled.h2`
  font-size: 32px;
  width: 100%;
  text-align: center;
  padding: 30px 0;
`;

const Form = styled.form`
  margin-bottom: 50px;
  background-color: #ff983f;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 100px;
  border: none;
  border-radius: 4px;
  background-color: #ff6600;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;
