"use client"
import { auth } from '@/auth/firebase';
import { toastErrorNotify, toastSuccessNotify } from '@/helpers/ToastNotify';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext } from 'react'

// auth (firebase) işlemlerini yapacağımız context alanı açtık
export const YetkiContext=createContext()


const AuthContextProvider = ({children}) => {
    // yeni bir kullanici olusturmak icin kullanilan firebase methodu
    const router=useRouter()

    const createUser = async (email, password, displayName) => {
        try {
          //? sitede ilk defa kullanıcı adı oluşturmak için kullanılan firebase metodu
          await createUserWithEmailAndPassword(auth, email, password);

          toastSuccessNotify("register basarili")
    
        router.push("/profile")

      
         
        } catch (error) {
        toastErrorNotify(error.message)
        }
      };
      // google ile giris

      const signUpGooglE = () => {
        //?google hesaplarına ulaşmak için firebase metodu

        const provider = new GoogleAuthProvider();
    
        //?açılır pencere ile giriş yapılması için firebase metodu
    
        signInWithPopup(auth, provider)
          .then((result) => {
          
            router.push()
            toastSuccessNotify("google ile giris basarili")
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      //?login işlemini yapan firebase metodu

 const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    
      toastSuccessNotify("login basarili")
      router.push("/profile")
    } catch (error) {
     toastErrorNotify("giris basarisiz")
    }
  };

  return (
    <YetkiContext.Provider value={{createUser, signUpGooglE}}>
        {children}
    </YetkiContext.Provider>
  )
}

export default AuthContextProvider