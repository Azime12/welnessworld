/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdPerson,
  MdGroup,
  MdOutlineReport,
  MdAccountCircle,
  MdEdit,
  MdLock,
  MdLogout,
  MdSupervisorAccount,
  MdGroups,
  MdOutlineLocationCity,
  MdLocationCity,
  MdEventAvailable,
  MdEventNote,
} from "react-icons/md";
import {
  FiUser,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiClipboard,
  FiMap,
  FiBarChart2,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";
import { GoProjectSymlink } from "react-icons/go";
import {
  HiOutlineCollection,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { toggleSidebar } from "../../redux/slice/stateSlice";
import { selectUser } from "../../redux/slice/authSlice";
import Loading from "../others/Loading";
import {
  GiBossKey,
  GiFactory,
  GiQueenCrown,
  GiTeamDowngrade,
} from "react-icons/gi";
import { FaBullseye, FaPersonBurst } from "react-icons/fa6";
import { RiProfileFill, RiTeamFill } from "react-icons/ri";
import { FaChalkboardTeacher, FaCity, FaCrown, FaUsers } from "react-icons/fa";
import { BiCertification } from "react-icons/bi";

const SideBar = ({ onClose, isSidebarVisible }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.state.isSidebarOpen);

  const user = useSelector(selectUser);
  const { allowedRoles } = useSelector((state) => state.state);

  const userRole = user?.role;
  const navigate = useNavigate();

  console.log("user :", user);

  const Menus = [
    {
      title: t("dashboard"),
      icon: <MdDashboard size={24} />,
      path: t("/dashboard"),
      roles: ["Admin"],
    },
    {
      title: t("dashboard"),
      icon: <MdDashboard size={24} />,
      path: "/codersReport",
      roles: ["Sub-City Head", "Committee"],
    },
    {
      //FiBarChart2
      title: t("dashboard"),
      icon: <MdDashboard size={24} />,
      path: "/adminReport",
      roles: ["Sector Leader"],
    },
    {
      title: t("plan"),
      icon: <FaBullseye size={24} />,
      path: "/Plan",
      roles: ["Sector Leader"],
    },
    // {
    //   title: t("userInfo"),
    //   icon: <MdDashboard />,
    //   path: t("/userInfo"),
    //   roles: ["user"],
    // },
    {
      title: t("service"),
      icon: <GoProjectSymlink size={24} />,
      path: t("/service"),
      roles: ["Professional", "Group Leader"],
    },
    {
      title: t("professionalResult"),
      icon: <FaPersonBurst size={24} />,
      path: t("/professionalResult"),
      roles: ["Professional", "Group Leader"],
    },
    {
      title: t("groupResult"),
      icon: <GiTeamDowngrade size={24} />,
      path: t("/groupReport"),
      roles: ["Group Leader"],
    },
    {
      title: t("professions"),
      icon: <FiBriefcase size={24} />,
      path: "/professions",
      roles: ["Group Leader"],
    },
    {
      title: t("professionals"),
      icon: <FiUsers size={24} />,
      path: "/professionals",
      roles: ["Group Leader"],
    },
    {
      title: t("leaders"),
      icon: <HiOutlineUserGroup size={24} />,
      path: "/leaders",
      roles: ["Coordinator"],
    },
    {
      title: t("groups"),
      icon: <HiOutlineCollection size={24} />,
      path: "/groups",
      roles: ["Coordinator"],
    },
    {
      title: t("coordinatorReport"),
      icon: <FiBarChart2 size={24} />,
      path: "/coordinatorReport",
      roles: ["Coordinator"],
    },
    {
      title: t("subcityHeads"),
      icon: <FaUsers size={24} />,
      path: "/subcityHeads",
      roles: ["Admin"],
    },
    {
      title: t("subcities"),
      icon: <FaCity size={24} />,
      path: "/subcities",
      roles: ["Admin"],
    },
    // {
    //   title: t("sectorLeaders"),
    //   icon: <FaChalkboardTeacher />,
    //   path: "/sectorLeaders",
    //   roles: ["Sub-City Head"],
    // },
    {
      title: t("heads"),
      icon: <FaCrown size={24} />,
      path: "/heads",
      roles: ["Sub-City Head"],
    },
    {
      title: t("admins"),
      icon: <FaUsers size={24} />,
      path: "/sectors",
      roles: ["Sub-City Head"],
    },
    {
      title: t("Settingsside"),
      icon: <FiSettings />,
      path: "/settings",
      roles: ["Sub-City Head"],
    },
    // {
    //   title: t("publicServiceReport"),
    //   icon: <FiBarChart2 />,
    //   path: "/publicServiceReport",
    //   roles: ["Sub-City Head"],
    // },

    //
    // {
    //   title: t("divisionLeaders"),
    //   icon: <MdSupervisorAccount />,
    //   path: "/divisionLeaders",
    //   roles: ["Sector Leader"],
    // },
    // {
    //   title: t("divisions"),
    //   icon: <HiOutlineOfficeBuilding />,
    //   path: "/divisions",
    //   roles: ["Sector Leader"],
    // },
    // {
    //   title: t("sectorReport"),
    //   icon: <FiBarChart2 />,
    //   path: "/sectorReport",
    //   roles: ["Sector Leader"],
    // },
    {
      title: t("myCertificates"),
      icon: <BiCertification size={24} />,
      path: "/my-certificates",
      roles: ["Sub-City Head", "Sector Leader", "user"],
    },
    {
      title: t("manageCoders"),
      icon: <RiProfileFill size={24} />,
      path: "/profile-manage",
      roles: ["Sub-City Head", "Sector Leader"],
    },

    {
      title: t("postEvent"),
      icon: <MdEventAvailable size={24} />,
      path: "/postEvent",
      roles: ["Sector Leader", "Sub-City Head"],
    },
    {
      title: t("postedEvent"),
      icon: <MdEventNote size={24} />,
      path: "/postedEvent",
      roles: ["Sector Leader", "Sub-City Head"],
    },

    // {
    //   title: t("report"),
    //   icon: <FiBarChart2 />,
    //   path: "/headReport",Plan
    //   roles: ["Committee"],
    // },

    {
      title: t("profile"),
      icon: <FiUser size={24} />,
      //MdAccountCircle
      path: "/profile",
      roles: [
        "Sub-City Head",
        "Sector Leader",
        "Coordinator",
        "Group Leader",
        "Professional",
        "Admin",
        "user",
        "Committee",
      ],
    },
    {
      title: t("editProfile"),
      icon: <MdEdit />,
      path: "/editProfile",
      roles: [
        "Sub-City Head",
        "Sector Leader",
        "Coordinator",
        "Group Leader",
        "Professional",
        "Admin",
        "user",
        "Committee",
      ],
    },
    {
      title: t("changePassword"),
      icon: <MdLock />,
      path: "/changePassword",
      roles: [
        "Sub-City Head",
        "Sector Leader",
        "Coordinator",
        "Group Leader",
        "Professional",
        "Admin",
        "user",
        "Committee",
      ],
    },
    {
      title: t("Report"),
      icon: <FiBarChart2 />,
      path: "/report",
      roles: [
        // "Sub-City Head",
        // "Sector Leader",
        // "Coordinator",
        // "Group Leader",
        // "Professional",
        "Admin",
      ],
    },
    {
      title: t("logout"),
      icon: <MdLogout />,
      path: "/logout",
      roles: [
        "Sub-City Head",
        "Sector Leader",
        "Coordinator",
        "Group Leader",
        "Professional",
        "Admin",
        "user",
        "Committee",
      ],
    },
  ];

  const filteredMenus = Menus.filter((menu) => menu.roles.includes(userRole));
  useEffect(() => {
    if (!userRole || !Menus.some((menu) => menu.roles.includes(userRole))) {
      navigate("/login");
    }
  }, [userRole, navigate, Menus]);

  if (!userRole) {
    return <Loading />;
  }
  return (
    <div className="fixed z-50 flex h-full ">
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-primary h-screen p-5 pt-8 relative duration-300`}
      >
        {/* Sidebar toggle button */}
        <img
          src="/images/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-primary
           border-2 rounded-full ${
             !isSidebarVisible && !isSidebarOpen ? "hidden xl:flex" : "flex"
           } ${!isSidebarOpen && "rotate-180  "}  transition-all duration-300`}
          onClick={() => {
            dispatch(toggleSidebar());
            onClose && onClose(); // Close for smaller screens
          }}
        />

        {/* Logo Section */}
        <div className="flex items-center gap-x-4 cursor-pointer" 
        onClick={() => {
          navigate("/");}}
        >
          <img
            src="/images/addis_logo_circle.png"
            // src="/images/addis_logo.jpg"
            // src="/images/nfas.png"
            className={`cursor-pointer duration-500 xrounded-full ${
              isSidebarOpen ? "w-16 h-16" : "w-12 h-10"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !isSidebarOpen && "scale-0"
            }`}
          >
            {t("addisAbaba")}
          </h1>
        </div>

        {/* Menu Items */}
        <ul className="pt-4 max-h-[32rem] overflow-y-auto pb-12 scrollbar-hidden scroll-smooth">
          {filteredMenus.map((Menu, index) => (
            <li key={index}>
              <Link
                to={Menu.path}
                className={`flex items-center py-3 px-2 rounded-md text-sm gap-x-4 cursor-pointer ${
                  isSidebarOpen ? "" : "justify-center"
                }  
                ${
                  Menu.path === location.pathname
                    ? "bg-gray-100 hover:bg-white text-gray-600 font-semibold"
                    : "text-gray-100 hover:text-gray-600"
                } 
                ${
                  hoveredIndex === index
                    ? "bg-white text-gray-600 font-semibold"
                    : ""
                } 
                ${Menu.gap ? "mt-9" : "mt-2"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* React Icon */}
                <div className="text-xl">{Menu.icon}</div>
                <span
                  className={`${
                    !isSidebarOpen && "hidden"
                  } origin-left duration-200 text-sm font-semibold `}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

// add password reset form
// language
