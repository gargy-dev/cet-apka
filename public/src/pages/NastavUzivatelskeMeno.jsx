import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registraciaRoute, skontrolujUzivatelskeMenoRoute } from "../utils/apiRoutes.js";
import { firebaseAuth } from "../utils/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { debounce } from "../utils/debounce";

export default function NastavUzivatelskeMeno() {

  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [uzivatelskeMenoStatus, nastavUzivatelskeMenoStatus] = useState(undefined);
  const [email, nastavEmail] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  onAuthStateChanged(firebaseAuth, (uzivatelData) => {
    if (!uzivatelData) {
      navigate("/prihlasenie");
    } else {
      nastavEmail(
        uzivatelData.email ? uzivatelData.email : uzivatelData.providerData[0].email
      );
    }
  });

  useEffect(() => {
    if (localStorage.getItem("cetuj-uzivatel")) {
      navigate("/");
    }
  }, []);

  const handleChange = debounce((meno) => skontrolujUzivatelskeMeno(meno), 300);

  const overFormular = () => {
    if (values.length < 3) {
      toast.error(
        "Užívateľské meno musí byť dlhšie ako 3 znaky!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const skontrolujUzivatelskeMeno = async (uzivatelske_meno) => {
    if (uzivatelske_meno.length > 3) {
      const { data } = await axios.post(skontrolujUzivatelskeMenoRoute, { uzivatelske_meno });
      nastavUzivatelskeMenoStatus(data.status);
      setLabel(data.msg);
      setValues(uzivatelske_meno);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (overFormular()) {
      const { data } = await axios.post(registraciaRoute, {
        uzivatelske_meno: values,
        email,
        heslo: (Math.random() + 1).toString(20).substring(1)
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("cetuj-uzivatel", JSON.stringify(data.uzivatel));
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        {/* {email && ( */}
          <form onSubmit={(event) => handleSubmit(event)}>
            <span>Kontrola dostupnosti užívateľského mena</span>
            <div className="row">
              <input
                className={`${
                  uzivatelskeMenoStatus
                    ? "success"
                    : uzivatelskeMenoStatus !== undefined
                    ? "danger"
                    : ""
                }`}
                type="text"
                placeholder="Užívateľské meno"
                name="uzivatelske_meno"
                onChange={(e) => handleChange(e.target.value)}
                min="3"
              />
              <label
                htmlFor=""
                className={`${
                  uzivatelskeMenoStatus
                    ? "success"
                    : uzivatelskeMenoStatus !== undefined
                    ? "danger"
                    : ""
                }`}
              >
                {label}
              </label>
            </div>
            <button type="submit" className="btn">
              {" "}
              REGISTROVAŤ SA{" "}
            </button>
          </form>
        {/* )} */}
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0575e6;

  .row {
    label {
      display: block;
      margin: 10px 0 0 5px;
      transition: 0.3s ease-in-out;
      height: 0.5rem;
    }
    label.success {
      color: #39ff14;
    }
    label.danger {
      color: #ff3131;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0052d4;
    border-radius: 2rem;
    padding: 5rem;
  }

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #49a1a9;
      border-radius: 0.4rem;
      color: whitesmoke;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #9cecfb;
        outline: none;
      }
    }

    .success {
        border-color: #39ff14;
        &:focus {
          border-color: #39ff14;
        }
      }
      .danger {
        border-color: #ff3131;
        &:focus {
          border-color: #ff3131;
        }
      }

    .btn {
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

    span {
      color: whitesmoke;
      text-transform: uppercase;
    }
  }
`;
