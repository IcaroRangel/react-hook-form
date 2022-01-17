import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface User {
  name: string;
  age: number;
  email: string;
  address: string;
  cpf: number;
  marytalState: string;
}

let schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  age: yup
    .number()
    .required("Idade é obrigatório")
    .positive("Idade miníma de 1 ano")
    .integer("Idade deve ser um número inteiro"),
  email: yup.string().required("Email obrigátorio"),
  address: yup.string(),
  cpf: yup
    .string()
    .length(11, "CPF deve ter 11 digítos")
    .required("CPF obrigatório"),
  marytalState: yup.string(),
});

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback((data) => {
    console.log(data);
  }, []);

  const onlyNumber = React.useCallback((evt) => {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }, []);

  return (
    <>
      <h1>Dados</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} type="text" placeholder="Nome"></input>
          {errors.name && <span>{errors.name.message}</span>}
          <input
            {...register("age")}
            type="number"
            placeholder="Idade"
            defaultValue="1"
          ></input>
          {errors.age && <span>{errors.age.message}</span>}
          <input {...register("email")} type="text" placeholder="Email"></input>
          {errors.email && <span>{errors.email.message}</span>}
          <input
            {...register("address")}
            type="text"
            placeholder="Endereço"
          ></input>
          {errors.address && <span>{errors.address.message}</span>}
          <input
            {...register("cpf")}
            type="text"
            onKeyPress={onlyNumber}
            placeholder="CPF"
          ></input>
          {errors.cpf && <span>{errors.cpf.message}</span>}
          <span>
            <label>Estado Civil</label>
            <select {...register("marytalState")}>
              <option>Casado</option>
              <option>Solteiro</option>
              <option>Viúvo</option>
              <option>Divorciado</option>
            </select>
          </span>
          {errors.marytalState && <span>{errors.marytalState.message}</span>}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default App;
