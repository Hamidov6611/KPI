import { useEffect, useState } from "react";
import "./Send-file-modal.scss";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../utils/config";
import { toast } from "react-toastify";
const SendFileModal = ({ activeValue, id, token, config }) => {
  const [sendFile, setSendFile] = useState("");
  console.log(sendFile);


  const sendFileSubmit = async (e) => {
    const formData = new FormData()
    formData.append('files', sendFile)
    e.preventDefault();
    
 console.log(token)
    try {
      
      const data = await axios.post(`${url}/auth/user_file_upload/${id}/`,formData, config);
      console.log(data)
      toast.success("Ma'lumot yuborildi")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="send-file-modal-wrap" onSubmit={sendFileSubmit}>
      <div
        className="close-icon bg-light card "
        onClick={() => activeValue(false)}
      >
        <IoClose />
      </div>
      <div className="send-file-modal-head">
        <h3>Malumot yuborish</h3>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          File tanlang
        </label>
        <input
          type="file"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setSendFile(e.target.files[0])}
        />
      </div>
      <div className="send-file-modal-btn">
        <button
         type="submit"
          className="btn btn-outline-secondary px-4"
          onClick={() => activeValue(false)}
        >
          Tugatish
        </button>
        <button type="submit" className="btn btn-primary px-4">
          Yuborish
        </button>
      </div>
    </form>
  );
};

export default SendFileModal;
