// Centralized Navigation Bar Management

class NavigationBar {
    constructor() {
        this.navbarContainer = null;
        
        // create an array of links used on the site
        this.siteURLs = [
            {name: _HOME_TITLE, url: _HOME_URL, isActive: true},
            {name: _ABOUT_TITLE, url: _ABOUT_URL, isActive: true},
            {name: _CONTACT_TITLE, url: _CONTACT_URL, isActive: true},
            {name: _PARTNERSHIP_URL, url: _PARTNERSHIP_URL, isActive: false},
                        
        ];
    }

    // Create the entire navigation bar
    createNavBar() {
        // Create the main navbar container
        this.navbarContainer = document.createElement("nav");
        this.navbarContainer.className = "navbar navbar-dark navbar-expand-lg bg-body-tertiary top-nav fixed-top";

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
        logoImg.src ="/img/logo-version5.png";
        logoImg.alt = "Company Logo";
        logoImg.width = "200";
        logoImg.className = "fix-column align-text-center";     
  

        brandContainer.appendChild(logoImg);

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
            { text: _APPLIANCE_TITLE, href: _APPLIANCE_URL },
            { text: _FASHION_TITLE, href: _FASHION_URL },
            { text: _OTHERS_TITLE, href: _OTHERS_URL},
        ]);

        // unwrap the elements to be used by navList
        navList.append(...navArr, cataloguesItem); 

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
        searchButton.style.marginRight = _RIGHT_NAV_BTN;

        formContainer.appendChild(searchInput);
        formContainer.appendChild(searchButton);

        return formContainer;
    }

    // Create Right Side Navigation (Icons and Buttons)
    createRightNavigation() {
        const rightNavContainer = document.createElement("div");

        
        const token = isAuthenticated();    // isAuthenticated returns a token from browser localStorage
        
        if(token){                          // user is logged in
            
            // Notification Bell Icon
            const bellIcon = this.createSVGIcon(
                'http://www.w3.org/2000/svg', 
                '0 0 16 16', 
                'M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6',
                25, 25
            );
    
            bellIcon.style.marginRight = _RIGHT_NAV_BTN;
            bellIcon.style.color = "#fff";
            
            // User Profile Icon
            const userIcon = this.createSVGIcon(
                'http://www.w3.org/2000/svg', 
                '0 0 16 16', 
                'M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1',
                30, 30, 
                ['M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1']
            );
            userIcon.style.marginRight = _RIGHT_NAV_BTN;
            
            const anchorUserProfile = document.createElement("a");
            anchorUserProfile.href = _PROFILE_URL;
            anchorUserProfile.style.color = "#fff";
            anchorUserProfile.append(userIcon);

            // Logout button
            const logoutButton = this.createButton(_LOGOUT_TITLE, _LOGOUT_URL);
            logoutButton.style.marginRight = _RIGHT_NAV_BTN;

            // call the logout function from auth.js
            logoutButton.addEventListener("click", () => {
                // call logout function from auth.js
                logout();
            })

            // Append icons that user should see if logged in
            rightNavContainer.append(bellIcon, anchorUserProfile, logoutButton);
        }else{

            // Sign Up Button
            const signupButton = this.createButton(_SIGNUP_TITLE, _SIGNUP_URL);
            // signupButton.style = btn-outline-warning;
            signupButton.style.marginRight = _RIGHT_NAV_BTN;
    
            // Login Button
            const loginButton = this.createButton(_LOGIN_TITLE, _LOGIN_URL);
            loginButton.style.marginRight = _RIGHT_NAV_BTN;

            // Append icons that user should see if logged in
            rightNavContainer.append(signupButton, loginButton);
        }

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

    // Initialze and inject navbar
    const navbarManager = new NavigationBar();
    navbarManager.injectNavbar();

  // Initialize and inject footer
    const footerManager = new Footer();
    footerManager.injectFooter();
    
    // Add padding to body to prevent content from hiding behind fixed navbar
    document.body.style.paddingTop = '110px'
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
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


// New Footer class for centralized footer management
class Footer {
    constructor() {
        this.footerContainer = null;
        this.footerLinks = {
            company: [
                { name: "About Us", url: "about.html" },
                { name: "Our Services", url: "services.html" },
                { name: "Privacy Policy", url: "privacy.html" },
                { name: "Terms of Service", url: "terms.html" }
            ],
            quickLinks: [
                { name: "Home", url: "index.html" },
                { name: "Blog", url: "blog.html" },
                { name: "FAQ", url: "faq.html" },
                { name: "Contact", url: "contact.html" }
            ],
            socials: [
                { name: "Facebook", url: "https://facebook.com", icon: "bi bi-facebook" },
                { name: "Instagram", url: "https://instagram.com", icon: "bi bi-instagram" },
                { name: "Twitter", url: "https://twitter.com", icon: "bi bi-twitter" },
                { name: "LinkedIn", url: "https://linkedin.com", icon: "bi bi-linkedin" }
            ]
        };
    }

    // Create the entire footer
    createFooter() {
        this.footerContainer = document.createElement("footer");
        this.footerContainer.className = "text-center text-lg-start bg-body-tertiary text-muted mt-5";

        // Top section with links
        const topSection = this.createFooterTopSection();
        
        // Bottom copyright section
        const bottomSection = this.createFooterBottomSection();

        this.footerContainer.appendChild(topSection);
        this.footerContainer.appendChild(bottomSection);

        return this.footerContainer;
    }

    // Create the top section of the footer with links
    createFooterTopSection() {
        const section = document.createElement("section");
        section.className = "pt-5";

        const container = document.createElement("div");
        container.className = "container text-center text-md-start mt-5";

        const row = document.createElement("div");
        row.className = "row mt-3";

        // Company info column
        const companyCol = this.createCompanyInfoColumn();
        
        // Company links column
        const companyLinksCol = this.createLinksColumn("Company", this.footerLinks.company);
        
        // Quick links column
        const quickLinksCol = this.createLinksColumn("Quick Links", this.footerLinks.quickLinks);
        
        // Contact column
        const contactCol = this.createContactColumn();

        // Append all columns to the row
        row.append(companyCol, companyLinksCol, quickLinksCol, contactCol);
        container.appendChild(row);
        section.appendChild(container);

        return section;
    }

    // Create company info column
    createCompanyInfoColumn() {
        const col = document.createElement("div");
        col.className = "col-md-3 col-lg-4 col-xl-3 mx-auto mb-4";

        // Company name heading
        const heading = document.createElement("h6");
        heading.className = "text-uppercase fw-bold mb-4";
        
        // Logo icon
        const icon = document.createElement("i");
        icon.className = "fas fa-gem me-3";
        heading.appendChild(icon);
        heading.appendChild(document.createTextNode(" KampongShare"));

        // Company description
        const description = document.createElement("p");
        description.textContent = "KampongShare is a community-driven platform for sharing resources, reducing waste, and building stronger local communities.";

        col.append(heading, description);
        return col;
    }

    // Create links column (reusable for different link sections)
    createLinksColumn(title, links) {
        const col = document.createElement("div");
        col.className = "col-md-2 col-lg-2 col-xl-2 mx-auto mb-4";

        // Column title
        const heading = document.createElement("h6");
        heading.className = "text-uppercase fw-bold mb-4";
        heading.textContent = title;

        col.appendChild(heading);

        // Add all links
        links.forEach(link => {
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = link.url;
            a.className = "text-reset";
            a.textContent = link.name;
            p.appendChild(a);
            col.appendChild(p);
        });

        return col;
    }

    // Create contact column
    createContactColumn() {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4";

        // Contact heading
        const heading = document.createElement("h6");
        heading.className = "text-uppercase fw-bold mb-4";
        heading.textContent = "Contact";
        
        col.appendChild(heading);

        // Contact details
        const contactDetails = [
            { icon: "bi bi-house", text: "123 Kampong St, Singapore 123456" },
            { icon: "bi bi-envelope", text: "info@kampongshare.com" },
            { icon: "bi bi-phone", text: "+65 1234 5678" },
            { icon: "bi bi-printer", text: "+65 8765 4321" }
        ];

        contactDetails.forEach(detail => {
            const p = document.createElement("p");
            
            const icon = document.createElement("i");
            icon.className = detail.icon + " me-3";
            
            p.appendChild(icon);
            p.appendChild(document.createTextNode(detail.text));
            
            col.appendChild(p);
        });

        // Social media section
        const socialSection = this.createSocialMediaSection();
        col.appendChild(socialSection);

        return col;
    }

    // Create social media links section
    createSocialMediaSection() {
        const socialDiv = document.createElement("div");
        socialDiv.className = "mt-4";
        
        const socialHeading = document.createElement("p");
        socialHeading.className = "mb-2";
        socialHeading.textContent = "Follow us:";
        
        socialDiv.appendChild(socialHeading);
        
        const iconsDiv = document.createElement("div");
        iconsDiv.className = "d-flex gap-3";
        
        this.footerLinks.socials.forEach(social => {
            const link = document.createElement("a");
            link.href = social.url;
            link.className = "text-reset";
            link.setAttribute("target", "_blank");
            
            const icon = document.createElement("i");
            icon.className = social.icon + " fs-5";
            
            link.appendChild(icon);
            iconsDiv.appendChild(link);
        });
        
        socialDiv.appendChild(iconsDiv);
        return socialDiv;
    }

    // Create the bottom copyright section
    createFooterBottomSection() {
        const section = document.createElement("div");
        section.className = "text-center p-4 border-top";
        
        const copyright = document.createElement("span");
        copyright.textContent = `© ${new Date().getFullYear()} Copyright: `;
        
        const link = document.createElement("a");
        link.className = "text-reset fw-bold";
        link.href = _HOME_URL;
        link.textContent = "KampongShare.com";
        
        section.appendChild(copyright);
        section.appendChild(link);
        
        return section;
    }

    // Method to inject the footer into a specific container
    injectFooter(containerId = "footer-container") {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = ""; // Clear any existing content
            container.appendChild(this.createFooter());
        } else {
            console.error(`Container with id ${containerId} not found`);
        }
    }
}


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
