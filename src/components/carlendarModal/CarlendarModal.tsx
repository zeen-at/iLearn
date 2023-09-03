import React from 'react'
import { Calendar } from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css'
import './Carlender.css'


interface Props {
modal: boolean,
closeModal: ()=>void
}





const Modal: React.FC<Props> = ({modal, closeModal}) =>{
    const events = ['01-01-2023', '09-01-2023' ]
    return(
        <>
          {modal && 
            <div className="">
             <Calendar className=""
             tileClassName={({date}): any=>{
              let day = date.getDate() + ''
              let month = (date.getMonth() + 1) + ''
              if(date.getMonth() < 10){
                month = '0' + month
              }
              if(date.getDate() < 10){
                day = '0' + day
              }
              const realDate = day + '-' + month + '-' + date.getFullYear()
              if(events.find(val=> val === realDate)){
                return 'highlight'
              }
             }}
             />
             <button className='cd-closemodal' onClick={closeModal}>Close</button>
             </div>
        }
        </>
    )
}

export default Modal;

