import React from "react";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import styled from "styled-components";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { firebasePrihlasenieRoute } from "../utils/apiRoutes.js";

export default function SocialPrihlasenieTlacidla() {
  const navigate = useNavigate();
  const poskytovatelia = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };

  const firebasePrihlasenie = async (typPrihlasenia) => {
    try {
      const poskytovatel = poskytovatelia[typPrihlasenia];
      const uzivatelData = await signInWithPopup(firebaseAuth, poskytovatel);
      const email = uzivatelData.user.email
        ? uzivatelData.user.email
        : uzivatelData.user.providerData[0].email;

      const { data } = await axios.post(firebasePrihlasenieRoute, { email });

      if(data.status)
      {
        localStorage.setItem("cetuj-uzivatel", JSON.stringify(data.uzivatel));
        navigate("/");
      }

      else
      {
        navigate("/nastav-uzivatelske-meno");
      }

      // console.log(email, typPrihlasenia);
      // console.log(uzivatelData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SocialPrihlasenieContainer>
      <button type="button" onClick={() => firebasePrihlasenie("google")}>
        <BsGoogle />
      </button>

      <button type="button" onClick={() => firebasePrihlasenie("facebook")}>
        <BsFacebook />
      </button>

      <button type="button" onClick={() => firebasePrihlasenie("github")}>
        <BsGithub />
      </button>
    </SocialPrihlasenieContainer>
  );
}

const SocialPrihlasenieContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1em;
  background-color: transparent;

  button {
    background-color: transparent;
    border: 0.1rem solid #155df9;
    color: whitesmoke;
    padding: 0.8rem;
    font-height: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #155df9;
    }
  }
`;
