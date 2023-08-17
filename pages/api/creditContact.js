import nodemailer from "nodemailer";

export default async function getServerSideProps(req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: req.body.userEmail,
      to: "allianceauto38.contact@gmail.com",
      subject: `Заявка. Кредит от ${req.body.userName}`,
      html: `<div>Имя: ${req.body.userName}</div>
      <div>Телефон: ${req.body.userPhone}</div>
      <div>Название автомобиля: ${req.body.car_name}</div>
      <div>Стоимость: ${req.body.car_price} руб.</div>
      <div>Год выпуска: ${req.body.car_year}</div>
      <div>Пробег: ${req.body.car_mileage} км</div>
      <div>Сумма кредита: ${req.body.value} руб.</div>
      <div>Первоначальный взнос: ${req.body.down_payment} руб.</div>
      <div>Срок кредита: ${req.body.valueData} лет</div>
      <div>Примерный платеж: ${req.body.monthly_payment} руб/мес</div>
      `,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || error.toString(),
    });
  }
  return res.status(200).json({ error: "" });
}
