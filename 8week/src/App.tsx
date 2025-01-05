import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import MyPage from "./MyPage";

function App() {
  return (
    <Routes>
      {/* 로그인을 하면 내가 만든 메인페이지 기능을 사용할 수 있도록 들어가자 마자 로그인 화면이 나올 수 있도록 구현 */}
      <Route path="" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/my" element={<MyPage />} />
    </Routes>
  );
}

export default App;
