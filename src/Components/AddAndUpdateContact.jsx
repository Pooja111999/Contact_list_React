import { ErrorMessage, Field,  Form,  Formik } from "formik"
import Model from "./Model"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "Yup";

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Email is Required"),
    email:Yup.string(). email("Invalid Email").required("Email is Required"),
})



const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {
   //add
    const addContact = async (contact) =>{
        try {
            const contactRef = collection(db, "contact");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Succesfully");

        } catch (error) {
            console.log(error);
        }
    };

    //update

    const updateContact = async (contact,id) =>{
        try {
            const contactRef = doc(db, "contact", id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Succesfully");

        } catch (error) {
            console.log(error);
        }
    };





  return (
    <div>
            <Model isOpen={isOpen}  onClose={onClose}>
                <Formik 
                validationSchema={contactSchemaValidation}
                initialValues={ isUpdate 
                    ? {
                        name: contact.name,
                        email: contact.email,
                    }
                     : {
                     
                        name: "",
                        email: "",
                    }}
                onSubmit={(values) =>{
                    console.log(values);
                    isUpdate ?
                    updateContact(values,contact.id):
                    addContact(values);
                }}
                
                >
                    <Form className=" flex flex-col gap-3 " >

                       <div className="flex flex-col gap-1">
                       <label htmlFor="name">Name</label>
                        <Field name = "name" className="h-10 border"/>
                         <div className="text-xs  text-red-500">
                            <ErrorMessage name = "name"/>

                         </div>

                       </div>

                       <div className="flex flex-col gap-1">
                       <label htmlFor="email">Email</label>
                        <Field  name = "email" className=" h-10 border"/>
                        <div className="text-xs  text-red-500">
                            <ErrorMessage name = "email"/>

                         </div>
                       </div>

               <button className= " border bg-orange px-3 py-1.5 self-end">
                {isUpdate ? "update":"add"} Contact
               </button>

                    </Form>
                </Formik>
                
            </Model>
    </div>
  );
};

export default AddAndUpdateContact
