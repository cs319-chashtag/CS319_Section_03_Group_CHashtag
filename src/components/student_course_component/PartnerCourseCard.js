import React from 'react';

const PartnerCourseCard = ({ code, name, credit }) => {
  return (

    <div class="grid grid-flow-dense grid-cols-3 grid-rows-2 border border-black rounded-lg">
        <div class="py-2 p-2 place-self-auto text-s text-black">{code}</div>
        <div class="py-2  place-self-center col-span-2 text-s text-black">{name}</div>
        <div class="py-2 p-2 place-self-auto-center text-s text-black">{credit}</div>
    </div>
  );
}

export default PartnerCourseCard;
