import React, { useState, useEffect } from "react"; // นำเข้าโมดูลหลักของ React และ Hooks
import DtiHeader from "../compo/DtiHeader"; // นำเข้าคอมโพเนนต์ DtiHeader
import car from './../assets/CAR.png' // นำเข้ารูปภาพ CAR.png
import { Link } from "react-router-dom"; // นำเข้าคอมโพเนนต์ Link จาก react-router-dom

function Car() { // เริ่มต้นการกำหนด Functional Component ชื่อ Car
  // 1. เปลี่ยน State Variables ให้สอดคล้องกับการคำนวณค่างวดรถ
  const [borrowerName, setBorrowerName] = useState(""); // State สำหรับชื่อผู้คำนวณ (ใช้สำหรับ UI)
  const [carPrice, setCarPrice] = useState(""); // State สำหรับราคารถ (บาท)
  const [interestRate, setInterestRate] = useState(""); // State สำหรับอัตราดอกเบี้ยต่อปี (%)
  const [downPaymentPct, setDownPaymentPct] = useState("15"); // State สำหรับเงินดาวน์ (%) - ค่าเริ่มต้น 15%
  const [loanPeriodMonths, setLoanPeriodMonths] = useState("24"); // State สำหรับจำนวนเดือนที่ผ่อน - ค่าเริ่มต้น 24 เดือน
  const [monthlyInstallment, setMonthlyInstallment] = useState("0.00"); // State สำหรับค่างวดต่อเดือน

  /** // เริ่มบล็อกคอมเม้นต์สำหรับฟังก์ชัน
   * Calculates the monthly car installment based on the provided formula. // อธิบายว่าฟังก์ชันใช้คำนวณค่างวดรถรายเดือน
   */ // จบบล็อกคอมเม้นต์
  const calculateInstallment = () => { // กำหนดฟังก์ชัน calculateInstallment สำหรับคำนวณค่างวด
    // 1. แปลงค่าที่ต้องใช้ในการคำนวณเป็นตัวเลข
    const price = parseFloat(carPrice); // ราคารถ
    const rate = parseFloat(interestRate); // ดอกเบี้ยต่อปี (%)
    const downPct = parseFloat(downPaymentPct) / 100; // เงินดาวน์ (%) แปลงเป็นทศนิยม (หารด้วย 100)
    const months = parseInt(loanPeriodMonths); // จำนวนเดือน (แปลงเป็นจำนวนเต็ม)
    const years = months / 12; // จำนวนปีที่ผ่อน

    // 2. ตรวจสอบข้อมูลที่ไม่ถูกต้อง
    if (isNaN(price) || isNaN(rate) || isNaN(downPct) || isNaN(months) || // ตรวจสอบว่าค่าเป็นตัวเลขหรือไม่
        price <= 0 || rate < 0 || downPct < 0 || months <= 0) { // ตรวจสอบเงื่อนไขตัวเลข
      setMonthlyInstallment("0.00"); // กำหนดค่างวดเป็น "0.00"
      return; // ออกจากฟังก์ชัน
    }

    // --- สูตรการคำนวณค่างวดรถ ---

    // 1. คำนวณยอดจัดไฟแนนซ์: ราคารถ - เงินดาวน์
    const downPaymentAmount = price * downPct; // คำนวณจำนวนเงินดาวน์
    const loanAmount = price - downPaymentAmount; // คำนวณยอดจัดไฟแนนซ์

    // 2. คำนวณดอกเบี้ยทั้งหมด: ยอดจัดไฟแนนซ์ x อัตราดอกเบี้ยรายปี (เป็นทศนิยม) x จำนวนปีที่ผ่อน
    const totalInterest = loanAmount * (rate / 100) * years; // คำนวณดอกเบี้ยทั้งหมด

    // 3. คำนวณยอดรวมทั้งหมดที่ต้องผ่อน: ยอดจัดไฟแนนซ์ + ดอกเบี้ยทั้งหมด
    const totalPayment = loanAmount + totalInterest; // คำนวณยอดรวมที่ต้องผ่อน

    // 4. คำนวณค่างวดต่อเดือน: ยอดรวมทั้งหมดที่ต้องผ่อน / จำนวนเดือนที่ผ่อน
    const installment = totalPayment / months; // คำนวณค่างวดต่อเดือน
    
    // 5. กำหนดค่าค่างวดต่อเดือน พร้อมจัดรูปแบบทศนิยม 2 ตำแหน่ง
    setMonthlyInstallment( // กำหนดค่า State monthlyInstallment ใหม่
      installment.toLocaleString("th-TH", { // แปลงผลลัพธ์เป็นสตริงพร้อมจัดรูปแบบ
        maximumFractionDigits: 2, // ทศนิยมสูงสุด 2 ตำแหน่ง
        minimumFractionDigits: 2, // ทศนิยมต่ำสุด 2 ตำแหน่ง
      })
    );
  }; // จบฟังก์ชัน calculateInstallment

  // ให้อัปเดตค่างวดทันทีเมื่อมีการเปลี่ยนแปลงใน input ที่เกี่ยวข้อง
  useEffect(() => { // ใช้ Hook useEffect
    calculateInstallment(); // เรียกใช้ฟังก์ชันคำนวณค่างวด
  }, [carPrice, interestRate, downPaymentPct, loanPeriodMonths]); // Dependency Array: รันเมื่อ State ที่เกี่ยวข้องเปลี่ยน

  // ฟังก์ชันเมื่อกดปุ่ม "คำนวณ" (ใช้เพื่อแสดง alert/validation)
  const handleCalculateClick = () => { // กำหนดฟังก์ชัน handleCalculateClick
    if (carPrice === "" || interestRate === "") { // ตรวจสอบว่าช่องว่างหรือไม่
      alert("กรุณาป้อนราคาและอัตราดอกเบี้ย"); // แสดงแจ้งเตือน
      return; // ออกจากฟังก์ชัน
    }
    
    const price = parseFloat(carPrice); // แปลงราคารถเป็นตัวเลข
    const rate = parseFloat(interestRate); // แปลงอัตราดอกเบี้ยเป็นตัวเลข

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate < 0) { // ตรวจสอบความถูกต้องของตัวเลข
      alert("กรุณาป้อนจำนวนที่ถูกต้องและมากกว่าศูนย์ (ยกเว้นดอกเบี้ย)"); // แสดงแจ้งเตือน
      return; // ออกจากฟังก์ชัน
    }

    // เรียกใช้ฟังก์ชันหลัก
    calculateInstallment(); // เรียกใช้ฟังก์ชันคำนวณค่างวด
  };
  
  /** // เริ่มบล็อกคอมเม้นต์สำหรับฟังก์ชัน
   * Clears all input fields and resets the calculated value. // อธิบาย: ล้างข้อมูล input ทั้งหมดและรีเซ็ตค่า
   */ // จบบล็อกคอมเม้นต์
  const handleReset = () => { // กำหนดฟังก์ชัน handleReset สำหรับรีเซ็ตค่า
    setBorrowerName(""); // ล้าง State ชื่อผู้คำนวณ
    setCarPrice(""); // ล้าง State ราคารถ
    setInterestRate(""); // ล้าง State ดอกเบี้ย
    setDownPaymentPct("15"); // รีเซ็ตเงินดาวน์เป็น 15%
    setLoanPeriodMonths("24"); // รีเซ็ตจำนวนเดือนเป็น 24
    setMonthlyInstallment("0.00"); // รีเซ็ตค่างวด
  };

  // รายการสำหรับ Dropdown (จำนวนเดือน)
  const loanPeriods = [24, 36, 48, 60, 72, 84]; // อาร์เรย์ของตัวเลือกจำนวนเดือน
  
  // รายการสำหรับ Radio Buttons (เงินดาวน์)
  const downPaymentOptions = [15, 20, 25, 30, 35]; // อาร์เรย์ของตัวเลือกเงินดาวน์

  // ฟังก์ชันจำลองสำหรับการนำทางกลับหน้าหลัก (แสดง alert แทน)
  const handleBackToHome = () => { // กำหนดฟังก์ชัน handleBackToHome
      alert("กลับสู่หน้าหลัก (จำลองการทำงาน)"); // แสดงแจ้งเตือนจำลอง
  };


  return ( // เริ่มต้นส่วน JSX ที่จะถูก Render
    <> 
      <div className="border-b-gray-300 shadow-2xl shadow-black/100 rounded-3xl w-8/12 mx-auto h-min"> 
        <DtiHeader title2="Car Installment Calculation" aa2="คำนวณ Car Installment" detail2={car} />
        <div className=" w-11/12  mx-auto p-8 shadow-lg rounded-xl flex flex-col">
          
          {/* ชื่อผู้คำนวณ */} 
          <label>ชื่อผู้คำนวณ</label>
          <input // Input Field ชื่อผู้คำนวณ
            value={borrowerName} // ผูกกับ State 'borrowerName'
            onChange={(e) => setBorrowerName(e.target.value)} // อัปเดต State 'borrowerName'
            type="text" // ประเภท Input เป็นข้อความ
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />

          {/* ราคารถ (บาท) */} 
          <label>ราคารถ (บาท)</label> 
          <input // Input Field ราคารถ
            value={carPrice} // ผูกกับ State 'carPrice'
            onChange={(e) => setCarPrice(e.target.value)} // อัปเดต State 'carPrice'
            type="number" // ประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />

          {/* ดอกเบี้ยต่อปี (%) */} 
          <label>ดอกเบี้ยต่อปี (%)</label> 
          <input // Input Field ดอกเบี้ย
            value={interestRate} // ผูกกับ State 'interestRate'
            onChange={(e) => setInterestRate(e.target.value)} // อัปเดต State 'interestRate'
            type="number" // ประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />
          
          {/* เงินดาวน์ (%) - Radio Buttons */} 
          <label className="mb-2">เงินดาวน์ (%)</label> 
          <div className="flex space-x-4 mb-5"> 
            {downPaymentOptions.map((option) => ( // วนลูปสร้าง Radio Button
              <label key={option} className="inline-flex items-center"> 
                <input // Radio Button
                  type="radio" // ประเภท input
                  name="downPayment" // กำหนดกลุ่ม radio button
                  value={option.toString()} // ค่าที่ใช้คือ % เงินดาวน์
                  checked={downPaymentPct === option.toString()} // ถูกเลือกเมื่อ State ตรงกับค่านี้
                  onChange={(e) => setDownPaymentPct(e.target.value)} // เมื่อถูกเลือก อัปเดต State 'downPaymentPct'
                  className="form-radio text-blue-600" // กำหนดสไตล์
                />
                <span className="ml-2">{option}%</span> 
              </label>
            ))}
          </div>
          

          {/* จำนวนเดือนที่ผ่อน - Dropdown */} 
          <label className="mb-2">จำนวนเดือนที่ผ่อน</label> 
          <select // Dropdown/Select Input
            value={loanPeriodMonths} // ผูกกับ State 'loanPeriodMonths'
            onChange={(e) => setLoanPeriodMonths(e.target.value)} // เมื่อค่าเปลี่ยน อัปเดต State 'loanPeriodMonths'
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-8" // กำหนดสไตล์
          >
            {loanPeriods.map((month) => ( // วนลูปสร้างตัวเลือกใน Dropdown
              <option key={month} value={month.toString()}> 
                {month} เดือน 
              </option>
            ))}
          </select>
          
          
          {/* ปุ่มคำนวณและรีเซ็ต (ล้างข้อมูล) */} 
          <div className="flex space-x-4"> 
            <button // ปุ่ม "คำนวณ"
              onClick={handleCalculateClick} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleCalculateClick
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex-1" // กำหนดสไตล์ (flex-1 ทำให้ปุ่มขยายเต็มพื้นที่อย่างเท่าเทียม)
            >
              คำนวณ 
            </button>
            <button // ปุ่ม "ล้างข้อมูล"
              onClick={handleReset} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleReset
              className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-4 rounded flex-1" // กำหนดสไตล์ (flex-1 ทำให้ปุ่มขยายเต็มพื้นที่อย่างเท่าเทียม)
            >
              ล้างข้อมูล 
            </button>
          </div>

          <div className="text-center mt-5 text-2xl font-bold"> 
            ผ่อนชำระต่อเดือน
            <span className="mx-5  text-black "> 
              {monthlyInstallment} 
            </span>
            บาท 
          </div>
         <Link to="/Home" className="w-full"> {/* เพิ่ม w-full ให้ Link */} 
          
          {/* ปุ่มกลับหน้าหลัก - เพิ่ม flex justify-center */}
          <button // ปุ่ม "กลับหน้าหลัก" (อยู่ใน Link)
             // คลาสเดิม: bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-4 rounded mt-5 w-full
             className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-4 rounded mt-5 w-full flex justify-center" // กำหนดสไตล์ Tailwind CSS, ใช้ w-full และ flex justify-center เพื่อจัดข้อความให้อยู่กึ่งกลางปุ่ม
          >
            กลับหน้าหลัก 
          </button>
          </Link> {/* ปิด Link tag */} 
        </div> 
      </div>
    </> 
  ); 
} 
export default Car