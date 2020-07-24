import React from 'react';
import './Chapters.scss';
import { useStateValue } from '../../context/StateProvider';
import ChapterCard from '../Cards/ChapterCard';

const Chapters = () => {
  const [{ chapters }] = useStateValue();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr.slice(0, 5).map(item => console.log(item));
  arr.slice(6, 10).map(item => console.log(item));
  return (
    <div className='row justify-content-between'>
      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4 my-3'>
        <ul className='chapter-cards'>
          {chapters?.slice(0, 38).map((item, i) => (
            <li key={i} className='chapter-card'>
              <ChapterCard {...item} />
            </li>
          ))}
        </ul>
      </div>
      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4 my-3'>
        <ul className='chapter-cards'>
          {chapters?.slice(39, 76).map((item, i) => (
            <li key={i} className='chapter-card'>
              <ChapterCard {...item} />
            </li>
          ))}
        </ul>
      </div>
      <div className='col-sm-12 col-lg-6 col-xl-4 my-3 col-md'>
        <ul className='chapter-cards'>
          {chapters?.slice(77, 114).map((item, i) => (
            <li key={i} className='chapter-card'>
              <ChapterCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chapters;
