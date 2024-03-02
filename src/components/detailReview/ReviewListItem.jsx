import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateReview } from '../../api/api';

const ReviewListItem = ({ review }) => {
  const [inputPassword, onChangePasswordCheckHandler, resetPasswordCheck] = useInput();
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [isPasswordMatchToggle, setIsPasswordMatchToggle] = useState(false);
  const [title, onChangeTitleHandler] = useInput(review.title);
  const [content, onChangeContentHandler] = useInput(review.content);

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: async ({ id, review }) => {
      console.log(id);
      console.log('review', review);
      await updateReview(id, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  //수정 버튼 이벤트 핸들러
  const onClickEditHandler = () => {
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
  const onClickDeleteHandler = () => {
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
        <h2>{review.nickname}</h2>
        <time>{review.createAt}</time>
      </ReviewItemHeader>
      <ReviewItemContent>
        {isPasswordMatchToggle ? (
          <div>
            <InputField value={title} onChange={onChangeTitleHandler} />
            <Textarea value={content} onChange={onChangeContentHandler} />
          </div>
        ) : (
          <UserReview>
            <ReviewTitle>{review.title}</ReviewTitle>
            <p>{review.content}</p>
          </UserReview>
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
          <PasswordField
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
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #ff983f;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
  float: right;
  &:hover {
    background-color: #ff6600;
  }
`;

const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  & > h2 {
    font-size: 28px;
    font-weight: bold;
  }
  & > time {
    color: #999;
  }
`;

const ReviewItemContent = styled.div`
  margin-bottom: 10px;
`;

const FancyButton = styled(Button)`
  background-color: #ff983f;
  padding: 8px 15px;
  margin-top: 10px;
  float: right;
  &:hover {
    background-color: #ff6600;
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

const UserReview = styled.div`
  margin-top: 20px;
  & > p {
    line-height: 24px;
    padding: 5px 0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  line-height: 24px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const PasswordField = styled.input`
  width: 100%;
  margin: 15px 0;
  padding: 8px 5px;
`;

const ReviewTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
