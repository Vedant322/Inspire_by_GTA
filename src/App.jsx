import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

const gtaGames = [
  {
    name: "Grand Theft Auto",
    year: 1997,
    image: "./gta1.jpg",
    link: "https://www.rockstargames.com/games/gta",
  },
  {
    name: "Grand Theft Auto 2",
    year: 1999,
    image: "./gta2.jpg",
    link: "https://www.rockstargames.com/games/gta2",
  },
  {
    name: "Grand Theft Auto III",
    year: 2001,
    image: "./gta3.jpg",
    link: "https://www.rockstargames.com/games/grandtheftauto3",
  },
  {
    name: "Grand Theft Auto: Vice City",
    year: 2002,
    image: "./gtavc.jpg",
    link: "https://www.rockstargames.com/games/vicecity",
  },
  {
    name: "Grand Theft Auto: San Andreas",
    year: 2004,
    image: "./gtasa.jpg",
    link: "https://www.rockstargames.com/games/sanandreas",
  },
  {
    name: "Grand Theft Auto: Liberty City Stories",
    year: 2005,
    image: "./gtaliberty.jpg",
    link: "https://www.rockstargames.com/games/libertycitystories",
  },
  {
    name: "Grand Theft Auto IV",
    year: 2008,
    image: "./gta4.jpg",
    link: "https://www.rockstargames.com/games/IV",
  },
  {
    name: "Grand Theft Auto: Chinatown Wars",
    year: 2009,
    image: "./gtachina.jpg",
    link: "https://www.rockstargames.com/games/chinatownwars",
  },
  {
    name: "Grand Theft Auto: Episodes from Liberty City",
    year: 2009,
    image: "./gtalibertystories.jpg",
    link: "https://www.rockstargames.com/games/episodesfromlibertycity",
  },
  {
    name: "Grand Theft Auto V",
    year: 2013,
    image: "./gta5.jpg",
    link: "https://www.rockstargames.com/gta-v",
  },
  {
    name: "Grand Theft Auto Online",
    year: 2013,
    image: "./gtaonline.jpg",
    link: "https://www.rockstargames.com/gta-online",
  },
  {
    name: "Grand Theft Auto Trilogy",
    year: 2021,
    image: "./gtatrilogy.jpg",
    link: "https://www.rockstargames.com/GTATrilogy",
  },
];

const App = () => {
  const [showContent, setShowContent] = useState(false);

  const mainRef = useRef(null);
  const characterRef = useRef(null);
  const textRef = useRef(null);
  const homeSectionRef = useRef(null);
  const gta6SectionRef = useRef(null);
  const memorableGamesRef = useRef(null);
  const contactSectionRef = useRef(null);

  const sections = [
    { name: "home", ref: homeSectionRef, label: "Home" },
    { name: "gta6", ref: gta6SectionRef, label: "GTA 6" },
    { name: "games", ref: memorableGamesRef, label: "Games" },
    { name: "contact", ref: contactSectionRef, label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  // Intro animation
  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline
      .to(".vi-mask-group", {
        rotate: 10,
        duration: 2,
        ease: "Power4.easeInOut",
        transformOrigin: "50% 50%",
      })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            document.querySelector(".svg")?.remove();
            setShowContent(true);
            this.kill();
          }
        },
      });
  });

  // Parallax Home Section
  useGSAP(() => {
    if (showContent && homeSectionRef.current) {
      const homeElement = homeSectionRef.current;

      const handleMouseMove = (e) => {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

        gsap.to(textRef.current, {
          x: `${xMove * 0.4}%`,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(".imagesDiv .sky", {
          x: xMove,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(".bg", {
          x: xMove * 1.7,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(characterRef.current, {
          x: `calc(120% + ${xMove * 0.8}px)`,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      homeElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        homeElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [showContent]);

  // Animations for GTA 6 section
  useGSAP(() => {
    if (gta6SectionRef.current) {
      gsap.fromTo(
        gta6SectionRef.current.querySelector(".gta6-character"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gta6SectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        gta6SectionRef.current.querySelector(".gta6-text"),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gta6SectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  // Animation for Game Cards
  useGSAP(() => {
    if (memorableGamesRef.current) {
      gsap.fromTo(
        memorableGamesRef.current.querySelectorAll(".game-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: memorableGamesRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  // Navigation Active Section Highlighting
  useGSAP(() => {
    sections.forEach((section) => {
      if (section.ref.current) {
        gsap.to(section.ref.current, {
          scrollTrigger: {
            trigger: section.ref.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(section.name),
            onLeaveBack: () => setActiveSection(section.name),
          },
        });
      }
    });
  }, [showContent, sections]);

  // Target icon follows mouse
  useGSAP(() => {
    const gunElement = document.querySelector(".gun-icon");
    const handleMouseMove = (e) => {
      gsap.to(gunElement, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDownloadClick = () => {
    window.location.href = "https://www.rockstargames.com/VI";
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Target Cursor */}
      <div
        className="gun-icon fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ width: "50px", height: "50px" }}
      >
        <img src="./target.png" alt="Gun Cursor" className="w-full h-full" />
      </div>

      {/* Splash SVG */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.jpg"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div
          className="main w-full min-h-screen relative overflow-auto"
          ref={mainRef}
        >
          <nav className="fixed top-0 left-0 z-40 w-full py-4 px-6 md:py-8 md:px-12 flex flex-col sm:flex-row justify-between items-center bg-black bg-opacity-90 shadow-lg border-b-16 border-yellow-500">
            {/* Logo & Burger Lines */}
            <div className="logo flex gap-4 md:gap-7 items-center mb-4 sm:mb-0">
              <div className="lines flex flex-col gap-[3px] md:gap-[5px]">
                <div className="line w-10 md:w-12 h-1 md:h-2 bg-yellow-400"></div>
                <div className="line w-6 md:w-8 h-1 md:h-2 bg-red-500"></div>
                <div className="line w-3 md:w-5 h-1 md:h-2 bg-white"></div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="./rockstar-games.svg" // Replace with your actual logo file
                  alt="Rockstar Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <h3
                  className="text-3xl md:text-4xl text-white font-bold drop-shadow-[0_1px_5px_rgba(255,255,0,0.7)]"
                  style={{ fontFamily: "pricedown" }}
                >
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="nav-links flex gap-3 sm:gap-6 md:gap-10 text-white text-base sm:text-lg md:text-xl">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => scrollToSection(section.ref)}
                  className={`transition duration-200 ease-in-out hover:text-yellow-400 ${
                    activeSection === section.name
                      ? "text-yellow-400 underline underline-offset-4"
                      : ""
                  }`}
                  style={{ fontFamily: "pricedown", letterSpacing: "1px" }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </nav>

          <section
            id="home-section"
            className="w-full pt-[80px] sm:pt-[100px] md:pt-[120px]"
            ref={homeSectionRef}
          >
            <div className="landing w-full h-screen bg-black relative overflow-hidden">
              <div className="imagesDiv w-full h-screen relative overflow-hidden">
                <img
                  className="absolute sky scale-[1.2] w-full h-full object-cover top-0 left-0"
                  src="./sky.png"
                  alt="Sky Image"
                />
                <img
                  className="absolute bg scale-[1.1] w-full h-full object-cover top-0 left-0"
                  src="./bg3.png"
                  alt="Background Image"
                />

                <div
                  className="text text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-3 z-10 w-full px-4"
                  ref={textRef}
                >
                  <h1
                    className="text-5xl sm:text-7xl md:text-[12rem] leading-none text-center"
                    style={{
                      fontFamily: "pricedown",
                      textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                  >
                    grand
                  </h1>
                  <h1
                    className="text-5xl sm:text-7xl md:text-[12rem] leading-none text-center"
                    style={{
                      fontFamily: "pricedown",
                      textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                  >
                    theft
                  </h1>
                  <h1
                    className="text-5xl sm:text-7xl md:text-[12rem] leading-none text-center"
                    style={{
                      fontFamily: "pricedown",
                      textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    }}
                  >
                    auto
                  </h1>
                </div>

                <img
                  className="character absolute left-0 scale-[0.25] sm:scale-[0.4] md:scale-[0.5] z-10"
                  style={{ bottom: "-38.5%", transform: "translateX(120%)" }}
                  src="./boy.png"
                  alt="Character Image"
                  ref={characterRef}
                />
              </div>

              <div className="bottomBar text-white absolute bottom-0 left-0 w-full py-4 px-6 md:py-15 md:px-10 bg-gradient-to-t from-black to-transparent z-20 flex justify-between items-center">
                <div className="flex gap-2 md:gap-4 items-center">
                  <i className="text-xl md:text-4xl ri-arrow-down-line"></i>
                  <h3 className=" text-lg md:text-xl font-[pricedown]">
                    Scroll Down
                  </h3>
                </div>
                <img
                  className="h-[30px] md:h-[55px]"
                  src="./ps5.png"
                  alt="PS5 Logo"
                />
              </div>
            </div>

            <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-black p-4 md:p-8">
              <div className="limg relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] sm:w-[150%] md:w-auto md:scale-[1.58] object-contain"
                  src="./last-man.png"
                  alt="Image"
                />
              </div>
              <div className="rg w-full md:w-[30%] py-5 md:py-30 text-white text-center md:text-left">
                <h1 className="text-3xl sm:text-5xl md:text-8xl leading-tight font-bold">
                  Still Running,
                </h1>
                <h1 className="text-3xl sm:text-5xl md:text-8xl leading-tight font-bold">
                  Not Hunting
                </h1>
                <p
                  className="mt-4 md:mt-10 text-sm md:text-xl"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  Grand Theft Auto isn't just a game — it's a cultural
                  phenomenon. From Liberty City to San Andreas, each GTA title
                  transports players to richly detailed open worlds teeming with
                  action, drama, and satire.
                </p>
                <p
                  className="mt-3 text-sm md:text-xl"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  Since its debut in 1997, the franchise has pushed the
                  boundaries of interactive storytelling and freedom. Whether
                  you're hijacking a car, building an empire, or exploring
                  neon-soaked Vice City, GTA lets you live out cinematic chaos
                  with unmatched style.
                </p>
                <p
                  className="mt-4 md:mt-10 text-sm md:text-xl"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  With each release, Rockstar Games redefines what’s possible in
                  gaming. Grand Theft Auto VI promises to continue that legacy —
                  delivering new characters, deeper immersion, and the most
                  expansive GTA world yet.
                </p>

                <button
                  className="bg-yellow-500 px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 text-black text-lg sm:text-xl md:text-4xl cursor-pointer mt-6 md:mt-10 inline-block"
                  onClick={handleDownloadClick}
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  Download Now
                </button>
              </div>
            </div>
          </section>

          <section
            id="gta6-section"
            className="relative w-full min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden"
            ref={gta6SectionRef}
          >
            {/* Background YouTube Video */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/VQRLujxTm3c?start=10&autoplay=1&mute=1&loop=1&playlist=VQRLujxTm3c&controls=0&showinfo=0&modestbranding=1&rel=0"
                title="GTA 6 Trailer"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 flex justify-center relative mb-8 md:mb-0">
                <img
                  src="./Jason_Duval.jpg"
                  alt="GTA 6 character"
                  className="gta6-character w-full max-w-xs sm:max-w-sm md:max-w-md object-contain transition-transform duration-300 hover:scale-110"
                />
                <button className="cursor-pointer absolute bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm md:text-base">
                  View Details
                </button>
              </div>
              <div className="gta6-text w-full md:w-1/2 text-center md:text-left">
                <h2
                  className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 text-center"
                  style={{ fontFamily: "pricedown" }}
                >
                  Explore GTA 6
                </h2>
                <h3
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: "pricedown" }}
                >
                  Welcome to Leonida
                </h3>
                <p className="text-base sm:text-lg mb-4">
                  Set in the expansive state of Leonida, including the
                  neon-drenched Vice City...
                </p>
                <p className="text-base sm:text-lg mb-6">
                  Dive into a world brimming with diverse characters and
                  stunning landscapes.
                </p>
                <a
                  href="https://www.youtube.com/watch?v=VQRLujxTm3c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </section>

          <section
            id="games-section"
            className="memorable-games w-full min-h-screen bg-gray-950 text-white flex flex-col items-center p-4 sm:p-8"
            ref={memorableGamesRef}
          >
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-bold mb-10 text-center"
              style={{ fontFamily: "pricedown" }}
            >
              Memorable GTA Titles <br /> Click to view
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl w-full">
              {gtaGames.map((game, index) => (
                <a
                  key={index}
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-card bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover"
                  />
                  <div className="p-3 sm:p-4 text-center">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-1"
                      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                    >
                      {game.name}
                    </h3>
                    <p
                      className="text-gray-400 text-sm sm:text-base"
                      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                    >
                      {game.year}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section
            id="contact-section"
            className="contact-us w-full min-h-screen bg-[url('./newbg.jpg')] bg-cover bg-center bg-no-repeat text-white flex items-center justify-center p-4 sm:p-8"
            ref={contactSectionRef}
          >
            <div className="w-full max-w-xl bg-black bg-opacity-80 rounded-lg shadow-2xl border border-yellow-500 p-6 sm:p-10 backdrop-blur-md">
              <h2
                className="text-4xl sm:text-5xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg"
                style={{ fontFamily: "pricedown" }}
              >
                Let’s Talk Crime
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "pricedown" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white text-base transition duration-200"
                    placeholder="Tommy Vercetti"
                    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "pricedown" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white text-base transition duration-200"
                    placeholder="tommy@vicecity.com"
                    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "pricedown" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white text-base resize-y transition duration-200"
                    placeholder="Tell us your next heist idea..."
                    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-3 px-6 rounded-md text-xl transition-colors duration-300 shadow-lg"
                  style={{ fontFamily: "pricedown" }}
                >
                  Submit to Rockstar
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default App;
