import { useSelector } from "react-redux"

// This custom hook is used to return true if there are logged user in session
const useLoggedIn = () => {
    const { user } = useSelector((state) => state.authentication);
    if (user) {
        return true
    } 
    return false
};

export default useLoggedIn;