"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";

import {restoreSession,setInitialized} from "@/features/auth/authSlice";

import {getAuthData} from "@/app/utils/storage";

export default function AuthInitializer() {

 const dispatch = useAppDispatch();

 useEffect(() => {
  console.log("AuthInitializer Running");

   const {
    user,
    token,
   } = getAuthData();
    console.log(user, token);

   if(token){

     dispatch(
      restoreSession({
       user,
       token,
      })
     );

   }else{
     dispatch(setInitialized());
   }

 }, [dispatch]);

 return null;
}