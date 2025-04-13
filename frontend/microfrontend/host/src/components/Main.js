import React, { lazy } from 'react';

const Profile = lazy(() => import('users/Profile').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);
const CardsList = lazy(() => import('cards/CardsList').catch(() => {
  return { default: () => <div>Component is not available!</div> };
})
);

const AddCardButton = lazy(() => import('cards/AddCardButton').catch(() => {
  return { default: () => <div >Component is not available!</div> };
})
);

function Main() {
  return (
    <main className="content">
      <section className="profile page__section">
        <React.Suspense >
          <Profile />
        </React.Suspense>
        <AddCardButton cssClass="profile__add-button" />
      </section>
      <section className="places page__section">
        <React.Suspense>
          <CardsList />
        </React.Suspense>
      </section>
    </main>
  );
}

export default Main;
