"use client"

import { auth } from '@/auth/firebase';
import { toastErrorNotify, toastSuccessNotify } from '@/helpers/ToastNotify';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react'




// auth (firebase) işlemlerini yapacağımız context alanı açtık
export const YetkiContext=createContext()


const AuthContextProvider = ({children}) => {
const [currentUser,setCurrentUser]=useState("") // displayName icin degisken acildi

const router=useRouter()

useEffect(() => {
  userTakip();
}, []);

//?yeni bir kullanıcı oluşturmak için kullanılan firebase metodu

const createUser = async (email, password, displayName) => {
  try {
    //? sitede ilk defa kullanıcı adı oluşturmak için kullanılan firebase metodu
    await createUserWithEmailAndPassword(auth, email, password);
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName,
    });

    toastSuccessNotify("register başarılı");

    router.push("/profile");
  } catch (error) {
 
  toastErrorNotify(error.message)
  }
};

//?google ile giriş
 const signUpGooglE = () => {
    //?google hesaplarına ulaşmak için firebase metodu
    const provider = new GoogleAuthProvider();

    //?açılır pencere ile giriş yapılması için firebase metodu

    signInWithPopup(auth, provider)
      .then((result) => {

        router.push("/profile")
        toastSuccessNotify("google ile giriş başarılı")
      
      })
      .catch((error) => {
        console.log(error);
      });
  };


//?login işlemini yapan firebase metodu

 const login = async (email, password) => {
   try {
     await signInWithEmailAndPassword(auth, email, password);

     toastSuccessNotify("login başarılı")
router.push("/profile")
   
   } catch (error) {
    toastErrorNotify(error.message)
   }
 };




 const logOut = () => {
   signOut(auth);
   toastSuccessNotify("çıkış başarılı");
 };

 //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
 const userTakip = () => {
   onAuthStateChanged(auth, (user) => {
     if (user) {
       console.log(user);

       const { email, displayName, photoURL } = user;

       setCurrentUser({ email, displayName, photoURL });
     
  
     } else {
       setCurrentUser(false);
     }
   });
 };


  return (
    <YetkiContext.Provider value={{createUser,signUpGooglE,login,logOut,currentUser}}>
        {children}
    </YetkiContext.Provider>
  )
}

export default AuthContextProvider