import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login


// F.E->Pages->template->button(OnClick)->handler function->dispatch(services ke andar ek folder hai jisme ->ApiConnector)->se hum backend ke andr->controller ke andr->jo function hai usko call krega 


//Backend mei call services se jaa rhi hai 