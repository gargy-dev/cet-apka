import React from "react";
import styled from "styled-components";
import uvod from "../assets/uvod.gif";

export default function Vitajte({ sucasnyUzivatel }) {
  return (
    <Container>
      <img src={uvod} alt="uvod" />
      <h1>
        Vitajte, <span>{sucasnyUzivatel.uzivatelske_meno}!</span>
      </h1>
      <h3>Ak si chcete začať písať, vyberte si prosím čet.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #045DE9;
  }
`;
