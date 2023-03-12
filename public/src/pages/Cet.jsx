import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { vsetciUzivateliaRoute, host } from "../utils/apiRoutes.js";
import Kontakty from "../components/Kontakty.jsx";
import Vitajte from "../components/Vitajte.jsx";
import CetContainer from "../components/CetContainer.jsx";
import { io } from "socket.io-client";

export default function Cet() {
  const socket = useRef();
  const navigate = useNavigate();
  const [kontakty, nastavKontakty] = useState([]);
  const [sucasnyUzivatel, nastavSucasnehoUzivatela] = useState(undefined);
  const [sucasnyCet, nastavSucasnyCet] = useState(undefined);
  const [jeNacitane, nastavJeNacitane] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
     if(!localStorage.getItem("cetuj-uzivatel"))
     {
         navigate("/prihlasenie");
     }
     };
     fetchData();
   });

  useEffect(() => {
    async function nacitajUdaje() {
      if (!localStorage.getItem("cetuj-uzivatel")) {
        navigate("/prihlasenie");
      } else {
        nastavSucasnehoUzivatela(
          await JSON.parse(localStorage.getItem("cetuj-uzivatel")),
          nastavJeNacitane(true)
        );
      }
    }
    nacitajUdaje();
  }, []);

  useEffect(() => {
    if(sucasnyUzivatel)
    {
      socket.current = io(host);
      socket.current.emit("pridat-uzivatela", sucasnyUzivatel._id);
    }
  }, [sucasnyUzivatel]);

  useEffect(() => {
    async function nacitajKontakty() {
      if (sucasnyUzivatel) {
        if (sucasnyUzivatel.jeProfilovaFotkaNastavena) {
          const data = await axios.get(
            `${vsetciUzivateliaRoute}/${sucasnyUzivatel._id}`
          );
          nastavKontakty(data.data);
        } else {
          navigate("/nastavit-avatar");
        }
      }
    }
    nacitajKontakty();
  }, [sucasnyUzivatel]);

  const handleZmenitCet = (cet) => {
    nastavSucasnyCet(cet);
  }

  return (
    <Container>
      <div className="container">
        <Kontakty kontakty={kontakty} sucasnyUzivatel={sucasnyUzivatel} zmenitCet={handleZmenitCet} />
        {
          jeNacitane && sucasnyCet === undefined ? (
            <Vitajte sucasnyUzivatel={sucasnyUzivatel} />
          ) : (
            <CetContainer sucasnyCet={sucasnyCet} sucasnyUzivatel={sucasnyUzivatel} socket={socket} />
          )
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #092599;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;