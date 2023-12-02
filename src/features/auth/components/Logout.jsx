import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOutAsync } from "../authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    dispatch(signOutAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      {/* useEffect will run after render if we dont put condition here 
        it will navigate to '/login' route witout signing out */}
      {user == null && <Navigate to="/login" replace={true} />}
    </>
  );
}
