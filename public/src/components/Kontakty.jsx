import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Kontakty({ kontakty, sucasnyUzivatel, zmenitCet }) {
  const [sucasnyUzivatelMeno, nastavSucasnehoUzivatelaMeno] =
    useState(undefined);
  const [
    sucasnyUzivatelProfilovaFotka,
    nastavSucasnehoUzivatelaProfilovaFotka,
  ] = useState(undefined);
  const [sucasnyZvolenyUzivatel, nastavSucasnehoZvolenehoUzivatela] =
    useState(undefined);

  useEffect(() => {
    // console.log(kontakty);
    if (sucasnyUzivatel) {
      nastavSucasnehoUzivatelaProfilovaFotka(sucasnyUzivatel.profilovaFotka);
      nastavSucasnehoUzivatelaMeno(sucasnyUzivatel.uzivatelske_meno);
    }
  }, [sucasnyUzivatel]);

  const zmenitSucasnyCet = (index, kontakt) => {
    nastavSucasnehoZvolenehoUzivatela(index);
    zmenitCet(kontakt);
  };

  return (
    <>
      {sucasnyUzivatelProfilovaFotka &&
        sucasnyUzivatelMeno && (
          <Container>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>Četuj!</h3>
            </div>

            <div className="kontakty">
              {kontakty.map((kontakt, index) => {
                return (
                  <div
                    className={`kontakt ${
                      index === sucasnyZvolenyUzivatel ? "selected" : ""
                    }`}
                    key={kontakt._id}
                    onClick={() => zmenitSucasnyCet(index, kontakt)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${kontakt.profilovaFotka}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="uzivatelske-meno">
                      <h3>{kontakt.uzivatelske_meno}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sucasny-uzivatel">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${sucasnyUzivatelProfilovaFotka}`}
                  alt="avatar"
                />
              </div>
              <div className="uzivatelske-meno">
                <h2>{sucasnyUzivatelMeno}</h2>
              </div>
            </div>
          </Container>
        )}
    </>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #123597;

    .brand
    {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img
        {
            height: 2rem;
        }

        h3
        {
            color: whitesmoke;
            text-transform: uppercase;
        }
    }

    .kontakty
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;

        &::website-scrollbar
        {
            width: 0.2rem;

            &-thumb
            {
                background-color: gray;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .kontakt
        {
            background-color: #274BAF;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;

            .avatar
            {
                img
                {
                    height: 3rem;
                }
            }

            .uzivatelske-meno
            {
                h3
                {
                    color: whitesmoke;
                }
            }
        }

        .selected
        {
            background-color: #63A4FF;
        }
    }

    .sucasny-uzivatel
    {
        background-color: #2E5FF7;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;


        .avatar
        {
            img
            {
                height: 4rem;
                max-inline-size: 100%;
            }
        }

        .uzivatelske-meno
        {
            h2
            {
                color: whitesmoke;
            }
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;

            .uzivatelske-meno
            {
                h2
                {
                    font-size: 1rem;
                }
            }
          }
    }
`;
