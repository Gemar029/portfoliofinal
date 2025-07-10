        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Contact form handling with EmailJS
        document.addEventListener('DOMContentLoaded', () => {
          emailjs.init('l60NZFNgB-8vDPHKn'); // Replace with your actual public key

          const form = document.querySelector('#contactForm'); // ✅ Fixed selector
          const submitBtn = form.querySelector('.submit-btn');
          const successModal = document.getElementById('successModal');
          const closeSuccessBtn = document.getElementById('closeSuccessModal');

          // Hide success modal initially
          successModal.style.display = 'none';

          // Close modal on click
          closeSuccessBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
          });

          // Submit form
          form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Change button to loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send with EmailJS
            emailjs.sendForm('service_mcrst8c', 'template_zgueelg', this)
              .then(() => {
                form.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Show success modal
                successModal.style.display = 'flex';

                setTimeout(() => {
                  successModal.style.display = 'none';
                }, 3000);
              })
              .catch((error) => {
                console.error('EmailJS error:', error);
                alert('Something went wrong. Please try again.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
              });
          });
        });

        // Add animation on scroll on pages content
        function animateOnScroll() {
            const elements = document.querySelectorAll('.skill-card');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        
        document.querySelectorAll('.skill-card, .project-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Certificate modal fullscreen on click
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const closeBtn = document.querySelector(".image-modal .close");
        const certImages = document.querySelectorAll(".cert-image img");

        certImages.forEach(img => {
          img.addEventListener("click", () => {
            modal.classList.remove("hidden");
            modal.classList.add("show");
            modalImg.src = img.src;
            modalImg.alt = img.alt;
          });
        });


        closeBtn.addEventListener("click", () => {
          modal.classList.remove("show");
          modal.classList.add("hidden");
        });


        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("show");
            modal.classList.add("hidden");
          }
        });

        // Typewriter effect
        const text = " I'm Gemar Alegre";
        let index = 0;
        const speed = 150;

        const typeOnce = () => {
          const el = document.getElementById("typewriter");

          if (index <= text.length) {
            el.textContent = text.substring(0, index);
            index++;
            setTimeout(typeOnce, speed);
          }
        };

        typeOnce(); // type only once on load