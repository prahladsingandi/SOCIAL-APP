import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import img from "../images/Gulbarga-University_logo.jpg";

const About = () => {
  let styles = {
    color: "orange",
    fontSize: "60px",
    fontWeight: "900"
  }
  let heading = {
    color: "orange",
  }
  return (
    <>
      <DefaultLayout>
        <div>
          <div className="justify-content-center pt-3 mt-3">
            <br />
            <br />
            <h1 style={styles}>GULBARGA <img src ={img} alt="GUG logo" style={{height: "150px", width:"150px" }}/> UNIVERSITY</h1>
            <h5 className="logotext">Post Graduation Center, Jnana Tunga Campus Yeragera, Raichur</h5><br />
            <h2 style={{color: "orange"}}>DEPARTMENT OF COMPUTER SCIENCE</h2>
          </div>
          <br />
          <br />
          <div
            style={{ textAlign: "left", padding: "40px", marginLeft: "60px" }}
            >
            <h3 className="logotext"> MAJOR PROJECT- Social app</h3><br />
              <h4>"Social app" is a React based web application.</h4>
            <h5 style={{ padding: "30px" }}>
                   A simple, fun & creative way to share photos with friends & family, and you can comment and like photos.<br />
                    The app allows users to upload photos, Posts can be shared publicly or with preapproved followers.
            </h5>
            <h4 style={heading}>Technologies used:</h4>
            <ol style={{fontSize: "15px"}}>
              <li>HTML</li>
              <li>JAVASCRIPT</li>
              <li>REACT</li>
              <li>NODE JS</li> 
              <li>MANGO DB</li>
              <li>POSTMAN</li>
            </ol>
            <br />
            <br />
            <h4 style={heading}>Packages used:</h4>
            <ol style={{fontSize: "17px"}}>
              <li>react-router-dom</li>
              <li>antd</li>
              <li>redux, react-redux, redux-thunk</li>
              <li>axios</li>
              <li>cloudinary</li>
            </ol>
          </div>
          <h4 style={heading}>The Guider for this Project</h4>
          <h5 style={{color: "purple"}}>Miss. Rekha Patil </h5><br /><br />
          <h4 style={heading}>Submitted by</h4>
          <h5 style={{color: "purple"}} className="mb-4">Prahlad <br /> IV Semester</h5><br />
        </div>
      </DefaultLayout>
    </>
  );
};

export default About;
