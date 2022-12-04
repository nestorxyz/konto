<a href="https://dub.sh">
  <img alt="Dub – an open-source link management tool for modern marketing teams to create, share, and track short links." src="https://user-images.githubusercontent.com/28986134/200727801-6355c62e-60b5-45d7-a83d-44b11545e471.png">
  <h1 align="center">Dub</h1>
</a>

<p align="center">
  An open-source link management tool for modern marketing teams to create, share, and track short links.
</p>

<p align="center">
  <a href="https://twitter.com/dubdotsh">
    <img src="https://img.shields.io/twitter/follow/dubdotsh?style=flat&label=%40dubdotsh&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://news.ycombinator.com/item?id=32939407"><img src="https://img.shields.io/badge/Hacker%20News-255-%23FF6600" alt="Hacker News"></a>
  <a href="https://github.com/steven-tey/dub/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/steven-tey/dub?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> 
</p>
<br/>

## Introduction

Dub is an open-source link management tool for modern marketing teams to create, share, and track short links. Built with [Vercel Edge Functions](http://vercel.com/edge), [Upstash Redis](https://docs.upstash.com/redis), and [Planetscale MySQL](https://planetscale.com/).

https://www.canva.com/design/DAFD6QOIgDk/RpC0NWzumu4d6fhoJCoiLg/view?utm_content=DAFD6QOIgDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

Here are some of the features that Dub provides out-of-the-box:

### Built-in Analytics

Dub provides a powerful analytics dashboard for your links, including geolocation, device, and browser information.

![Analytics Dashboard](https://user-images.githubusercontent.com/28986134/200727883-40fe9e62-93a2-48b6-8316-4ce3e6f490f0.png)

### Custom domains

You can easily configure custom domains on Dub – just add an A/CNAME record to your DNS provider and you're good to go. This is built on the [Vercel Domains API](https://domains-api.vercel.app/).

![Custom Domains](https://user-images.githubusercontent.com/28986134/200727913-432734b4-4fc7-46ef-b09f-cc8262dc8a0d.png)

### QR Code Generator

You can easily generate and customize QR codes for your links, which can be used for flyers, posters, powerpoint presentations, etc.

![QR Code](https://user-images.githubusercontent.com/28986134/200727932-2259628b-8f89-4017-896d-a355940222db.png)

### OG Image Proxy

Add a custom OG image in front of your target URL. Bots like Twitter/Facebook will be served this image, while users will be redirected to your target URL.

![OG Image Proxy](https://user-images.githubusercontent.com/28986134/200727958-e8a5ac24-644b-45c6-8018-41c4dea25cd1.gif)

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Typescript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Supabase](https://supabase.com/) – database
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Vercel](https://vercel.com/) – hosting
- [NestorBot](https://twitter.com/nestoredduardo) – manual payments validation 🫠

## Author

- Nestor Mamani ([@nestoredduardo](https://twitter.com/nestoredduardo))

## License

Inspired by [Plausible](https://plausible.io/), Konto is open-source under the GNU Affero General Public License Version 3 (AGPLv3) or any later version. You can [find it here](https://github.com/nestoredduardo/konto/blob/main/LICENSE.md).
