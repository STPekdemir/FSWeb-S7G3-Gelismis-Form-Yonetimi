import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as yup from "yup";
import Form from "./Components/Form";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    password: "",
    kk: false,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response.data);
        setUsersData([...usersData, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    //setUsersData([...usersData, formData]);
  };
  const handleOnChange = (event) => {
    const { id, value, checked } = event.target;
    hatalariKontrolEt(id, value);

    if (id === "kk") {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  let userScheme = yup.object({
    isim: yup.string().required("İsim girmeniz gereklidir."),
    soyisim: yup.string().required("Soyisim girmeniz gereklidir."),
    email: yup
      .string()
      .email("Geçerli email giriniz.")
      .required("Email girmeniz gereklidir"),
    password: yup
      .string()
      .required("Lütfen geçerli bir şifre giriniz.")
      .min(5, "Şifreniz çok kısa, en az 5 karakterli bir şifre giriniz"),
    kk: yup.boolean(),
  });
  const [formError, setFormError] = useState({
    isim: "",
    soyisim: "",
    email: "",
    password: "",
  });
  function hatalariKontrolEt(id, value) {
    yup
      .reach(userScheme, id)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [id]: "",
        });
      })
      .catch((error) => {
        setFormError({
          ...formError,
          [id]: error.errors[0],
        });
      });
  }
  function UsersDataTurner(data) {
    return (
      <div style={{ border: "1px solid blue" }}>
        <p>{data.isim}</p>
        <p>{data.soyisim}</p>
        <p>{data.email}</p>
      </div>
    );
  }
  return (
    <>
      <Form
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formError={formError}
      />
      {usersData.map((object) => UsersDataTurner(object))}
    </>
  );
}

export default App;
