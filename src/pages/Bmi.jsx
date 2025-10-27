import React, { useState, useEffect } from "react"; // นำเข้าโมดูลหลักของ React และ Hooks ที่จำเป็น (useState สำหรับสถานะ, useEffect สำหรับผลข้างเคียง)
import DtiHeader from "../compo/DtiHeader"; // นำเข้าคอมโพเนนต์ DtiHeader ที่ใช้แสดงส่วนหัวของหน้า
import BmiImage from './../assets/BMI.png' // นำเข้ารูปภาพ BMI.png และกำหนดให้ชื่อ BmiImage (ใช้สำหรับแสดงใน DtiHeader)
import { Link } from "react-router-dom"; // นำเข้าคอมโพเนนต์ Link จาก react-router-dom เพื่อใช้ในการนำทางไปยังหน้าอื่น (เช่น หน้า Home)

function Bmi() { // เริ่มต้นการกำหนด Functional Component ชื่อ Bmi
  const [kg, setKg] = useState(""); // กำหนด State 'kg' สำหรับเก็บค่าน้ำหนัก (กิโลกรัม) และฟังก์ชันสำหรับอัปเดต (ค่าเริ่มต้นเป็นสตริงว่าง)
  const [cm, setCm] = useState(""); // กำหนด State 'cm' สำหรับเก็บค่าส่วนสูง (เซนติเมตร) และฟังก์ชันสำหรับอัปเดต (ค่าเริ่มต้นเป็นสตริงว่าง)
  const [bmi, setBmi] = useState("0.00"); // กำหนด State 'bmi' สำหรับเก็บค่า BMI ที่คำนวณได้ (ค่าเริ่มต้นเป็น "0.00")

  /** // เริ่มบล็อกคอมเม้นต์สำหรับฟังก์ชัน
   * Calculates the BMI using the standard formula. // อธิบายว่าฟังก์ชันนี้ใช้คำนวณ BMI ตามสูตรมาตรฐาน
   * BMI = Weight (kg) / [Height (m)]^2 // แสดงสูตรการคำนวณ
   */ // จบบล็อกคอมเม้นต์
  const calBmi = () => { // กำหนดฟังก์ชัน calBmi สำหรับคำนวณ BMI
    const weightKg = parseFloat(kg); // แปลงค่าน้ำหนัก (State kg) ให้เป็นตัวเลขทศนิยม
    const heightCm = parseFloat(cm); // แปลงค่าส่วนสูง (State cm) ให้เป็นตัวเลขทศนิยม

    // Check for invalid or missing inputs // ตรวจสอบข้อมูลที่ไม่ถูกต้องหรือขาดหาย
    if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) { // หากค่าใดค่าหนึ่งไม่ใช่ตัวเลข, หรือค่าน้ำหนัก/ส่วนสูงน้อยกว่าหรือเท่ากับ 0
      setBmi("0.00"); // กำหนดค่า BMI เป็น "0.00"
      return; // ออกจากฟังก์ชัน
    }

    // 1. Convert height from centimeters (cm) to meters (m) // ขั้นตอนที่ 1: แปลงส่วนสูงจากเซนติเมตร (cm) เป็นเมตร (m)
    const heightM = heightCm / 100; // ส่วนสูงเป็นเมตร = ส่วนสูงเป็นเซนติเมตร / 100

    // 2. Calculate BMI: weight / (height * height) // ขั้นตอนที่ 2: คำนวณ BMI: น้ำหนัก / (ส่วนสูงเป็นเมตร ยกกำลังสอง)
    const result = weightKg / (heightM * heightM); // ดำเนินการคำนวณ BMI ตามสูตร
    
    // 3. Set the state, formatting the number to two decimal places // ขั้นตอนที่ 3: กำหนดค่า State พร้อมจัดรูปแบบทศนิยม 2 ตำแหน่ง
    setBmi( // กำหนดค่า State bmi ใหม่
      result.toLocaleString("th-TH", { // แปลงผลลัพธ์ให้เป็นสตริงตามรูปแบบภาษาไทย
        maximumFractionDigits: 2, // กำหนดจำนวนทศนิยมสูงสุดเป็น 2 ตำแหน่ง
        minimumFractionDigits: 2, // กำหนดจำนวนทศนิยมต่ำสุดเป็น 2 ตำแหน่ง
      }) // ปิดการกำหนดรูปแบบ
    ); // ปิดการกำหนดค่า State
  }; // จบฟังก์ชัน calBmi

  // Run calculation whenever kg or cm changes (for live update) // คอมเม้นต์อธิบายว่าใช้สำหรับการอัปเดตค่าทันทีเมื่อข้อมูลเปลี่ยน
  useEffect(() => { // ใช้ Hook useEffect เพื่อรันโค้ดเมื่อ State ที่กำหนดเปลี่ยนไป
    calBmi(); // เรียกใช้ฟังก์ชันคำนวณ BMI
  }, [kg, cm]); // Dependency Array: ฟังก์ชันจะทำงานใหม่เมื่อ State 'kg' หรือ 'cm' เปลี่ยนแปลง

  // Function to handle changes in the "ส่วนสูง (เซนติเมตร)" input // คอมเม้นต์อธิบายฟังก์ชันสำหรับจัดการ input ส่วนสูง
  const handleInputCm = (e) => { // กำหนดฟังก์ชัน handleInputCm โดยรับ Event Object
    setCm(e.target.value); // อัปเดต State 'cm' ด้วยค่าใหม่จากช่อง Input
  };

  // Function when the "คำนวณ" button is clicked (used for explicit calculation/validation) // คอมเม้นต์อธิบายฟังก์ชันสำหรับการคลิกปุ่ม "คำนวณ"
  const handleCalBmiClick = () => { // กำหนดฟังก์ชัน handleCalBmiClick
    if (kg === "" || cm === "") { // ตรวจสอบว่าช่องน้ำหนักหรือส่วนสูงเป็นค่าว่างหรือไม่
      alert("กรุณาป้อนข้อมูลให้ครบ"); // แสดงแจ้งเตือนหากข้อมูลไม่ครบ
      return; // ออกจากฟังก์ชัน
    }
    
    const weightKg = parseFloat(kg); // แปลงค่าน้ำหนักเป็นตัวเลขทศนิยม
    const heightCm = parseFloat(cm); // แปลงค่าส่วนสูงเป็นตัวเลขทศนิยม

    if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) { // ตรวจสอบความถูกต้องของตัวเลข
      alert("กรุณาป้อนจำนวนที่ถูกต้องและมากกว่าศูนย์"); // แสดงแจ้งเตือนหากตัวเลขไม่ถูกต้อง
      return; // ออกจากฟังก์ชัน
    }

    // Call the main calculation function // คอมเม้นต์: เรียกใช้ฟังก์ชันคำนวณหลัก
    calBmi(); // เรียกใช้ฟังก์ชัน calBmi
  };
  
  /** // เริ่มบล็อกคอมเม้นต์สำหรับฟังก์ชัน
   * Clears all input fields and resets the calculated BMI value. // อธิบาย: ล้างข้อมูล input ทั้งหมดและรีเซ็ตค่า BMI
   */ // จบบล็อกคอมเม้นต์
  const handleReset = () => { // กำหนดฟังก์ชัน handleReset สำหรับรีเซ็ตค่า
    setKg(""); // ล้าง State น้ำหนัก
    setCm(""); // ล้าง State ส่วนสูง
    setBmi("0.00"); // รีเซ็ต State BMI
  };
  
  // ฟังก์ชันจำลองสำหรับการนำทางกลับหน้าหลัก (แสดง alert แทน)

  return ( // เริ่มต้นส่วน JSX ที่จะถูก Render
    <> 
    <div className="border-b-gray-300 shadow-2xl shadow-black/100 rounded-3xl w-8/12 mx-auto h-min">
        <DtiHeader title2="BMI Calculation" aa2="คำนวณ BMI" detail2={BmiImage} /> 
        <div className=" w-11/12 mx-auto p-8 rounded-xl flex flex-col"> 
          <label>ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input // Input Field สำหรับรับน้ำหนัก
            value={kg} // กำหนดค่า Input ให้ผูกกับ State 'kg'
            onChange={(e) => setKg(e.target.value)} // เมื่อค่าเปลี่ยน ให้อัปเดต State 'kg'
            type="number" // กำหนดประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์ด้วย Tailwind CSS
            placeholder="เช่น 65" // ข้อความ Placeholder
          />

          <label>ป้อนส่วนสูง (เซนติเมตร)</label> 
          <input // Input Field สำหรับรับส่วนสูง
            value={cm} // กำหนดค่า Input ให้ผูกกับ State 'cm'
            onChange={handleInputCm} // เมื่อค่าเปลี่ยน เรียกใช้ฟังก์ชัน handleInputCm
            type="number" // กำหนดประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์ด้วย Tailwind CSS
            placeholder="เช่น 175" // ข้อความ Placeholder
          />

          <button // ปุ่ม "คำนวณ BMI"
            onClick={handleCalBmiClick} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleCalBmiClick
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-5" // กำหนดสไตล์ Tailwind CSS
          >
            คำนวน BMI
          </button>
          <button // ปุ่ม "รีเซ็ต"
             onClick={handleReset} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleReset
             className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-4 px-4 rounded" // กำหนดสไตล์ Tailwind CSS
          >
            รีเซ็ต
          </button>

          <div className="text-center text-2xl mt-5"> 
            ค่า BMI ที่คำนวณได้
            <span className="mx-5  text-blue-700 font-bold"> 
              {bmi} 
            </span>
          </div>
          <Link to="/Home" className="w-full"> {/* เพิ่ม w-full ให้ Link */} 
          
          {/* ปุ่มกลับหน้าหลัก - เพิ่ม flex justify-center */}
          <button // ปุ่ม "กลับหน้าหลัก" (อยู่ใน Link)
             // (เดิม) เมื่อคลิก เรียกใช้ฟังก์ชัน handleBackToHome (ฟังก์ชันจำลอง)
             // คลาสเดิม: bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-4 rounded mt-5 w-full
             className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-4 rounded mt-5 w-full flex justify-center" // กำหนดสไตล์, ใช้ w-full และ flex justify-center เพื่อจัดข้อความให้อยู่กึ่งกลางปุ่ม
          >
            กลับหน้าหลัก 
          </button>
          </Link> {/* ปิด Link tag */} 
        </div>
        
      </div> 
    </> 
  );
}
export default Bmi 