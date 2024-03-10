import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import styles from "./index.module.css";
import { Stack } from "@mui/material";

const RegisterPage = () => {
  const { service } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = formData;

    if (name.trim() === "") {
      alert("O campo de nome não pode estar vazio.");
      return;
    }

    if (password.length < 5) {
      alert("A senha deve ter pelo menos 5 caracteres.");
      return;
    }

    service.createUser(name, email, password);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="iname">Nome</label>
          <input
            type="text"
            name="name"
            id="iname"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="iemail">E-mail</label>
          <input
            type="email"
            name="email"
            id="iemail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="ipassword">Senha</label>
          <input
            type="password"
            name="password"
            id="ipassword"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input type="submit" value="Entrar" />
        </p>
      </form>
      <p>
        Já possui cadastro? <a href="/login">Faça login aqui</a>
      </p>
    </Stack>
  );
};

export default RegisterPage;
