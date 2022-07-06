import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EmployeeList } from "./components/List";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import axios from 'axios';
import FormulairePut from "./formulaire/FormulaiePut.js"
import FormulairePost from "./formulaire/FormulaiePost.js"

function App() {

  const [list, setList] = useState([]);
  const [modif, setModif] = useState(false);
  const [modifPost, setModifPost] = useState(false);
  const [Changer, setChanger] = useState(true);
  const [idNow, setIdNow] = useState(1);

  const chageId = (value)=>{
    if (value==0) {
      setIdNow(0);
    }else{
      setIdNow(value);
    }
    console.log(idNow);
  }


  useEffect(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/users"
    })
      .then(response => {
        setList(response.data);
      })
      .catch(error => {

      });
  }, [setList]);



  const employees = list;

  const [sidebarClass, setSidebarClass] = useState("sb-nav-fixed");

  function toggleSidebarClass() {
    setSidebarClass(
      sidebarClass.includes("toggled")
        ? "sb-nav-fixed"
        : "sb-nav-fixed sb-sidenav-toggled"
    );
  }

  function modification() {    
    setModif(modif==false);
    setChanger(false);
  }

  function modificationPost() {    
    setModifPost(modifPost==false);
  }

  return (
    <div className={sidebarClass}>
      <Navbar toggleSidebarClass={toggleSidebarClass} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Tables</h1>
              <Breadcrumb />
              <Card>
                DataTables is a third party plugin that is used to generate the
                demo table below. For more information about DataTables, please
                visit the
                <a target="_blank" href="https://datatables.net/">
                  official DataTables documentation
                </a>
                .
              </Card>
              <Card title="DataTable Example">
                <EmployeeList items={employees} functionChangID={chageId} functionFermetur={modification} functionFermeturPost={modificationPost}/>
              </Card>
            </div>
          </main>
          <Footer />
        </div>
      </div>


      {modif ? <FormulairePut donnee={employees} boolMod={modif} boolChanger={true} functionFermetur={modification} idOfChang={idNow}/> : <div></div>}
      {modifPost ? <FormulairePost donnee={employees} boolMod={modifPost} boolChanger={false} functionFermetur={modificationPost} idOfChang={false}/> : <div></div>}
      
    </div>
  );
}
export default App;
