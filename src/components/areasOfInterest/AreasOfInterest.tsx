import React, { Dispatch, SetStateAction } from 'react'
import './AreasOfInterest.css'

interface Props{
    interests: string[];
    setInterests: Dispatch<SetStateAction<string[]>>
}

const AreasOfInterest: React.FC<Props> = ({interests, setInterests}) => {

  const removeArea = (ind: number) => {
    const result = interests.filter(
      (area: string, index: number) => index !== ind
    )
    setInterests(result)
  }
  
  return (
    <>
    {interests.length > 0 ? 
        <div className="areas-container">
        {interests.map((area: string, index: number) => (
          <span key={index} className="eachAreaOfInterest">
            {area}
            <button
              type="button"
              className="removeArea"
              onClick={() => removeArea(index)}
            >&nbsp;
              <sup>x</sup>
            </button>
          </span>
        ))}
      </div>
      :
      null
    }
    </>
   
  )
}

export default AreasOfInterest
