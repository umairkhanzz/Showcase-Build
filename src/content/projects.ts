import type { Project } from "./types";
import nohesiCover from "@/assets/projects/nohesi/cover.png";
import nohesiHome from "@/assets/projects/nohesi/home.webp";
import nohesiHomeAlt from "@/assets/projects/nohesi/home-2.webp";
import voycapCover from "@/assets/projects/voycap/cover.png";
import voycapHome from "@/assets/projects/voycap/home.png";
import voycapInvestor from "@/assets/projects/voycap/investor.png";
import voycapPlatform from "@/assets/projects/voycap/platform.webp";
import voycapNewsfeed from "@/assets/projects/voycap/newsfeed.webp";
import trainlikeHome from "@/assets/projects/train-like-a-ballerina/home.jpg";
import trainlikeApp from "@/assets/projects/train-like-a-ballerina/app.jpg";
import trainlikeGraceful from "@/assets/projects/train-like-a-ballerina/graceful.jpg";
import lolLandCover from "@/assets/projects/lol-land/cover.png";
import lolLandHero from "@/assets/projects/lol-land/hero.png";

/**
 * Projects, newest and strongest first. The order is used by the hero showcase,
 * the home page slider and the "Next project" link on each case study.
 *
 * Screenshots go in src/assets/projects/<slug>/ (see docs/ASSETS.md): import the
 * main one as `image` and the rest as `caseStudy.gallery`.
 */
export const projects: Project[] = [
  {
    slug: "nohesi",
    kind: "client",
    name: "Nohesi.gg",
    domain: "nohesi.gg",
    url: "https://nohesi.gg",
    year: "2024",
    role: "Full-Stack Developer",
    tagline: "Gaming & real-time racing experiences.",
    summary:
      "User-facing gaming experiences for No Hesi — interactive interfaces, game data integration, animations, and real-time communication for a 200K+ member racing community.",
    stats: [
      { value: "200K+", label: "Active members on the platform" },
      { value: "Realtime", label: "Live servers, traffic and notifications" },
      { value: "VIP", label: "Membership plans, maps and cars" },
    ],
    stack: ["Next.js", "Socket.IO", "Supabase", "TypeScript", "Tailwind CSS"],
    palette: ["#a855f7", "#0f0a1a"],
    image: nohesiCover,
    caseStudy: {
      gallery: [nohesiHome, nohesiHomeAlt],
      headline: "Virtual streets, real-time rush",
      hosting: "Next.js with Socket.IO and Supabase for auth, data and live updates",
      story: [
        "No Hesi is an online racing platform and community for high-speed virtual street racing. Players join multiplayer servers, explore custom highway maps, drive modded cars and compete in real-time traffic.",
        "I built the user-facing web experience: interactive interfaces, game data integration, animations and live communication so server status, player activity and membership features stay in sync as people play.",
      ],
      buildSteps: [
        "Built the Next.js frontend with server-side rendering, a responsive racing UI and high-quality car and map presentation.",
        "Wired Socket.IO for live server updates, player interactions and instant notifications.",
        "Used Supabase for authentication, database management and realtime data handling.",
        "Shipped VIP membership plans that unlock exclusive maps, cars and additional server features.",
      ],
      challenges: [
        {
          problem:
            "A racing community this size needs live server state without the page feeling heavy or stale.",
          solution:
            "Socket.IO carries live updates while Supabase holds auth and durable data, so the UI stays fast and the numbers on screen match what is happening in-game.",
        },
        {
          problem: "Memberships, maps and cars had to stay consistent across public and VIP experiences.",
          solution:
            "Plan entitlements live in the database and the UI only reveals locked content when the session says the player has access.",
        },
      ],
      serviceType: "Web App Development",
    },
  },
  {
    slug: "voycap",
    kind: "client",
    name: "Voycap",
    domain: "voycap.com",
    url: "https://www.voycap.com",
    year: "2024",
    role: "Full-Stack Developer",
    tagline: "FinTech & AI-powered fundraising.",
    summary:
      "A collaborative FinTech platform for fundraising, investor collaboration and due diligence, with AI-powered features for financial workflows and decision-making.",
    stats: [
      { value: "AI", label: "Document processing and due diligence" },
      { value: "Full stack", label: "React frontend, Django APIs" },
      { value: "FinTech", label: "Fundraising and investor collaboration" },
    ],
    stack: ["React", "Python", "Django", "REST APIs", "AI"],
    palette: ["#3b3b98", "#0b1020"],
    image: voycapCover,
    caseStudy: {
      gallery: [voycapHome, voycapInvestor, voycapPlatform, voycapNewsfeed],
      headline: "Raise-ready FinTech, with AI in the workflow",
      hosting: "React frontend talking to Django REST APIs, with AI services for documents and analysis",
      story: [
        "Voycap helps companies and investors collaborate on raising and deploying capital: organised due-diligence rooms, investor matching and ongoing updates so a company can stay raise-ready.",
        "I contributed full-stack features across the React frontend and Django backend, including REST APIs and AI-powered document processing that shortens due diligence instead of dumping more files on investors.",
      ],
      buildSteps: [
        "Built responsive React interfaces for investment management, fundraising and investor collaboration.",
        "Developed and integrated Django REST APIs so frontend workflows talk to a single source of company data.",
        "Contributed AI features for financial data analysis, intelligent document processing and due diligence.",
        "Focused on performance, maintainable architecture and a seamless experience for both companies and investors.",
      ],
      challenges: [
        {
          problem: "Due diligence material is messy, duplicated and slow to review by hand.",
          solution:
            "AI-assisted document processing and structured data rooms turn scattered files into a workflow investors can actually complete.",
        },
        {
          problem: "Frontend and backend had to stay in lockstep across fundraising, governance and newsfeeds.",
          solution:
            "REST APIs and shared data models keep company events, log rooms and investor views consistent without one-off glue.",
        },
      ],
      serviceType: "AI Product Development",
    },
  },
  {
    slug: "train-like-a-ballerina",
    kind: "client",
    name: "Train Like a Ballerina",
    domain: "trainlike.app",
    url: "https://trainlike.app",
    year: "2025",
    role: "Full-Stack Developer",
    tagline: "Digital training for dancers, in real time.",
    summary:
      "A digital training platform that helps dancers improve strength, flexibility, mobility and ballet technique through structured programs, with realtime application features.",
    stats: [
      { value: "1,000+", label: "Exercises in the movement library" },
      { value: "Realtime", label: "WebSocket-powered application features" },
      { value: "Full stack", label: "Next.js, React, Python and Django" },
    ],
    stack: ["Next.js", "React", "Python", "Django", "WebSockets"],
    palette: ["#f472b6", "#3b0764"],
    image: trainlikeHome,
    caseStudy: {
      gallery: [trainlikeApp, trainlikeGraceful],
      headline: "Structured ballet training, built as a product",
      hosting: "Next.js and React on the frontend, Python/Django APIs, WebSockets for live features",
      story: [
        "Train Like a Ballerina is a digital training platform designed to help dancers improve strength, flexibility, mobility and ballet technique through structured programs.",
        "I contributed to development and maintenance of the web application: responsive Next.js and React features, Django APIs, business logic, data workflows and WebSocket-based realtime functionality.",
      ],
      buildSteps: [
        "Developed and maintained responsive web application features with Next.js and React.",
        "Built and integrated backend APIs with Python and Django.",
        "Implemented business logic, database interactions and data management workflows.",
        "Worked on WebSocket-based communication and realtime application functionality.",
      ],
      challenges: [
        {
          problem: "Training plans, libraries and progress had to stay in sync as dancers move between web and app.",
          solution:
            "Django APIs own the source of truth, while the Next.js client stays fast and the WebSocket layer covers live updates without a full refresh.",
        },
      ],
      serviceType: "Web App Development",
    },
  },
  {
    slug: "lol-land",
    kind: "client",
    name: "LOL.land",
    domain: "lol.land",
    url: "https://demo.lol.land/login/abs",
    year: "2025",
    role: "Full-Stack & Web3 Developer",
    tagline: "Casual Web3 board game on Abstract.",
    summary:
      "A browser-based Monopoly-style crypto board game by YGG Play — wallet login, NFT characters, themed boards and $YGG rewards, running exclusively on Abstract Chain.",
    stats: [
      { value: "100K+", label: "Pre-registrations before launch" },
      { value: "Abstract", label: "Exclusive launch on Abstract Chain" },
      { value: "Web3", label: "Wallets, NFTs and $YGG rewards" },
    ],
    stack: ["React", "Web3", "Abstract", "NFTs", "YGG"],
    palette: ["#22c55e", "#052e16"],
    image: lolLandCover,
    caseStudy: {
      gallery: [lolLandHero],
      headline: "A casual degen game, with real chain underneath",
      hosting: "Browser game on Abstract Chain, with wallet login and NFT-gated premium play",
      story: [
        "LOL.land is YGG Play's first in-house title: a casual, Monopoly-style dice game built for crypto-native players. You roll across themed boards, collect points and NFTs, and in Premium mode redeem progress for $YGG.",
        "I worked on the Web3 product surface — the login and Abstract Chain flow, connecting wallets, NFT characters and on-chain reward tracks to a game UI people can actually play in the browser.",
      ],
      buildSteps: [
        "Built the Abstract Chain login and wallet connection flow used at demo.lol.land.",
        "Wired NFT characters to themed boards so premium play unlocks the right maps and reward tracks.",
        "Connected frontend game state to on-chain rewards, including $YGG redemption in Premium mode.",
        "Kept Free Mode playable without a wallet, so new players can start before they touch Web3.",
      ],
      challenges: [
        {
          problem: "Web3 games usually fail at the door: wallet popups before anyone has rolled a dice.",
          solution:
            "Free Mode needs no wallet. Premium Mode asks for Abstract login only when the player wants token rewards, so the chain stays behind the game instead of in front of it.",
        },
        {
          problem: "NFTs, boards and reward tracks had to stay in sync without making dice odds feel rigged.",
          solution:
            "Character NFTs gate which boards and reward routes you can run. They do not change the roll — the chain owns eligibility, the client owns the feel of the game.",
        },
      ],
      serviceType: "Full-Stack Development",
    },
  },
  {
    slug: "web3",
    kind: "client",
    name: "Web3 & Blockchain",
    domain: "github.com/umairkhanzz",
    url: "https://github.com/umairkhanzz/MInt_NFTS_code",
    year: "2025",
    role: "Full-Stack & Blockchain Developer",
    tagline: "Smart contracts, NFTs and dapp interfaces.",
    summary:
      "Smart contract development, blockchain integrations, NFT experiences and decentralized application interfaces — including Solidity work connected to production frontends.",
    stats: [
      { value: "Solidity", label: "Smart contracts on Ethereum" },
      { value: "NFTs", label: "On-chain minting with a React client" },
      { value: "YGG", label: "Blockchain logic wired into product UI" },
    ],
    stack: ["Solidity", "Ethereum", "Smart Contracts", "Web3", "React"],
    palette: ["#818cf8", "#1e1b4b"],
    caseStudy: {
      headline: "On-chain logic, off-chain experiences",
      hosting: "Solidity contracts on Ethereum, with React frontends talking to them through Web3",
      story: [
        "I work across the split that every serious Web3 product has: Solidity on-chain, and a React interface off-chain that people can actually use.",
        "At NthLogics I supported smart contract integration for Yield Guild Games, connecting Solidity-based contracts to frontend components. Independently I built NFT minting flows where a contract and a React client work as one product.",
      ],
      buildSteps: [
        "Wrote and integrated Solidity smart contracts for NFT minting and blockchain interactions.",
        "Built React frontends that talk to contracts through Web3 libraries, with clear wallet and transaction states.",
        "Connected blockchain logic to production UI components for Yield Guild Games.",
      ],
      challenges: [
        {
          problem: "Users should not have to understand the chain to complete a mint or a game action.",
          solution:
            "The frontend owns wallet connection, transaction status and error states, while the contract stays small and explicit about what it will do.",
        },
      ],
      serviceType: "Full-Stack Development",
    },
  },
  {
    slug: "intellisource",
    kind: "product",
    name: "IntelliSource",
    domain: "github.com/umairkhanzz",
    url: "https://github.com/umairkhanzz/IntelliSource",
    year: "2024",
    role: "Creator & Full-Stack Developer",
    tagline: "AI recommendations for articles, blogs and posts.",
    summary:
      "An AI-powered recommendation system that analyses user interests to suggest relevant articles and blogs, while letting people publish and manage their own posts.",
    stats: [
      { value: "AI", label: "Interest-based content recommendations" },
      { value: "MERN", label: "MongoDB, Express, React, Node.js" },
      { value: "Python", label: "Flask recommendation service" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Flask", "Python"],
    palette: ["#38bdf8", "#0c4a6e"],
    caseStudy: {
      headline: "Recommendations that follow what you actually read",
      hosting: "MERN stack with a Flask/Python service for interest analysis",
      story: [
        "Most content sites either show a feed or a search box. IntelliSource does both, then recommends the next article from what a reader has already shown interest in.",
        "I built the full product: a React client for reading and publishing, a Node.js API, MongoDB for users and posts, and a Flask service that turns interests into suggestions.",
      ],
      buildSteps: [
        "Designed the MERN application for publishing, reading and managing posts.",
        "Added a Flask recommendation service that analyses user interests.",
        "Connected the Python service to the Node API so suggestions show up in the React UI.",
      ],
      challenges: [
        {
          problem: "Recommendations had to stay relevant without a huge labelled dataset.",
          solution:
            "Interest signals from reading and publishing feed a Python service, so suggestions improve as people use the product instead of depending on a one-off model dump.",
        },
      ],
      serviceType: "AI Product Development",
    },
  },
  {
    slug: "news-crawler",
    kind: "product",
    name: "News Crawler",
    domain: "github.com/umairkhanzz",
    url: "https://github.com/umairkhanzz/News-Crawler",
    year: "2024",
    role: "Creator & Full-Stack Developer",
    tagline: "Keyword search across live news sources.",
    summary:
      "A full-stack MERN news crawler that lets people discover the latest articles through keyword search, aggregating real-time results from multiple sources.",
    stats: [
      { value: "Live", label: "Articles aggregated from multiple sources" },
      { value: "Search", label: "Keyword-based discovery and filters" },
      { value: "MERN", label: "React UI, Node.js backend" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    palette: ["#facc15", "#422006"],
    caseStudy: {
      headline: "One search box for many news sources",
      hosting: "MERN stack with a Node.js crawler and a responsive React interface",
      story: [
        "News is scattered across dozens of sites, and keyword search on any one of them is a dead end. News Crawler aggregates real-time articles from multiple sources and returns fast, filterable results.",
        "I built the full stack: a scalable Node.js backend that collects and serves articles, and a React interface for search and dynamic filtering.",
      ],
      buildSteps: [
        "Built a Node.js backend that aggregates articles from multiple sources.",
        "Shipped a responsive React interface with keyword search and dynamic filters.",
        "Designed the data model so results stay fast as the index grows.",
      ],
      challenges: [
        {
          problem: "Sources update at different speeds and return messy, duplicated listings.",
          solution:
            "The crawler normalises and de-duplicates articles before they hit the UI, so search results stay relevant instead of noisy.",
        },
      ],
      serviceType: "Full-Stack Development",
    },
  },
  {
    slug: "nthlogics",
    kind: "client",
    name: "NthLogics",
    domain: "nth-logics.vercel.app",
    url: "https://nth-logics.vercel.app",
    year: "2024",
    role: "Frontend Developer",
    tagline: "A company site with 3D motion, built in Next.js.",
    summary:
      "Company profile website using Next.js, with a modern UI and interactive 3D animations. Focused on performance, responsiveness and a visually dynamic presence.",
    stats: [
      { value: "Next.js", label: "Modern React architecture" },
      { value: "3D", label: "Interactive animations in the UI" },
      { value: "Perf", label: "Responsive and fast to first paint" },
    ],
    stack: ["Next.js", "TypeScript", "3D", "Vercel"],
    palette: ["#a3e635", "#14532d"],
    caseStudy: {
      headline: "A studio site that moves without getting slow",
      hosting: "Next.js on Vercel",
      story: [
        "NthLogics needed a company presence that felt like the work: modern, interactive and a little cinematic, without becoming a 3D demo that nobody can load.",
        "I built the site in Next.js with interactive 3D animations, keeping the focus on performance, responsiveness and a smooth user experience.",
      ],
      buildSteps: [
        "Designed and built the company site in Next.js and TypeScript.",
        "Added interactive 3D animations that support the brand instead of blocking the page.",
        "Deployed to Vercel with attention to responsiveness and load performance.",
      ],
      challenges: [
        {
          problem: "3D on a marketing site is easy to overdo and hard to keep fast on phones.",
          solution:
            "Motion is layered on a Next.js page that still reads as a normal site: content first, animation second, and nothing that blocks first paint.",
        },
      ],
      serviceType: "Landing Page Development",
    },
  },
  {
    slug: "authvault",
    kind: "product",
    name: "AuthVault",
    domain: "github.com/umairkhanzz",
    url: "https://github.com/umairkhanzz/AuthVault",
    year: "2025",
    role: "Creator & Full-Stack Developer",
    tagline: "Production-shaped auth, not a tutorial login form.",
    summary:
      "A secure authentication system with OTP verification, session handling, JWT access tokens, refresh tokens, auto-login persistence, protected routes and secure logout.",
    stats: [
      { value: "OTP", label: "Verification in the sign-in flow" },
      { value: "JWT", label: "Access and refresh token rotation" },
      { value: "Sessions", label: "Persistence, protected routes, secure logout" },
    ],
    stack: ["React", "TypeScript", "Node.js", "JWT"],
    palette: ["#34d399", "#022c22"],
    caseStudy: {
      headline: "Auth that behaves like a real product",
      hosting: "React and TypeScript on the client, Node.js issuing JWTs on the server",
      story: [
        "Most auth demos stop at a login form. AuthVault is the version I actually want in a product: OTP, sessions, access and refresh tokens, persistence, protected routes and a logout that really ends the session.",
        "I built it in React, TypeScript and Node.js so the patterns — not just the UI — can move into client work.",
      ],
      buildSteps: [
        "Implemented OTP verification and session handling on a Node.js API.",
        "Added JWT access tokens with a refresh-token flow and auto-login persistence.",
        "Protected client routes in React and TypeScript, with a secure logout path.",
      ],
      challenges: [
        {
          problem: "Access tokens have to stay short-lived without kicking people out every few minutes.",
          solution:
            "A refresh-token flow renews access quietly, while logout and route guards make sure a stolen or expired session cannot linger.",
        },
      ],
      serviceType: "Full-Stack Development",
    },
  },
  {
    slug: "wokiee",
    kind: "product",
    name: "Wokiee",
    domain: "github.com/umairkhanzz",
    url: "https://github.com/umairkhanzz/wokiee-ecommerce-store",
    year: "2024",
    role: "Creator & Full-Stack Developer",
    tagline: "A headless storefront on React and Strapi.",
    summary:
      "An ecommerce store built with React 18, Redux Toolkit and Strapi — product pages, cart state and a CMS-backed catalogue.",
    stats: [
      { value: "Headless", label: "Strapi as the catalogue CMS" },
      { value: "React 18", label: "Storefront and cart in the client" },
      { value: "Redux", label: "Predictable cart and product state" },
    ],
    stack: ["React", "Redux Toolkit", "Strapi"],
    palette: ["#fb923c", "#431407"],
    caseStudy: {
      headline: "A storefront that does not own the catalogue",
      hosting: "React storefront with Strapi as the headless CMS",
      story: [
        "A store should let merchandisers change products without a deploy. Wokiee splits that work: Strapi holds the catalogue, React renders the store.",
        "I built the storefront in React 18 with Redux Toolkit for cart and product state, talking to Strapi for content.",
      ],
      buildSteps: [
        "Built the React 18 storefront with product listing, detail and cart flows.",
        "Used Redux Toolkit for predictable cart and catalogue state.",
        "Connected Strapi as the headless CMS for products and content.",
      ],
      challenges: [
        {
          problem: "Cart state and CMS content update on different clocks.",
          solution:
            "Redux owns the session (cart, UI), Strapi owns the catalogue. The client fetches products and never pretends the CMS is a cart.",
        },
      ],
      serviceType: "E-commerce Development",
    },
  },
];

export const productProjects = projects.filter((project) => project.kind === "product");
export const clientProjects = projects.filter((project) => project.kind === "client");

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after this one (wrapping around), for the "Next project" link. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
