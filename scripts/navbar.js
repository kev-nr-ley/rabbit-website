const navLinks = [
  {
    name: "Home",
    href: "./#home",
    icon: "fa-solid fa-home",
  },

  {
    name: "About",
    href: "./#about",
    icon: "fa-solid fa-user",
  },
  {
    name: "Contact",
    href: "./#contact",
    icon: "fa-regular fa-envelope",
  },
  {
    name: "Shop",
    href: "shop.html",
    icon: "fa-solid fa-bag-shopping",
  },

];
const header = document.getElementById("header");

function createNavLinks() {
  const navList = document.createElement("ul");
  navList.classList.add("nav-list");
  navLinks.forEach((navLink) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("header-link");
    a.href = navLink.href;
    const i = document.createElement("i");
    i.classList.add("header-icon");
    const span = document.createElement("span");
    span.classList.add("header-name");
    span.innerText = navLink.name;
    a.appendChild(i);
    a.appendChild(span);
    li.appendChild(a);
    navList.appendChild(li);


  });

  return navList;
}

function createNavbar() {
  const nav = document.createElement("nav");
  nav.appendChild(createNavLinks());
  return nav;
}

function createLogo() {
  const logoLink = document.createElement("a");
  logoLink.href = "./index.html";
  logoLink.classList.add("logo-link");

  const logo = document.createElement("i");
  logo.classList.add("logo");
  logo.innerHTML = `<i class="fa-solid fa-dragon"></i>`;
  logoLink.appendChild(logo);
  return logoLink;


  // logo.innerHTML = `<i class="fa-solid fa-dragon"></i>`
}

function initHeader() {
  header.appendChild(createLogo());
  header.appendChild(createNavbar());
}

initHeader();
// header.appendChild(createLogo());
// header.appendChild(createNavbar());
