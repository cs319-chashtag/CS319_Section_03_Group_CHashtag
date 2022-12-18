import React from 'react';

/* Done by @mr3mre 
 */
const BilkentCourseCard = ({ bilkentCourse }) => {
  return (
    <div> 
    { bilkentCourse != null ?
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 p-2 border border-black rounded-lg">
  
          <div className="p-2 place-self-auto py-2">{bilkentCourse.bilkentCode}</div>
          <div className="p-2 place-self-center py-2 col-span-2">{bilkentCourse.name}</div>
          <div className="p-2 place-self-auto py-2">{bilkentCourse.type}</div>
          <div className="p-2 place-self-center py-2 col-span-2">Credit: {bilkentCourse.credit}</div>
      </div>
      : null
    }
    </div>
    
  );
}

export default BilkentCourseCard;
