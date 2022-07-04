import Head from 'next/head';

interface IMetaCustomProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  url: string;
  favicon?: string;
}

const MetaCustom = ({
  title,
  description,
  imageUrl,
  imageAlt,
  url,
  favicon = '/favicon.ico',
}: IMetaCustomProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={favicon} />

      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + url} />

      <meta property="twitter:card" content={description} />
      <meta property="twitter:image:alt" content={imageAlt} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={process.env.NEXT_PUBLIC_URL + url}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:site"
        content={process.env.NEXT_PUBLIC_URL + url}
      />
      <meta property="twitter:image" content={imageUrl} />

      <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />

      <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.svg" />

      <link rel="shortcut icon" href="logo.svg" />
    </Head>
  );
};

export default MetaCustom;
