import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

const [dispatch] = useStateProvider();

export default function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expirationTime');
    dispatch({ type: reducerCases.SET_TOKEN, token: null });
    dispatch({ type: reducerCases.SET_LOGGED_IN, isLoggedIn: false });
};