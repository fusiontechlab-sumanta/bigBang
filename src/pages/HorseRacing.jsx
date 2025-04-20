import React, { useState } from 'react'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import { MdOutlinePushPin } from 'react-icons/md'
import ire from '../assets/countryimg/IRE.svg'
import aus from '../assets/countryimg/AUS.svg'
import fra from '../assets/countryimg/FRA.svg'
import gb from '../assets/countryimg/GB.svg'
import rsa from '../assets/countryimg/RSA.svg'
import usa from '../assets/countryimg/USA.svg'
import Marque from '../components/Marque'
import SportType from '../components/SportType'

function HorseRacing() {
  const [all,setAll]=useState(true);
  const [irel,setIre]=useState(false);
  const [ausl,setAus]=useState(false);
  const [fral,setFra]=useState(false);
  const [rsal,setRsa]=useState(false);
  const [gbl,setGB]=useState(false);
  const [usal,setUsa]=useState(false);

  const handleAll=()=>{
    setAll(true);
    setAus(false)
    setFra(false)
    setGB(false)
    setIre(false)
    setRsa(false)
    setUsa(false)
  }
  const handleIre=()=>{
    setAll(false);
    setAus(false)
    setFra(false)
    setGB(false)
    setIre(true)
    setRsa(false)
    setUsa(false)
  }
  const handleAus=()=>{
    setAll(false);
    setAus(true)
    setFra(false)
    setGB(false)
    setIre(false)
    setRsa(false)
    setUsa(false)
  }
  const handleFra=()=>{
    setAll(false);
    setAus(false)
    setFra(true)
    setGB(false)
    setIre(false)
    setRsa(false)
    setUsa(false)
  }
  const handleRsa=()=>{
    setAll(false);
    setAus(false)
    setFra(false)
    setGB(false)
    setIre(false)
    setRsa(true)
    setUsa(false)
  }
  const handleGb=()=>{
    setAll(false);
    setAus(false)
    setFra(false)
    setGB(true)
    setIre(false)
    setRsa(false)
    setUsa(false)
  }
  const handleUsa=()=>{
    setAll(false);
    setAus(false)
    setFra(false)
    setGB(false)
    setIre(false)
    setRsa(false)
    setUsa(true)
  }
  
 

  return (
    <div>
      <Marque/>
      {/* carousel */}
      <Carousel />
      {/*end carousel */}

       {/* games type */}
       <SportType />

      {/* heading */}
      <div className=' bg-gradient-to-b from-[#57A528] to-[#9FD85D] px-2 py-1 text-sm font-bold'>
      </div>
      <div className=' text-sm bg-gradient-to-t  from-[#172646] to-[#2F4E8F] text-white font-semibold py-2 px-2'>
        <p>Horse Racing Schedule</p>
      </div>
      {/* end heading */}

      {/* option country */}
    <div>
    <ul className='flex uppercase bg-gray-300 text-sm font-semibold'>
        <li onClick={handleAll} className={` py-2 flex flex-col justify-center cursor-pointer px-5 pt-3 ${all && 'bg-white'} `}>All</li>
        <li onClick={handleIre} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${irel && 'bg-white'}`}><img src={ire} alt="" className='w-5 ms-[.5px]' />ire</li>
        <li onClick={handleAus} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${ausl && 'bg-white'}`}><img src={aus} alt="" className='w-5  ms-[.5px]' />aus</li>
        <li onClick={handleFra} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${fral && 'bg-white'}`}><img src={fra} alt="" className='w-5  ms-[.5px]' />fra</li>
        <li onClick={handleRsa} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${rsal && 'bg-white'}`}><img src={rsa} alt="" className='w-5  ms-[.5px]' />rsa</li>
        <li onClick={handleGb} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${gbl && 'bg-white'}`}><img src={gb} alt="" className='w-5  ms-[.5px]' />gb</li>
        <li onClick={handleUsa} className={`py-2 flex flex-col justify-center cursor-pointer px-5 ${usal && 'bg-white'}`}><img src={usa} alt="" className='w-5  ms-[1px]' />usa</li>
      </ul>
    </div>
      {/* end option country */}
      {/* table */}
      {all && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#3a8dc5] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span>
                </a>
              </td>



              <td className="px-2 py-2 text-center"><MdOutlinePushPin className='text-xl border rounded-full  border-gray-500 cursor-pointer' /></td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {irel && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {ausl && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {fral && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {rsal && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {gbl && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {usal && 
      <div className="border border-b-0 border-t-0 mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-black bg-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-1 text-center">

              </th>
              <th scope="col" className="px-6 py-1 text-center">

              </th>


            </tr>
          </thead> */}
          <tbody>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
          
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                 
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b">


              <td className="px-2 py-2 text-nowrap text-center">
                <a className='flex gap-x-2 flex-wrap  text-[#000] font-semibold cursor-pointer' >
                  V Gracheva v Mertens
                  {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                  {/* <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span> */}
                </a>
              </td>



              <td className="px-2 py-2 ">
                <div className='grid grid-cols-8 gap-2'>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                  <p className='bg-gray-300 px-2 py-1 text-black text-center font-semibold'>21:15</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      }
      {/* end table */}

      {/* footer */}
      <Footer />
      {/* end footer */}

    </div>
  )
}

export default HorseRacing