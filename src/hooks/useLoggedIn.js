import { useSelector } from "react-redux"

const useLoggedIn = () => {
    const { user, loading, error } = useSelector((state) => state.authentication)

    if (user) {
        return true
    } else if (error) {
        return false
    }
};

export default useLoggedIn;