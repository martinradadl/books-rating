const DESKTOP_HOME_BACKGROUND_IMG_URL = "url(https://s.gr-assets.com/assets/award/2025/signed-out-hp/desktop-background@2x.png)"

export const HomeBackgroundImgDesktop = () => {
    return (
        <div className="absolute h-[300px] w-full bg-[#333D30] bg-size-[auto_295px] bg-center"
            style={{
                backgroundImage: DESKTOP_HOME_BACKGROUND_IMG_URL,
            }}
        />
    )
}