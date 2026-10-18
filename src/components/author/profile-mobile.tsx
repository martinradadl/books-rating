import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface AuthorProfileMobileProps {
  profilePic: string;
  name: string;
  followersCount: number;
}

export const AuthorProfileMobile = ({
  profilePic,
  name,
  followersCount,
}: AuthorProfileMobileProps) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const toggleDropdownMenu = () => setShowDropdownMenu(!showDropdownMenu);

  return (
    <div className="flex p-2.5 pb-[5px] lg:hidden">
      <img
        src={profilePic}
        alt="Author Pic"
        className="w-auto h-[90px] mr-2.5"
      />

      <div>
        <p className="text-2xl leading-[26px] mb-2.5">{name}</p>

        <div className="flex">
          <button className="w-[140px] mr-2.5 bg-[#F4F1EA] border border-[#D6D0C4] rounded-[3px] text-sm leading-3.5 px-3 py-2 cursor-pointer hover:bg-[#ede6d6]">
            Follow Author
          </button>

          <div className="relative">
            <button
              onClick={toggleDropdownMenu}
              className="w-[36px] h-[32px] bg-[#F4F1EA] border border-[#D6D0C4] rounded-[3px] flex items-center justify-center cursor-pointer hover:bg-[#ede6d6]"
            >
              <MdExpandMore className="text-xl text-[#9E9E9E]" />
            </button>

            {showDropdownMenu && (
              <div className="absolute top-[34px] left-0 w-fit bg-white border border-[#D6D0C4] shadow-sm z-50">
                <button className="w-full whitespace-nowrap text-left text-sm p-3 hover:bg-[#ede6d6] hover:underline cursor-pointer">
                  Report this account
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm">{followersCount} followers</p>
      </div>
    </div>
  );
};
