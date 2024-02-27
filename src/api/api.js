import axios from 'axios';

//중요!!!
//환경 변수 부분에서 에러인 App.jsx:25 Uncaught (in promise) ReferenceError: process is not defined 발생
//vite에서는 process 지원 X
//import.meta.env.[변수명]으로 선언해야한다!!!
// const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

// 모든 Review 목록 가져오기 (GET / review)
export const getReview = async () => {
  const { data } = await apiClient.get('/review');
  return data;
};

// 새로운 Review 추가하기 (POST / review)
export const createReview = async (review) => {
  const { data } = await apiClient.post('/review', review);
  return data;
};

// 특정 ID의 Review 삭제하기 (DELETE /review/:id)
export const deleteReview = async (id) => {
  await apiClient.delete(`/review/${id}`);
  return id;
};

// 특정 ID의 Review 수정하기 (PATCH /review/:id)
export const updateTodo = async (id, review) => {
  await todoApi.patch(`/review/${id}`, review);
  return id;
};

// 특정 ID의 TODO 상세 정보 가져오기 (GET /todos/:id)
export const getSingleTodo = async (place_id) => {
  const { data } = await apiClient.get(`/detail/${place_id}`);

  return data;
};
