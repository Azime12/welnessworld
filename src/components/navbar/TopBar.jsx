import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Modal, Box, MenuItem, Select, Badge } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";
import { MdAccountCircle, MdEdit, MdLock, MdLogout } from "react-icons/md";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditProfile from "../dashboard/Coordinator/EditCooProfile";
import PasswordChange from "../dashboard/Coordinator/PasswordChange";
import { logout, selectUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  closeProfileModal,
  openProfileModal,
  closeEditProfileModal,
  openEditProfileModal,
  openPasswordChange,
  closePasswordChange,
} from "../../redux/slice/userSlice";
import CoordinatorProfile from "../dashboard/Coordinator/CoordinatorProfile";
import { useGetUserDataQuery } from "../../redux/api/userApiSlice";
import Loading from "../others/Loading";
import { useGetProfileByPhoneQuery } from "../../redux/api/userProfileApiSlice";
import Notification from "../others/NotIfication/Notification";
import { selectTotalNotifications } from "../../redux/slice/stateSlice";

function TopBar({ onMenuClick, isSidebarVisible, isMobileOrTablet }) {
  const { i18n, t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const user = useSelector(selectUser);
  const { isSidebarOpen } = useSelector((state) => state.state);
  const totalLeaderUnreadCount = useSelector(selectTotalNotifications);
  // const totalLeaderUnreadCount = 2;
  const { isProfileModalOpen, isEditProfileModalOpen, isPasswordChangeOpen } =
    useSelector((state) => state.user);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { data, error, isLoading } = useGetUserDataQuery();
  // const { data:profile, errorProfile, isLoadingProfile } = useGetProfileByPhoneQuery({phone_Number: user?.phone_number})
  const {
    data: profile,
    errorProfile,
    isLoadingProfile,
  } = useGetProfileByPhoneQuery(user?.phone_number);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }

  const photo = profile?.data?.profilePhoto || null;
  // profile check temp open
  // if (errorProfile) {
  //   return (
  //     <div>
  //       Error: {errorProfile?.data?.message || "Failed to fetch profile."}
  //     </div>
  //   );
  // }

  // if (!profile) {
  //   return <div>No profile data found.</div>;
  // }
  // if (isLoading || isLoadingProfile) {
  //   return <Loading />;
  // }
  // console.log("User phone number:", user?.phone_number);
  // console.log("profile: ", profile);
  // profile check temp close

  // console.log("top ", data);

  // noti
  const handleOpenNotifMenu = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };
  // noti

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenProfile = () => {
    dispatch(openProfileModal());
    handleCloseUserMenu();
  };

  const handleOpenEditProfile = () => {
    dispatch(openEditProfileModal());
    handleCloseUserMenu();
  };

  const handleOpenPasswordChange = () => {
    dispatch(openPasswordChange());
    handleCloseUserMenu();
  };

  const handleCloseEditProfile = () => {
    dispatch(closeEditProfileModal());
  };

  const handleCloseProfile = () => {
    //close Profile
    dispatch(closeProfileModal());
    // setOpenProfile(false);
  };

  const handlePasswordChangeClose = () => {
    dispatch(closePasswordChange());
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are successfully Loged out");
    navigate("/login");
    handleCloseUserMenu();
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage); // Persist language preference
  };

  const settings = [
    {
      title: t("viewProfile"),
      onClick: handleOpenProfile,
      icon: <MdAccountCircle size={20} className="mr-2" />,
    },
    {
      title: t("editProfile"),
      onClick: handleOpenEditProfile,
      icon: <MdEdit size={20} className="mr-2" />,
    },
    {
      title: t("changePassword"),
      onClick: handleOpenPasswordChange,
      icon: <MdLock size={20} className="mr-2" />,
    },
    {
      title: t("logout"),
      onClick: handleLogout,
      icon: <MdLogout size={20} className="mr-2" />,
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        width: isMobileOrTablet
          ? isSidebarOpen || isSidebarVisible
            ? "calc(100% - 5rem)"
            : "100%"
          : isSidebarOpen
          ? "calc(100% - 18rem)"
          : "calc(100% - 5rem)",
        ml: isMobileOrTablet
          ? isSidebarOpen || isSidebarVisible
            ? "5rem"
            : "0"
          : isSidebarOpen
          ? "18rem"
          : "5rem",
        transition: "all 0.3s ease",
        zIndex: 30,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* {isSidebarVisible ? (
            <IoMdClose
              className={`text-4xl xl:hidden cursor-pointer transform transition-all duration-300 ease-in-out scale-100 opacity-100 ${
                !isSidebarVisible && "scale-90 opacity-0"
              }`}
              onClick={onMenuClick}
            />
          ) : (
            <IoMdMenu
              className={`text-4xl xl:hidden cursor-pointer transform transition-all duration-300 ease-in-out scale-100 opacity-100 ${
                isSidebarVisible && "scale-90 opacity-0"
              }`}
              onClick={onMenuClick}
            />
          )} */}
          <div className="xl:hidden">
            <IconButton
              onClick={onMenuClick}
              className="hidden text-6xl xl:hidden"
            >
              {isSidebarVisible ? (
                <IoMdClose
                  className={`text-2xl md:text-3xl xl:hidden transform transition-all duration-300 ease-in-out scale-100 opacity-100 ${
                    !isSidebarVisible && "scale-90 opacity-0"
                  }`}
                />
              ) : (
                <IoMdMenu
                  className={`text-2xl md:text-3xl xl:hidden cursor-pointer transform transition-all duration-300 ease-in-out scale-100 opacity-100 ${
                    isSidebarVisible && "scale-90 opacity-0"
                  }`}
                />
              )}
            </IconButton>
          </div>

          <img
            src="/images/ict_logo.jpg"
            // src="/images/ictlogo.jpg"
            alt="nfas"
            className="Xp-2  mr-2 size-16 rounded-xl "
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
            }}
            className="font-bold text-primary "
          >
            {/* {t("office")} */}
            {data?.data?.subcity_name ||
              data?.data?.sector_name ||
              data?.data?.Sector?.sector_name ||
              data?.data?.Division?.Sector?.sector_name ||
              data?.data?.Group?.Division?.Sector?.sector_name ||
              (user?.role == "Admin" ? "Admin" : "") ||
              `${isSidebarOpen ? t("aaTitle") : t("aaTitleLong")}`}
          </Typography>

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1 }}></Box>

          <MdOutlineLanguage
            onChange={handleLanguageChange}
            className="mr-[-21px] text-primary opacity-75  hover:opacity-90  "
          />
          <Select
            value={language}
            onChange={handleLanguageChange}
            size="small"
            sx={{
              pl: 1.5,
              mr: 2,
              minWidth: 120,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db", // Set border color to green
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00A86B",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#22a55e",
                borderBlockWidth: 1,
              },
            }}
            className=" hover:border-green-300 text-primary"
          >
            <MenuItem color="success" value="en" className="text-primary">
              English
            </MenuItem>
            <MenuItem value="am">አማርኛ</MenuItem>
          </Select>
          <div className=" mr-4">
            {user?.role == "Sub-City Head" ? (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleOpenNotifMenu}
              >
                <Badge badgeContent={totalLeaderUnreadCount} color="error">
                  <NotificationsIcon className="text-gray-700" />
                </Badge>
              </IconButton> //
            ) : (
              ""
            )}
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                className="relative inline-block "
              >
                <div className="border-2 border-teal-600 bg-primary rounded-full">
                  <Avatar
                    alt={`${user.first_name}`}
                    src={photo || "/static/images/avatar/2.jpg"}
                    sx={{
                      bgcolor: "#018383",
                      // fontSize: "1.5rem",
                    }}
                    className="v border-2 -teal-600"
                  />
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-teal-700"></span>
                </div>{" "}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  <div className="flex items-center">
                    <span className="text-primary"> {item.icon}</span>
                    <Typography textAlign="center">{item.title}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Modal
        open={isProfileModalOpen}
        onClose={handleCloseProfile}
        aria-labelledby="view-profile-modal"
        aria-describedby="view-profile-modal-description"
      >
        <Box className="max-w-md mx-auto mt-20 rounded-md shadow-lg h-fit bg-primary">
          <CoordinatorProfile handleClose={handleCloseProfile} />
        </Box>
      </Modal>

      <Modal
        open={isEditProfileModalOpen}
        onClose={handleCloseEditProfile}
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-profile-modal-description"
      >
        <Box className="max-w-md mx-auto mt-16 rounded-md shadow-lg h-fit bg-primary">
          <EditProfile handleClose={handleCloseEditProfile} />
        </Box>
      </Modal>

      <Modal
        open={isPasswordChangeOpen}
        onClose={handlePasswordChangeClose}
        aria-labelledby="password-change-modal"
        aria-describedby="password-change-modal-description"
      >
        <Box className="mx-auto mt-20 rounded-md shadow-lg w-fit h-fit bg-primary">
          <PasswordChange handleClose={handlePasswordChangeClose} />
        </Box>
      </Modal>
      {user?.role === "Sub-City Head" ? (
        <Notification
          anchorEl={anchorElNotif}
          onClose={handleCloseNotifMenu}
          isLeaderView={true} // Optional prop for custom behavior
        />
      ) : (
        ""
      )}
    </AppBar>
  );
}

export default TopBar;
