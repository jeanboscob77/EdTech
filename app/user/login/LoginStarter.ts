import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/userSlice";

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return null;
}
