import { Link, useNavigate } from "react-router-dom";
import './Header.css'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [userData, setUserData] = useState([])
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const [rl, setRl] = useState('')
  useEffect(() => {
    let a = Cookies.get('auth')
    let b = Cookies.get('role')
    if(a) {
      let res = JSON.parse(a)
      setUserData(res)
    }
    if(b) {
      let res2 = JSON.parse(b)
      setRole(res2)

    }
  }, [])
  
  const logoutHandler = () => {
    Cookies.remove('auth')
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('role')
    navigate('/')
  }
 useEffect(() => {
  switch(role) {
    case 'Baholovchi':
     setRl('| Baholovchi');
     break;
    case 'Foydalanuvchi':
     setRl('| Foydalanuvchi');
     break;
    case 'Uquv-bulimi':
     setRl("| O'quv bo'limi")
     break;
   }
}, [role])
  return (
    <div className="header container  py-2 px-5  shadow-sm  bg-body rounded d-flex justify-content-between align-items-center ">
      <Link to={'/Home'} className="logo header__category w-auto">
       Lavozimi: {userData?.position}
      </Link>
      <div className="header__buttons d-flex  ">
        <Link  className="header__cabinet">
          <button type="button" className="btn btn-primary mx-3">
            {userData?.first_name} {userData?.last_name} {rl}
          </button>
        </Link>
        {/* <div className="header__logOut">
          <button type="button" className="btn btn-danger">
            Tizimdan chiqish
          </button>
        </div> */}
        
          <button  type="button" className="btn btn-danger" onClick={logoutHandler}>
            Tizimdan chiqish
          </button>
        
      </div>
    </div>
  );
};

export default Header;
