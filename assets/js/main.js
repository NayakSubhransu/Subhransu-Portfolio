/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
// const skillsContent = document.getElementsByClassName("skills__content"),
//   skillsHeader = document.querySelectorAll(".skills__header");

// function toggleSkills() {
//   let itemClass = this.parentNode.className;

//   for (i = 0; i < skillsContent.length; i++) {
//     skillsContent[i].className = "skills__content skills__close";
//   }
//   if (itemClass === "skills__content skills__close") {
//     this.parentNode.className = "skills__content skills__open";
//   }
// }

// skillsHeader.forEach((el) => {
//   el.addEventListener("click", toggleSkills);
// });

/*==================== ACCORDION SKILLS ====================*/
 const skillsContent = document.getElementsByClassName("skills__content");
        const skillsHeaders = document.querySelectorAll(".skills__header");

        // Function to close all skills sections
        function closeAllSkills() {
            for (let i = 0; i < skillsContent.length; i++) {
                skillsContent[i].classList.remove("skills__open");
                skillsContent[i].classList.add("skills__close");
                
                // Reset arrow rotation
                const arrow = skillsContent[i].querySelector('.skills__arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
                
                // Reset progress bars
                const progressBars = skillsContent[i].querySelectorAll('.skills__percentage');
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                });
            }
        }

        // Function to animate progress bars with staggered effect
        function animateProgressBars(container) {
            const progressBars = container.querySelectorAll('.skills__percentage');
            
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    // Get the percentage from the CSS class
                    const classList = bar.className.split(' ');
                    const skillClass = classList.find(cls => cls.startsWith('skills__'));
                    
                    if (skillClass) {
                        bar.style.width = getSkillPercentage(skillClass);
                    }
                }, index * 100);
            });
        }

        // Function to get skill percentage based on class
        function getSkillPercentage(skillClass) {
            const percentages = {
                'skills__html': '90%',
                'skills__js': '90%',
                'skills__ts': '90%',
                'skills__react': '80%',
                'skills__next': '80%',
                'skills__tailwind': '90%',
                'skills__mui': '90%',
                'skills__sklearn': '80%',
                'skills__tf': '90%',
                'skills__langchain': '70%',
                'skills__tts': '90%',
                'skills__piml': '60%',
                'skills__streamlit': '80%',
                'skills__node': '90%',
                'skills__socket': '70%',
                'skills__mysql': '80%',
                'skills__flask': '70%',
                'skills__java': '90%',
                'skills__rust': '50%'
            };
            return percentages[skillClass] || '0%';
        }

        // Enhanced toggle function
        function toggleSkills() {
            const currentContent = this.parentNode;
            const isCurrentlyOpen = currentContent.classList.contains('skills__open');
            
            // Always close all sections first
            closeAllSkills();
            
            // If the clicked section wasn't already open, open it
            if (!isCurrentlyOpen) {
                currentContent.classList.remove('skills__close');
                currentContent.classList.add('skills__open');
                
                // Animate arrow rotation
                const arrow = this.querySelector('.skills__arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(-180deg)';
                }
                
                // Animate progress bars after a short delay
                setTimeout(() => {
                    animateProgressBars(currentContent);
                }, 300);
            }
        }

        // Add event listeners to all skill headers
        skillsHeaders.forEach((header) => {
            header.addEventListener("click", toggleSkills);
            
            // Add keyboard support
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSkills.call(this);
                    
                    // Update aria-expanded
                    const isOpen = this.parentNode.classList.contains('skills__open');
                    this.setAttribute('aria-expanded', isOpen);
                }
            });
        });

        // Initialize - ensure all sections are closed on page load
        document.addEventListener('DOMContentLoaded', function() {
            closeAllSkills();
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const content = entry.target;
                    if (content.classList.contains('skills__open')) {
                        setTimeout(() => {
                            animateProgressBars(content);
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe all skills content for scroll animations
        Array.from(skillsContent).forEach(content => {
            skillsObserver.observe(content);
        });

        // Add smooth hover effects for skill data items
        document.querySelectorAll('.skills__data').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

       

        // Enhanced click effect with ripple animation
        skillsHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS animation for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);


/*==================== QUALIFICATION TABS ====================*/

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});
/*==================== Project SWIPER  ====================*/

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Fallback script to ensure title is always visible
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".portfolio.section .section__title");

  // Check if the gradient text is working
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(title);
    const textFillColor = computedStyle.webkitTextFillColor;

    // If text is completely transparent and no gradient is applied, use fallback
    if (
      textFillColor === "rgba(0, 0, 0, 0)" ||
      // textFillColor === "transparent"
    ) {
      const hasGradient =
        computedStyle.background.includes("gradient") ||
        computedStyle.backgroundImage.includes("gradient");

      if (!hasGradient) {
        title.classList.add("fallback");
        console.log("Applied fallback styling for portfolio title");
      }
    }
  }, 100);
});

/*==================== TESTIMONIAL ====================*/
// let swiperTestimonial = new Swiper(".testimonial__container", {
//   loop: true,
//   grabCursor: true,
//   spaceBetween: 48,

//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
//   breakpoints: {
//     568: {
//       slidesPerview: 2,
//     },
//   },
// });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);
