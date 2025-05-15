document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Greeting Function ---
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Welcome!";
        if (hour < 12) {
            greetingText = "Good Morning!";
        } else if (hour < 18) {
            greetingText = "Good Afternoon!";
        } else {
            greetingText = "Good Evening!";
        }
        greetingElement.textContent = greetingText;
    }

    // --- Dark/Light Mode Toggle ---
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if(themeToggleButton) themeToggleButton.textContent = "Light Mode";
        } else {
            document.body.classList.remove('dark-theme');
            if(themeToggleButton) themeToggleButton.textContent = "Dark Mode";
        }
    }

    // Load saved theme or use system preference
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only if no user preference is set
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Project Details Toggle ---
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const detailsDiv = document.getElementById(`${projectId}-details`);
            if (detailsDiv) {
                if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
                    detailsDiv.style.display = 'block';
                    button.textContent = 'Hide Details';
                } else {
                    detailsDiv.style.display = 'none';
                    button.textContent = 'View Details';
                }
            }
        });
        // Keyboard accessibility for buttons
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                button.click();
            }
        });
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for this demo
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(el => el.classList.remove('invalid'));

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const formStatus = document.getElementById('formStatus');

            // Name validation
            if (name.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Name is required.';
                name.classList.add('invalid');
                isValid = false;
            }

            // Email validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                document.getElementById('emailError').textContent = 'Invalid email format.';
                email.classList.add('invalid');
                isValid = false;
            }

            // Phone validation (Regex - simple example: 123-456-7890)
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (phone.value.trim() !== '' && !phoneRegex.test(phone.value.trim())) {
                document.getElementById('phoneError').textContent = 'Invalid phone format (e.g., 123-456-7890).';
                phone.classList.add('invalid');
                isValid = false;
            }
            
            // Subject validation
            if (subject.value.trim() === '') {
                document.getElementById('subjectError').textContent = 'Subject is required.';
                subject.classList.add('invalid');
                isValid = false;
            }

            // Message validation
            if (message.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Message is required.';
                message.classList.add('invalid');
                isValid = false;
            }
            
            // Focus event listener example (can be added to inputs)
            name.addEventListener('focus', () => console.log('Name field focused'));


            if (isValid) {
                formStatus.textContent = 'Message sent successfully! (Demo - no actual sending)';
                formStatus.style.color = 'green';
                contactForm.reset(); // Clear the form
            } else {
                formStatus.textContent = 'Please correct the errors above.';
                formStatus.style.color = 'red';
            }
        });
    }

    // --- Survey Form Validation ---
    const surveyForm = document.getElementById('surveyForm');
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValidSurvey = true;
            const surveyStatus = document.getElementById('surveyStatus');

            // Clear previous errors
            document.querySelectorAll('#surveyForm .error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('#surveyForm input, #surveyForm textarea').forEach(el => el.classList.remove('invalid'));


            // Radio button (framework) validation
            const frameworkRadios = document.querySelectorAll('input[name="framework"]');
            let frameworkSelected = false;
            frameworkRadios.forEach(radio => {
                if (radio.checked) frameworkSelected = true;
            });
            if (!frameworkSelected) {
                document.getElementById('frameworkError').textContent = 'Please select a framework.';
                isValidSurvey = false;
                // Could add 'invalid' class to the fieldset or a parent div
            }

            // Email validation (if entered)
            const surveyEmail = document.getElementById('surveyEmail');
            if (surveyEmail.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(surveyEmail.value.trim())) {
                    document.getElementById('surveyEmailError').textContent = 'Invalid email format.';
                    surveyEmail.classList.add('invalid');
                    isValidSurvey = false;
                }
            }
            
            // Checkboxes don't typically require validation unless a minimum must be selected.

            if (isValidSurvey) {
                surveyStatus.textContent = 'Survey submitted! Thank you for your feedback. (Demo)';
                surveyStatus.style.color = 'green';
                surveyForm.reset();
            } else {
                surveyStatus.textContent = 'Please fill out all required fields correctly.';
                surveyStatus.style.color = 'red';
            }
        });
    }

    // --- Image Map Alert Example (Already in HTML, but good to note JS can handle clicks) ---
    // The onclick attributes in the HTML for the image map are one way.
    // Alternatively, you could select them here and add event listeners:
    // document.querySelectorAll('#workspacemap area').forEach(area => {
    //     area.addEventListener('click', (e) => {
    //         e.preventDefault(); // if href is '#'
    //         alert(`You clicked: ${e.target.getAttribute('alt')}`);
    //     });
    // });

});