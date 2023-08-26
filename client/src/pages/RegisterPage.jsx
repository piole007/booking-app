import LoginForm from "../components/loginForm/LoginForm";

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <LoginForm
        questionText={"Already a member?"}
        btnText={"Register"}
        routText="Login"
        rout={"/login"}
        title={"Register"}
        showNameInput={true}
      />
    </div>
  );
};

export default RegisterPage;
