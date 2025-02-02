import { useState, useEffect } from "react";
import axios from "axios";
import style from "./MainPage.module.less";
import { Link } from "react-router-dom"; // Link 컴포넌트 불러오기
import movietheater from "./assets/movietheater.png"; // 이미지 import

// Movie 인터페이스 정의
// 내가 사용할 데이터는
// 해당 날짜를 검색했을 경우 해당 날짜의 영화 순위, 이름, 개봉일, 매출액, 관객수,
interface Movie {
  rnum: string; // 순번을 출력: 문자열
  rank: string; // 해당일자의 박스오피스 순위를 출력: 문자열
  movieNm: string; // 영화이름 출력: 문자열
  // salesAmt: string; // 해당일의 매출액을 출력: 문자열
  // audiCnt: string; // 해당날관객수: 문자열
  openDt: string; // 영화 개봉일: 문자열
}

function MainPage() {
  // 상태 관리: 영화 리스트, 날짜 입력 값, 로딩 상태
  const [movies, setMovies] = useState<Movie[]>([]);
  const [date, setDate] = useState<string>(""); // 빈칸

  const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY; // 제공된 API 키

  // input 박스에서 사용할 함수
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSearch = async () => {
    // 검색 버튼을 눌렀을 때 실행
    if (!/^\d{8}$/.test(date)) {
      alert("날짜는 YYYYMMDD 형식으로 입력해야 합니다!");
      return;
    }

    // 날짜가 올바른 형식이면 영화 데이터를 가져오는 함수 호출
    const movieData = async (targetDate: string) => {
      try {
        const response = await axios.get(
          `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json`,
          {
            params: {
              key: SERVICE_KEY, // API 키
              targetDt: targetDate, // 날짜 넣기
            },
          }
        );

        // API 응답 성공 시 처리
        if (response.data.boxOfficeResult) {
          setMovies(response.data.boxOfficeResult.dailyBoxOfficeList); // 영화 데이터 저장
        }
      } catch (error) {
        // API 요청 실패 시 콘솔에서 확인할 수 있도록 에러 띄우기
        console.error("API 요청 오류:", error);
      }
    };

    // `movieData` 함수 호출
    movieData(date);
  };

  // // useEffect로 컴포넌트가 마운트될 때 기본 날짜로 영화 데이터 로드
  // useEffect(() => {
  //   movieData(date); // 내가 인풋박스에서 만든 날짜를 기준으로
  // }, [date]); // `date` 값이 변경될 때마다 위의 함수를 작동시킨다!

  return (
    <div className={style.appContainer}>
      <header className={style.header}>
        오늘의 영화!!
        <Link to="/my">
          <span className={style.my}>마이페이지</span>
        </Link>
      </header>{" "}
      {/* 날짜를 넣을 인풋박스를 만들것이다.*/}
      <main>
        <label>
          <span className={style.date}>
            궁금한 날짜를 입력해봐! (YYYYMMDD 형식):
          </span>
          <input
            type="text"
            value={date}
            onChange={handleDateChange}
            placeholder="날짜를 입력하세요"
          />
          <button className={style.buttonBox} onClick={handleSearch}>
            검색
          </button>
        </label>

        {/* 영화 데이터 테이블 */}

        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>영화 제목</th>
              <th>개봉일</th>
            </tr>
          </thead>
          <tbody>
            {/*3항 연산자 사용하기*/}
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.rnum}>
                  <td>{movie.rank}</td>
                  <td>{movie.movieNm}</td>
                  <td>{movie.openDt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>해당 날짜에 대한 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <footer className={style.footerContent}>
        Copyright (c) 2011. Korean Film Council. All rights reserved
        <br />
        (48058) 부산광역시 해운대구 수영강변대로 130(우동) l 고객센터:
        02-6261-6573 l 이용시간: 09:00 ~ 18:00(평일) l E-mail:
        openapimaster@kofic.or.kr
      </footer>
    </div>
  );
}

export default MainPage;
