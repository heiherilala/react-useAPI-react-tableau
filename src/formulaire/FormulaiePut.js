import { useState, useEffect } from 'react';
import './styles.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function FormulairePut({donnee,boolMod,boolChanger,functionFermetur,idOfChang}) {
    const id_select = idOfChang;
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


    const formik = useFormik({
        initialValues: {
            name: JSON.stringify(donnee[id_select].name).replace("\"","").replace("\"",""),
            company: JSON.stringify(donnee[id_select].company.name).replace("\"","").replace("\"",""),
            email: JSON.stringify(donnee[id_select].email).replace("\"","").replace("\"",""),
            adresse: JSON.stringify(donnee[id_select].address.city).replace("\"","").replace("\"",""),
            phone: JSON.stringify(donnee[id_select].phone).replace("\"","").replace("\"","")
        },
        validationSchema: Yup.object({
            name: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
            company: Yup.string().max(25, "Must be 25 characters or less").required("Required"),
            email: Yup.string().email("Invalid email addresss`").required("Required"),
            adresse: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),

        }),
        onSubmit: (values) => {
            console.log(values);
            try {
                axios.put('https://jsonplaceholder.typicode.com/users/'+(id_select+1),
                {
                    name:values.name,                    
                    email:values.email,
                    phone:values.phone,
                    address:{
                        city:values.adresse}
                    ,
                    company:{
                        name:values.company}
                    }
                )  
                functionFermetur();
            } catch (error){
                console.log(error.response);
            }
        }

    });
    
    const donnee2 = JSON.stringify(donnee[id_select]);
    console.log("donnees2: "+donnee2);

    useEffect(() => {                
        boolChanger=true;

    },[formik.values])
    


    
       
    
    


    
    

    return (
        <>
            <div className='fondClic' onClick={functionFermetur}></div>
            <div className='fonds'>
                <div className='form_fonds'>
                    <button className='btn_cancel' onClick={functionFermetur}>X</button>
                    <h2>FORMULAIRE</h2>
                    <form action="" className='form_class' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Name</label>
                            <input
                                id="name"
                                type="text"
                                className="input_formulaire"
                                placeholder='Full Name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name ? <p> {formik.errors.name} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Adresse</label>
                            <input
                                id="adresse"
                                type="text"
                                className="input_formulaire"
                                placeholder='Adresse'
                                value={formik.values.adresse}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.adresse ? <p> {formik.errors.adresse} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Phone</label>
                            <input
                                id="phone"
                                type="text"
                                className="input_formulaire"
                                placeholder='Phone number'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.phone ? <p> {formik.errors.phone} </p> : null}
                        </div>                      
                        
                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Email</label>
                            <input
                                id="email"
                                type="text"
                                className="input_formulaire"
                                placeholder='Email address'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email ? <p> {formik.errors.email} </p> : null}
                        </div>

                        <div className='form_contenu'>
                            <label htmlFor="id" className='label_input'>Company</label>
                            <input
                                id="company"
                                type="text"
                                className="input_formulaire"
                                placeholder='Company name'
                                value={formik.values.company}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.company ? <p> {formik.errors.company} </p> : null}
                        </div>

                       

                        <button type='submit' className='btn_envoie btn_type'>Envoyer</button>
                    </form>
                </div>
            </div>

        </>

    );
}

export default FormulairePut;