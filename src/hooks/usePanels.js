import { useSelector } from "react-redux";

// This custom hook is to return the current state of the panels.
const usePanels = () => {
    const openCart = useSelector(((state) => state.navigation.cart));
    const openWishlist = useSelector(((state) => state.navigation.wishlist));
    const openSearch = useSelector(((state) => state.navigation.search));
    const openSign =  useSelector(((state) => state.navigation.sign))
    const openMenu = useSelector(((state) => state.navigation.menu));

    return { openCart, openWishlist, openSearch, openSign, openMenu }
}

export default usePanels;