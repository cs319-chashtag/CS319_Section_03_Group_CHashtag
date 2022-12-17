import React from 'react';
import PartnerCourseCard from './PartnerCourseCard';

const PartnerCourseCardList = ({ hostCourses, unique = 0, count = 0 }) => {
    return (
        <div key = {unique++}>
          {hostCourses.map((hostCourse) => {
            return (
              <PartnerCourseCard
                key={count++}
                code={hostCourse.hostCode}
                name={hostCourse.name}
                credit = {hostCourse.credit}
              />
            );
          })}
        </div>

    );
}

export default PartnerCourseCardList;
