import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";

/**
 * A reusable button component.
 *
 * @component
 * @example
 * ```tsx
 * import Button from "./Button";
 *
 * const MyComponent = () => {
 *   return <Button onClick={() => console.log("Button clicked!")}>Click me</Button>;
 * };
 * ```
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
};

export default Button;
