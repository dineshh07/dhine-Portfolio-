/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList
            .add("hide");

    }, 900);

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

        });

    });


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener("mousemove", e => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left =
        mouseX + "px";

    cursorDot.style.top =
        mouseY + "px";

});


function animateCursor() {

    ringX +=
        (mouseX - ringX) * .12;

    ringY +=
        (mouseY - ringY) * .12;


    cursorRing.style.left =
        ringX + "px";

    cursorRing.style.top =
        ringY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


document
    .querySelectorAll("a, button, .glass-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing.style.width =
                    "55px";

                cursorRing.style.height =
                    "55px";

                cursorRing.style.background =
                    "rgba(139,92,246,.08)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing.style.width =
                    "35px";

                cursorRing.style.height =
                    "35px";

                cursorRing.style.background =
                    "transparent";

            }
        );

    });


/* =====================================================
   PARTICLE NETWORK
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

const PARTICLE_COUNT =
    window.innerWidth < 600
        ? 45
        : 85;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.vx =
            (Math.random() - .5)
            * .35;

        this.vy =
            (Math.random() - .5)
            * .35;

        this.size =
            Math.random() * 1.5 + .5;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.vx *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.vy *= -1;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(150,120,255,.65)";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function connectParticles() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const opacity =
                    1 -
                    distance / 120;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(
                        139,
                        92,
                        246,
                        ${opacity * .16}
                    )`;

                ctx.lineWidth = .6;

                ctx.stroke();

            }

        }

    }

}


function particleAnimation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    connectParticles();


    requestAnimationFrame(
        particleAnimation
    );

}


particleAnimation();


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingText =
    document.getElementById(
        "typingText"
    );


const words = [

    "Cybersecurity Student",

    "Web Developer",

    "Programmer",

    "Tech Enthusiast",

    "Future Security Engineer"

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const current =
        words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            current.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            current.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingText.textContent =
            current.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );

}


typeEffect();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("show");

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   SKILL BARS
===================================================== */

const skillTracks =
    document.querySelectorAll(
        ".skill-track span"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.width =
                        entry.target.dataset.width;

                }

            });

        },
        {
            threshold: .5
        }
    );


skillTracks.forEach(skill => {

    skillObserver.observe(skill);

});


/* =====================================================
   3D CARD TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".tilt"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left;


            const y =
                e.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 12;


            const rotateY =
                (centerX - x) / 12;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


let counterStarted = false;


function animateCounters() {

    if (counterStarted) return;

    const hero =
        document.querySelector(
            ".hero-stats"
        );


    const rect =
        hero.getBoundingClientRect();


    if (
        rect.top <
        window.innerHeight &&
        rect.bottom > 0
    ) {

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;


            const increment =
                target / 40;


            const update = () => {

                current += increment;


                if (
                    current >= target
                ) {

                    counter.textContent =
                        target;

                    return;

                }


                counter.textContent =
                    Math.floor(current);


                requestAnimationFrame(
                    update
                );

            };


            update();

        });

    }

}


window.addEventListener(
    "scroll",
    animateCounters
);


animateCounters();


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const top =
                section.offsetTop - 180;


            const bottom =
                top +
                section.offsetHeight;


            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 600
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();


        const button =
            contactForm.querySelector(
                ".submit-btn"
            );


        button.innerHTML =
            "MESSAGE SENT ✓";


        button.style.background =
            "#4ade80";


        setTimeout(() => {

            contactForm.reset();


            button.innerHTML =
                'SEND MESSAGE <span>↗</span>';


            button.style.background =
                "white";

        }, 2500);

    }
);
/* =====================================================
   MOBILE PERFORMANCE OPTIMIZATION
===================================================== */

const isMobile =
    window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {

    /* Disable custom cursor */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot) {
        cursorDot.style.display = "none";
    }

    if (cursorRing) {
        cursorRing.style.display = "none";
    }


    /* Disable particle canvas */

    const particleCanvas =
        document.getElementById("particles");

    if (particleCanvas) {
        particleCanvas.style.display = "none";
    }


    /* Disable tilt effect */

    document.querySelectorAll(".tilt").forEach(element => {

        element.style.transform = "none";

    });


    /* Disable heavy orbit animations */

    document.querySelectorAll(
        ".hero-orbit, .skill-orbit"
    ).forEach(element => {

        element.style.animation = "none";

    });


    /* Reduce background effects */

    document.querySelectorAll(".orb").forEach(element => {

        element.style.animation = "none";
        element.style.filter = "blur(70px)";

    });

}
