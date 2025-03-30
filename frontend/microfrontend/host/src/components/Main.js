import React, { lazy } from 'react';

const Profile = lazy(() => import('users/Profile').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);
const CardsList = lazy(() => import('cards/CardsList').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

function Main({ onAddPlace }) {
  return (
    <main className="content">
      <section className="profile page__section">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </React.Suspense>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places page__section">
        <React.Suspense fallback={<div>Loading...</div>}>
          <CardsList />
        </React.Suspense>
      </section>
    </main>
  );
}

export default Main;
