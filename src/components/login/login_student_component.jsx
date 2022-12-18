import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginStudent() {
    const navigate = useNavigate();
    
     let [id, setId] = useState(null);
     let [password, setPassword] = useState(null);
     async function logger() {
         await fetch("/login", {
            method: "POST",
             headers: { "Content-type": "application/json" },
             body: JSON.stringify({
               idField: id,
            passField: password,
             }),
         })
             .then((res) => res.json())
         .then((res) => {
            if (res.userinfo == "TRUE") {
                    if (res.usertype == "1") {
                        navigate("/student");
                    }
                    else if(res.usertype == "2"){
                        navigate("/coordinator");
                    }
                 }
             });
     }
    return (
        <div className="p-8">
            <div className="inline-block justify-center relative">
                <button
                    className="border border-black p-2"
                    onClick={() => {
                        
                      
                    }}
                >
                    <img
                        className="object-scale-down h-6 w-10"
                        src="https://img.icons8.com/fluency-systems-regular/48/null/left.png"
                    />
                    <span>Back</span>
                </button>
            </div>
            <div class="flex items-center justify-center pt-32">
                <img src="" />
                <div class="w-96 flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
                    <div class="mb-8 flex justify-center place-items-center">
                        <img
                            src={require("../../assets/logo_login.jpg")}
                            width="200"
                            height="50"
                        />
                    </div>
                    <div class="flex flex-col text-sm rounded-md">
                        <input
                            class="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
                            type="text"
                            onChange = {e => setId(e.target.value)}
                            placeholder="Username or Email id"
                        />
                        <input
                            class="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
                            type="password"
                            onChange = {e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        class="transition ease-in duration-100 hover:bg-black hover:text-white mt-5 w-full border border-black p-2"
                        type="submit"
                        
                        onClick={() => {
                            logger();;
                        }}
                    >
                        Sign in
                    </button>
                    <div class="mt-5 flex justify-between text-sm text-gray-600">
                        <a className="m-auto" href="#">
                            Forgot password?
                        </a>
                    </div>

                    <div class="mt-5 flex text-center text-sm text-gray-400"></div>
                </div>
            </div>
        </div>
    );
}
