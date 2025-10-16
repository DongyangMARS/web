import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./DashBoard.css";
import axios from "axios";

const UserTotal = () => {
  // State 변수들을 하나로 모아서 정리했습니다.
  const [users, setUsers] = useState([]);
  const [searchTop, setSearchTop] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openRow, setOpenRow] = useState(null); // 상세 정보 열기/닫기 상태
  const itemsPerPage = 10;

  useEffect(() => {
    // API 호출 로직을 useEffect 안으로 이동시켰습니다.
    axios
      .get("/api/users") // 실제 API 엔드포인트로 변경하세요.
      .then((res) => {
        const allUsers = res.data.users || [];
        setUsers(allUsers);
      })
      .catch((err) => {
        console.error("회원정보 불러오기 실패:", err);
        // 테스트용 목(mock) 데이터
        setUsers([
            { name: '김민준', email: 'minjun.kim@example.com', createdAt: new Date(), measurementCount: 5 },
            { name: '이서연', email: 'seoyeon.lee@example.com', createdAt: new Date(), measurementCount: 3 }
        ]);
      });
  }, []);

  // 검색 적용
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTop.toLowerCase())
  );

  // 페이지별 데이터
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 검색 시 페이지 초기화
  const handleSearchChange = (e) => {
    setSearchTop(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="DashLogo">MINDSPACE</div>
        <ul>
          <li>
            <NavLink to="/DashBoard" className={({ isActive }) => (isActive ? "active" : "")}>
              대시보드
            </NavLink>
          </li>
          <li>
            <NavLink to="/User" className={({ isActive }) => (isActive ? "active" : "")}>
              사용자 관리
            </NavLink>
          </li>
          {/* 주석 처리된 메뉴는 필요에 따라 활성화하세요. */}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              홈페이지
            </NavLink>
          </li>
        </ul>
        {/* 프로필 카드도 포함시켰습니다. */}
        <div className="card profile-card">
          <div className="profile-image">사진</div>
          <div className="profile-info">
            <p>MARS</p>
            <span>Mars1234@gmail.com</span>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="top">
          <div className="card userlist-card">
            <div className="search">
              <NavLink to="/NewTotal" className={({ isActive }) => (isActive ? "active" : "")}>
                신규 회원 목록
              </NavLink>
              <NavLink to="/UserTotal" className={({ isActive }) => (isActive ? "active" : "")}>
                전체 사용자 목록
              </NavLink>
              <input
                type="text"
                placeholder="이름 검색"
                value={searchTop}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            <table className="listTable">
              <thead>
                <tr>
                  <th className="namePart">이름</th>
                  <th>아이디</th>
                  <th>가입일</th>
                  <th>검사횟수</th>
                  <th>검사정보</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty">
                      회원이 없습니다.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <React.Fragment key={user.email}>
                      <tr>
                        <td>{user.name || "이름"}</td>
                        <td>{user.email || "아이디"}</td>
                        <td>
                          {user.createdAt
                            ? new Date(user.createdAt)
                                .toLocaleDateString("ko-KR", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .replace(/\. /g, ".")
                                .replace(/\.$/, "")
                            : "가입일"}
                        </td>
                        <td>{user.measurementCount ?? 0}</td>
                        <td>
                          <button
                            onClick={() =>
                              setOpenRow(
                                openRow === user.email ? null : user.email
                              )
                            }
                            className="toggle-button"
                          >
                            {openRow === user.email ? "닫기" : "열기"}
                          </button>
                        </td>
                      </tr>
                      {/* 상세 정보가 열리는 부분 */}
                      {openRow === user.email && (
                        <tr className="details-row">
                          <td colSpan={5}>
                            <div className="details-content">
                                <p><strong>{user.name}</strong> 님의 상세 정보입니다.</p>
                                {/* 여기에 추가 정보를 표시할 수 있습니다. */}
                                <button className="action-button">수정</button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserTotal;