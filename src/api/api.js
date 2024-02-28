import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: SERVER_URL,
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
export const updateReview = async (id, review) => {
  await todoApi.patch(`/review/${id}`, review);
  return id;
};
