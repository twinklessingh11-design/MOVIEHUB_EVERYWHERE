import React, { useEffect, useState } from 'react'
import BlurCircleshade from '../components/BlurCircleshade'
import timeFormat from '../lib/timeFormat'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

const MyBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Fetch bookings from localStorage
  const getMyBookings = async () => {
    const data = JSON.parse(localStorage.getItem("bookings")) || []
    setBookings(data)
    setIsLoading(false)
  }

  // ✅ Delete booking
  const handleDelete = (id) => {
    const updated = bookings.filter(item => item.id !== id)
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
    toast("Booking Deleted 🗑️")
  }

  // ✅ Pay now
  const handlePayment = (id) => {
    const updated = bookings.map(item =>
      item.id === id ? { ...item, isPaid: true } : item
    )
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
    toast("Payment Successful 💳")
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>

      <BlurCircleshade top='100px' left='100px' />
      <BlurCircleshade bottom='0px' left='600px' />

      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className='text-gray-400'>No bookings yet 😢</p>
      ) : (
        bookings.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>

            {/* Movie Info */}
            <div className='flex flex-col md:flex-row'>
              <img
                src={item.show.movie.poster_path}
                alt=""
                className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
              />

              <div className='flex flex-col p-4'>
                <p className='text-lg font-semibold'>
                  {item.show.movie.title}
                </p>

                <p className='text-gray-400 text-sm'>
                  {timeFormat(item.show.movie.runtime)}
                </p>

                <p className='text-gray-400 text-sm mt-auto'>
                  {item.show.showDateTime}
                </p>
              </div>
            </div>

            {/* Booking Info */}
            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>

              <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold mb-3'>
                  {currency}{item.amount}
                </p>

                {!item.isPaid ? (
                  <button
                    onClick={() => handlePayment(item.id)}
                    className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'
                  >
                    Pay now
                  </button>
                ) : (
                  <span className='text-green-500 text-sm font-medium'>
                    Paid ✅
                  </span>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className='bg-red-500 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'
                >
                  Delete
                </button>
              </div>

              <div className='text-sm'>
                <p>
                  <span className='text-gray-400'>Total Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>

                <p>
                  <span className='text-gray-400'>Seat No.:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>

            </div>

          </div>
        ))
      )}

    </div>
  ) : <Loading />
}

export default MyBookings


// import React, { useEffect, useState } from 'react'
// import {dummyBookingData} from '../assets/assets'
// import BlurCircleshade from '../components/BlurCircleshade'
// import timeFormat from '../lib/timeFormat'
// import Loading from '../components/Loading'

// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY

//   const[bookings,setBookings]= useState([])
//   const[isLoading,setIsLoading]= useState(true)

//   const getMyBookings = async()=>{
//     setBookings(dummyBookingData)
//     setIsLoading(false)
//   }
// useEffect(()=>{
//   getMyBookings()
// },[])

//   return !isLoading ?(
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
//        <BlurCircleshade top='100px' left='100px' />
//        <div>
//         <BlurCircleshade bottom='0px' left='600px'/>
//        </div>
//        <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

//       {bookings.map((item,index)=>(
//         <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
//           <div className='flex flex-col md:flex-row'>
//           <img src={item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
//           <div className='flex flex-col p-4'>
//             <p className='text-lg font-semibold'>{item.show.movie.title}</p>
//             <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
//             <p className='text-gray-400 text-sm mt-auto'>{item.show.showDateTime}</p>

//           </div>
//           </div>

//          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
//          <div className='flex items-center gap-4'>
//           <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
//           {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay now</button>}
//          </div>
//          <div className='text-sm'>
//           <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
//           <p><span className='text-gray-400'>Seat No.:</span> {item.bookedSeats.join(",")}</p>

//          </div>
//          </div>
//         </div>
//       ))}

//     </div>
//   ) : <Loading />
// }

// export default MyBookings