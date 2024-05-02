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
    navigate('/');
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
    <div className="nav-bar-container">
      <a className="nav-link" href="" onClick={e => { e.preventDefault(); goHome(); }}>Home</a>
      <a className="nav-link" href="" onClick={e => { e.preventDefault(); startNavigate("workbook"); }}>Workbook</a>
      <a className="nav-link" href="" onClick={e => { e.preventDefault(); startNavigate("create"); }}>Create</a>
      <a className="nav-link" href="" onClick={e => { e.preventDefault(); startNavigate("video"); }}>Videography</a>
      <a className="nav-link" href="" onClick={e => { e.preventDefault(); handleLogout(); }}>Logout</a>
    </div>
  );
};

export default NavBar;
