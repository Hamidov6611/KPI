import { useEffect, useState } from "react";
import { WorksModal } from "../../components";
import "./Works.scss";

import Layout from "../Home/Layout";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { url } from "../../utils/config";
const Works = () => {
  const [worksModalActive, setWorksModalActive] = useState(false);
  const [question, setQuestion] = useState([])
  const [dataModal, setDataModal] = useState([])
  const [sendFileToken, setSendFileToken] = useState([])
  
  const {id} = useParams()
  let token = ''
  const [token1, setToken1] = useState("")

  useEffect(() => {
    let a = Cookies.get('token')
    if(a) {
      let res = JSON.parse(a)
      setToken1(res)
      token = res
    }
  }, [])

  const questionHandler = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      setSendFileToken(config)
      const {data} = await axios.get(`${url}/auth/question/${id}`, config)
      setQuestion(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    questionHandler()
  }, [])


  const sentDataToModal = (res) => {
    setDataModal(res)
    setWorksModalActive(true)
  }
  return (
    <Layout>

    <div className="works-wrapp">
      <div className="works-container container m-auto mt-5 card">
       
            <table  className="table table-hover">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th className="w-50" scope="col-3">
                  Amalga oshirigan ishlar
                </th>
                <th scope="col">Ball</th>
               
                <th scope="col">Batafsil...</th>
              </tr>
            </thead>
            {question?.map((item, index) => {
            let a = index + 1
            return (
            <tbody key={index}>
              <tr>
                <th scope="row">{a}</th>
                <td className="text">
                  {item?.question}
                </td>
                <td>{item?.ball_of_question}</td>
                
                <td>
                  <button type="button" className="btn btn-primary" onClick={()=> sentDataToModal(item)}>
                    Batafsil...
                  </button>
                </td>
              </tr>
            </tbody>
            )})}
          </table>
          
      </div>
      <div className={`works-modal ${worksModalActive && 'show'} `}>
        <WorksModal token={token} send={sendFileToken} dataModal={dataModal} modalValue={setWorksModalActive}/>
      </div>
    </div>
    </Layout>
  );
};

export default Works;
