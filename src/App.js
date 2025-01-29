import { useState, useEffect } from "react";
import LiXI from "./LiXI";
import axios from "axios"; // Import axios

const App = () => {
  const [money, setMoney] = useState(null);
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hasReceived, setHasReceived] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(true); // Hiển thị form nhập thông tin

  useEffect(() => {
    const received = localStorage.getItem("hasReceived");
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");
    const storedMessage = localStorage.getItem("message");

    if (received) {
      setHasReceived(true);
      setShowForm(false); // Ẩn form nếu đã nhận tiền
    }

    if (storedName && storedPhone && storedMessage) {
      setName(storedName);
      setPhone(storedPhone);
      setMessage(storedMessage);
      setShowForm(false); // Ẩn form nếu đã có thông tin
    }
  }, []);

  useEffect(() => {
    const received = localStorage.getItem("hasReceived");
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");
    const storedMessage = localStorage.getItem("message");

    if (received) {
      setHasReceived(true);
      setShowForm(false); // Ẩn form nếu đã nhận tiền
    }

    if (storedName && storedPhone && storedMessage) {
      setName(storedName);
      setPhone(storedPhone);
      setMessage(storedMessage);
      setShowForm(false); // Ẩn form nếu đã có thông tin
    }
  }, []);

  const randomMoney = () => {
    if (hasReceived) return;

    const amounts = [
      { value: 10000, probability: 0.3 },  // 30%
      { value: 20000, probability: 0.3 },  // 30%
      { value: 30000, probability: 0.25 }, // 25%
      { value: 50000, probability: 0.15 }, // 15%
      { value: 100000, probability: 0.10 }, // 10%
    ];

    const random = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < amounts.length; i++) {
      cumulativeProbability += amounts[i].probability;
      if (random < cumulativeProbability) {
        setMoney(amounts[i].value);
        break;
      }
    }

    // Bắt đầu animation
    setAnimate(true);
    setShow(true); // Hiện tiền lì xì

    // Đặt lại animation sau 0.5 giây (thời gian của hiệu ứng)
    setTimeout(() => {
      setAnimate(false);
    }, 500);

    // Lưu trạng thái đã nhận tiền
    localStorage.setItem("hasReceived", true);
    setHasReceived(true);
    
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (name && phone && message) {
      // Lưu thông tin vào localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      localStorage.setItem("message", message);
      setShowForm(false); // Ẩn form và hiển thị nút nhận tiền
    }
  };

  return (
    <div>
      {showForm ? (
        <div style={{ width: "100%" }} className="container-wrapper">
          <div className="form-container">
            <h2>Nhập thông tin người nhận</h2>
            <span>Lưu ý: đứa nào bịp vào web t anh cho cài viruss vào máy</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Tên:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Lời chúc:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={!name || !phone || !message}>
                Gửi
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="container-wrapper--btn">
            <LiXI money={money} show={show} animate={animate} name={name} />
            <div className="btn-container">
              {!hasReceived && <button style={{ border: "none", borderRadius: "10px", fontSize: "large", background: "#8fc76c", padding: "10px" }} onClick={randomMoney}>Nhận tiền lì xì</button>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;