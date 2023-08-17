"use client";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";

import styles from "./contact.module.scss";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Politic from "../politic/Politic";
import politicStyles from "../politic/politic.module.scss";

import MainBG from "../../public/images/gabornagy_photography_maserati_anim.gif";
import Image from "next/image";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, emailError]);

  return {
    isEmpty,
    minLengthError,
    emailError,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
    setIsValid(true);
    console.log(e.target.value);
  };

  const onBlur = (e) => {
    setIsValid(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isValid,
    ...valid,
  };
};

function Contact(props) {
  const name = useInput("", { isEmpty: true, minLength: 1 });
  const phone = useInput("", { isEmpty: true, minLength: 11 });
  const message = useInput("");

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeUserPhone = (e) => {
    setUserPhone(e.target.value);
  };
  const handleChangeUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      userName,
      userPhone,
      userMessage,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        console.log("Response received");
        console.log("Response succeeded!");
      }
      if (res.status === 500) {
        console.log("Error");
      }
    });
    handleOpen();
  };

  var masks = [
    "8 (999) 999-99-99",
    "+9 (999) 999-99-9999999",
    "+7 (999) 999-99-99",
  ];

  if (phone.value[0] === "+") {
    var mask = masks[1];
  }
  if (phone.value[0] === "7") {
    var mask = masks[2];
  }
  if (phone.value[0] === "8") {
    var mask = masks[0];
  }
  if (phone.value[0] === "9") {
    var mask = masks[2];
  }
  if (phone.value.length <= 3) {
    var mask = "";
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPolitic, setOpenPolitic] = useState(false);
  const handleOpenPolitic = () => setOpenPolitic(true);
  const handleClosePolitic = () => setOpenPolitic(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const stylePolitic = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    overflowY: "scroll",
    height: "70%",
    display: "block",
    width: "30%",
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 3,
    textAlign: "left",
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.wrapper}>
        <div className={styles.cardImgCont}>
          <Image className={styles.cardImg} src={MainBG} fill alt="bg" />
        </div>
        <div className={styles.contactContainer}>
          <form method="post" onSubmit={handleSubmit}>
            <h2>Остались воросы?</h2>
            <p>Оставьте заявку, и менеджер вам перезвонит</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={styles.inputField}
                value={name.value}
                onChange={(e) => {
                  name.onChange(e), handleChangeUserName(e);
                }}
                onBlur={(e) => name.onBlur(e)}
                placeholder="Имя"
                style={
                  name.isValid && name.isEmpty
                    ? { borderColor: "red" }
                    : { borderColor: "#fff" }
                }
              />

              <InputMask
                mask={mask}
                type="tel"
                id="phone"
                name="phone"
                alwaysShowMask={false}
                maskChar={null}
                value={phone.value}
                onChange={(e) => {
                  phone.onChange(e), handleChangeUserPhone(e);
                }}
                onBlur={(e) => phone.onBlur(e)}
                onKeyPress={(event) => {
                  if (!/[0-9\+]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className={styles.inputField}
                placeholder="Телефон"
                required
                style={
                  phone.isValid && phone.isEmpty
                    ? { borderColor: "red" }
                    : { borderColor: "#fff" }
                }
              ></InputMask>

              <input
                type="text"
                id="message"
                name="message"
                className={styles.inputField}
                value={message.value}
                placeholder={"Комментарий"}
                onChange={(e) => {
                  message.onChange(e), handleChangeUserMessage(e);
                }}
              />

              <button
                type="submit"
                disabled={!name.inputValid || !phone.inputValid}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Отправить
              </button>

              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <button onClick={handleClose} className={styles.closeBtn}>
                    &times;
                  </button>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Заявка отправлена!
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Мы свяжемся с Вами в ближайшее время.
                  </Typography>
                </Box>
              </Modal>

              <p className={styles.politic}>
                Нажимая на кнопку, вы даете согласие на{" "}
                <a onClick={handleOpenPolitic}>
                  обработку персональных данных.
                </a>
              </p>

              <Modal
                open={openPolitic}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClosePolitic}
                className={politicStyles.politic}
              >
                <Box sx={stylePolitic} className={politicStyles.box}>
                  <Politic />
                </Box>
              </Modal>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
