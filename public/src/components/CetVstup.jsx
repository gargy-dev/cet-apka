import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";

export default function CetVstup({ handlePoslatSpravu }) {
  const [msg, nastavMsg] = useState("");
  const poslatCet = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handlePoslatSpravu(msg);
      nastavMsg("");
    }
  };

  return (
    <Container>
      <div className="tlacidlo-kontajner">
      </div>
      <form className="vstup-kontajner" onSubmit={(event) => poslatCet(event)}>
        <input
          type="text"
          placeholder="Sem napíšte správu..."
          value={msg}
          onChange={(e) => nastavMsg(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #100c08;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .tlacidlo-kontajner {
    display: flex;
    align-items: center;
    color: whitesmoke;
    gap: 1rem;
  }

  .vstup-kontajner {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #485563;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: whitesmoke;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #66a6ff;
      }

      &:focus {
        outline: none;
      }
    }
  }

  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #66a6ff;
    border: none;
    cursor: pointer;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }

    svg {
      font-size: 2rem;
      color: whitesmoke;
    }
  }
`;
