import { useRef, useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""});
  const [passwordArray, setpasswordArray] = useState([]);


  const getPassword = async () => {
    try {
      let req = await fetch("http://localhost:3000/", { credentials: "include" });
      let passwords = await req.json();

      if (req.status === 401) {
        setpasswordArray(-1); 
      } else if (Array.isArray(passwords)) {
        setpasswordArray(passwords); 
      } else {
        setpasswordArray([]); 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setpasswordArray([]); 
    }
  };

  // load the password array when page is reloaded
  useEffect(() => {
    getPassword()
  }, [])

  // Toggling of the eye...
  const showPassword = () => {
    // alert('Hey!');
    passwordRef.current.type = "text"
    console.log(ref.current.src);
    if(ref.current.src.includes("icons2/closedEye.png")) {
      ref.current.src = "icons2/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons2/closedEye.png"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newId = uuidv4(); // Generate a unique ID once
      const newPassword = { ...form, id: newId };
  
      // Delete any existing password with the same ID (if editing)
      if (form.id) {
        await fetch("http://localhost:3000/",{ 
          method: "DELETE", 
          credentials: "include",
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ id: form.id }) 
        });
      }
  
      // Update state and server with the new password
      setpasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
  
      // Clear the form and show a success message
      setform({ site: "", username: "", password: "" });
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast('Error: Please fill out all fields correctly!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  

  const deletePassword = async(id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?");
    if(c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      await fetch("http://localhost:3000/", {
      method: "DELETE", 
      headers: {"Content-Type": "application/json"}, 
      credentials: "include",
      body: JSON.stringify({id})
      });
      
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setform({...passwordArray.filter(i=>i.id===id)[0], id:id }) 
    setpasswordArray(passwordArray.filter(item=>item.id!==id)) 
  }

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };
  


  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000} 
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick 
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />


    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#070c1a] via-[#141c2f] to-[#070a15] opacity-100 z-[-1]"></div>
    <div className="absolute top-[20%] left-[15%] w-[100px] h-[500px] bg-blue-500 rounded-full filter blur-[180px] opacity-55"></div>
    <div className="absolute bottom-[15%] right-[20%] w-[500px] h-[450px] bg-purple-500 rounded-full filter blur-[160px] opacity-50"></div>


    <div className="relative mycontainer min-h-screen text-white">
        {/* Title */}
        <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}>

            <h1 className="text-4xl font-bold text-center">
              <span>Key</span>
              <span className="text-blue-500">𓂀Forge</span>
            </h1>
        </motion.h1>

        <motion.p
            className="mt-2 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
        <p className="text-sm text-white text-center m-1">Unlock Security, Forge Trust</p>
        </motion.p>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Inputs */}
        <div className="flex flex-col p-4 text-black gap-4 items-center w-full">
      {/* Input 1 */}
      <motion.input
        whileFocus={{ scale: 1.05 }}
        value={form.site}
        onChange={handleChange}
        placeholder="Enter website URL"
        className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 w-full"
        type="text"
        name="site"
        id="site"
      />

      {/* Input -- (Username + Password + Button) */}
      <div className="flex w-full gap-6 items-center">
        {/* Input 2 - Username */}
        <motion.input
          whileFocus={{ scale: 1.05 }}
          value={form.username}
          onChange={handleChange}
          placeholder="Enter Username"
          className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 flex-1"
          type="text"
          name="username"
          id="username"
        />

        {/* Input 3 - Password + Eye Icon */}
        <div className="relative flex-1">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            ref={passwordRef}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-lg p-2 pr-10 w-full"
            type="password"
            name="password"
            id="password"
          />

          {/* Eye Icon */}
          <span 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={showPassword}
          >
            <motion.img 
              ref={ref} 
              src="icons2/eye.png" 
              className="w-6 h-6 opacity-70 hover:opacity-100" 
              alt="eye" 
              whileHover={{ scale: 1.2, rotate: 10 }} // Animate only the image
              transition={{ type: "spring", stiffness: 300 }} // Smooth effect
            />
          </span>
        </div>

        {/* Add Button */}
        <motion.button
          onClick={savePassword}
          whileHover={{ scale: 1.1 }}
          className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 flex items-center justify-center gap-2 text-white font-semibold transition-all duration-300 w-24 h-10"
        >
          <img src="../icons2/add2.png" width={20} />
          Add
        </motion.button>
      </div>
    </div>
    </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Table to show Passwords */}
        <div className="passwords">
          <h1 className="my-2 mt-10 text-white">Passwords</h1>

          {/* Table */}
          {/* Unauthorized */}
          {passwordArray === -1 && <button className="bg-sky-400 flex justify-center items-center hover:bg-sky-300 rounded-md px-1 py-1 gap-1 w-28 h-10"><Link to="/login">Log In</Link></button>}

          {/* No passwords */}
          {passwordArray !== null && passwordArray !== -1 && passwordArray.length === 0 && (
            <div className="p-4">No passwords to show</div>
          )}

          {/* Passwords show */}
          {passwordArray !== null && passwordArray !== -1 && passwordArray.length !== 0 && ( 
              <div className="rounded-md overflow-hidden p-[2px] bg-gradient-to-r from-cyan-500 to-blue-500">
             <div className="bg-gradient-to-br from-[#141627] via-[#202142] to-[#3b1e66] rounded-md p-1">

                <table className="table-auto w-full rounded-md border border-transparent">
                <thead className="text-center">
                <tr>
                  <th className="py-3 font-normal">Website</th>
                  <th className="py-3 font-normal">Username</th>
                  <th className="py-3 font-normal">Password</th>
                  <th className="py-3 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    
                    <td className="py-2 border text-center text-white" >
                    <div className="flex items-center justify-between">
                      <span className="ml-3">{item.site}</span>
                      <button className="mx-4 hover:bg-black rounded-md align-middle" onClick={() => { copyText(item.site) }}>
                      <motion.img 
                        src="icons2/copy.png"
                        className="w-5 opacity-70 hover:opacity-100" 
                        alt="icon"
                        whileHover={{ rotate: 10 }}  //tilt
                        transition={{ type: "spring", stiffness: 300 }}  
                      />

                        {/* <img className="w-5" src="icons2/copy.png" alt="img" /> */}
                      </button>
                    </div>
                  </td>

                  <td className="py-2 border text-center text-white" >
                    <div className="flex items-center justify-between">
                      <span className="ml-3">{item.username}</span>
                      <button className="mx-4 hover:bg-black rounded-md align-middle" onClick={() => { copyText(item.username) }}>
                        {/* <img className="w-5" src="icons2/copy.png" alt="img" /> */}
                        <motion.img 
                        src="icons2/copy.png"
                        className="w-5 opacity-70 hover:opacity-100" 
                        alt="icon"
                        whileHover={{ rotate: 10 }}  //tilt
                        transition={{ type: "spring", stiffness: 300 }}  
                      />
                      </button>
                    </div>
                  </td>
                  
                  <td className="py-2 border text-center text-white" >
                    <div className="flex items-center justify-between">
                      <span className="ml-3">{'*'.repeat(item.password.length)}</span>
                      <button className="mx-4 hover:bg-black rounded-md align-middle" onClick={() => { copyText(item.password) }}>
                        {/* <img className="w-5" src="icons2/copy.png" alt="img" /> */}
                        <motion.img 
                        src="icons2/copy.png"
                        className="w-5 opacity-70 hover:opacity-100" 
                        alt="icon"
                        whileHover={{ rotate: 10 }}  //tilt
                        transition={{ type: "spring", stiffness: 300 }}  
                      />
                      </button>
                    </div>
                  </td>

                  <td className="text-center w-1/4 py-3 border text-white">
                    <button className="mx-4 hover:bg-black rounded-md align-middle" onClick={() => {editPassword(item.id)}}>
                      {/* <img className="w-5" src="icons2/edit.png" alt="img" /> */}
                      <motion.img 
                        src="icons2/edit.png"
                        className="w-5 opacity-70 hover:opacity-100" 
                        alt="icon"
                        whileHover={{ rotate: 10 }}  //tilt
                        transition={{ type: "spring", stiffness: 300 }}  
                      />
                    </button>
                    <button className="mx-4 hover:bg-black rounded-md align-middle" onClick={() => {deletePassword(item.id)}}>
                      {/* <img className="w-5" src="icons2/trash.png" alt="img" /> */}
                      <motion.img 
                        src="icons2/trash.png"
                        className="w-5 opacity-70 hover:opacity-100" 
                        alt="icon"
                        whileHover={{ rotate: 10 }}  //tilt
                        transition={{ type: "spring", stiffness: 300 }}  
                      />
                    </button>

                  </td>
                  </tr> 
                })}
                
              </tbody>
            </table>
            </div>
          </div>)}
        </div>
      </motion.div>
      </div>
    </>
  )
}

export default Manager
