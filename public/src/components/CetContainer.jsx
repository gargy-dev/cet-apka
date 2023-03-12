import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CetVstup from "./CetVstup";
import Odhlasenie from "./Odhlasenie";
import axios from "axios";
import { poslatSpravuRoute, ziskatVsetkySpravyRoute } from "../utils/apiRoutes.js";
import { v4 as uuidv4 } from "uuid";

export default function CetContainer({ sucasnyCet, sucasnyUzivatel, socket }) {
  const [spravy, nastavSpravy] = useState([]);
  const [prichadzajuceSpravy, nastavPrichadzajuceSpravy] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    async function fetchData() {
      if (sucasnyUzivatel && sucasnyCet) { // overenie, či sú hodnoty definované
        const odozva = await axios.post(ziskatVsetkySpravyRoute, {
          od: sucasnyUzivatel._id,
          pre: sucasnyCet._id
        });
        nastavSpravy(odozva.data);
    }
    }
    fetchData();
  }, [sucasnyCet])
    const handlePoslatSpravu = async (msg) => {
      // alert(sprava);
      await axios.post(poslatSpravuRoute, {
        od: sucasnyUzivatel._id,
        pre: sucasnyCet._id,
        sprava: msg
      });

      socket.current.emit("odoslat-spravu", {
        pre: sucasnyCet._id,
        od: sucasnyUzivatel._id,
        sprava: msg
      });

      const msgs = [...spravy];
      msgs.push({ odSeba: true, sprava: msg });
      nastavSpravy(msgs);
    };

    useEffect(() => {
      if(socket.current)
      {
        socket.current.on("sprava-prijata", (msg) => {
          // console.log(msg);
          nastavPrichadzajuceSpravy({ odSeba: false, sprava: msg });
        });
      }
    }, []);

    useEffect(() => {
      prichadzajuceSpravy && nastavSpravy((prev) => [...prev, prichadzajuceSpravy]);
    }, [prichadzajuceSpravy]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [spravy]);

  return (
    <>
      {sucasnyCet && (
        <Container>
          <div className="cet-hlavicka">
            <div className="uzivatel-detaily">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${sucasnyCet.profilovaFotka}`}
                  alt="avatar"
                />
              </div>
              <div className="uzivatelske-meno">
                <h3>{sucasnyCet.uzivatelske_meno}</h3>
              </div>
            </div>
            <Odhlasenie />
          </div>
          <div className="cet-spravy">
            {
              spravy.map((sprava) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`sprava ${sprava.odSeba ? "sended" : "recieved"}`}>
                      <div className="kontent">
                        <p>
                          {
                            sprava.sprava
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <CetVstup handlePoslatSpravu={handlePoslatSpravu} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 15% 70% 15%;
    }

    .cet-hlavicka
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .uzivatel-detaily
        {
            display: flex;
            align-items: center;
            gap: 1rem;

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
    }

    .cet-spravy
    {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
          }
        }

        .sprava
        {
            display: flex;
            align-items: center;

            .kontent
            {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: whitesmoke;

                @media screen and (min-width: 720px) and (max-width: 1080px) {
                  max-width: 70%;
                }
            }
        }
    }

    .sended
    {
        justify-content: flex-end;

        .kontent
        {
            background-color: #00236E;
        }
    }

    .recieved
    {
        justify-content: flex-start;

        .kontent
        {
            background-color: #0053D9;
        }
    }
`;
