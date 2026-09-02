const DESKTOP_HOME_BACKGROUND_IMG_URL =
  "url(https://s.gr-assets.com/assets/award/2025/signed-out-hp/desktop-background@2x.png)";

export const HomeBackgroundImgDesktop = () => {
  return (
    <div
      className="absolute left-1/2 h-[300px] w-screen -translate-x-1/2 bg-[#333D30] bg-center bg-size-[auto_295px]"
      style={{
        backgroundImage: DESKTOP_HOME_BACKGROUND_IMG_URL,
      }}
    />
  );
};
