import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nacitavanie from "../assets/nacitavanie.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { nastavAvatarRoute } from "../utils/apiRoutes.js";

export default function NastavAvatar() {
  const api = `https://api.multiavatar.com/1632829`;
  const navigate = useNavigate();
  const [avatary, nastavAvatary] = useState([]);
  const [nacitavaSa, nastavNacitavaSa] = useState(true);
  const [zvolenyAvatar, nastavZvolenyAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
   const fetchData = async () => {
    if(!localStorage.getItem("cetuj-uzivatel"))
    {
        navigate("/prihlasenie");
    }
    };
    fetchData();
  });

  const nastavProfilovuFotku = async () => {
    if(zvolenyAvatar === undefined)
    {
        toast.error("Prosím vyberte si Avatar!", toastOptions);
    }

    else
    {
        const uzivatel = await JSON.parse(localStorage.getItem("cetuj-uzivatel"));
        const { data } = await axios.post(`${nastavAvatarRoute}/${uzivatel._id}`, {
            image: avatary[zvolenyAvatar]
        });

        if(data.suNastavene)
        {
            uzivatel.jeProfilovaFotkaNastavena = true;
            uzivatel.profilovaFotka = data.image;
            localStorage.setItem("cetuj-uzivatel", JSON.stringify(uzivatel));
            navigate("/");
        }

        else
        {
            toast.error("Nastala chyba pri nastavovaní Avataru. Skúste to znovu, prosím.", toastOptions);
        }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = Buffer.from(response.data);
        data.push(buffer.toString("base64"));
      }
      nastavAvatary(data);
      nastavNacitavaSa(false);
    };
    fetchData();
  }, []);

  return (
    <>
    {
        nacitavaSa ? <Container>
            <img src={nacitavanie} alt="nacitavanie" className="nacitavanie" />
        </Container> : (
            <Container>
        <div className="title-container">
          <h1>Vyberte si ľubovoľný avatar ako profilovú fotku</h1>
        </div>
        <div className="avatary">
          {avatary.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  zvolenyAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => nastavZvolenyAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button className="submit-btn" onClick={nastavProfilovuFotku}>Nastaviť ako Profilovú fotku</button>
        <ToastContainer />
      </Container>
        )
    }
    </>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #092599;
    height: 100vh;
    width: 100vw;

    .nacitavanie
    {
        max-inline-size: 100%;
    }

    .title-container
    {
        h1
        {
            color: whitesmoke;
        }
    }

    .avatary
    {
        display: flex;
        gap: 2rem;

        .avatar
        {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img
            {
                height: 6rem;
            }
        }

        .selected
        {
            border: 0.4rem solid #1565C0;
        }
    }

    .submit-btn
    {
      background-color: #63a4ff;
      color: whitesmoke;
      padding: 1rem 2rem;
      border: none;
      font-height: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #155df9;
      }
    }
`;
