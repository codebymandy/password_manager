import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();

  const passwordref = useRef();

  const [from, setfrom] = useState({ site: "", username: "", password: "" });

  const [Password, setPassword] = useState([]);

   const getdata = async() =>{
     
      let res =  await fetch("http://localhost:3000/");

      let password = await res.json();

      console.log(password)
      if (password) {
       setPassword(password);
      }
      
   }

  useEffect(() => {
       
         getdata()
  }, []);

  const handlechange = (e) => {
    setfrom({ ...from, [e.target.name]: e.target.value });
  };

  const savepassword = async() => {

    if(from.site.length > 3 && from.username.length > 3 && from.password.length > 3){

       // if the data are update and previous exist
      await fetch("http://localhost:3000/",{method:"DELETE" , headers:{"content-Type":"application/json"},
        body: JSON.stringify({id:from.id})})

    setPassword([...Password, {...from , id:uuidv4()}]);
     let res = await fetch("http://localhost:3000/",{method:"POST" , headers:{"content-Type":"application/json"},
     body: JSON.stringify({...from , id:uuidv4()} )})
   // localStorage.setItem("passwords", JSON.stringify([...Password, {...from , id:uuidv4()}]));
    setfrom({ site: "", username: "", password: "" })
   }
  };

  const editpassword = (id) => {
      
      setfrom({...Password.filter(item => item.id === id)[0] , id:id})   
      setPassword(Password.filter(item => item.id !== id));
  }

  
  const deletpassword = async(id) => {
     
    console.log("delte" , id)
    setPassword(Password.filter(item => item.id !== id));
    await fetch("http://localhost:3000/",{method:"DELETE" , headers:{"content-Type":"application/json"},
      body: JSON.stringify( {id} )})
      
  }

  const showpass = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eyes.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordref.current.type = "password";
    }
  };

  const copyText = (copy) => {
    toast("🦄 copied by clipboard!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(copy);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />

      

      <div className=" mx-auto  max-w-6xl px-40 py-16  min-h-[86vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className=" text-green-700">&lt;</span>

          <span>Pass</span>
          <span className=" text-green-700">OP/&gt;</span>
        </h1>

        <p className="text-lg text-green-900 text-center">
          Your own password Manger
        </p>

        <div className=" text-black flex flex-col gap-6 p-4 items-center">
          <input
            className="border border-green-600 rounded-full p-4 py-1 w-full"
            placeholder="Enter website URL"
            type="text"
            value={from.site}
            onChange={handlechange}
            name="site"
            id=""
          />

          <div className="flex w-full justify-between gap-4">
            <input
              className="border border-green-600 rounded-full p-4 py-1 w-full"
              placeholder="Enter Username"
              type="text"
              value={from.username}
              onChange={handlechange}
              name="username"
            />

            <div className=" relative w-full ">
              <input
                className="border border-green-600 rounded-full p-4 py-1 w-full"
                placeholder="Enter Password"
                type="password"
                value={from.password}
                onChange={handlechange}
                name="password"
                ref={passwordref}
              />

              <span
                className="absolute right-[3px] top-[1px]  cursor-pointer "
                onClick={showpass}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={32}
                  src="icons/eyecross.png"
                  alt="Eye Icon"
                />
              </span>
            </div>
          </div>

          <button
            className=" ring-black ring-1 flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-8 py-1 w-fit "
            onClick={savepassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords ">
          <h1 className="font-bold py-4 text-2xl flex justify-center items-center">
            Your Passwords
          </h1>
          {Password.length == 0 && <div>No Password to show</div>}
          {Password.length != 0 && (
            <table class="table-auto w-full  rounded-md overflow-hidden">
              <thead className=" bg-green-400 ">
                <tr>
                  <th className="py-1">Song</th>
                  <th className="py-1">Artist</th>
                  <th className="py-1">Year</th>
                  <th className="py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {Password.map((e , index) => {
                  return (  
                    <tr key={index}>
                      <td className="py-1 text-center  ">
                        <div className="flex justify-center items-center">
                          {e.site}
                          <div
                            className=" loardiconscopy siz-7 cursor-pointer"
                            onClick={() => {
                              copyText(e.site);
                            }}
                          >
                            <script src="https://cdn.lordicon.com/lordicon.js"></script>
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "20px",
                                paddingTop: "2px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 text-center ">
                        <div className="flex justify-center items-center">
                          {e.username}
                          <div
                            className=" loardiconscopy siz-7 cursor-pointer"
                            onClick={() => {
                              copyText(e.username);
                            }}
                          >
                            <script src="https://cdn.lordicon.com/lordicon.js"></script>
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "20px",
                                paddingTop: "2px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 text-center ">
                        <div
                          className="flex justify-center items-center"
                          onClick={() => {
                            copyText(e.password);
                          }}
                        >
                          {"*".repeat(e.password.length)}
                          <div className=" loardiconscopy siz-7 cursor-pointer">
                            <script src="https://cdn.lordicon.com/lordicon.js"></script>
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "20px",
                                paddingTop: "2px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 text-center cursor-pointer">
                        <span className="edit" onClick={()=>{editpassword(e.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </span>
                        <span className="delete" onClick={()=>{deletpassword(e.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
