import React from 'react'
import { Link } from "react-router-dom";
import logo from './../assets/LOGO.png'
import bmi from './../assets/BMI.png'
import bmr from './../assets/BMR.png'
import car from './../assets/CAR.png'
import Header from './../compo/HeaderHome'

function Home() {
  return (
    <>
      <div>
        {/* Container หลักสำหรับการจัดวางส่วนหัว (โลโก้ + ข้อความ) */}
        <div className='w-full text-center h-min mx-auto mt-40 mb-10 ml-5'> 
          
          <img src={logo} alt="Calculator Logo" className='mx-auto w-40' />
          <p className='text-5xl font-extrabold mt-3'>เครื่องมือคำนวณออนไลน์</p>
          <p className='text-gray-600 mt-2'>เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง</p>
        </div>

        {/* ส่วนแสดงรายการเครื่องมือคำนวณ */}
        <div className='flex flex-row justify-center gap-10 w-full h-min'>
          {/* BMI Card */}
          <div>
             <Link to="/Bmi">
              <Header 
                title="คำนวณว่าน้ำหนักของคุณเหมาะสมกับส่วนสูงหรือไม่" 
                aa="BMI(ดัชนีมวลกาย)" 
                detail={bmi}
            /> 
              </Link>
          </div>
          {/* BMR Card */}
          <div>
            <Link to="/Bmr">
            <Header 
              title="คำนวณพลังงานขั้นต่ำที่ร่างกายต้องการในเเต่ละวัน" 
              aa="BMR(อัตราการเผาผลาญ)" 
              detail={bmr} 
            />
            </Link>
          </div>
          {/* Car Installment Card */}
          <div>
            <Link to="/Car">
            <Header 
              title="คำนวณยอดผ่อนต่อเดือนเเละดอกเบี้ยรถยนต์" 
              aa="การผ่อนชำละรถยนต์" 
              detail={car} 
            />
            </Link>
          </div>

        </div>

      </div>
    
    </>
  )
}

export default Home