import React, { useRef } from "react";
import "../../styles/header.css";
import logo from "../../assets/img/dumble.png";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from "uuid"
import axios from "axios";



const nav__links = [
  {
    path: "#home",
    display: "Home",
  },
  {
    path: "#schedule",
    display: "Schedule",
  },
  {
    path: "#classes",
    display: "Classes",
  },
  {
    path: "#pricing-plan",
    display: "Pricing",
  },
];


const Header = () => {


  const navigate = useNavigate();

  function removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate("/")

  }

  async function newPage(){
    const id=uuidV4();
    const date=new Date();
    const data="";
    const email = localStorage.getItem('loggedInUser');
    const fetchData = async () => {
      try {
          const response = await axios.post('http://localhost:8080/newPage', {
              data: { email: email,_id:id,data:data,date:date }
          });
          console.log(response);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  await fetchData();

    window.open(`/document/${id}`, '_blank');
  }

  const handleRegisterClick = () => {
    
    navigate('/journal');
  };

  const headerRef = useRef(null);

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);

    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  const handleClick = e => {
    e.preventDefault();

    const targetAttr = e.target.getAttribute("href");
    const location = document.querySelector(targetAttr).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 80,
    });
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          {/* ======= LOGO ========= */}
          <div className="logo">
            <div className="logo__img">
              <img src={logo} alt="" />
            </div>
            <h2>Fitbody</h2>
          </div>

          {/* ========== navigation menu ========== */}

          <div className="navigation">
            <ul className="menu">
              {nav__links.map(item => (
                <li className="nav__item" key={item.path}>
                  <a onClick={handleClick} href={item.path}>
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =========== nav right ============ */}
          <div className="nav__right">
            <button className="register__btn" onClick={handleRegisterClick}>
              Journal
            </button>

            <button className="register__btn" onClick={() => window.open('https://mentalhealth-s7m0.onrender.com/', '_blank')}>
              ChatBot
            </button>
            <button className="register__btn" onClick={removeToken}>
              SignOut
            </button>

            <button className="register__btn" onClick={newPage}>
              New Journal
            </button>

            <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
