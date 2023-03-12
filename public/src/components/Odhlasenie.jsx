import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

export default function Odhlasenie() {
  const navigate = useNavigate();
  const handleKlik = async () => {
    if (localStorage.getItem) {
      localStorage.clear();
      navigate("/prihlasenie");
    }
  };
  return (
    <Tlacidlo onClick={handleKlik}>
      <BiPowerOff />
    </Tlacidlo>
  );
}

const Tlacidlo = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #63a4ff;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    background-color: red;
  }

  svg {
    font-size: 1.3rem;
    color: whitesmoke;
  }
`;
