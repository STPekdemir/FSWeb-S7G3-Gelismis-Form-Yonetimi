import React, { useState, useEffect } from "react";

const style = {
  border: "3px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const errorStyle = {
  color: "red",
};
function Form({ formData, handleOnChange, handleOnSubmit, formError }) {
  const { isim, soyisim, email, password, kk } = formData;
  const isFormInvalid = !isim || !soyisim || !email || !password || !kk;
  return (
    <form style={style} onSubmit={handleOnSubmit}>
      <p>
        <label htmlFor="isim">
          İsim
          <input type="text" id="isim" value={isim} onChange={handleOnChange} />
        </label>
      </p>
      <p style={errorStyle}>{formError.isim}</p>
      <p>
        <label htmlFor="soyisim">
          Soyisim
          <input
            type="text"
            id="soyisim"
            value={soyisim}
            onChange={handleOnChange}
          />
        </label>
      </p>
      <p style={errorStyle}>{formError.soyisim}</p>
      <p>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleOnChange}
          />
        </label>
      </p>
      <p style={errorStyle}>{formError.email}</p>
      <p>
        <label htmlFor="password">
          Şifre
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleOnChange}
          />
        </label>
      </p>
      <p style={errorStyle}>{formError.password}</p>
      <p>
        <label htmlFor="kk">
          Kullanım Koşulları
          <input
            type="checkbox"
            id="kk"
            checked={kk}
            onChange={handleOnChange}
          />
        </label>
      </p>
      <p>
        <button type="submit" disabled={isFormInvalid}>
          Gönder
        </button>
      </p>
    </form>
  );
}
export default Form;
