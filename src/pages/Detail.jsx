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

  // const [title, onChangeTitleHandler] = useInput();
  // const [content, onChangeContentHandler] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [passwordCheck, onChangePasswordCheckHandler] = useInput();
  const [isClickToggle, setIsClickToggle] = useState(false);
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [isClickId, setIsClickId] = useState();

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

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }
  if (error) {
    return <div>글을 작성해주세요</div>;
  }

  const filterReviews = reviews.filter((item) => (item.place_id == id ? true : false));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newReview = {
      id: crypto.randomUUID(),
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
    console.log(review);
    if (review && review.password === passwordCheck) {
      setTitle(review.title);
      setContent(review.content);
      editMutate({ id: review.id, review: { title, content } });

      setIsEditToggle(false);
      setPassw;

      return;
    }
    alert('비밀번호가 일치하지 않습니다.');
  };
  console.log(title);

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
    console.log(review);
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

  return (
    <>
      <Stdiv>
        <form onSubmit={onSubmitHandler}>
          <textarea value={title} onChange={onChangeTitleHandler}></textarea>
          <textarea value={content} onChange={onChangeContentHandler}></textarea>
          <input type={'text'} value={nickname} onChange={onChangeNicknameHandler} placeholder="아이디"></input>
          <input type={'password'} value={password} onChange={onChangePasswordHandler} placeholder="비밀번호"></input>
          <button type="submit">게시글 작성</button>
        </form>
      </Stdiv>
      <StDiv2>
        {filterReviews.map((item) => (
          <div key={item.id}>
            <div>{item.nickname}</div>
            <div>{item.title}</div>
            <div>{item.content}</div>
            <button
              onClick={() => {
                setIsClickToggle(!isClickToggle);
                setIsClickId(item.id);
              }}
            >
              편집
            </button>

            {isClickToggle && isClickId === item.id ? (
              <>
                <input
                  type={password}
                  value={passwordCheck}
                  onChange={onChangePasswordCheckHandler}
                  placeholder="비밀번호 입력"
                ></input>
                <button onClick={() => onClickPasswordCheck(item.id)}>확인</button>
              </>
            ) : null}

            {isEditToggle && isClickId === item.id ? (
              <>
                <button onClick={() => onClickEditHandler(item.id)}>수정</button>
                <button onClick={() => onClickDeleteHandler(item.id)}>삭제</button>
              </>
            ) : null}
          </div>
        ))}
      </StDiv2>
    </>
  );
}

export default Detail;

const Stdiv = styled.div`
  width: 100%;
  height: 200pxs;
`;

const StDiv2 = styled.div`
  width: 100%;
  height: 200pxs;
  background-color: red;
`;
