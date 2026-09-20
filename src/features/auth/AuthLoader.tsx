"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fetchCurrentUser } from "./authSlice";

function AuthLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return null;
}

export default AuthLoader;
