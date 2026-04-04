import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircleshade from '../components/BlurCircleshade'
import toast from 'react-hot-toast'

const SeatLayout = () => {

  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  const bookedSeatsData = {
    "10:00": ["A1", "A2", "B3"],
    "13:00": ["C4", "D5"],
    "18:00": ["E1", "F2", "G3"]
  }

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  const isSeatBooked = (seatId) => {
    if (!selectedTime) return false
    return bookedSeatsData[selectedTime.time]?.includes(seatId)
  }

  const handleSeatClick = (seatId) => {

    if (!selectedTime) {
      return toast("Please select time first")
    }

    if (isSeatBooked(seatId)) {
      return toast("Seat already booked ❌")
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats")
    }

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    )
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={isSeatBooked(seatId)}
              className={`h-8 w-8 rounded border text-xs transition-all duration-200
              ${isSeatBooked(seatId)
                ? "bg-gray-500 text-white cursor-not-allowed opacity-60"
                : selectedSeats.includes(seatId)
                  ? "bg-primary text-white scale-110"
                  : "border-primary/60 hover:bg-primary/30 hover:scale-110 cursor-pointer"
              }`}
            >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    getShow()
  }, [])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

      {/* Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>

        <div className='mt-5 space-y-2'>
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => {
                setSelectedTime(item)
                setSelectedSeats([])
              }}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer border transition-all duration-300
              ${selectedTime?.time === item.time
                  ? "bg-primary text-white border-primary scale-105"
                  : "bg-transparent border-gray-600 text-gray-300 hover:bg-primary/20 hover:border-primary hover:text-white hover:scale-105"
                }`}
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm font-medium'>
                {isoTimeFormat(item.time)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircleshade top="-100px" left="-100px" />
        <BlurCircleshade bottom="0px" right="0" />

        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>

        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className="flex gap-4 mb-4 text-xs">
          <p>🟢 Available</p>
          <p>🔵 Selected</p>
          <p>⚫ Booked</p>
        </div>

        <div className='flex flex-col items-center mt-4 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>

          <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 MAIN CHANGE YAHAN HAI */}
        <button
          onClick={() => {

            if (!selectedTime || selectedSeats.length === 0) {
              return toast("Select time & seats first ❌")
            }

            const newBooking = {
              id: Date.now(),
              show: {
                movie: show.movie,
                showDateTime: `${date} ${selectedTime.time}`
              },
              bookedSeats: selectedSeats,
              amount: selectedSeats.length * 150,
              isPaid: false
            }

            const oldBookings = JSON.parse(localStorage.getItem("bookings")) || []

            // ✅ YAHI LINE TUM PUCH RAHI THI
            localStorage.setItem("bookings", JSON.stringify([...oldBookings, newBooking]))

            toast("Booking Successful ✅")

            navigate('/mybookings')
          }}
          className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'
        >
          Proceed to checkout
          <ArrowRightIcon strokeWidth={3} />
        </button>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
// import Loading from '../components/Loading'
// import { ArrowRightIcon, ClockIcon } from 'lucide-react'
// import isoTimeFormat from '../lib/isoTimeFormat'
// import BlurCircleshade from '../components/BlurCircleshade'
// import toast from 'react-hot-toast'

// const SeatLayout = () => {

//   const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

//   const { id, date } = useParams()
//   const [selectedSeats, setSelectedSeats] = useState([])
//   const [selectedTime, setSelectedTime] = useState(null)
//   const [show, setShow] = useState(null)

//   const navigate = useNavigate()

//   const getShow = async () => {
//     const show = dummyShowsData.find(show => show._id === id)
//     if (show) {
//       setShow({
//         movie: show,
//         dateTime: dummyDateTimeData
//       })
//     }
//   }

//   const handleSeatClick = (seatId) => {
//     if (!selectedTime) {
//       return toast("Please select time first")
//     }

//     if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
//       return toast("You can only select 5 seats")
//     }

//     setSelectedSeats(prev =>
//       prev.includes(seatId)
//         ? prev.filter(seat => seat !== seatId)
//         : [...prev, seatId]
//     )
//   }

//   const renderSeats = (row, count = 9) => (
//     <div key={row} className='flex gap-2 mt-2'>
//       <div className='flex flex-wrap items-center justify-center gap-2'>
//         {Array.from({ length: count }, (_, i) => {
//           const seatId = `${row}${i + 1}`
//           return (
//             <button
//               key={seatId}
//               onClick={() => handleSeatClick(seatId)}
//               className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
//               ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}
//             >
//               {seatId}
//             </button>
//           )
//         })}
//       </div>
//     </div>
//   )

//   useEffect(() => {
//     getShow()
//   }, [])

//   return show ? (
//     <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

//       {/* Available Timings */}
//       <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
//         <p className='text-lg font-semibold px-6'>Available Timings</p>

//         <div className='mt-5 space-y-2'>
//           {show.dateTime[date]?.map((item) => (
//             <div
//               key={item.time}
//               onClick={() => setSelectedTime(item)}
//               className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer transition-all duration-300 border
//               ${selectedTime?.time === item.time
//                   ? "bg-primary text-white border-primary"
//                   : "bg-transparent border-gray-600 text-gray-300 hover:bg-white/10 hover:border-primary hover:text-white"
//                 }`}
//             >
//               <ClockIcon className='w-4 h-4' />
//               <p className='text-sm font-medium'>
//                 {isoTimeFormat(item.time)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Seats Layout */}
//       <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
//         <BlurCircleshade top="-100px" left="-100px" />
//         <BlurCircleshade bottom="0px" right="0" />

//         <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>

//         <img src={assets.screenImage} alt="screen" />
//         <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

//         <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
//           <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
//             {groupRows[0].map(row => renderSeats(row))}
//           </div>

//           <div className='grid grid-cols-2 gap-11'>
//             {groupRows.slice(1).map((group, idx) => (
//               <div key={idx}>
//                 {group.map(row => renderSeats(row))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={() => navigate('/mybookings')}
//           className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'
//         >
//           Proceed to checkout
//           <ArrowRightIcon strokeWidth={3} />
//         </button>

//       </div>
//     </div>
//   ) : (
//     <Loading />
//   )
// }

// export default SeatLayout