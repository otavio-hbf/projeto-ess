/**
 * Component for creating a test.
 */
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { Stack } from "@mui/joy";

const CreateTest = () => {

  return (
    <Stack
    direction="column"
    justifyContent="center"
    alignItems="stretch"
    spacing={2}
    className={styles.container}
    >

    <section className={styles.container}>



    </section>

    </Stack>
  );
};

export default CreateTest;
