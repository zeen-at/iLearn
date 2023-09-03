 import React, { useEffect, useState } from "react";
 import './tutorAllCoursesModal.css'
import axios from "axios";




const jsonUrl = "http://localhost:7100/tutors";

const Modal = ({closeModal, oneTutor}:{closeModal:any, oneTutor:any})=>{

        return(
            
        <div className="tutor-allcourses-modal-background">
            <div className="tutor-allcourses-modal-container">
                
                <h1 className="tutor_course_header_styling">Courses by {oneTutor.name}</h1>
                {oneTutor.courses.map((course:any)=>
                <ul key={course.course_id} className="course-list">
                    <li className="course-list-item" >{course.title}</li>
                    </ul>
                )}
    
                <div className="titleCloseBtn">
                    <p onClick={()=> closeModal(false)} className="close-tutor-courses-modal">Close</p>

                </div>

            </div>
      
            </div>
              
         
    )
    

}

export default Modal