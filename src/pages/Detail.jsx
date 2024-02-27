import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getReview, createReview, deleteReview, updateTodo } from '../api/api';
import useInput from '../hooks/useInput';

function Detail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nickname, onChangeNicknameHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');
  const [passwordCheck, onChangePasswordCheckHandler] = useInput('');
  const [isClickToggle, setIsClickToggle] = useState(false);
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [isClickId, setIsClickId] = useState('');

  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const {
    data: reviews,
    isLoading,
    error
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReview
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: (review) => createReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: ({ id, review }) => updateTodo(id, review)
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      place_id: id,
      nickname,
      password,
      title,
      content,
      createAt: date
    };

    addMutate(newReview);
  };

  const onClickEditHandler = async (id) => {
    const review = reviews.find((item) => item.id === id);
    if (review && review.password === passwordCheck) {
      setTitle(review.title);
      setContent(review.content);
      editMutate({ id: review.id, review: { title, content } });
      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
  };

  const onClickDeleteHandler = async (id) => {
    const review = reviews.find((item) => item.id === id);
    if (review && review.password === passwordCheck) {
      deleteMutate(review.id);
      alert('정상적으로 삭제가 완료 됐습니다.');
      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
  };

  const onClickPasswordCheck = (id) => {
    const review = reviews.find((item) => item.id === id);
    if (review && review.password === passwordCheck) {
      setIsEditToggle(!isEditToggle);
    }
  };

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
  };

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }

  if (error) {
    return <div>글을 작성해주세요</div>;
  }

  const filterReviews = reviews.filter((item) => item.place_id === id);

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <InputField type="text" value={title} onChange={onChangeTitleHandler} placeholder="제목" />
        <TextArea value={content} onChange={onChangeContentHandler} placeholder="내용" />
        <InputField type="text" value={nickname} onChange={onChangeNicknameHandler} placeholder="아이디" />
        <InputField type="password" value={password} onChange={onChangePasswordHandler} placeholder="비밀번호" />
        <Button type="submit">게시글 작성</Button>
      </Form>
      {filterReviews.map((item) => (
        <ReviewItemContainer key={item.id}>
          <ReviewItemHeader>
            <div>{item.nickname}</div>
            <div>{item.createAt}</div>
          </ReviewItemHeader>
          <ReviewItemContent>
            <div>{item.title}</div>
            <div>{item.content}</div>
          </ReviewItemContent>
          <FancyButton
            onClick={() => {
              setIsClickToggle(!isClickToggle);
              setIsClickId(item.id);
            }}
          >
            편집
          </FancyButton>
          {isClickToggle && isClickId === item.id ? (
            <>
              <InputField
                type={password}
                value={passwordCheck}
                onChange={onChangePasswordCheckHandler}
                placeholder="비밀번호 입력"
              />
              <Button onClick={() => onClickPasswordCheck(item.id)}>확인</Button>
            </>
          ) : null}
          {isEditToggle && isClickId === item.id ? (
            <>
              <FancyButton onClick={() => onClickEditHandler(item.id)}>수정</FancyButton>
              <FancyButton onClick={() => onClickDeleteHandler(item.id)}>삭제</FancyButton>
            </>
          ) : null}
        </ReviewItemContainer>
      ))}
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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

const ReviewItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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
