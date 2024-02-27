import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
