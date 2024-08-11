import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">

       <div className=" mx-auto  flex justify-between items-center px-40 py-5 h-16"> 

         <div className="logo font-bold ">

          <span className=" text-green-700">&lt;</span>

          <span>Pass</span>

          <span className=" text-green-700">OP/&gt;</span>
          
          </div>
      {/* <ul>
        <li className="  flex gap-6">
          <a className="hover:font-bold" href="/">Home</a>
          <a className="hover:font-bold" href="#">About</a>
          <a className="hover:font-bold" href="#">Contact</a>
         
        </li>
      </ul>  */}

            <button className="bg-green-500 text-white flex items-center  rounded-full ring-white ring-1">
                  <img className="invert p-2 w-10 " src="/icons/github.svg" alt="github" />
                  <span className="font-bold px-1">Github</span>
            </button>
      </div>
    </nav>
  );
};

export default Navbar;
