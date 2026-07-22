import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import API, { IMAGE_URL } from "../src/Api/axios";


export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {


  const navigate = useNavigate();


  const [openProfile, setOpenProfile] = useState(false);


  const [profile, setProfile] = useState({
    name: "Admin User",
    avatar: "",
    role: "Administrator",
  });



  // ==========================
  // FETCH PROFILE FROM MONGO DB
  // ==========================

  useEffect(() => {

    getProfile();

  }, []);



  const getProfile = async () => {

    try {


      const res = await API.get("/profile");


      console.log(
        "Navbar Profile Data:",
        res.data
      );


      if (res.data.success) {

        setProfile(res.data.data);

      }


    } catch (error) {

      console.log(
        "Navbar Profile Error:",
        error
      );

    }

  };





  // ==========================
  // AVATAR URL
  // ==========================

  const getAvatar = () => {


    if (!profile.avatar) {

      return "https://i.pravatar.cc/100";

    }



    if (
      profile.avatar.startsWith("http")
    ) {

      return profile.avatar;

    }



    return `${IMAGE_URL}${profile.avatar}`;


  };





  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {


    localStorage.removeItem(
      "adminAuth"
    );


    localStorage.removeItem(
      "adminUser"
    );


    navigate("/login");


  };





  return (

    <header className="admin-navbar">


      {/* LEFT SIDE */}

      <div className="navbar-left">


        <button

          className="menu-btn"

          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }

        >

          <FaBars />

        </button>



        <h2 className="navbar-title">

          Admin Dashboard

        </h2>


      </div>





      {/* RIGHT SIDE */}


      <div className="navbar-profile">


        <img

          src={getAvatar()}

          alt="profile"

          className="profile-img"


          onClick={() =>
            setOpenProfile(!openProfile)
          }


        />





        {
          openProfile && (

            <div className="profile-dropdown">


              <div className="profile-info">

                <h4>
                  {profile.name}
                </h4>


                <span>
                  {profile.role}
                </span>


              </div>





              <button

                className="dropdown-item"

                onClick={() => {

                  navigate(
                    "/admin/profile"
                  );

                  setOpenProfile(false);

                }}

              >

                <FaUser />

                Profile


              </button>





              <button

                className="dropdown-item"

                onClick={() => {

                  navigate(
                    "/admin/settings"
                  );

                  setOpenProfile(false);

                }}

              >

                <FaCog />

                Settings


              </button>






              <button

                className="dropdown-item logout"

                onClick={handleLogout}

              >

                <FaSignOutAlt />

                Logout


              </button>



            </div>

          )
        }



      </div>



    </header>

  );

}