import React, { useState, useEffect } from "react";
import DtiHeader from "../compo/DtiHeader";
// เปลี่ยนชื่อการ import asset ให้ชัดเจนขึ้น เช่น BmiImage
import BmiImage from './../assets/BMI.png' 

// คงชื่อ Component ไว้ตามที่คุณต้องการ
function Bmi() { 
 const [money, setMoney] = useState("");
  const [people, setPeople] = useState("");
  const [moneyShare, setMoneyShare] = useState("0.00");

  const calMoneyShare = () => {
    if (money === "" || people === "" || people === "0") {
      setMoneyShare("0.00");
      return;
    }
    let moneyInput = parseFloat(money);
    let peopleInput = parseInt(people);
    let result = moneyInput / peopleInput;
    setMoneyShare(
      result.toLocaleString("th-TH", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
  };

  useEffect(() => {
    calMoneyShare();
  }, [money, people]);

  // ฟังก์ชันเมื่อเปลี่ยนค่าช่อง input "จำนวนคน"
  const handleInputPeople = (e) => {
    setPeople(e.target.value);
  };

  // ฟังก์ชันเมื่อกดปุ่ม "คำนวน"
  const handleCalMoneyShareClick = () => {
    if (money === "" || people === "") {
      alert("กรุณาป้อนข้อมูลให้ครบ");
      return;
    }
    const moneyInput = parseFloat(money);
    const peopleInput = parseInt(people);
    if (isNaN(moneyInput) || isNaN(peopleInput) || peopleInput <= 0) {
      alert("กรุณาป้อนจำนวนที่ถูกต้อง");
      return;
    }
    const result = moneyInput / peopleInput;
    setMoneyShare(
      result.toLocaleString("th-TH", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
  };

  return (
    <>
    <div className="border-b-gray-300 shadow-2xl shadow-black/100 rounded-3xl w-8/12 mx-auto h-min">

        <DtiHeader title2="BMI Calculation" aa2="คำนวณ BMI" detail2={BmiImage} />
        <div className=" w-11/12 mx-auto p-8 rounded-xl flex flex-col">
          <label>ป้อนเงิน (บาท)</label>
          <input
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            type="number"
            className="border border-gray-500 bg-gray-300 p-2 mt-2 mb-5"
            placeholder="ป้อนจำนวนเงิน"
          />

          <label>ป้อนคน (คน)</label>
          <input
            value={people}
            onChange={handleInputPeople}
            type="number"
            className="border border-gray-500 bg-gray-300 p-2 mt-2 mb-5"
            placeholder="ป้อนจำนวนคน"
          />

          <button
            onClick={handleCalMoneyShareClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            คำนวน
          </button>

          <div className="text-center mt-5">
            หารกันคนละ
            <span className="mx-5 text-2xl text-red-600 font-bold">
              {moneyShare}
            </span>
            บาท
          </div>
        </div>
      </div>
    </>
  );
}
export default Bmi