import { useState } from "react";
import Layout from "../Home/Layout";
import "./Login.scss";
import axios from "axios";
import { url } from "../../utils/config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [auth, setAuth] = use
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // https://19d0-195-158-14-126.eu.ngrok.io/auth/user_login/
      const postData = { username: login, password };
      const {data} = await axios.post(
        `${url}/auth/user_login/`,
        postData
      );
      if (data.token) {
        Cookies.set("token", JSON.stringify(data?.token?.accsess));
        Cookies.set("user", JSON.stringify(data))
        console.log(data?.token?.accsess)
      }
      let config = {
        headers: {
          Authorization: "Bearer " + data.token.accsess,
        },
      };
      const a = await axios.get(`${url}/auth/main_categories`, config)
      console.log(a)
      const res = await axios.get(`${url}/auth/user_profile/`, config)
      Cookies.set('auth', JSON.stringify(res.data))
      if(res.data.groups[0]?.name == 'Baholovchi'){
        navigate('/Home')
      }
      if(res.data.groups[0]?.name == 'Foydalanuvchi') {
        navigate('/Home')
      }
      if(res.data.groups[0]?.name == 'Uquv-bulimi') {
        navigate('/baho')
      }
      Cookies.set('role', JSON.stringify(res.data.groups[0]?.name))
    } catch (error) {
      console.log(error);
      toast.error("Login yoki parol xato kiritildi")
    }
  };
  return (
    <div className="form-signin  w-100 d-flex justify-content-center align-items-center">
      <form className="form" onSubmit={submitHandler}>
        <p className="form-title">KPI platformasi</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Login kirit"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Parol kirit"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Kirish
        </button>
      </form>
    </div>
  );
};

export default Login;
