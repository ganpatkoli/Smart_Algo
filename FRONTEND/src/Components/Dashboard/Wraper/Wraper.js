import React, { useState, useEffect, useRef } from 'react'
import Header from '../Header/Header'
import Footer from "../Footer/Footer"
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'
import ChatBox from '../../ExtraComponents/ChatBox'
import ThemeSelection from '../ThemeSwitcher/ThemeSelection/ThemeSelection'
import CreateTheme from '../ThemeSwitcher/CreateTheme/CreateTheme'
import Cookies from 'js-cookie'
import html2canvas from 'html2canvas';
import axios from 'axios';
import $ from "jquery";

const Wraper = () => {

  const pageRef = useRef(null);


  const [toggleChatBox, setToggleChatBox] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)


  const roles = JSON.parse(localStorage.getItem('user_role'))


  const [SetTheme, setSetTheme] = useState("")

  const ShowChatBox = () => {
    setToggleChatBox(!toggleChatBox)
  }

  const ShowSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }



  // ------ For Theme Selction ----


  const SelectTheme = (ThemeVersion, PrimaryColor, NavHeaderColor, HeaderColor, SidebarColor, Layout, Sidebar, HeaderPosition, SidebarPosition, Container, BodyFont) => {
    let themeOptionArr = {
      typography: BodyFont,
      version: ThemeVersion,
      layout: Layout,
      primary: PrimaryColor,
      headerBg: HeaderColor,
      navheaderBg: NavHeaderColor,
      sidebarBg: SidebarColor,
      sidebarStyle: Sidebar,
      sidebarPosition: SidebarPosition,
      headerPosition: HeaderPosition,
      containerLayout: Container,
      panel_name: "smartalgo",
      image: "smartalgo"
    };

  }





  const getColors = () => {

    axios.get("https://api.smartalgo.in:3001/smartalgo/get/theme").then((res) => {
      setSetTheme(res.data.data[0])
    }).catch((err) => {
      console.log("error", err);
    })

  }
  useEffect(() => {
    getColors()
  }, []);




  const themesToHide = [
    '.theme-1',
    '.theme-2',
    '.theme-3',
    '.theme-4',
    '.theme-5',
    '.theme-6',
    '.theme-7',
    '.theme-8'
  ];

  // Loop through each theme and set their display property to 'none'
  themesToHide.forEach(theme => {
    const elements = document.querySelectorAll(`body${theme}`);

    if (elements[0] !== undefined) {

      // console.log("`${elements}-dashboard`" , elements[0].classList[0]);
      $('body').attr('data-Dashboard', `${elements[0].classList[0]}-dashboard`);

    }

    // elements.forEach(element => {

    //   element.style.display = 'none';
    // });
  });



  // console.log("$('body')." , $(`body.theme-7`));


  // $('body').attr('data-Dashboard', "theme-2-dashboard");


  $('body').attr('data-typography', SetTheme && SetTheme.body_font);

  $('body').attr('data-theme-version', SetTheme && SetTheme.theme_version);

  //change the sidebar position controller

  SetTheme && SetTheme.header_position === "fixed" && $('body').attr('data-sidebar-style') === "modern" && $('body').attr('data-layout') === "vertical" ?
    alert("Sorry, Modern sidebar layout dosen't support fixed position!") :
    $('body').attr('data-sidebar-position', SetTheme && SetTheme.header_position);


  //change the header position controller
  $('body').attr('data-header-position', SetTheme && SetTheme.header_position);

  // //change the theme direction (rtl, ltr) controller

  // $('html').attr('dir', this.value);
  // $('html').attr('class', '');
  // $('html').addClass(this.value);
  // $('body').attr('direction', this.value);


  //change the theme layout controller

  if ($('body').attr('data-sidebar-style') === 'overlay') {
    $('body').attr('data-sidebar-style', 'full');
    $('body').attr('data-layout', SetTheme && SetTheme.layout);
    return;
  }
  $('body').attr('data-layout', SetTheme && SetTheme.layout);


  // ------------   change the container layout controller       ------------
  if (SetTheme && SetTheme.container === "boxed") {
    if ($('body').attr('data-layout') === "vertical" && $('body').attr('data-sidebar-style') === "full") {
      $('body').attr('data-sidebar-style', 'overlay');
      $('body').attr('data-container', SetTheme && SetTheme.container);

      setTimeout(function () {
        $(window).trigger('resize');
      }, 200);

      return;
    }
  }
  $('body').attr('data-container', SetTheme && SetTheme.container);


  //change the sidebar style controller

  if ($('body').attr('data-layout') === "horizontal") {
    if (SetTheme && SetTheme.sidebar === "overlay") {
      alert("Sorry! Overlay is not possible in Horizontal layout.");
      return;
    }
  }

  if ($('body').attr('data-layout') === "vertical") {
    if ($('body').attr('data-container') === "boxed" && SetTheme && SetTheme.sidebar === "full") {
      alert("Sorry! Full menu is not available in Vertical Boxed layout.");
      return;
    }

    if (SetTheme && SetTheme.sidebar === "modern" && $('body').attr('data-sidebar-position') === "fixed") {
      alert("Sorry! Modern sidebar layout is not available in the fixed position. Please change the sidebar position into Static.");
      return;
    }
  }

  $('body').attr('data-sidebar-style', SetTheme && SetTheme.sidebar);

  if ($('body').attr('data-sidebar-style') === 'icon-hover') {
    $('.deznav').on('hover', function () {
      $('#main-wrapper').addClass('iconhover-toggle');
    }, function () {
      $('#main-wrapper').removeClass('iconhover-toggle');
    });
  }


  // --------------- change the nav-header background controller ------------------------


  // $('input[name="navigation_header"]').on('click', function() {
  $('body').attr('data-nav-headerbg', SetTheme && SetTheme.nav_head_col);

  // });

  //change the header background controller
  // $('input[name="header_bg"]').on('click', function() {
  $('body').attr('data-headerbg', SetTheme && SetTheme.header_col);
  // setCookie('headerBg', this.value);
  // });

  //change the sidebar background controller
  // $('input[name="sidebar_bg"]').on('click', function() {
  $('body').attr('data-sibebarbg', SetTheme && SetTheme.sidebar_col);
  // setCookie('sidebarBg', this.value);
  // });

  //change the primary color controller
  // $('input[name="primary_bg"]').on('click', function() {
  $('body').attr('data-primary', SetTheme && SetTheme.primary_col);
  // setCookie('primary', this.value);
  // });





  const captureScreenshot = () => {

    // const options = {
    //   width: document.documentElement.scrollWidth, // Set custom width
    //   height: document.documentElement.scrollHeight, // Set custom height
    // };

    // // Set the window size and scroll position to match the content size
    // // window.resizeTo(width, height);
    // window.scrollTo(0, 0);

    // // Capture the screenshot
    // html2canvas(pageRef.current, options).then(canvas => {
    //   // Convert canvas to an image and download it
    //   const screenshot = canvas.toDataURL('image/png');
    //   const link = document.createElement('a');
    //   link.href = screenshot;
    //   link.download = 'screenshot.png';
    //   link.click();
    // })
  };



  return (
    < >
      <div id="main-wrapper" className={`${toggleSidebar ? "show menu-toggle" : ""}`}
      >

        <div >
          <Header ChatBox={ShowChatBox} ShowSidebar={ShowSidebar} />
          <Sidebar ShowSidebar={ShowSidebar} />
          {/* <Content /> */}
          {/* {roles === "SUPERADMIN" ? <> */}
            <ThemeSelection />
            <CreateTheme SelectTheme1={SelectTheme} />
          {/* </> : ""} */}
          <ChatBox toggleChat={toggleChatBox} />
          <Footer />

        </div>
        {/* <button className='d-flex mx-auto' style={{ marginTop: '70px' }} onClick={captureScreenshot}>Capture Screenshot</button> */}
      </div>


    </>
  )
}

export default Wraper