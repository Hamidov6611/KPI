import React, { useEffect, useState } from "react";
import Layout from "../pages/Home/Layout";
import "./baho.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Baholovchilar = () => {
  const [isShow, setIsShow] = useState(false);
  const [baho, setBaho] = useState(null);
  const [ques, setQues] = useState([]);
  const [bahoId, setBahoId] = useState('')
  const { id } = useParams();
  const [file, setFile] = useState()
  let token = "";
  const [token1, setToken1] = useState("");

  useEffect(() => {
    let a = Cookies.get("token");
    if (a) {
      let res = JSON.parse(a);
      setToken1(res);
      token = res;
    }
  }, []);
  const questionHandler = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const { data } = await axios.get(
        `${url}/auth/user_files_get/${id}/`,
        config
      );
      console.log(data);
      setQues(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    questionHandler();
  }, []);

 

  const toggleCard = (cardId) => {
    setQues((prevCards) =>
      prevCards.map((card) =>
        card.unique_id === cardId ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const bahoniYuborish = async (e) => {
    e.preventDefault()
    console.log(bahoId)
     try {
      let config = {
        headers: {
          Authorization: `Token ${token1}`,
        },
      };
      console.log(config)
      const bahoData = {ball: baho}
      const data = await axios.post(`${url}/auth/ball_to_file_upload/${bahoId}/`, bahoData, config)
      toast.success("Baho qo'yildi")
      setBaho("")
      console.log(data)
     } catch (error) {
      console.log(error)
     }
  }
  const fileniYuborush = async (e) => {
    e.preventDefault()
    try {
      let config = {
        headers: {
          Authorization: `Token ${token1}`,
        },
      };
      const formData = new FormData()
      formData.append('ball', baho)
      formData.append('files', file)
      const data = await axios.post(`${url}/auth/penalty_upload_file/${bahoId}/`, formData, config )
      toast.success("Fayl yuborildi")
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="container">
        {ques?.map((card) => (
          <div key={card.unique_id} className="home-cards mt-5 bg-white">
            <div className="home-card card p-4">
              <div className="card-title">
                <h3>{card?.question?.question}</h3>
              </div>
              <div
                className="card_btn d-flex w-100 justify-content-between"
                style={{ fontSize: "16px" }}
              >
                <div className="d-flex w-50">
                  <p style={{ marginRight: "5px" }}>Muallif:</p>
                  <p style={{ marginRight: "5px" }}>
                    {card?.author?.first_name} {card?.author?.last_name}:{" "}
                  </p>
                  <p style={{ marginRight: "5px" }}>{card?.author?.position}</p>
                </div>
                <div className="w-50 ballar d-flex justify-content-around">
                  <p>Umumiy ball:{card?.question?.ball_of_question}</p>
                  <div
                    className="card_btn cursor-pointer"
                    style={{ color: "blue", fontSize: "14px" }}
                  >
                   
                    <a
                      href={`${url}${card?.files}/`}
                      download="Example-PDF-document"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <p className="">Yuklangan faylni olish</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card_btn my-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleCard(card?.unique_id)}
                >
                  Baho qo'yish
                </button>
              </div>
              {card.visible && (
                <form className="bottom__dropdown d-flex flex-column border p-2" onSubmit={baho > 0 ? bahoniYuborish: fileniYuborush}>
                  <div className="btn-group">
                    <input
                      className="baho"
                      type="number"
                      placeholder="Ball qo'yish"
                      value={baho}
                      onChange={(e) => setBaho(e.target.value)}
                    />
                    <button className="baho-btn" type="submit">
                     {card?.question?.ball_of_question} ballgacha qo'yish mumkin
                    </button>
                  </div>
                  {baho < 0 && (
                    <div className="w-50 p-2">
                      <div className=" ">
                        <input
                          type="file"
                          id="files"
                          className="form-control"
                          name="files"
                          //  multiple
                           onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                      {/* <button className="btn btn-primary w-100 mb-1" type="submit">
                        Jarima bo'lganda fayl yuborish kerak
                      </button> */}
                    </div>
                  )}
                  <button
                    style={{ width: "150px" }}
                    className="mx-2 mb-1 p-2 btn btn-primary"
                    type="submit"
                    onClick={() => setBahoId(card?.unique_id)}
                  >
                    Yuborish
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Baholovchilar;
