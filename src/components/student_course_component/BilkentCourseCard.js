import React from 'react';

const BilkentCourseCard = ({ bilkentCode, bilkentName, bilkentCourseType, bilkentCredit }) => {
  return (

    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 p-2 border border-black rounded-lg">

        <div className="p-2 place-self-auto py-2">{bilkentCode}</div>
        <div className="p-2 place-self-center py-2 col-span-2">{bilkentName}</div>
        <div className="p-2 place-self-auto py-2">{bilkentCourseType}</div>
        <div className="p-2 place-self-center py-2 col-span-2">{bilkentCredit}</div>
    </div>
  );
}

export default BilkentCourseCard;
