import { faCopy, faEye, faEyeSlash, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Background from "./Background";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function Manager() {
  const [eye, setEye] = useState(true);
  const [form, setForm] = useState({ password: "", site: "", username: "" ,id:"" });
  const[errors,setErrors]=useState({})

  const [editId,setEditID]=useState('')

  const [passwordArray, setPasswordArray] = useState("");
  const validate =(fromData)=>{ 
   let errorData={}
   if(!fromData.password){
    errorData.password=' Enter A Password'
   }
   if(!fromData.site){
    errorData.site=' Enter A Url'
   }
   if(!fromData.username){
    errorData.username=' Enter A Username'
   }
    setErrors(errorData)
    return errorData
  }
  

function elDelete(id){
 const c= confirm('If you want to delete this')

if(c){setPasswordArray(passwordArray.filter((e)=>e.id!==id))
  localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((e)=>e.id!==id)))}

}

function elEdit(id){
  setEditID(id)
const data= passwordArray.find((e)=>e.id === id)
setForm(data)

}



  useEffect(() => {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords) {
      setPasswordArray(passwords);
    }
  }, []);

  const showPassword = () => {
    setEye(!eye);
  };

  const savePassword = () => {
   
 let errorData =validate(form)
 if(Object.keys(errorData).length)return


if(editId){
  setPasswordArray(passwordArray.map((el)=>{
    if(el.id===editId){ return form}
       return el
    }))

    localStorage.setItem('passwords',JSON.stringify(passwordArray.map((el)=>{
    if(el.id===editId) {return form}
       return el
    })))
    }
    else{
      setPasswordArray([...passwordArray, {...form , id:crypto.randomUUID()}])
localStorage.setItem('passwords',JSON.stringify([...passwordArray, {...form , id:crypto.randomUUID()}]))
}


setEditID('')

    setForm({ password: "", site: "", username: "" })
  };

  const handalchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText=(text)=>{
    toast.success('Copied', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <Background />
      <div className=" max-w-2xl w-full mx-auto   py-16">
        <h1 className="text-2xl text-center font-bold ">
          <span className="text-green-700"> &lt;</span>
          Pass<span className="text-green-700">Man /&gt;</span>
        </h1>
        <p className="text-sm text-green-900 text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col  text-black gap-5 p-4">
         <div className="relative"> <input
            type="text"
            value={form.site}
            name="site"
            onChange={handalchange}
            placeholder="Enter Website URL"
            className="rounded-full  border-green-500 border text-sm py-2 w-full px-5"
          /> <p className="absolute -bottom-4 text-xs pl-4 text-red-500">{errors.site}</p></div>
          <div className="flex relative gap-3">
            <input
              type="text"
              value={form.username}
              placeholder="Enter Username"
              name="username"
              onChange={handalchange}
              className="rounded-full border-green-500 border text-sm py-1 ml-2 w-full px-5"
            /> <p className="absolute -bottom-4 text-xs pl-4 text-red-500">{errors.username}</p>
            <div className="relative w-full mr-2">
              {" "}
              <input
                type={eye ? "password" : "text"}
                name="password"
                value={form.password}
                onChange={handalchange}
                placeholder="Enter Password"
                className="rounded-full w-full  border-green-500 border text-sm py-1  px-5"
              />
              <FontAwesomeIcon
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={showPassword}
                icon={eye ? faEyeSlash : faEye}
              /><p className="absolute -bottom-4 text-xs pl-4 text-red-500">{errors.password}</p>
            </div>
          </div>

          <button 
            onClick={savePassword}
            className="flex  text-xs gap-2 ease-in-out border border-black duration-100 hover:bg-green-500 group items-center justify-center bg-green-400 rounded-full w-max py-1 px-3 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M18 2V10M22 6L14 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2C7.40013 2 8.1002 2 8.63498 2.27248C9.10538 2.51217 9.48783 2.89462 9.72752 3.36502C10 3.8998 10 4.59987 10 6C10 7.40013 10 8.1002 9.72752 8.63498C9.48783 9.10538 9.10538 9.48783 8.63498 9.72752C8.1002 10 7.40013 10 6 10C4.59987 10 3.8998 10 3.36502 9.72752C2.89462 9.48783 2.51217 9.10538 2.27248 8.63498C2 8.1002 2 7.40013 2 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 18C2 16.5999 2 15.8998 2.27248 15.365C2.51217 14.8946 2.89462 14.5122 3.36502 14.2725C3.8998 14 4.59987 14 6 14C7.40013 14 8.1002 14 8.63498 14.2725C9.10538 14.5122 9.48783 14.8946 9.72752 15.365C10 15.8998 10 16.5999 10 18C10 19.4001 10 20.1002 9.72752 20.635C9.48783 21.1054 9.10538 21.4878 8.63498 21.7275C8.1002 22 7.40013 22 6 22C4.59987 22 3.8998 22 3.36502 21.7275C2.89462 21.4878 2.51217 21.1054 2.27248 20.635C2 20.1002 2 19.4001 2 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14 18C14 16.5999 14 15.8998 14.2725 15.365C14.5122 14.8946 14.8946 14.5122 15.365 14.2725C15.8998 14 16.5999 14 18 14C19.4001 14 20.1002 14 20.635 14.2725C21.1054 14.5122 21.4878 14.8946 21.7275 15.365C22 15.8998 22 16.5999 22 18C22 19.4001 22 20.1002 21.7275 20.635C21.4878 21.1054 21.1054 21.4878 20.635 21.7275C20.1002 22 19.4001 22 18 22C16.5999 22 15.8998 22 15.365 21.7275C14.8946 21.4878 14.5122 21.1054 14.2725 20.635C14 20.1002 14 19.4001 14 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="group-hover:scale-105  ">{editId ? 'Edit':"Add"} Password</span>
          </button>
        </div>
      </div>

  <div className="passwords max-w-3xl pb-4 min-h-[calc(100vh-410px)] mx-auto px-1">
        <h2 className="font-bold text-xl text-center">Your Passwords </h2>
  {
    passwordArray.length===0 ? <div className=" text-red-500 text-center pt-16  sm:text-xl">Add some passwords</div> :<table className="table-auto  pt-2 rounded overflow-hidden w-full ">
    <thead className=" h-10  bg-green-800 text-white ">
      <tr>
        <th>Website</th> <th>Username</th> <th>Password</th> <th>Action</th>
      </tr>
    </thead>
    <tbody className="bg-green-200 text-xs md:text-base">
      { passwordArray.map((item)=>{
       return <tr key={item.id}   >
        <td className="py-2 border border-white text-center w-24"><a href={item.site} target="_blank" >{item.site} </a>  </td>
        <td className="py-2 border border-white text-center w-24">{item.username} <FontAwesomeIcon className="ml-4 cursor-pointer hover:scale-110" onClick={()=>copyText(item.username)} icon={faCopy} /> </td> 
         <td className="py-2 border border-white text-center w-24">{item.password} <FontAwesomeIcon className="ml-4 cursor-pointer hover:scale-110" onClick={()=>copyText(item.password)} icon={faCopy} /> </td>
         <td className="py-2 border border-white text-center w-24"> <FontAwesomeIcon icon={faPen} className="cursor-pointer"  onClick={()=>{elEdit(item.id)}} /> <FontAwesomeIcon className="ml-4 cursor-pointer" icon={faTrash} onClick={()=>{elDelete(item.id)}} />  </td>
      </tr>
      })}
     
    </tbody>
  </table>
  }
        
      </div>
    </>
  );
}
