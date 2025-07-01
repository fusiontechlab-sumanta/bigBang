import React, { useRef, useState } from "react";

import game1 from "../assets/game1.png";
import bgGame from "../assets/bgGame.jpg";
import "./css/games.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import LoginWarningModal from "./Auth/LoginWarningModal";
import LiveBets from "./LiveBets";
const images = import.meta.glob("../assets/games/*.{png,jpg,jpeg,svg}", {
  eager: true,
});
import { useNavigate } from "react-router-dom";

// console.log(images);

function Games() {
  const [showSearch, setShowSearch] = useState(false); // Toggle search input
  const listRef = useRef(null); // Reference to the `ul` element
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginmobile = async (customRoute) => {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log("customRoute", customRoute);
      navigate(customRoute);
    } else {
      setShowWarningModal(true);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };
  const [GamesList, setGameList] = useState([
    { game: "All", active: true },
    { game: "our casino", active: false },
    { game: "our virtual", active: false },
    { game: "Evolution", active: false },
    { game: "ezugi", active: false },
    { game: "tvbet", active: false },
    { game: "betgame", active: false },
    { game: "platingames", active: false },
  ]);
  const handleScrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 60,
        behavior: "smooth",
      });
    }
    // console.log("click button");
  };
  const handleScrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -60,
        behavior: "smooth",
      });
    }
    // console.log("click button");
  };
  const handleGameList = (name) => {
    setGameList((prev) =>
      prev.map((item) => ({
        ...item, // Spread to ensure immutability
        active: item.game === name, // Update the `active` status
      }))
    );
  };

  const gameItemList = {
    "our casino": [
      {
        name: "All Casino",
        active: true,
      },
      {
        name: "Teenpatti",
        active: false,
      },
      {
        name: "Poker",
        active: false,
      },
      {
        name: "Baccarat",
        active: false,
      },
      {
        name: "Dragon Tiger",
        active: false,
      },
      {
        name: "32Cards",
        active: false,
      },
      {
        name: "Andar Bahar",
        active: false,
      },
      {
        name: "Lucky 7",
        active: false,
      },
      {
        name: "3 Card Judgem",
        active: false,
      },
    ],
    "our virtual": [
      {
        name: "All",
        active: true,
      },
      {
        name: "V-Teenpatti",
        active: false,
      },
      {
        name: "V-Lucky7",
        active: false,
      },
      {
        name: "V-other",
        active: false,
      },
    ],
    Evolution: [
      {
        name: "Blackjack",
        active: true,
      },
      {
        name: "Roulette",
        active: false,
      },
      {
        name: "Baccarat",
        active: false,
      },
      {
        name: "Game Show",
        active: false,
      },
      {
        name: "Other",
        active: false,
      },
    ],
    ezugi: [
      {
        name: "blackjack",
        active: true,
      },
      {
        name: "Roulette",
        active: false,
      },
      {
        name: "Baccarat",
        active: false,
      },
      {
        name: "other",
        active: false,
      },
    ],
    tvbet: [
      {
        name: "All",
        active: true,
      },
    ],
    betgame: [
      {
        name: "All",
        active: true,
      },
    ],
  };

  const activeGame = GamesList.find((game) => game.active == true);
  const activeGameItems = gameItemList[activeGame.game] || [];

  const handleItemClick = (index) => {
    if (ulRef.current) {
      const scrollAmount = 100; // Adjust this value based on your needs (distance to scroll per click)

      if (index === 0) {
        // Scroll to the left when the first item is clicked
        ulRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (index === activeGameItems.length - 1) {
        // Scroll to the right when the last item is clicked
        ulRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const hideLiveBets = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="border border-white border-b-black lg:mb-10 mb-20">
        {/* carousel */}

        <div className="  uppercase text-sm font-semibold  items-center">
          <ul className="flex overflow-x-auto scrollbar-hidden pt-2 px-0.5  gap-3 bg-gradient-to-t from-[#9DD75C] to-[#52A124] ">
            {GamesList.map((item, index) => (
              <li
                key={index}
                onClick={() => handleGameList(item.game)}
                className={`${
                  item.active &&
                  "text-white bg-gradient-to-b from-[#2E4D8F] to-[#161d2c] rounded-t-md px-2 pb-2"
                } text-nowrap cursor-pointer `}
              >
                {item.game}
              </li>
            ))}
          </ul>
        </div>
        <div className="uppercase text-sm font-semibold relative">
          {activeGameItems?.length > 0 && (
            <ul
              className={`flex scrollbar-hidden overflow-x-auto overflow-y-hidden  pt-2 px-0.5 bg-black ${
                activeGameItems.length === 1
                  ? "justify-center" // Center single item
                  : "justify-between gap-4" // Spacing for multiple items
              }`}
            >
              {activeGameItems.map((item, key) => (
                <li
                  key={key}
                  className={`${
                    item.active
                      ? "text-black bg-gradient-to-t from-[#9DD75C] to-[#52A124] rounded-t-md px-2 pb-2"
                      : "text-white"
                  } text-nowrap  cursor-pointer ${
                    activeGameItems.length === 1
                      ? "w-full text-center py-2 mr-10"
                      : ""
                  }`}
                >
                  {item.name}
                </li>
              ))}
              <div className="absolute flex right-2 bottom-1  items-center">
                <div className={` flex bg-white rounded-full items-center`}>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      showSearch ? "w-48 opacity-100 " : "w-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Search games..."
                    />
                  </div>
                  <button
                    className="text-white bg-gradient-to-t from-[#9DD75C] to-[#52A124] p-2 rounded-full"
                    onClick={handleSearchToggle}
                  >
                    <BiSearch />
                  </button>
                </div>
              </div>
            </ul>
          )}
        </div>

        {/* game card images link*/}
        <div
          className="w-full"
          style={{
            background: `url(${bgGame}) center no-repeat fixed`,
          }}
        >
          <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 gap-3 p-3 uppercase bg-opacity-50 bg-gray-400">
            {/* Priority Indexes: 5, 7, 2 */}
            {[20, 15, 13, 5, 7, 2].map((priorityIndex) => {
              const [imagePath, imageSrc] =
                Object.entries(images)[priorityIndex];
              const imageName = imagePath.split("/").pop().split(".")[0];
              const imageUrl =
                typeof imageSrc === "string" ? imageSrc : imageSrc.default;
              // Define custom routes for priority images
              let customRoute = "/casino";
              if (priorityIndex === 20) customRoute = "/PiratBay";
              if (priorityIndex === 15) customRoute = "/Jackpot";
              if (priorityIndex === 13) customRoute = "/Slotmachine";
              if (priorityIndex === 5) customRoute = "/Andarbahar";
              else if (priorityIndex === 7) customRoute = "/casinoTeen20";
              else if (priorityIndex === 2) customRoute = "/Card32";

              return (
                <div
                  onClick={() => {
                    handleLoginmobile(customRoute); // Trigger the modal
                  }}
                  key={imagePath}
                  className="cursor-pointer bg-black rounded-lg flex flex-col h-[112px] lg:h-[185px]"
                >
                  <div className="flex-grow flex items-center justify-center overflow-hidden rounded-t-lg">
                    <img
                      src={imageUrl}
                      alt={imageName}
                      className="w-full h-full object-center"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-full text-black font-bold p-2 bg-gradient-to-t from-[#9DD75C] to-[#52A124] text-center leading-tight break-words">
                    <span className="block text-[clamp(8px,2.5vw,14px)] max-w-full break-words">
                      {imageName}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Other Indexes */}
            {Object.entries(images).map(([imagePath, imageSrc], index) => {
              // Skip priority indexes
              if ([20, 15, 13, 5, 7, 2].includes(index)) return null;
              const imageName = imagePath.split("/").pop().split(".")[0];
              const imageUrl =
                typeof imageSrc === "string" ? imageSrc : imageSrc.default;

              return (
                <div
                  onClick={() => {
                    handleLoginmobile("/casino");
                  }}
                  key={imagePath}
                  className="cursor-pointer bg-black rounded-lg flex flex-col h-[112px] lg:h-[185px]"
                >
                  <div className="flex-grow flex items-center justify-center overflow-hidden rounded-t-lg">
                    <img
                      src={imageUrl}
                      alt={imageName}
                      className="w-full h-full object-center"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-full text-black font-bold p-2 bg-gradient-to-t from-[#9DD75C] to-[#52A124] text-center leading-tight break-words">
                    <span className="block text-[clamp(8px,2.5vw,14px)] max-w-full break-words">
                      {imageName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {open && <LiveBets hideLiveBets={hideLiveBets} />}
      {/* Show the LoginWarningModal only if it's small screen */}
      <LoginWarningModal
        openModal={showWarningModal}
        closeModal={() => setShowWarningModal(false)}
      />
    </>
  );
}

export default Games;
