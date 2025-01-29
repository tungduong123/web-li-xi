import axios from "axios";
import React, { useEffect } from "react";

const LiXI = ({ money, show, animate, name, message }) => {
  useEffect(() => {
    // Tạo hàm async riêng
    if(money && show){
        const submitData = async () => {
            const storedPhone = localStorage.getItem("phone");
            const storedMessage = localStorage.getItem("message");
            try {
              const response = await axios.post(
                `https://backend-daily-m7gs-v2.onrender.com/api/user/nhan-li-xi`,
                { name, phone: storedPhone, message:storedMessage, money }
              );
              console.log("Data submitted:", response.data);
            } catch (error) {
              console.error("Error:", error);
            }
          };
            alert("Đã nhận lì xì: " + money);
          // Gọi hàm async
          submitData();
    }
  }, [money]); // Đảm bảo dependencies đúng nếu cần

  return (
    <div className={`App-css ${animate ? "animate" : ""}`}>
      <div className="a">
        <div className="a_top"></div>
        <div
          className={`a_letter ${show ? "show" : ""}`}
          style={{ display: `${show ? "block" : "none"}` }}
        >
          Chúc mừng năm mới, <strong>{name}</strong>! <br />
          {money !== null ? `${money} VNĐ` : "Nhấn nút để nhận tiền lì xì!"}
        </div>
        <div className="a_background"></div>
      </div>
    </div>
  );
};

export default LiXI;
