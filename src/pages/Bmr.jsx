import React, { useState, useEffect } from "react"; // นำเข้าโมดูลหลักของ React และ Hooks
import DtiHeader from "../compo/DtiHeader"; // นำเข้าคอมโพเนนต์ DtiHeader
import bmr from './../assets/BMR.png' // นำเข้ารูปภาพ BMR.png
import { Link } from "react-router-dom"; // นำเข้าคอมโพเนนต์ Link จาก react-router-dom

function Bmr() { // เริ่มต้นการกำหนด Functional Component ชื่อ Bmr
  // 1. เปลี่ยน State Variables
  const [weight, setWeight] = useState(""); // State สำหรับเก็บค่าน้ำหนัก (กิโลกรัม)
  const [height, setHeight] = useState(""); // State สำหรับเก็บค่าส่วนสูง (เซนติเมตร)
  const [age, setAge] = useState(""); // State สำหรับเก็บค่าอายุ (ปี)
  const [gender, setGender] = useState("male"); // State สำหรับเก็บค่าเพศ (ค่าเริ่มต้น 'male')
  const [bmrValue, setBmrValue] = useState("0.00"); // State สำหรับเก็บค่า BMR ที่คำนวณได้

  /** // เริ่มบล็อกคอมเม้นต์สำหรับฟังก์ชัน
   * Calculates the BMR using the Harris-Benedict formula. // อธิบายว่าฟังก์ชันใช้สูตร Harris-Benedict
   * Male BMR: 66 + (13.7 x W) + (5 x H) – (6.8 x A) // แสดงสูตรสำหรับผู้ชาย
   * Female BMR: 665 + (9.6 x W) + (1.8 x H) – (4.7 x A) // แสดงสูตรสำหรับผู้หญิง
   * W=Weight(kg), H=Height(cm), A=Age(years) // อธิบายตัวแปร
   */ // จบบล็อกคอมเม้นต์
  const calBMR = () => { // กำหนดฟังก์ชัน calBMR สำหรับคำนวณ BMR
    const w = parseFloat(weight); // แปลงค่าน้ำหนักเป็นตัวเลขทศนิยม
    const h = parseFloat(height); // แปลงค่าส่วนสูงเป็นตัวเลขทศนิยม
    const a = parseFloat(age); // แปลงค่าอายุเป็นตัวเลขทศนิยม

    // ตรวจสอบข้อมูลที่ไม่ถูกต้อง
    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) { // หากข้อมูลไม่ถูกต้องตามเงื่อนไข
      setBmrValue("0.00"); // กำหนดค่า BMR เป็น "0.00"
      return; // ออกจากฟังก์ชัน
    }

    let calculatedBMR = 0; // กำหนดตัวแปรสำหรับเก็บค่า BMR ที่คำนวณได้

    if (gender === "male") { // ตรวจสอบว่าเป็นเพศชาย
      // สำหรับผู้ชาย: BMR = 66 + (13.7 x W) + (5 x H) – (6.8 x A)
      calculatedBMR = 66 + (13.7 * w) + (5 * h) - (6.8 * a); // คำนวณ BMR ตามสูตรผู้ชาย
    } else if (gender === "female") { // ตรวจสอบว่าเป็นเพศหญิง
      // สำหรับผู้หญิง: BMR = 665 + (9.6 x W) + (1.8 x H) – (4.7 x A)
      calculatedBMR = 665 + (9.6 * w) + (1.8 * h) - (4.7 * a); // คำนวณ BMR ตามสูตรผู้หญิง
    }

    // กำหนดค่า BMR พร้อมจัดรูปแบบทศนิยม 2 ตำแหน่ง
    setBmrValue( // กำหนดค่า State bmrValue ใหม่
      calculatedBMR.toLocaleString("th-TH", { // แปลงผลลัพธ์เป็นสตริงพร้อมจัดรูปแบบ
        maximumFractionDigits: 2, // ทศนิยมสูงสุด 2 ตำแหน่ง
        minimumFractionDigits: 2, // ทศนิยมต่ำสุด 2 ตำแหน่ง
      })
    );
  }; // จบฟังก์ชัน calBMR

  // ให้อัปเดต BMR ทันทีเมื่อมีการเปลี่ยนแปลงใน input
  useEffect(() => { // ใช้ Hook useEffect
    calBMR(); // เรียกใช้ฟังก์ชันคำนวณ BMR
  }, [weight, height, age, gender]); // Dependency Array: รันเมื่อ State ที่เกี่ยวข้องเปลี่ยน

  // ฟังก์ชันเมื่อกดปุ่ม "คำนวณ BMR" (ใช้เพื่อแสดง alert/validation)
  const handleCalBMRClick = () => { // กำหนดฟังก์ชัน handleCalBMRClick
    if (weight === "" || height === "" || age === "") { // ตรวจสอบว่ามีช่องว่างหรือไม่
      alert("กรุณาป้อนข้อมูลให้ครบ"); // แสดงแจ้งเตือน
      return; // ออกจากฟังก์ชัน
    }
    const w = parseFloat(weight); // แปลงค่าน้ำหนักเป็นตัวเลข
    const h = parseFloat(height); // แปลงค่าส่วนสูงเป็นตัวเลข
    const a = parseFloat(age); // แปลงค่าอายุเป็นตัวเลข

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) { // ตรวจสอบความถูกต้องของตัวเลข
      alert("กรุณาป้อนจำนวนที่ถูกต้องและมากกว่าศูนย์"); // แสดงแจ้งเตือน
      return; // ออกจากฟังก์ชัน
    }
    
    // เรียกใช้ฟังก์ชันหลัก
    calBMR(); // เรียกใช้ฟังก์ชัน calBMR
  };
  
  /**
   * Clears all input fields and resets the calculated BMR value.
   */
  const handleReset = () => { // กำหนดฟังก์ชัน handleReset สำหรับรีเซ็ตค่า
    setWeight(""); // ล้าง State น้ำหนัก
    setHeight(""); // ล้าง State ส่วนสูง
    setAge(""); // ล้าง State อายุ
    setGender("male"); // รีเซ็ต State เพศเป็น 'male'
    setBmrValue("0.00"); // รีเซ็ต State BMR
  };
  
  // ฟังก์ชันจำลองสำหรับการกลับหน้าหลัก
  const handleBackToHome = () => { // กำหนดฟังก์ชัน handleBackToHome
      alert("กลับสู่หน้าหลัก (จำลองการทำงาน)"); // แสดงแจ้งเตือนจำลอง
  };

  return ( // เริ่มต้นส่วน JSX ที่จะถูก Render
    <> 
      <div className="border-b-gray-300 shadow-2xl shadow-black/100 rounded-3xl w-8/12 mx-auto h-min">
        <DtiHeader title2="BMR Calculation" aa2="คำนวณ BMR" detail2={bmr} />
        <div className="w-11/12 mx-auto p-8 rounded-xl flex flex-col"> //
          
          {/* ป้อนน้ำหนัก (กิโลกรัม) */}
          <label>ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input // Input Field น้ำหนัก
            value={weight} // ผูกกับ State 'weight'
            onChange={(e) => setWeight(e.target.value)} // อัปเดต State 'weight'
            type="number" // ประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />

          {/* ป้อนส่วนสูง (เซนติเมตร) */} 
          <label>ป้อนส่วนสูง (เซนติเมตร)</label>
          <input // Input Field ส่วนสูง
            value={height} // ผูกกับ State 'height'
            onChange={(e) => setHeight(e.target.value)} // อัปเดต State 'height'
            type="number" // ประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />

          {/* ป้อนอายุ (ปี) */} 
          <label>ป้อนอายุ (ปี)</label> 
          <input // Input Field อายุ
            value={age} // ผูกกับ State 'age'
            onChange={(e) => setAge(e.target.value)} // อัปเดต State 'age'
            type="number" // ประเภท Input เป็นตัวเลข
            className="border-3 shadow-lg  rounded-lg border-gray-300 bg-white p-2 mt-2 mb-5" // กำหนดสไตล์
            placeholder="" // Placeholder
          />
          
          {/* เพศ (Radio Button) - เปลี่ยนการจัดวางให้เป็นแนวตั้ง */} 
          <label className="mb-2">เพศ:</label>
          <div className="flex flex-col mb-5"> 
            <label className="inline-flex items-center mb-2"> 
              <input // Radio Button 'ชาย'
                type="radio" // ประเภท input
                name="gender" // กำหนดกลุ่ม radio button
                value="male" // ค่าเมื่อถูกเลือก
                checked={gender === "male"} // ถูกเลือกเมื่อ State 'gender' เป็น 'male'
                onChange={(e) => setGender(e.target.value)} // เมื่อถูกเลือก อัปเดต State 'gender'
                className="form-radio text-blue-600" // กำหนดสไตล์
              />
              <span className="ml-2">ชาย</span>
            </label>
            <label className="inline-flex items-center"> 
              <input // Radio Button 'หญิง'
                type="radio" // ประเภท input
                name="gender" // กำหนดกลุ่ม radio button
                value="female" // ค่าเมื่อถูกเลือก
                checked={gender === "female"} // ถูกเลือกเมื่อ State 'gender' เป็น 'female'
                onChange={(e) => setGender(e.target.value)} // เมื่อถูกเลือก อัปเดต State 'gender'
                className="form-radio text-pink-600" // กำหนดสไตล์
              />
              <p className="ml-2 ">หญิง</p> 
            </label>
          </div>
          

          {/* ปุ่มคำนวณและรีเซ็ต */} 
          <div className="flex space-x-4">
            <button // ปุ่ม "คำนวณ BMR"
              onClick={handleCalBMRClick} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleCalBMRClick
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex-1" // กำหนดสไตล์ (flex-1 ทำให้ปุ่มขยายเต็มพื้นที่อย่างเท่าเทียม)
            >
              คำนวณ BMR 
            </button>
            <button // ปุ่ม "รีเซ็ต"
              onClick={handleReset} // เมื่อคลิก เรียกใช้ฟังก์ชัน handleReset
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded flex-1" // กำหนดสไตล์ (flex-1 ทำให้ปุ่มขยายเต็มพื้นที่อย่างเท่าเทียม)
            >
             รีเซ็ต
            </button>
          </div>

          <div className="text-center mt-5 text-2xl"> 
            <span className="mx-5  text-blue-700 font-bold"> 
              {bmrValue}
            </span>
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
export default Bmr 