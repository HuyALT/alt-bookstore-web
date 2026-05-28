import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/AuthApi";
import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function UserAuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getCurrentUser();
        if (!userResponse.success) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
