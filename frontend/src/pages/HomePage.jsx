import { useAuthStore } from "../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./home/HomeScreen";

const HomePage = () => {
  const { user } = useAuthStore();
  console.log(user);

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;
