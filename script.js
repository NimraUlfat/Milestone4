document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('resumeForm');
    const resumeOutputElement = document.getElementById('resumeOutput');

    if (form && resumeOutputElement) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get input elements
            const profilePictureInput = document.getElementById('profilePicture');
            const nameElement = document.getElementById('name');
            const emailElement = document.getElementById('email');
            const phoneElement = document.getElementById('phone');
            const addressElement = document.getElementById('address');
            const educationElement = document.getElementById('education');
            const expertiseElement = document.getElementById('expertise');
            const experienceElement = document.getElementById('experience');
            const skillsElement = document.getElementById('skills');
            const computerSkillsElement = document.getElementById('computer-skills'); // corrected ID

            // Collect input values
            const name = nameElement.value || "N/A";
            const email = emailElement.value || "N/A";
            const phone = phoneElement.value || "N/A";
            const address = addressElement.value || "N/A";
            const education = educationElement.value || "N/A";
            const expertise = expertiseElement.value || "N/A";
            const experience = experienceElement.value || "N/A";
            const skills = skillsElement.value || "N/A";
            const computerSkills = computerSkillsElement.value || "N/A";

            // Handle profile picture
            const profilePictureFile = profilePictureInput.files?.[0];
            let resumeContent = '';

            if (profilePictureFile) {
                const profilePictureURL = URL.createObjectURL(profilePictureFile);
                resumeContent += `<img src="${profilePictureURL}" alt="Profile Picture" style="width:150px; height:auto; border-radius:50%; margin-bottom: 20px;">`;
            }

            // Generate resume content with editable spans, including the name
            resumeContent += `
                <h2 class="editable">${name}</h2>
                <p><strong>Email:</strong> <span class="editable">${email}</span></p>
                <p><strong>Phone:</strong> <span class="editable">${phone}</span></p>
                <p><strong>Address:</strong> <span class="editable">${address}</span></p>
                <h3>Education</h3>
                <p class="editable">${education}</p>
                <h3>Expertise</h3>
                <p class="editable">${expertise}</p>
                <h3>Experience</h3>
                <p class="editable">${experience}</p>
                <h3>Skills</h3>
                <p class="editable">${skills}</p>
                <h3>Computer Skills</h3>
                <p class="editable">${computerSkills}</p>
            `;

            // Display the generated resume content
            resumeOutputElement.innerHTML = resumeContent;

            // Make fields editable after displaying the resume
            makeEditable();
        });
    } else {
        console.error('Form or resume output element not found!');
    }
});

// Function to make elements with the class "editable" inline editable
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', () => {
            const currentElement = element;
            const currentValue = currentElement.textContent || "";

            // Replace content with an input field for editing
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');

            // Save the input value on blur
            input.addEventListener('blur', () => {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });

            currentElement.style.display = 'none';
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
