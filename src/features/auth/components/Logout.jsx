import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOutAsync } from "../authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.loggedInUserToken);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  return (
    <>
      {/* useEffect will run after render if we dont put condition here 
        it will navigate to '/login' route witout signing out */}
      {token == null && <Navigate to="/login" replace={true} />}
    </>
  );
}
