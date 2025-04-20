import React from 'react'
import Games from '../components/Games'
import Footer from '../components/Footer'
import Marque from '../components/Marque'
import SportType from '../components/SportType'

function LiveCasino() {
  return (
    <div>
      <Marque/>

       {/* games type */}
       <SportType />
<div  className='mb-5'>
      <Games/>

</div>

      <Footer/>
    </div>
  )
}

export default LiveCasino