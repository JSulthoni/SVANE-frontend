
import { useSelector } from "react-redux";

const makeMode = () => {
    // Getting mode from redux
    const nightmode = useSelector((state) => state.navigation.nightmode);

    if (!nightmode) {
        return { 'backgroundColor' : 'rgba(255, 255, 255, 0.8)' }
    } else {
        return { 'backgroundColor' : 'rgba(0, 0, 0, 0.8)' }
    }
}

export default makeMode;