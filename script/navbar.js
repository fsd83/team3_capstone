// Centralized Navigation Bar Management

class NavigationBar {
    constructor() {
        this.navbarContainer = null;
        
        // create an array of links used on the site
        this.siteURLs = [
            {name: "Home", url: "index.html", isActive: true},
            {name: "About us", url: "about.html", isActive: true},
            {name: "Contact us", url: "contact.html", isActive: true},
            {name: "Work with us", url: "partnership.html", isActive: false},
            
            
        ];
    }

    // Create the entire navigation bar
    createNavBar() {
        // Create the main navbar container
        this.navbarContainer = document.createElement("nav");
        this.navbarContainer.className = "navbar navbar-dark navbar-expand-lg bg-body-tertiary top-nav";

        // Create the container-fluid div
        const containerFluid = document.createElement("div");
        containerFluid.className = "container-fluid align-content-center";

        // Logo and Brand
        const navbarBrand = this.createNavbarBrand();
        
        // Toggler button for mobile view
        const navbarToggler = this.createNavbarToggler();
        
        // Collapsible content
        const navbarCollapse = this.createNavbarCollapse();

        // Assemble the navbar
        containerFluid.appendChild(navbarBrand);
        containerFluid.appendChild(navbarToggler);
        containerFluid.appendChild(navbarCollapse);
        this.navbarContainer.appendChild(containerFluid);

        return this.navbarContainer;
    }

    // Navbar Brand (Logo and Company Name)
    createNavbarBrand() {
        const brandContainer = document.createElement("a");
        brandContainer.className = "navbar-brand";
        brandContainer.href = "index.html";


       const logoImg = document.createElement("img");
        logoImg.src ="../img/weblogo_cus.png";
        logoImg.alt = "Company Logo";
        logoImg.width = "150";
        logoImg.className = "fix-column align-text-center";     
  

        brandContainer.appendChild(logoImg);
        brandContainer.appendChild(document.createTextNode("KampongShare"));

        return brandContainer;
    }

    // Navbar Toggler for Mobile View
    createNavbarToggler() {
        const toggler = document.createElement("button");
        toggler.className = "navbar-toggler";
        toggler.type = "button";
        toggler.setAttribute("data-bs-toggle", "collapse");
        toggler.setAttribute("data-bs-target", "#navbarSupportedContent");
        toggler.setAttribute("aria-controls", "navbarSupportedContent");
        toggler.setAttribute("aria-expanded", "false");
        toggler.setAttribute("aria-label", "Toggle navigation");

        const togglerIcon = document.createElement("span");
        togglerIcon.className = "navbar-toggler-icon";
        toggler.appendChild(togglerIcon);

        return toggler;
    }

    // Collapsible Navbar Content
    createNavbarCollapse() {
        const collapseContainer = document.createElement("div");
        collapseContainer.className = "collapse navbar-collapse";
        collapseContainer.id = "navbarSupportedContent";

        // Navigation Menu Items
        const navMenu = this.createNavMenu();
        
        // Search Form
        const searchForm = this.createSearchForm();
        
        // Right Side Navigation (Icons and Buttons)
        const rightNavigation = this.createRightNavigation();

        collapseContainer.appendChild(navMenu);
        collapseContainer.appendChild(searchForm);
        collapseContainer.appendChild(rightNavigation);

        return collapseContainer;
    }

    // Navigation Menu Items
    createNavMenu() {
        const navList = document.createElement("ul");
        navList.className = "navbar-nav me-auto mb-2 mb-lg-0";    

        const navArr = [];  // create an array to store each item created by function createNavItem()

        this.siteURLs.forEach((item) => {
            navArr.push(this.createNavItem(item.name, item.url, item.isActive)); // push each item into navArr returned by createNavItem()
        });   


        // Catalogues Dropdown
        const cataloguesItem = this.createDropdownNavItem("Catalogues", [
            { text: "Appliances", href: "appliance.html#" },
            { text: "Fashion", href: "fashion.html" },
            { text: "Others", href: "others.html"},
            { text: "Misc.", href: "misc.html"},
            { isDivider: true },
            { text: "Something else here", href: "#" }
        ]);

        navList.append(...navArr, cataloguesItem); // unwrap the elements to be used by navList


        return navList;
    }

    // Helper method to create individual nav items
    createNavItem(text, href, isActive = false) {
        const listItem = document.createElement("li");
        listItem.className = "nav-item";

        const link = document.createElement("a");
        link.className = `nav-link${isActive ? ' active' : ''}`;
        link.href = href;
        //if (isActive) link.setAttribute("aria-current", "page");
        if (!isActive) link.style.display = "none";
        link.textContent = text;

        listItem.appendChild(link);
        return listItem;
    }

    // Helper method to create dropdown nav items
    createDropdownNavItem(text, dropdownItems) {
        const listItem = document.createElement("li");
        listItem.className = "nav-item dropdown";

        const dropdownToggle = document.createElement("a");
        dropdownToggle.className = "nav-link dropdown-toggle";
        dropdownToggle.href = "#";
        dropdownToggle.role = "button";
        dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
        dropdownToggle.setAttribute("aria-expanded", "false");
        dropdownToggle.textContent = text;

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.className = "dropdown-menu";

        dropdownItems.forEach(item => {
            if (item.isDivider) {
                const divider = document.createElement("li");
                const hr = document.createElement("hr");
                hr.className = "dropdown-divider";
                divider.appendChild(hr);
                dropdownMenu.appendChild(divider);
            } else {
                const dropdownItem = document.createElement("li");
                const link = document.createElement("a");
                link.className = "dropdown-item";
                link.href = item.href;
                link.textContent = item.text;
                dropdownItem.appendChild(link);
                dropdownMenu.appendChild(dropdownItem);
            }
        });

        listItem.appendChild(dropdownToggle);
        listItem.appendChild(dropdownMenu);

        return listItem;
    }

    // Search Form
    createSearchForm() {
        const formContainer = document.createElement("form");
        formContainer.className = "d-flex align-content-center";
        formContainer.role = "search";

        const searchInput = document.createElement("input");
        searchInput.className = "form-control me-2";
        searchInput.type = "search";
        searchInput.placeholder = "Search";
        searchInput.setAttribute("aria-label", "Search");

        const searchButton = document.createElement("button");
        searchButton.className = "btn";
        searchButton.type = "submit";
        searchButton.textContent = "Search";

        formContainer.appendChild(searchInput);
        formContainer.appendChild(searchButton);

        return formContainer;
    }

    // Create Right Side Navigation (Icons and Buttons)
    createRightNavigation() {
        const rightNavContainer = document.createElement("div");

        // Notification Bell Icon
        const bellIcon = this.createSVGIcon(
            'http://www.w3.org/2000/svg', 
            '0 0 16 16', 
            'M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6',
            25, 25
        );

        // User Profile Icon
        const userIcon = this.createSVGIcon(
            'http://www.w3.org/2000/svg', 
            '0 0 16 16', 
            'M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1',
            30, 30, 
            ['M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1']
        );

        // Sign Up Button
        const signupButton = this.createButton("Sign-up", "register.html");

        // Login Button
        const loginButton = this.createButton("Login", "login.html");

        // Append all elements
        rightNavContainer.append(bellIcon, userIcon, signupButton, loginButton);

        return rightNavContainer;
    }

    // Helper method to create SVG Icons
    createSVGIcon(xmlns, viewBox, pathData, width = 25, height = 25, additionalPaths = []) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", xmlns);
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("viewBox", viewBox);
        svg.classList.add("bi");

        // Create path(s)
        const createPath = (d) => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('d', d);
            return path;
        };

        const mainPath = createPath(pathData);
        svg.appendChild(mainPath);

        // Add any additional paths
        additionalPaths.forEach(pathD => {
            const additionalPath = createPath(pathD);
            svg.appendChild(additionalPath);
        });

        return svg;
    }

    // Helper method to create buttons
    createButton(text, href) {
        const buttonLink = document.createElement("a");
        buttonLink.href = href;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.textContent = text;

        buttonLink.appendChild(button);
        return buttonLink;
    }

    // Method to inject the navbar into a specific container
    injectNavbar(containerId = "navbar-container") {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = ""; // Clear any existing content
            container.appendChild(this.createNavBar());
        } else {
            console.error("Container with id ${containerId} not found");
        }
    }
}

// Usage Example
document.addEventListener("DOMContentLoaded", () => {
    const navbarManager = new NavigationBar();
    navbarManager.injectNavbar();
});

// Optional: Highlight current page in navigation
function highlightCurrentPage() {
    const currentLocation = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}

// Call this function after navbar injection
document.addEventListener("DOMContentLoaded", highlightCurrentPage);
