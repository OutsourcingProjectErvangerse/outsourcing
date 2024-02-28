import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateReview } from '../../api/api';

const ReviewListItem = ({ review }) => {
  const [inputPassword, onChangePasswordCheckHandler, resetPasswordCheck] = useInput();
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [isPasswordMatchToggle, setIsPasswordMatchToggle] = useState(false);
  const [title, onChangeTitleHandler, resetTitle] = useInput(review.title);
  const [content, onChangeContentHandler, resetContent] = useInput(review.content);

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: ({ id, review }) => {
      console.log(id);
      console.log('review', review);
      updateReview(id, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  //수정 버튼 이벤트 핸들러
  const onClickEditHandler = async () => {
    if (review.content === content && review.title === title) {
      return alert('변경된 내용이 없습니다.');
    }
    editMutate({ id: review.id, review: { title, content } });
    setIsEditToggle(false);
    alert('변경되었습니다.');
    setIsPasswordMatchToggle(false);
    return;
  };

  //삭제 버튼 이벤트 핸들러
  const onClickDeleteHandler = async () => {
    deleteMutate(review.id);

    alert('정상적으로 삭제가 완료 됐습니다.');
    return;
  };

  //작성자의 패스워드 확인
  const onClickPasswordCheck = () => {
    if (review.password === inputPassword) {
      setIsPasswordMatchToggle(!isPasswordMatchToggle);
      setIsEditToggle(false);
      resetPasswordCheck();
      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
    resetPasswordCheck();
  };

  return (
    <>
      <ReviewItemHeader>
        <div>{review.nickname}</div>
        <div>{review.createAt}</div>
      </ReviewItemHeader>
      <ReviewItemContent>
        {isPasswordMatchToggle ? (
          <>
            <InputField value={title} onChange={onChangeTitleHandler} />
            <InputField value={content} onChange={onChangeContentHandler} />
          </>
        ) : (
          <>
            <div>{review.title}</div>
            <div>{review.content}</div>
          </>
        )}
      </ReviewItemContent>
      <FancyButton
        onClick={() => {
          setIsEditToggle(!isEditToggle);
          setIsPasswordMatchToggle(false);
          resetPasswordCheck();
        }}
      >
        {isPasswordMatchToggle ? '취소' : '편집'}
      </FancyButton>
      {isEditToggle ? (
        <>
          <InputField
            type="password"
            value={inputPassword}
            onChange={onChangePasswordCheckHandler}
            placeholder="비밀번호 입력"
          />
          {!isPasswordMatchToggle ? <Button onClick={() => onClickPasswordCheck()}>확인</Button> : null}
        </>
      ) : null}
      {isPasswordMatchToggle ? (
        <>
          <FancyButton type="submit" onClick={() => onClickEditHandler()}>
            수정
          </FancyButton>
          <FancyButton type="submit" onClick={() => onClickDeleteHandler()}>
            삭제
          </FancyButton>
        </>
      ) : null}
    </>
  );
};

export default ReviewListItem;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50; /* Green */
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewItemContent = styled.div`
  margin-bottom: 10px;
`;

const FancyButton = styled(Button)`
  background-color: #008cba; /* Blue */
  &:hover {
    background-color: #0073e6;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
