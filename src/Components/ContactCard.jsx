import { deleteDoc, doc } from "firebase/firestore"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db } from "../config/firebase"
import AddAndUpdateContact from "./AddAndUpdateContact"
import { useState } from "react"
import useDisclouse from "../hooks/useDisclouse"
import { toast } from "react-toastify"


const ContactCard = ({contact}) => {

  const {isOpen, onClose, onOpen} = useDisclouse();



   //delete
    const deleteContact = async(id)=>{
        try {
            await deleteDoc(doc(db,"contact",id))
            toast.success("Contact Deleted Successfully");
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <>
    <div>
       <div key = {contact.id} 
    className="bg-yellow flex  justify-around items-center  rounded-lg p-2">
    <div className="flex gap-1">
   <HiOutlineUserCircle className="text-orange text-4xl" />
      <div className=" ">
        <h1  className="font-medium">{contact.name}</h1>
        <p className="text-sm">{contact.email}</p>
      </div>
    </div>

  
      <div className="flex text-3xl">
        <RiEditCircleLine onClick={onOpen} className=" cursor-pointer"/>
        <IoMdTrash onClick={() =>deleteContact(contact.id)} className="text-orange cursor-pointer"/>
      </div>
    </div>
    
    </div>
    <AddAndUpdateContact 
    contact={contact} 
    isUpdate 
    isOpen={isOpen}
     onClose={onClose}/>
    </>
  )
}

export default ContactCard
