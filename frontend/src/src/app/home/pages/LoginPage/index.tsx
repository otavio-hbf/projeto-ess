import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import styles from "./index.module.css";
import { Stack } from '@mui/material';

const LoginPage = () => {
  const { service } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;
    service.getUserToLogin(email, password);
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
            <label htmlFor="iemail">E-mail</label>
            <input type="email" name="email" id="iemail" value={formData.email} onChange={handleChange} required/> 
        </p>
        <p>
            <label htmlFor="ipassword">Senha</label>
            <input type="password" name="password" id="ipassword" value={formData.password} onChange={handleChange} required/>
        </p>
        <p>
            <input type="submit" value="Entrar"/>
        </p>
      </form>
      <p>
        Ainda não possui cadastro? <a href="/register">Clique aqui</a>
      </p>
    </Stack>
  );
};

export default LoginPage;
