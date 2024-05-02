import React from 'react';
import styles from '../../styles/NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('jwt');
    navigate("/");
  };

  const goHome = () => {
    navigate('/main');
  }

  const startNavigate = (location) => {
    const token = cookies.jwt;
    if (!token) {
      alert('로그인 해 주세요!');
      navigate('/');
      return;
    }

    navigate(`/${location}`);
  }

  return (
    <div className={styles.navBarContainer}>
      <a href="#" className={styles.navLink} onClick={goHome}>Home</a>
      <a href="#" className={styles.navLink} onClick={() => startNavigate("workbook")}>workbook</a>
      <a href="#" className={styles.navLink} onClick={() => startNavigate("create")}>Create</a>
      <a href="#" className={styles.navLink} onClick={() => startNavigate("video")}>영상촬영</a>
      <a href="#" className={styles.navLink} onClick={handleLogout}>Logout</a>
    </div>
  );
};

export default NavBar;
