// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// A. Page Load Animations (Hero Section)
let tl = gsap.timeline();

tl.from(".nav-bar", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
  .from(".name-title", { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
  .from(".subtitle", { x: -30, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".power-section", { opacity: 0, duration: 1 }, "-=0.3")
  .from(".hero-img", { scale: 0.8, opacity: 0, duration: 1.5, ease: "power3.out" }, "-=1")
  .from(".info-tag", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.8");

// js/animations.js - নতুন যোগ করুন

// add gentle float animation to all info-tags
gsap.utils.toArray('.info-tag').forEach(tag => {
    gsap.to(tag, {
        y: -15, // ওপরে ১৫px ভাসবে
        x: -5, // বামে ৫px ভাসবে
        duration: 2.5, // ২.৫ সেকেন্ড সময় নেবে ওপরে যেতে
        ease: "power1.inOut",
        yoyo: true, // ওপরে যাওয়ার পর আবার নিচে নেমে আসবে
        repeat: -1, // সারাজীবন এই অ্যানিমেশন চলতে থাকবে
        delay: Math.random() // প্রত্যেকটা লেবেল আলাদা আলাদা সময় থেকে শুরু করবে
    });
});

// B. Parallax on Hero Image
// B. Fade out and move up on scroll (Hero Image)
gsap.to(".portrait-container", {
    yPercent: -30,       // 👈 ছবিটা স্ক্রল করলে নিচে না গিয়ে ওপরে উঠবে
    opacity: 0,          // 👈 আস্তে আস্তে হালকা হয়ে মিলিয়ে যাবে
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom", // একটু আগেই মিলিয়ে যাবে  center
        scrub: true
    }
});

// js/animations.js এর একদম শেষে যোগ করো

// Pagination Update Logic
const sections = gsap.utils.toArray('section'); 
const dots = gsap.utils.toArray('.pagination .dot'); 
const currentNum = document.querySelector('.current-page'); 

sections.forEach((sec, i) => {
    if (dots[i]) {
        ScrollTrigger.create({
            trigger: sec,
            start: "top 50%", 
            end: "bottom 50%",
           // markers: true, // 👈 এই লাইনটা যোগ করলাম টেস্টিংয়ের জন্য
            onEnter: () => updatePagination(i),
            onEnterBack: () => updatePagination(i)
        });
    }
});

function updatePagination(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentNum.innerText = "0" + (index + 1);
}

// ==========================================
// C. Section 02: Matchstick Scrub Animation
// ==========================================
//gsap.to(".match-moving", {
//    scrollTrigger: {
//        trigger: "#section-02",
//        start: "top 70%", // 02 সেকশনের টপ যখন স্ক্রিনের 70% এ আসবে তখন অ্যানিমেশন শুরু হবে
//        end: "center center", // সেকশনের মাঝ বরাবর এলে কাঠিটা পুরোপুরি দাঁড়িয়ে যাবে
//        scrub: 1, // 1 মানে হলো একটু স্মুথ ডিলে নিয়ে স্ক্রলের সাথে সাথে চলবে
//    },
//    rotation: 0, // -70 ডিগ্রি (শোয়ানো) থেকে ঘুরে একদম সোজা (0 ডিগ্রি) হয়ে যাবে
//    ease: "none"
//});

// ==========================================
// D. Section 02: Matchstick Scrub Animation (Speed Fixed)
// ==========================================
gsap.fromTo(".match-moving", 
    { 
        rotation: -70 
    }, 
    {
        rotation: 0,  
        scrollTrigger: {
            trigger: "#section-02",
            start: "top 80%",      // একটু আগেই শুরু হবে
            end: "bottom 30%",     // 👈 এটা অনেক নিচে নামিয়ে দিলাম যাতে কাঠিটা আস্তে আস্তে ওঠে
            scrub: 2,              // 👈 1 থেকে বাড়িয়ে 2 বা 3 করো, এতে কাঠিটা চাকার মতো না ঘুরে খুব 'স্মুথ' হয়ে উঠবে
        },
        ease: "power1.out"         // 👈 'none' এর বদলে এটা দিলে শুরুতে দ্রুত উঠে শেষে গিয়ে স্মুথলি থামবে
    }
);

// ==========================================
// E. Section 03: Skills Grid Animation (Fixed)
// ==========================================
gsap.fromTo(".skill-card", 
    { 
        y: 60,         // শুরুতে একটু নিচে থাকবে
        opacity: 0     // শুরুতে অদৃশ্য থাকবে
    }, 
    {
        y: 0,          // নিজের জায়গায় উঠে আসবে
        opacity: 1,    // পুরোপুরি দৃশ্যমান হবে
        duration: 0.8,
        stagger: 0.2,  // একটা একটা করে আসবে
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#section-03",
            start: "top 75%", // সেকশনটা স্ক্রিনের 75% এ এলে অ্যানিমেশন শুরু হবে
        }
    }
);

// ==========================================
// F. Section 04: Projects Animation
// ==========================================

// 1. বড় হেডার কার্ডটা অ্যানিমেট হয়ে উঠবে
gsap.fromTo(".projects-header-card", 
    { y: 50, opacity: 0 }, 
    {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
            trigger: "#section-04",
            start: "top 75%",
        }
    }
);

// 2. নিচের ৩টে প্রজেক্ট কার্ড একটা একটা করে উঠবে
gsap.fromTo(".project-card", 
    { y: 50, opacity: 0 }, 
    {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
            trigger: "#section-04",
            start: "top 60%", // হেডার কার্ড ওঠার একটু পরে শুরু হবে
        }
    }
);



// ==========================================
// G. Section 05: Contact Animation
// ==========================================

gsap.fromTo(".contact-content-left", 
    { y: 50, opacity: 0 }, 
    {
        y: 0, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
            trigger: "#section-05",
            start: "top 70%",
        }
    }
);

// দেশলাই কাঠিটা হালকা ফেড ইন হবে
gsap.fromTo(".standing-match", 
    { opacity: 0, scale: 0.8 }, 
    {
        opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)",
        scrollTrigger: {
            trigger: "#section-05",
            start: "top 60%",
        }
    }
);

// ==========================================
// H. Dynamic Pagination (100% Working GSAP)
// ==========================================
const sectionIds = ["#section-01", "#section-02", "#section-03", "#section-04", "#section-05"];
const pageNumbers = document.querySelectorAll(".page-num");

sectionIds.forEach((id, index) => {
    ScrollTrigger.create({
        trigger: id,
        start: "top 50%",    // সেকশন স্ক্রিনের মাঝখানে এলে ট্রিগার হবে
        end: "bottom 50%",   // সেকশন স্ক্রিনের মাঝখান থেকে বেরিয়ে গেলে শেষ হবে
        onToggle: (self) => {
            // self.isActive মানে হলো সেকশনটা এখন স্ক্রিনে আছে
            if (self.isActive) {
                // ১. প্রথমে সবার থেকে active-num ক্লাস রিমুভ করে দাও
                pageNumbers.forEach(num => num.classList.remove("active-num"));
                
                // ২. যেই সেকশনটা স্ক্রিনে আছে, শুধু তার নাম্বারে active-num অ্যাড করো
                if (pageNumbers[index]) {
                    pageNumbers[index].classList.add("active-num");
                }
            }
        }
    });
});