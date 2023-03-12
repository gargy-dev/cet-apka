import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { prihlasenieRoute } from "../utils/apiRoutes.js";
import SocialPrihlasenieTlacidla from "../components/SocialPrihlasenieTlacidla";

function Prihlasenie() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    uzivatelske_meno: "",
    heslo: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("cetuj-uzivatel")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // console.log("validuje sa", registraciaRoute);
      const { heslo, uzivatelske_meno } = values;
      const { data } = await axios.post(prihlasenieRoute, {
        uzivatelske_meno,
        heslo,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("cetuj-uzivatel", JSON.stringify(data.uzivatel));
        navigate("/");
      }
    }
    // alert("form");
  };

  const handleValidation = () => {
    const { heslo, uzivatelske_meno } = values;

    if (heslo === "") {
      toast.error("Užívateľské meno a heslo je povinné!", toastOptions);
    } else if (uzivatelske_meno.length === "") {
      toast.error("Užívateľské meno a heslo je povinné!", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Četuj!</h1>
          </div>
          <input
            type="text"
            placeholder="Užívateľské meno"
            // required
            name="uzivatelske_meno"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Heslo"
            name="heslo"
            // required
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="btn">
            PRIHLÁSIŤ SA
          </button>
          <SocialPrihlasenieTlacidla />
          <span>
            Ešte nemáš účet? <Link to="/registracia"> Registrovať Sa </Link>
          </span>
        </form>
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

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: whitesmoke;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0052d4;
    border-radius: 2rem;
    padding: 3rem 5rem;

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

      a {
        color: #6991c7;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Prihlasenie;
