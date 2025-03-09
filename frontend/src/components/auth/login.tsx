import { useForm } from "react-hook-form";
import InputWithError from "../inputs/inputWithError";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

const Login = () => {
  const { register, handleSubmit } = useForm();

  return (
    <section className="flex flex-col gap-x-4">
      <h1>LOGIN</h1>
      <form
        action=""
        method="post"
      >
        <InputWithError
          icon={<FaUser className="h-10" />}
          {...register("username")}
        />
        <InputWithError
          icon={<FaKey className="h-10" />}
          {...register("password")}
        />
      </form>
    </section>
  );
};

export default Login;
