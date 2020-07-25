import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';

import { useToasts, useClipboard} from '@zeit-ui/react';
import Bookmark from '@zeit-ui/react-icons/bookmark';

import Spinner from '../Spinner/Spinner';
import Transition from '../Transition/Transition';
import VerseInfoCard from '../Cards/VerseInfoCard';
import './Verse.scss';
import Tafseer from '../Tafseer/Tafseer';
import { Button } from 'antd';
import {
  CopyTwoTone,
  PlayCircleTwoTone,
  ReadOutlined,
} from '@ant-design/icons';

const Verse = () => {
  const [, setToast] = useToasts();
  const { copy } = useClipboard();
  const [showTafseer, setShowTafseer] = useState(false);
  const [tafseerId, setTafseerId] = useState(null);
  const { pathname } = useLocation();
  const getId = pathname.slice(1);
  const [
    { chapters, arabicFontSize, selectedTransition,},
  ] = useStateValue();

  const getVerses = chapters.filter(chapter => chapter.id === getId);

  return chapters.length === 0 ? (
    <Spinner />
  ) : (
    <div className='container'>
      {getVerses.map(verse => {
        const { name } = verse;
        return (
          <div key={name} className='mt-5'>
            <VerseInfoCard item={verse} />
            {verse?.ayahs.map(ayah => (
              <div className='border-bottom card-body my-3' key={ayah?.id}>
                <div className='d-flex align-items-center'>
                  <span className='verse_key mr-5 my-2'>{ayah?.verse_key}</span>
                  <Button
                    title='Copy'
                    icon={<CopyTwoTone style={{ fontSize: '27px' }} />}
                    className='mr-4 my-2'
                    type='text'
                    onClick={() => {
                      copy(
                        `${name} ${ayah.verse_key}\n
                        ${ayah.text}\n${
                          ayah?.translated_en && ayah.translated_en
                        }\n${
                          ayah?.transition_bn[selectedTransition] &&
                          ayah.transition_bn[selectedTransition]
                        }\nTafseer : Ahsanul Bayan\n${
                          ayah?.tafseer_bn.ahsanul_bayan
                        }
                        `
                      );
                      setToast({
                        text: 'Copied the verse! Alhamdulillah',
                        type: 'success',
                      });
                    }}
                  />
                  <Button
                    title='Play Audio'
                    icon={
                      <PlayCircleTwoTone
                        twoToneColor='#f36'
                        style={{ fontSize: '27px' }}
                      />
                    }
                    className='mr-4 my-2'
                    type='text'
                  />
                  <Button
                    title='Show Tafseer'
                    icon={
                      <ReadOutlined
                        style={{ color: '#4EB862', fontSize: '27px' }}
                      />
                    }
                    className='mr-4 my-2'
                    type='text'
                    onClick={() => {
                      setShowTafseer(prevOpen => !prevOpen);
                      setTafseerId(ayah?.id);
                    }}
                  />
                  <Button
                    disabled
                    title='Bookmark'
                    type='text'
                    icon={<Bookmark style={{ fontSize: '27px' }} />}
                  />
                </div>
                <div className='d-flex justify-content-end align-items-center py-3'>
                  <div>
                    <h4
                      className='arabic-font'
                      style={{ fontSize: `${arabicFontSize}px` }}
                      key={ayah?.id}
                    >
                      {ayah?.text}
                    </h4>
                    <Transition item={ayah} />
                  </div>
                </div>
                <Tafseer
                  showTafseer={showTafseer}
                  tafseerId={tafseerId === ayah?.id}
                  tafseer={ayah}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Verse;
