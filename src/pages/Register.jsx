import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate ,useLoaderData} from "react-router-dom";
import isAuth from ".././functions/IsAuth";
import {onSubmit,afterSubmit} from "../functions/SubmitBG"


export default function Register() {
  const [error, setError] = useState("");
  const [pageClicked, setPageClicked] = useState(false);
  const [load,setLoad]=useState(false)
 
  const [massageError,setMassageError]=useState("")
  const [emailError,setEmailError]=useState("")
  const [PasswordError,setPasswordError]=useState("")
  const dataLoader=useLoaderData()
  const navigate = useNavigate();
  const FullName = useRef();

  const date=useRef()
  const email = useRef();
  const password = useRef();
  const passwordAgin = useRef();
  const button=useRef()

  useEffect(() => {
    const asyncFn = async () => {
      const res = await isAuth();
      console.log(res);
      if (res.data.isAuth) {
        console.log("you are already login in");
        navigate("/");
      } else {
      }
    };
    asyncFn();
  }, []);

  const handlerSubmit=async (e)=>{
e.preventDefault()
onSubmit(button)//change the submit button color
const passwordPattern=/[^a-zA-Z0-9@#$%^&+=]/g
const FullNameInput = FullName.current.value.trim();
const birthDate=date.current.value
const emailInput = email.current.value.trim();
const passwordInput = password.current.value.trim();
const enterPassAgin = passwordAgin.current.value.trim();


if(!FullNameInput||!birthDate||!emailInput||!passwordInput||!enterPassAgin){
  setMassageError("Please fill all fields!")
  afterSubmit(button) //return the button to original color
  return
}

const FullNameSanitized=FullNameInput.replace(/[^a-zA-Z\s\-]/g, '')
const passwordInputSanitized=passwordInput.replace(passwordPattern, '')
const confirmPass=enterPassAgin.replace(passwordPattern, '')
const brithDateSanitized= birthDate.replace(/[^0-9\/\-]/g, '')
const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
if(emailPattern.test(emailInput)){
if(confirmPass===passwordInputSanitized){
try {
  setLoad(true)
  const res = await axios.post(`${import.meta.env.VITE_API}/user/register`, {
    FullName: FullNameSanitized,
    birthDate: brithDateSanitized,
    email: emailInput,
    password: passwordInputSanitized
  })
  if(res.status===201){
    navigate("/login")
  }
} catch (error) {
  afterSubmit(button) //return the button to original color
  setLoad(false)

  setError(true)
  setMassageError(error.response.data.massage)
}
}else{
  afterSubmit(button) //return the button to original color

  setMassageError("Password not match")
  return
}
}else{
  afterSubmit(button) //return the button to original color

  setMassageError("Please enter valid email")
  return
}
  }

  const handelClickPage = (e) => {

    if(!e.target.classList.contains("dropdown")) {
      setPageClicked(true)

    }
  }
  const resetHandelClickPage = () => { // will pass to DropDwonCountry  component
    setPageClicked(false)
  }
  return (
    <>
      <section onClick={handelClickPage}  className="font-IBMPlexSans flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://res.cloudinary.com/dr2baapqk/image/upload/v1701290083/Kingdom_Tower_bonxtf.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-[#F5F8FF] w-full md:max-w-md lg:max-w-full  md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create your account to start new Adventure
            </h1>
            {load ? (
             <div className="flex justify-center">
                 <span class="loading"></span>
             </div>
          ) : (
            ""
          )}
            <form onSubmit={handlerSubmit} className="mt-6" action="#" method="POST">
            <div
            className={` ${
              error ? "block" : "hidden "
            }  rounded-md bg-red-700 text-white p-2 left-[20%] bottom-[110%]`}
          >
            {massageError}
          </div>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                ref={FullName}
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 mb-2 rounded-lg bg-[#FFFFFF] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus=""
                  autoComplete=""
                  required=""
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                ref={email}
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg mb-2 bg-[#FFFFFF] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus=""
                  autoComplete=""
                  required=""
                />
              </div>
              <div className="flex justify-between ">
                <div className="w-[100%]">
                  <label className="block text-gray-700">Date Of birth</label>
                  <input
                  ref={date}
                    type="date"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-lg mb-2 bg-[#FFFFFF] mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
                    required=""
                    max={"2024-01-01"}
                  />
                </div>

     
              </div>
              <div className="flex justify-between gap-2">
                <div className="w-[50%]">
                  <label className="block text-gray-700">Password</label>
                  <input
                    ref={password}
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg mb-2 bg-[#FFFFFF] mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
                    required=""
                  />
                </div>

                <div className="w-[50%]">
                  <label className="block text-gray-700">
                    Confirm Password
                  </label>
                  <input
                  ref={passwordAgin}
                    type="password"
                    name="ConfirmPassword"
                    id=""
                    placeholder="Confirm Password"
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg mb-1 bg-[#FFFFFF] mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
                    required=""
                  />
                </div>
              </div>
              <button
              ref={button}
                type="submit"
                className="w-full block bg-[#230751] hover:bg-[#230751b6]  text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                Register
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-[#230751b6] hover:text-[#230751b6] font-semibold"
              >
                Sing in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
