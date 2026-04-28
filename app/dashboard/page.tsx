'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import '@/styles/dashboard.css';

type Feud = {
  id:string;

  title:string;

  rounds:any[];

  updatedAt:number;
};

export default function DashboardPage() {

  const [feuds,setFeuds] =
    useState<Feud[]>([]);

  useEffect(()=>{

    const stored =
      localStorage.getItem(
        'corporateFeuds'
      );

    if(!stored){

      setFeuds([]);

      return;
    }

    try{

      setFeuds(JSON.parse(stored));

    }catch{

      setFeuds([]);
    }

  },[]);

  return (

    <main className="dashboard-shell">

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          uteami
        </div>

        <nav className="dashboard-nav">

          <button className="dashboard-nav-item active">
            Dashboard
          </button>

          <button className="dashboard-nav-item">
            My Feuds
          </button>

        </nav>

      </aside>

      <section className="dashboard-main">

        <header className="dashboard-topbar">

          <div>

            <h1 className="dashboard-title">
              Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Manage and host your live feud experiences.
            </p>

          </div>

          <Link
            href="/create2"
            className="primary-btn"
          >
            + CREATE FEUD
          </Link>

        </header>

        <section className="dashboard-content">

          <div className="content-header">

            <h2>
              MY FEUDS
            </h2>

            <div className="feuds-count">

              {feuds.length}

              {' '}

              Feuds

            </div>

          </div>

          {feuds.length === 0 && (

            <div className="empty-state">

              <div className="empty-icon">
                🎮
              </div>

              <h3>
                No feuds yet
              </h3>

              <p>
                Create your first feud to start hosting live team battles.
              </p>

              <Link
                href="/create"
                className="empty-btn"
              >
                ADD YOUR FIRST FEUD
              </Link>

            </div>

          )}

          {feuds.length > 0 && (

            <div className="feuds-grid">

              {feuds.map(feud => (

                <div
                  key={feud.id}
                  className="feud-card"
                >

                  <div className="feud-top">

                    <div className="feud-status">
                      READY
                    </div>

                  </div>

                  <h3>
                    {feud.title}
                  </h3>

                  <div className="feud-meta">

                    <div>

                      <span>
                        Rounds
                      </span>

                      <strong>
                        {feud.rounds.length}
                      </strong>

                    </div>

                  </div>

                  <div className="feud-updated">

                    Updated

                    {' '}

                    {new Date(
                      feud.updatedAt
                    ).toLocaleDateString()}

                  </div>

                  <div className="feud-actions">

                    <Link
                      href="/host"
                      className="host-btn"
                    >
                      HOST
                    </Link>

                    <Link
                        href={`/create2?id=${feud.id}`}
                        className="secondary-btn"
                    >
                      EDIT
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </section>

    </main>
  );
}