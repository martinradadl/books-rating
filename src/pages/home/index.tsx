import { HomeDesktop } from "./desktop-view"
import { HomeMobile } from "./mobile-view"

export const Home = () => {
    return (
        <div>
            <div className="lg:hidden">
                <HomeMobile />
            </div>
            <div className="hidden lg:block">
                <HomeDesktop />
            </div>
        </div>
    )
}