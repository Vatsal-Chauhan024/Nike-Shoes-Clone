import React from 'react'
import { offer } from '../assets/images'
import Button from '../components/Button'
import { arrowRight } from '../assets/icons'

const SpecialOffer = () => {
  return (
   <section className='flex justify-wrap items-center gap-5 max-xl:flex-col-reverse max-container'>
     <div className="flex-1 ">
      <img src={offer} alt="offer" width={773} height={687} className='object-contain w-full'/>
     </div>

     <div className="flex flex-1 flex-col ">
        <h2 className="mt-10 font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
       
          <span className='text-coral-red'>Special</span>
        Offer
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae harum molestias nostrum, aspernatur nisi ratione asperiores numquam possimus alias et?
        </p>
        <p className="mt-6 lg:max-w-lg info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eaque magnam qui? Eos totam officia eaque. Laboriosam, doloribus!</p>

<div className='mt-11 flex flex-wrap gap-4'>

        <Button label="Shop Now" iconURL={arrowRight}/>
        <Button label="Learn More"  className= "bg-white border-slate-gray !text-slate-gray" />

</div>

    </div>

   </section>
  )
}

export default SpecialOffer
