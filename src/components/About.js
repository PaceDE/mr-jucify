import React from "react";
import "../css/about.css";

const About = () => {


  return (
    <div className="about-page">

      {/* About Us Section */}
      <section className="about-us">
        <div className="container">
          <div className="row" style={{ rowGap: "30px" }}>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <img src="/images/tomato.png" alt="Organic Tomato" />
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12">
              <h2>About Us</h2>
              <h1>Serving Organic Crop Since 1922</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                dapibus urna arcu, eu bibendum ante eleifend eu.
              </p>
              <i className="fa fa-check-circle">
                {" "}
                <span> With Love & Dedication</span>
              </i>
              <br />
              <i className="fa fa-check-circle">
                {" "}
                <span> The Best Trusted</span>
              </i>
              <br />
              <i className="fa fa-check-circle">
                {" "}
                <span> Farms In the World</span>
              </i>
              <p>Donec eu eleifend ex. Mauris et lectus velit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <embed
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "contain",
              }}
              src="https://www.youtube.com/embed/AlnHNi0hdO0"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <section className="video">
        <div className="items">
          <a
            href="/"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="play"
          >
            <i
              className="fa fa-play"
              style={{ fontSize: "30px", color: "#679509" }}
            ></i>
          </a>
          <h3>
            We Are Focused On Delivering Best Organic Food And User Experiences.
          </h3>
          <h4>
            Nullam ipsum libero, vulputate non tristique ac, ultrices quis
            ipsum.
          </h4>
          <a className="shop" href="shop.html">
            Shop Now
          </a>
        </div>
      </section>

      {/* Team Members */}
      <section className="team">
        <div className="heading">
          <p>Our Team Members</p>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            {["joker.jpg", "Meessii.jpg", "lollipop.jpg"].map((img, index) => (
              <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                <div className="card">
                  <div className="image-card">
                    <img src={`/images/${img}`} alt="Team Member" />
                    <div className="apps">
                      {["facebook", "twitter", "instagram"].map((social, i) => (
                        <a key={i} href="/" className="logo">
                          <i className={`fa fa-${social}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="detail">
                    <h4>Team Member {index + 1}</h4>
                    <p>Founder</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
