document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Type assertion for form elements
            const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
            const nameElement = document.getElementById('name') as HTMLInputElement;
            const emailElement = document.getElementById('email') as HTMLInputElement;
            const phoneElement = document.getElementById('phone') as HTMLInputElement;
            const addressElement = document.getElementById('address') as HTMLInputElement;
            const educationElement = document.getElementById('education') as HTMLInputElement;
            const expertiseElement = document.getElementById('expertise') as HTMLInputElement;
            const experienceElement = document.getElementById('experience') as HTMLInputElement;
            const skillsElement = document.getElementById('skills') as HTMLInputElement;
            const computerskillsElement = document.getElementById('computerskills') as HTMLInputElement;

            // Check if all form elements exist
            if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && expertiseElement && experienceElement && skillsElement && computerskillsElement) {
                console.log('All form elements are found.');

                // Collect input values
                const name = nameElement.value;
                const email = emailElement.value;
                const phone = phoneElement.value;
                const address = addressElement.value;
                const education = educationElement.value;
                const expertise = expertiseElement.value;
                const experience = experienceElement.value;
                const skills = skillsElement.value;
                const computerskills = computerskillsElement.value;

                // Handle Profile Picture
                const profilePictureFile = profilePictureInput.files?.[0];
                const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

                // Create resume content with profile picture if available
                let resumeOutput = `
                    <h2><span class="editable">${name}</span></h2>
                    <p><strong>Email :</strong> <span class="editable">${email}</span></p>
                    <p><strong>Phone Number :</strong> <span class="editable">${phone}</span></p>
                    <p><strong>Address :</strong> <span class="editable">${address}</span></p>
                    <h3>Education</h3>
                    <p class="editable">${education}</p>
                    <h3>Expertise</h3>
                    <p class="editable">${expertise}</p>
                    <h3>Experience</h3>
                    <p class="editable">${experience}</p>
                    <h3>Skills</h3>
                    <p class="editable">${skills}</p>
                    <h3>Computer Skills</h3>
                    <p class="editable">${computerskills}</p>
                `;

                // If a profile picture is selected, add it to the resume output
                if (profilePictureURL) {
                    resumeOutput = `
                        <img src="${profilePictureURL}" alt="Profile Picture" style="width:150px; height:auto; border-radius:50%; margin-bottom: 20px;">
                    ` + resumeOutput;
                }

                // Find the resume output element and update its content
                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    console.log('Updating resume output element with generated content.');
                    resumeOutputElement.innerHTML = resumeOutput;

                    // Make elements editable after the content is loaded
                    makeEditable();
                } else {
                    console.error('The resume output element is missing.');
                }
            } else {
                console.error('One or more form elements are missing.');
            }
        });
    } else {
        console.error('Form element not found!');
    }

    // Function to make elements with the "editable" class inline-editable
    function makeEditable() {
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach((element) => {
            element.addEventListener('click', () => {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent || "";

                // Replace content with an input field for editing
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                // Save the input value on blur
                input.addEventListener('blur', () => {
                    currentElement.textContent = input.value;
                    input.remove();
                    currentElement.style.display = 'inline';
                });

                // Replace element with input field temporarily
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            });
        });
    }
});

