import { useState } from "react";
import SendFileModal from "../Send-file-modal/Send-file-modal";
import "./Works-modal.scss";
const WorksModal = ({modalValue, dataModal, token, send}) => {
  const [sendFileModalActive, setSendFileModalActive] = useState(false);


  return (
    <>
      <div className="works-modal-wrap">
        <div className="works-modal-head">
          <h2>Batafsil korish</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ballarni hisoblash metodikasi</th>
              <th className="w-25" scope="col">
                Natijalarni hisoblash muddati
              </th>
              <th scope="col">Ball</th>
              <th scope="col">Jarima ballari</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td className="w-50">
               {dataModal?.description}
              </td>
              <td style={{textAlign:"center"}}>{dataModal?.date_of_calculation_ball}</td>
              <td>{dataModal?.ball_of_question}</td>
              <td>
                <ul>
                  {dataModal?.penalty_id?.map(item => (
                     <li key={item?.unique_id}>
                    {item?.description}
                   </li>
                    ))}
                 
                  
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="works-modal-btn">
          <button
            type="button"
            className="btn btn-outline-primary w-25"
            onClick={() => setSendFileModalActive(true)}
          >
            Malumot yuborish
          </button>
          <button type="button" className="btn btn-outline-secondary w-25" onClick={() => modalValue(false)}>
            Tugatish  
          </button>
        </div>
      </div>
      {sendFileModalActive && (
        <div className="send-file-modal">
          <SendFileModal token={token} config={send} id={dataModal.unique_id} activeValue={setSendFileModalActive} />
        </div>
      )}
    </>
  );
};

export default WorksModal;
