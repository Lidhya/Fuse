import React from "react";
import AuthBg from "../Components/Auth/AuthBg";
import Signin from "../Components/Signin";

function SigninPage() {
  return (
    <>
      <div className="hidden md:block">
        <AuthBg />
      </div>
      <div>
        <Signin />
      </div>
    </>
  );
}

export default SigninPage;
