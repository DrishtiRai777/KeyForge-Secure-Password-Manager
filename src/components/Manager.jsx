import { useRef, useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""});
  const [passwordArray, setpasswordArray] = useState([])

  const getPassword = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
  }

  // load the password array when page is reloaded
  useEffect(() => {
    getPassword()
  }, [])

  // Toggling of the eye...
  const showPassword = () => {
    // alert('Hey!');
    passwordRef.current.type = "text"
    console.log(ref.current.src);
    if(ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newId = uuidv4(); // Generate a unique ID once
      const newPassword = { ...form, id: newId };
  
      // Delete any existing password with the same ID (if editing)
      if (form.id) {
        await fetch("http://localhost:3000/", { 
          method: "DELETE", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ id: form.id }) 
        });
      }
  
      // Update state and server with the new password
      setpasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
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
      await fetch("http://localhost:3000", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 5000, // Adjust auto-close delay (e.g., 2000ms = 2 seconds)
        hideProgressBar: false,
        closeOnClick: true, // Allow closing on click
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
    

      <div className="mycontainer bg-black text-white">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center">
          <span>Key</span>
          <span className="text-blue-500">𓂀Forge</span>
        </h1>
          
        <p className="text-sm text-slate-500 text-center m-1">Unlock Security, Forge Trust</p>

        {/* Inputs */}
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          {/* Input 1 */}
          <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-lg border-2 border-slate-500 w-full p-4 py-1" type="text" name="site" id="site" />
          <div className="flex w-full justify-between gap-8">
            <div>
            {/* Input 2 */}
            <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-lg border-2 border-slate-500 w-34 p-4 py-1" type="text" name="username" id="username" />
            </div>
            <div>
              {/* Input 3 */}
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter password" className="rounded-lg border-2 border-slate-500 w-25 p-4 py-1" type="password" name="password" id="password"/>

              {/* Eye - image */}
              <span className="absolute -translate-x-11 cursor-pointer" onClick={showPassword}>
                <img ref={ref} src="icons/eye.png" className="p-1 w-8 h-8" alt="eye" />
              </span>

            </div>

            <div>
              <button onClick={savePassword} className="bg-sky-400 flex justify-center items-center hover:bg-sky-300 rounded-md px-1 py-1 gap-1 w-28 h-10">
                <img src="../icons/add2.png" width={32}/>
              Add </button>
            </div>
          </div>
        </div>

        {/* Table to show Passwords */}
        <div className="passwords">
          <h1 className="my-2 mt-10 text-slate-500">Passwords</h1>

          {/* Table */}
          {/* No passwords */}
          {passwordArray.length === 0 && <div className="p-4">No passwords to show</div>}
          {/* Passwords are there! */}
          {passwordArray.length != 0 && ( 
            <div className="rounded-md overflow-hidden border-2 ">
              <table className="table-auto w-full rounded-md border">
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
                      <button className="mx-4 hover:bg-cyan-100 rounded-md align-middle" onClick={() => { copyText(item.site) }}>
                        <img className="w-5" src="icons/icons8-copy-30 (1).png" alt="img" />
                      </button>
                    </div>
                  </td>

                  <td className="py-2 border text-center text-white" >
                    <div className="flex items-center justify-between">
                      <span className="ml-3">{item.username}</span>
                      <button className="mx-4 hover:bg-cyan-100 rounded-md align-middle" onClick={() => { copyText(item.username) }}>
                        <img className="w-5" src="icons/icons8-copy-30 (1).png" alt="img" />
                      </button>
                    </div>
                  </td>
                  
                  <td className="py-2 border text-center text-white" >
                    <div className="flex items-center justify-between">
                      <span className="ml-3">{item.password}</span>
                      <button className="mx-4 hover:bg-cyan-100 rounded-md align-middle" onClick={() => { copyText(item.password) }}>
                        <img className="w-5" src="icons/icons8-copy-30 (1).png" alt="img" />
                      </button>
                    </div>
                  </td>

                  <td className="text-center w-1/4 py-3 border text-white">
                    <button className="mx-4 hover:bg-cyan-100 rounded-md align-middle" onClick={() => {editPassword(item.id)}}>
                      <img className="w-5" src="icons/icons8-edit-30.png" alt="img" />
                    </button>
                    <button className="mx-4 hover:bg-cyan-100 rounded-md align-middle" onClick={() => {deletePassword(item.id)}}>
                      <img className="w-5" src="icons/icons8-trash-24.png" alt="img" />
                    </button>

                  </td>
                  </tr> 
                })}
                
              </tbody>
            </table>
          </div>)}
        </div>
      </div>
    </>
  )
}

export default Manager
