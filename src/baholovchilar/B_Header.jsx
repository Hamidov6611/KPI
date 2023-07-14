import { Link } from "react-router-dom";
// import './Header.css'

const B_Header = () => {
  return (
    <div className="header container  py-2 px-5  shadow-sm  bg-body rounded d-flex justify-content-between align-items-center ">
      <Link  className="logo header__category w-auto">
        Lavozim
      </Link>
      <div className="header__buttons d-flex  ">
        <Link className="header__cabinet">
          <button type="button" className="btn btn-primary mx-3">
            Ibrohim Istamov
          </button>
        </Link>
        {/* <div className="header__logOut">
          <button type="button" className="btn btn-danger">
            Tizimdan chiqish
          </button>
        </div> */}
         <Link to={'/login'} className="header__logOut">
          <button type="button" className="btn btn-danger">
            Tizimdan chiqish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default B_Header;
