import type { NextPage } from 'next';

import Header from 'components/Header';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Header />
    </div>
  );
};

export default Home;
