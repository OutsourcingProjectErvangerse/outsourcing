import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateTodo } from '../../api/api';

const ReviewListItem = ({ review, datas }) => {
  const [passwordCheck, onChangePasswordCheckHandler, resetPasswordCheck] = useInput();
  const [isClickToggle, setIsClickToggle] = useState(false);
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [isClickId, setIsClickId] = useState();
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: ({ id, review }) => updateTodo(id, review)
  });

  //수정 버튼 이벤트 핸들러
  const onClickEditHandler = async (id) => {
    const review = data.find((item) => item.id === id);
    if (review && review.password === passwordCheck) {
      setTitle(review.title);
      setContent(review.content);
      editMutate({ id: review.id, review: { title, content } });

      setIsEditToggle(false);

      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
  };

  //삭제 버튼 이벤트 핸들러
  const onClickDeleteHandler = async (id) => {
    const review = datas.find((item) => item.id === id);
    if (review && review.password === passwordCheck) {
      deleteMutate(review.id);
      alert('정상적으로 삭제가 완료 됐습니다.');
      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
  };

  //작성자의 패스워드 확인
  const onClickPasswordCheck = (id) => {
    const findReview = datas.find((item) => item.id === id);

    if (review && findReview.password === passwordCheck) {
      setIsEditToggle(!isEditToggle);
      return;
    }
    alert('수정할 수 없습니다.');
    resetPasswordCheck();
  };

  return (
    <>
      <ReviewItemHeader>
        <div>{review.nickname}</div>
        <div>{review.createAt}</div>
      </ReviewItemHeader>
      <ReviewItemContent>
        <div>{review.title}</div>
        <div>{review.content}</div>
      </ReviewItemContent>
      <FancyButton
        onClick={() => {
          setIsClickToggle(!isClickToggle);
          setIsClickId(review.id);
          setIsEditToggle(false);
        }}
      >
        편집
      </FancyButton>
      {isClickToggle && isClickId === review.id ? (
        <>
          <InputField
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheckHandler}
            placeholder="비밀번호 입력"
          />
          <Button onClick={() => onClickPasswordCheck(review.id)}>확인</Button>
        </>
      ) : null}
      {isEditToggle && isClickId === review.id ? (
        <>
          <FancyButton onClick={() => onClickEditHandler(review.id)}>수정</FancyButton>
          <FancyButton onClick={() => onClickDeleteHandler(review.id)}>삭제</FancyButton>
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
