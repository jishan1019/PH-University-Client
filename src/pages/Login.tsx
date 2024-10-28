import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

export default function Login() {
  const [login, { data, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="password" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
}
