import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./LoginPage.module.less";

// 내가 만든 기능을 사용하기 위해서는 이름을 치고 들어가면 사용할 수 있도록 설정

function LoginPage() {
  const [name, setName] = useState(""); // 이름 최신화 하는 변수와 함수를 작성
  const navigate = useNavigate();
  // 유튜브 영상에서 나온 navigate로 함수 만들어서 사용
  // 위에서 라우터 설치할 때 같이 설치되고 import 해주어야함

  // input박스에서 사용할 onChange기능을 만든다.
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 버튼에서 사용할 기능
  // 이름을 입력하였을 경우
  // -> 기능을 사용할 수 있는 main 페이지로 이동
  // -> 그렇지 않다면 경고문 나올 수 있도록 작성하기
  const handleLogin = () => {
    if (name.trim()) {
      navigate("/main");
    } else {
      alert("이름을 입력해주세요.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.nameBox}>
        <span>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
          />
        </span>

        <button onClick={handleLogin}>확인</button>
      </div>
    </div>
  );
}

export default LoginPage;
