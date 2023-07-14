import { useEffect, useState } from "react";
import { Header } from "../../components";
import "./Home.scss";
import "./style.css";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/config";
import Cookies from "js-cookie";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [category2, setCategory2] = useState([]);
  // const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // let a = Cookies.get("token");

    // if (a) {
    //   let res = JSON.parse(a);
    //    res.length > 0 && setToken(res);

    // }
    let m = Cookies.get("role");
    if (m) {
      let result = JSON.parse(m);
      setRole(result);
    }
  }, []);

  let token = "";

  useEffect(() => {
    let a = Cookies.get("token");
    if (a) {
      let res = JSON.parse(a);

      token = res;
    }
  }, []);

  console.log(token);

  const categoryHandler = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${url}/auth/main_categories`, config);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  const userCategoryHandler = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${url}/auth/main_categories_user/`,
        config
      );
      console.log(data);
        setCategory2(data);
      
    } catch (error) {}
  };
  useEffect(() => {
    categoryHandler();
    userCategoryHandler();
  }, []);

  const toggleCard = (cardId) => {
    setCategory((prevCards) =>
      prevCards.map((card) =>
        card?.categories[0]?.fields?.unique_id === cardId
          ? { ...card, visible: !card.visible }
          : card
      )
    );
  };
  const toggleCard2 = (cardId) => {
    setCategory2((prevCards) =>
      prevCards.map((card) =>
        card?.categories[0]?.fields?.unique_id === cardId
          ? { ...card, visible: !card.visible }
          : card
      )
    );
  };
  console.log(token);
  return (
    <Layout>
      <div className="home  container">
        {role == "Baholovchi" &&
          category?.map((card, index) => (
            <div key={index} className="home-cards mt-5 bg-white">
              <div className="home-card card p-4">
                <div className="card-title">
                  <h3>{card?.main_cate}</h3>
                </div>
                <div className="card_btn my-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      toggleCard(card?.categories[0]?.fields?.unique_id)
                    }
                  >
                    Batafsil malumot
                  </button>
                </div>
                {card.visible && (
                  <div className="bottom__dropdown d-flex align-items-center p-2">
                    <Link className="con  p-2">
                      {card?.categories?.map((item, index) => (
                        <Link style={{color:"black", textDecoration:"none"}}
                          key={index}
                          to={
                            role == "Baholovchi"
                              ? `/baholovchi/${item?.fields?.unique_id}`
                              : `/work/${item?.fields?.unique_id}`
                          }
                        >
                          <p style={{color:"black", textDecoration:"none"}} className="subdes" >{item?.fields?.name}</p>
                        </Link>
                      ))}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        {role == "Foydalanuvchi" &&
          category2?.map((card, index) => (
            <div key={index} className="home-cards mt-5 bg-white">
              <div className="home-card card p-4">
                <div className="card-title">
                  <h3>{card?.main_cate}</h3>
                </div>
                <div className="card_btn my-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      toggleCard2(card?.categories[0]?.fields?.unique_id)
                    }
                  >
                    Batafsil malumot
                  </button>
                </div>
                {card.visible && (
                  <div className="bottom__dropdown d-flex align-items-center border p-2">
                    <Link className="con border p-2" style={{color:"black", textDecoration:"none"}}>
                      {card?.categories?.map((item, index) => (
                        <Link style={{color:"black", textDecoration:"none"}}
                          key={index}
                          to={
                            role == "Baholovchi"
                              ? `/baholovchi/${item?.fields?.unique_id}`
                              : `/work/${item?.fields?.unique_id}`
                          }
                        >
                          <p>{item?.fields?.name}</p>
                        </Link>
                      ))}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Home;
