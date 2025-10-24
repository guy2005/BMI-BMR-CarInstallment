import React from 'react'
import logo from './../assets/LOGO.png'
import bmi from './../assets/BMI.png'
import bmr from './../assets/BMR.png'
import car from './../assets/CAR.png'
import Header from './../compo/HeaderHome'
function Home() {
  return (
    <>
      <div>
        <div className='w-20 h-min mx-auto'>
          <img  src={logo} alt="" />
        </div>
        <div className='flex flex-row justify-center gap-10 mt-10 w-full h-min'>
          <div>
            <Header title="คำนวณว่าน้ำหนักของคุณเหมาะสมกับส่วนสูงหรือไม่" aa="BMI(ดัชนีมวลกาย)" detail={bmi} />
          </div>
          <div>
            <Header title="คำนวณพลังงานขั้นต่ำที่ร่างกายต้องการในเเต่ละวัน" aa="BMR(อัตราการเผาผลาญ)" detail={bmr} />
          </div>
          <div>
            <Header title="คำนวณยอดผ่อนต่อเดือนเเละดอกเบี้ยรถยนต์" aa="การผ่อนชำละรถยนต์" detail={car} />
          </div>

        </div>

      </div>
    
    </>
  )
}

export default Home