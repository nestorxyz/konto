import React from 'react';
import Head from 'next/head';

interface IMetaDefaultProps {
  title?: string;
  description?: string;
  img?: string;
}

const MetaDefault = ({ title, description, img }: IMetaDefaultProps) => {
  const meta = {
    title: 'Konto',
    description: 'Hacemos fácil la compra en grupo de cuentas de streaming',
    img: 'https://konto.vercel.app/landing.jpg',
  };

  return (
    <Head>
      <title>{meta.title}</title>

      <meta name="robots" content="follow, index" />

      <meta content={meta.description} name="description" />

      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={process.env.NEXT_PUBLIC_URL} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.img} />

      <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />

      <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.svg" />

      <link rel="shortcut icon" href="logo.svg" />
    </Head>
  );
};

export default MetaDefault;
