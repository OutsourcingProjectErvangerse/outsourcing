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
const kakaoApi = axios.create({
  baseURL:'https://place.map.kakao.com/main/v/',
  headers : {'Content-Type': 'Access-Control-Allow-Origin'}
})

// 모든 TODO 목록 가져오기 (GET /todos)
export const getTodos = async () => {
  const { data } = await apiClient.get('/todos');

  return data;
};
export const singleList = async (id) =>{
  const { data } = await kakaoApi.get(`${id}`);
return data;
}

// 특정 ID의 TODO 상세 정보 가져오기 (GET /todos/:id)
export const getSingleTodo = async (id) => {
  const { data } = await todoApi.get(`/todos/${id}`);

  return data;
};

// 새로운 TODO 추가하기 (POST /todos)
export const createTodo = async (todo) => {
  const { data } = await todoApi.post('/todos', todo);

  return data;
};

// 특정 ID의 TODO 삭제하기 (DELETE /todos/:id)
export const deleteTodo = async (id) => {
  await todoApi.delete(`/todos/${id}`);
  return id;
};

// 특정 ID의 TODO 수정하기 (PATCH /todos/:id)
export const updateTodo = async (id, todo) => {
  await todoApi.patch(`/todos/${id}`, todo);

  return id;
};
