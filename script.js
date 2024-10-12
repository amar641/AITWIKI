const chatBox = document.getElementById('chat-box');
const inputContainer = document.getElementById('input-container');

// Full faculty department data from AIT
const departments = {
    "📘 ASGE (Applied Science and General Engineering)": ["Head of Department", "Teaching", "Non-Teaching"],
    "💻 COMPUTER": ["Head of Department", "Teaching", "Non-Teaching"],
    "🌐 IT (Information Technology)": ["Head of Department", "Teaching", "Non-Teaching"],
    "📡 ENTC (Electronics and Telecommunication)": ["Head of Department", "Teaching", "Non-Teaching"],
    "🔧 MECHANICAL": ["Head of Department", "Teaching", "Non-Teaching"]
};

const faculty = {
    "Head of Department": {
        "Dr. Ganesh Mundhe": { "email": "gmundhe@aitpune.edu.in", "phone": "9579408564" },
        "Prof (Dr) S R Dhore": { "email": "hodcomp@aitpune.edu.in", "phone": "9890809251" },
        "Dr (Mrs) Sangeeta Jadhav": { "email": "hodit@aitpune.edu.in", "phone": "9923011211" },
        "Dr G R Patti": { "email": "hodetc@aitpune.edu.in", "phone": "9422356483" },
        "Prof (Dr) U V Avasarmol": { "email": "hodmech@aitpune.edu.in", "phone": "8007976763" }
    },
    "Teaching": {
        "Dr (Mrs) Suwati Kulkarni": { "email": "skulkarni@aitpune.edu.in", "phone": "9405012782" },
        "Mr V. Hivrale": { "email": "vhivrale@aitpune.edu.in", "phone": "9665582369" },
        "Mr S K Misal": { "email": "smisal@aitpune.edu.in", "phone": "9423547900" },
        "Mr Kuldeep Hule": { "email": "kuldeephule@aitpune.edu.in", "phone": "8668277166" },
        "Mrs Asha Sathe": { "email": "asathe@aitpune.edu.in", "phone": "7888034146" },
        "Dr Rahul Desai": { "email": "rahuldesai@aitpune.edu.in", "phone": "9403357088" },
        "Dr Ashwini Sapkal": { "email": "asapkal@aitpune.edu.in", "phone": "9881776565" },
        "Dr P K Karandikar": { "email": "pkarandikar@aitpune.edu.in", "phone": "9420427741" },
        "Dr J D Patil": { "email": "jdpatil@aitpune.edu.in", "phone": "9923287262" }
    },
    "Non-Teaching": {
        "Mr Raghu Babar": { "email": "rbabar@aitpune.edu.in", "phone": "9763607929" },
        "Ms Swati Salunkhe": { "email": "ssalunkhe@aitpune.edu.in", "phone": "9604870370" },
        "Mr Ravindrinda Desai": { "email": "rdesai@aitpune.edu.in", "phone": "7820958840" },
        "Ms Jyoti Taralkar": { "email": "jyotitaralkar@aitpune.edu.in", "phone": "9172802015" },
        "Ms Sujata Kadam": { "email": "skadam@aitpune.edu.in", "phone": "9423047541" },
        "Mr S H Karande": { "email": "shkarande@aitpune.edu.in", "phone": "8087905342" }
    }
};

let userSelections = {};

// Append bot message
function botMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Append user message
function userMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear input container and inject new buttons
function injectButtons(buttons) {
    inputContainer.innerHTML = '';  // Clear existing buttons
    buttons.forEach(btn => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = btn.label;
        buttonElement.onclick = () => btn.callback(btn.label);
        inputContainer.appendChild(buttonElement);
    });
}

// Start the conversation
function startChat() {
    botMessage("👋 Hello! Welcome to the AIT Faculty Information Bot.");
    botMessage("Please select a department:");
    const departmentButtons = Object.keys(departments).map(dept => ({
        label: dept,
        callback: handleDepartmentSelection
    }));
    injectButtons(departmentButtons);
}

// Handle department selection
function handleDepartmentSelection(department) {
    userSelections.department = department;
    userMessage(department);
    botMessage(`You selected *${department}*. Now choose the faculty type:`);
    const facultyTypeButtons = departments[department].map(facType => ({
        label: facType,
        callback: handleFacultyTypeSelection
    }));
    injectButtons(facultyTypeButtons);
}

// Handle faculty type selection
function handleFacultyTypeSelection(facultyType) {
    userSelections.facultyType = facultyType;
    userMessage(facultyType);
    botMessage(`You selected *${facultyType}*. Now choose the faculty member:`);
    const facultyMemberButtons = Object.keys(faculty[facultyType]).map(member => ({
        label: member,
        callback: handleFacultyMemberSelection
    }));
    injectButtons(facultyMemberButtons);
}

// Handle faculty member selection and display contact
function handleFacultyMemberSelection(member) {
    userSelections.member = member;
    userMessage(member);
    const contactInfo = faculty[userSelections.facultyType][member];
    botMessage(`Here are the contact details for *${member}*:\n\n📧 Email: ${contactInfo.email}\n📞 Phone: ${contactInfo.phone}`);
    
    // Restart conversation after showing contact details
    setTimeout(() => {
        botMessage("Would you like to search for another faculty member?");
        injectButtons([
            { label: "Yes", callback: startChat },
            { label: "No", callback: () => botMessage("Thank you for using the AIT Faculty Chatbot! Have a nice day.") }
        ]);
    }, 2000);
}

// Start the chatbot when the page loads
startChat();
