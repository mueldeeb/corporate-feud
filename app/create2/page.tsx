'use client';

import {
  useState,
  useEffect
} from 'react';

import Link from 'next/link';

import {
  useSearchParams
} from 'next/navigation';

import '@/styles/create2.css';

type Answer = {
  text:string;
  points:number;
};

type Round = {
  question:string;
  answers:Answer[];
};

export default function Create2Page() {

  const searchParams =
    useSearchParams();

  const feudId =
    searchParams.get('id');

  const [title,setTitle] =
    useState('Untitled Feud');

  const [activeRound,setActiveRound] =
    useState(0);

  const [rounds,setRounds] =
    useState<Round[]>([
      {
        question:'',
        answers:Array.from(
          { length:8 },
          () => ({
            text:'',
            points:0
          })
        )
      }
    ]);

  useEffect(()=>{

    if(!feudId) return;

    const stored =
      localStorage.getItem(
        'corporateFeuds'
      );

    if(!stored) return;

    const feuds =
      JSON.parse(stored);

    const feud =
      feuds.find(
        (f:any)=>
          f.id === feudId
      );

    if(!feud) return;

    setTitle(feud.title);

    setRounds(feud.rounds);

  },[feudId]);

  function updateQuestion(
    value:string
  ){

    const updated =
      [...rounds];

    updated[
      activeRound
    ].question = value;

    setRounds(updated);
  }

  function updateAnswer(
    index:number,
    key:'text' | 'points',
    value:string
  ){

    const updated =
      [...rounds];

    if(key === 'points'){

      updated[
        activeRound
      ].answers[index].points =

        Number(value);

    }else{

      updated[
        activeRound
      ].answers[index].text =

        value;
    }

    setRounds(updated);
  }

  function addRound(){

    setRounds([
      ...rounds,

      {
        question:'',
        answers:Array.from(
          { length:8 },
          () => ({
            text:'',
            points:0
          })
        )
      }
    ]);

    setActiveRound(
      rounds.length
    );
  }

  function saveFeud(){

    const stored =
      localStorage.getItem(
        'corporateFeuds'
      );

    const existing =
      stored
      ? JSON.parse(stored)
      : [];

    if(feudId){

      const updated =
        existing.map((f:any)=>

          f.id === feudId
          ? {
              ...f,
              title,
              rounds,
              updatedAt:Date.now()
            }
          : f
        );

      localStorage.setItem(
        'corporateFeuds',
        JSON.stringify(updated)
      );

      alert(
        'Feud updated successfully.'
      );

      return;
    }

    const feud = {

      id:
        crypto.randomUUID(),

      title,

      rounds,

      updatedAt:
        Date.now()
    };

    localStorage.setItem(

      'corporateFeuds',

      JSON.stringify([
        ...existing,
        feud
      ])
    );

    alert(
      'Feud saved successfully.'
    );
  }

  const totalPoints =

    rounds[
      activeRound
    ].answers.reduce(

      (sum,a)=>
        sum + Number(a.points || 0),

      0
    );

  return (

    <main className="creator-shell">

      <aside className="creator-sidebar">

        <div className="creator-logo">
          uteami
        </div>

        <div className="rounds-header">

          ROUNDS

        </div>

        <div className="rounds-list">

          {rounds.map((_,index)=>(

            <button

              key={index}

              className={

                activeRound === index

                ? 'round-tab active'

                : 'round-tab'
              }

              onClick={()=>
                setActiveRound(index)
              }
            >

              ROUND {index + 1}

            </button>

          ))}

        </div>

        <button
          className="new-round-btn"
          onClick={addRound}
        >
          + NEW ROUND
        </button>

      </aside>

      <section className="creator-main">

        <header className="creator-topbar">

          <input
            className="feud-title-input"
            value={title}
            onChange={e=>
              setTitle(e.target.value)
            }
            placeholder="Feud title..."
          />

          <div className="creator-actions">

            <button
              className="ghost-btn"
              onClick={saveFeud}
            >
              SAVE
            </button>

            <Link
              href="/host"
              className="host-live-btn"
            >
              HOST LIVE
            </Link>

            <Link
              href="/dashboard"
              className="exit-btn"
            >
              EXIT
            </Link>

          </div>

        </header>

        <div className="creator-board-wrapper">

          <div className="creator-question-box">

            <input

              value={
                rounds[
                  activeRound
                ].question
              }

              onChange={e=>
                updateQuestion(
                  e.target.value
                )
              }

              placeholder="
              Start typing your question
              "
            />

          </div>

          <div className="creator-grid">

            {rounds[
              activeRound
            ].answers.map(

              (answer,index)=>(

              <div
                key={index}
                className="creator-card"
              >

                <div className="creator-card-number">

                  {index + 1}

                </div>

                <input

                  className="
                  creator-answer-input
                  "

                  value={answer.text}

                  onChange={e=>

                    updateAnswer(

                      index,

                      'text',

                      e.target.value
                    )
                  }

                  placeholder={

                    `Add answer ${index + 1}`
                  }
                />

                <input

                  type="number"

                  className="
                  creator-points-input
                  "

                  value={
                    answer.points || ''
                  }

                  onChange={e=>

                    updateAnswer(

                      index,

                      'points',

                      e.target.value
                    )
                  }

                  placeholder="
                  Points
                  "
                />

              </div>
            ))}

          </div>

          <div className="points-bar">

            Total Points:

            {' '}

            <span>

              {totalPoints}

              /100

            </span>

          </div>

        </div>

      </section>

    </main>
  );
}
