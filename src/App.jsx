import Navbar from "./Components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import {collection,doc,getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/firebase';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {RiEditCircleLine} from 'react-icons/ri';
import {IoMdTrash} from 'react-icons/io'
import ContactCard from "./Components/ContactCard";
import Model from "./Components/Model";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclouse();

   

   useEffect(() =>{
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db,"contact");
       
        onSnapshot(contactsRef,(snapshot)=>{

          const contactList = snapshot.docs.map((doc) =>{
            return{
              id:doc.id,
              ...doc.data()
            }
  
          });
          setContacts(contactList);
         return contactList;
        });
        
      } catch (error) {
        console.log(error);
      }
    };

    //call
    getContacts();

   },[]);



   const filterContacts = (e)=>{
    const value = e.target.value;

    const contactsRef = collection(db,"contact");
       
    onSnapshot(contactsRef,(snapshot)=>{

      const contactList = snapshot.docs.map((doc) =>{
        return{
          id:doc.id,
          ...doc.data()
        }

      });

      const filteredContacts = contactList.filter(contact=>
        contact.name.toLowerCase().includes(value.toLowerCase()))



      setContacts(filteredContacts);
     return filteredContacts;
    });

   }

  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className=" relative flex items-center flex-grow">
          <FiSearch className=" absolute ml-1 text-3xl text-white" />
          <input
          onChange={filterContacts}
            type="text"
            className=" flex-grow h-10 border bg-transparent pl-10 text-white border-white rounded-md "
          />
        </div>
        
          <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer"/>
        
      </div>
   <div className="mt-4 flex flex-col gap-3">

    {contacts.map((contact) => (
      <ContactCard key={contact.id} contact={contact}/>

    ) )}
  </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
  <ToastContainer position="bottom-center"/>
  <filteredContacts/>
    </>
  );
};

export default App;
