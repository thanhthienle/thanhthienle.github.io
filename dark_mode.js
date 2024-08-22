function set_theme() {
   let tog = document.getElementById("color_toggle");
   if (window.localStorage.getItem("dark") == "true") {
      document.body.style.background = "#313131";
      document.body.style.color = "#f0f0f0";
      if (tog) tog.innerText = "Light mode";
   }
   else {
      document.body.style.background = "#ffffff";
      document.body.style.color = "#000000";
      if (tog) tog.innerText = "Dark mode";
   }
}

function toggle_dark() {
   if (window.localStorage.getItem("dark") == "true") 
      window.localStorage.setItem("dark", "false");
   else window.localStorage.setItem("dark", "true");

   set_theme();
}

window.addEventListener("load", () => {
   if (window.localStorage.getItem("dark") == null) {
      window.localStorage.setItem("dark", "false");
   }
   // set theme accordingly
   set_theme();
   document.getElementById("blocker").style.opacity = 0;
}, true);