import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  const [login, { data, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    const toastId = toast.loading("Loggin in");

    try {
      const loginData = {
        id: data.userId,
        password: data.password,
      };

      const result = await login(loginData).unwrap();

      const user = verifyToken(result.data.accessToken);

      dispatch(
        setUser({
          user: user,
          token: result.data.accessToken,
        })
      );

      navigate(`/${user.role}/dashboard`);

      toast.success("Logged in successfully", { id: toastId, duration: 1000 });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" {...register("userId")} id="userId" />
        </div>

        <div>
          <label htmlFor="id">Password:</label>
          <input type="text" {...register("password")} id="password" />
        </div>

        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
}
