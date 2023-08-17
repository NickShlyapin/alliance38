import React, { useState, useEffect } from "react";
import styles from "./credit.module.scss";

import Slider from "@mui/material/Slider";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import StrapiImage from "../image";
import InputMask from "react-input-mask";

import ArrowDown from "@/public/assets/ArrowDown";

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

function Credit({ car }) {
  const [value, setValue] = React.useState(
    car.attributes.price - (car.attributes.price * 40) / 100
  );

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valueData, setValueData] = React.useState(6);

  const handleDataSliderChange = (event, newValueData) => {
    setValueData(newValueData);
  };

  let price = car.attributes.price;
  price = price.toLocaleString();

  let cost = car.attributes.price; //Стоимость товара
  let down_payment = car.attributes.price - value;
  let loan_amount = cost - down_payment; //Первоначальный взнос
  let loan_term = valueData * 12; //Срок кредита в мес
  let interest_rate = 0.1; // Процентная ставка
  let monthly_interest_rate = interest_rate / 12; //Срок кредита в месяцах
  let monthly_payment =
    (loan_amount *
      monthly_interest_rate *
      (1 + monthly_interest_rate) ** loan_term) /
    ((1 + monthly_interest_rate) ** loan_term - 1);

  const name = useInput("", { isEmpty: true, minLength: 1 });
  const phone = useInput("", { isEmpty: true, minLength: 11 });

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeUserPhone = (e) => {
    setUserPhone(e.target.value);
  };

  let car_name = car.attributes.title;
  let car_year = car.attributes.year;
  let car_mileage = car.attributes.mileage;
  let car_price = car.attributes.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      userName,
      userPhone,
      value,
      down_payment,
      valueData,
      monthly_payment,
      car_name,
      car_price,
      car_year,
      car_mileage,
    };

    fetch("/api/creditContact", {
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <div className={styles.credit}>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Кредитный калькулятор</h1>
        <div className={styles.popupCart}>
          <div className={styles.cartImgCont}>
            <StrapiImage
              image={car.attributes.main_image}
              className={styles.cartImg}
              fill
            />
          </div>
          <div className={styles.popupCartInfo}>
            <span className={styles.title}>{car.attributes.title}</span>

            <div className={styles.row}>
              <span className={styles.infoTitle}>Год выпуска</span>
              <span className={styles.info}>{car.attributes.year} г</span>
            </div>
            <div className={styles.row}>
              <span className={styles.infoTitle}>Пробег</span>
              <span className={styles.info}>{car.attributes.mileage} км</span>
            </div>
            <div className={styles.row}>
              <span className={styles.infoTitle}>Двигатель</span>
              <span className={styles.info}>
                {car.attributes.fuel_type}, {car.attributes.engine_capacity}
                л.
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.infoTitle}>Мощность</span>
              <span className={styles.info}>
                {car.attributes.horsepower} л.с.
              </span>
            </div>
            <div className={styles.row}>
              <div className={styles.cardPrice}>{price} ₽</div>
            </div>
          </div>
        </div>
        <div className={styles.popupCalcField}>
          <div className={styles.inputBlock}>
            <p>Сумма кредита</p>
            <p className={styles.inputField}>{value.toLocaleString()} ₽</p>
            <Slider
              max={car.attributes.price - 100000}
              min={100000}
              defaultValue={
                car.attributes.price - (car.attributes.price * 60) / 100
              }
              value={typeof value === "number" ? value : 100}
              onChange={handleSliderChange}
              step={10000}
              color="secondary"
              sx={{
                width: "100%",
                color: "#fff",
                border: "0px",
                borderRadius: "0px",
                height: "2px",
                margin: "0px",
                padding: "0px",
                top: "-14px",
                "& .MuiSlider-thumb": {
                  borderRadius: "15px",
                  height: "18px",
                  width: "18px",
                  color: "#fff",
                  border: "2px solid red",
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "red",
                    boxShadow: "none",
                  },
                  "&:active": {
                    color: "red",
                    boxShadow: "none",
                  },
                },

                "& .MuiSlider-track": {
                  color: "red",
                  border: "0px",
                  height: "2px",
                },
              }}
            />
            <div className={styles.rangeValue}>
              <p>100 000 ₽</p>
              <p>
                {(
                  car.attributes.price -
                  (car.attributes.price * 60) / 100
                ).toLocaleString()}{" "}
                ₽
              </p>
              <p>
                {(
                  car.attributes.price -
                  (car.attributes.price * 30) / 100
                ).toLocaleString()}{" "}
                ₽
              </p>
              <p>{(car.attributes.price - 100000).toLocaleString()} ₽</p>
            </div>
          </div>
          <div className={styles.inputBlock2}>
            <div className={styles.column}>
              <p>Первоначальный взнос</p>
              <p className={styles.inputField}>
                {(car.attributes.price - value).toLocaleString()} ₽
              </p>
            </div>
            <div className={styles.column}>
              <p>Срок кредита</p>
              <p className={styles.inputField}>
                {(() => {
                  switch (valueData) {
                    case 1:
                      return "1 год";
                    case 2:
                      return "2 года";
                    case 3:
                      return "3 года";
                    case 4:
                      return "4 года";
                    case 5:
                      return "5 лет";
                    case 6:
                      return "6 лет";
                    case 7:
                      return "7 лет";
                  }
                })()}
              </p>
              <Slider
                max={7}
                min={1}
                defaultValue={3}
                value={valueData}
                onChange={handleDataSliderChange}
                step={1}
                color="secondary"
                sx={{
                  width: "100%",
                  color: "#fff",
                  border: "0px",
                  borderRadius: "0px",
                  height: "2px",
                  margin: "0px",
                  padding: "0px",
                  top: "-14px",
                  "& .MuiSlider-thumb": {
                    borderRadius: "15px",
                    height: "18px",
                    width: "18px",
                    color: "#fff",
                    border: "2px solid red",
                    transition: "color 0.3s ease-in-out",
                    margin: "0px",
                    padding: "0px",
                    "&:hover": {
                      color: "red",
                      boxShadow: "none",
                    },
                    "&:active": {
                      color: "red",
                      boxShadow: "none",
                    },
                  },

                  "& .MuiSlider-root": {
                    "&:media (pointer: coarse)": {
                      padding: "0px",
                    },
                  },

                  "& .MuiSlider-track": {
                    color: "red",
                    border: "0px",
                    height: "2px",
                  },
                }}
              />
              <div className={styles.rangeValue}>
                <p>1</p>
                <p></p>
                <p>3</p>
                <p></p>
                <p>5</p>
                <p></p>
                <p>7</p>
              </div>
            </div>
          </div>
          <div className={styles.creditInfo}>
            <div className={styles.creditInfoBlock}>
              <p>
                Примерный платеж:{" "}
                <mark>
                  {Math.round(monthly_payment).toLocaleString()} ₽/мес
                </mark>
              </p>
            </div>
            <div>
              <p>
                Средняя ставка: <mark>от 10%</mark>
              </p>
            </div>
          </div>
          <div className={styles.inputBlock2}>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.inputFieldForm}
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
              className={styles.inputFieldForm}
              placeholder="Телефон"
              required
              style={
                phone.isValid && phone.isEmpty
                  ? { borderColor: "red" }
                  : { borderColor: "#fff" }
              }
            ></InputMask>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Заявка отправлена!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Мы свяжемся с Вами в ближайшее время.
                </Typography>
              </Box>
            </Modal>
          </div>
          <p className={styles.politic}>
            Нажимая на кнопку, Вы даете согласие на обработку персональных
            данных.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Credit;
