// Add this to your existing JavaScript file

// Form submission handling for login sections
document.addEventListener('DOMContentLoaded', function() {
    // Check if login forms exist on the page
    const learnerForm = document.getElementById('learnerForm');
    const instructorForm = document.getElementById('instructorForm');
    
    if (learnerForm) {
        learnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const learnerId = document.getElementById('learnerId').value;
            const learnerPass = document.getElementById('learnerPass').value;
            
            if (learnerId && learnerPass) {
                // For demo purposes - in real app, send to server
                console.log('Student login attempt:', { learnerId, learnerPass });
                alert(`Student login successful!\nID: ${learnerId}`);
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    if (instructorForm) {
        instructorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const instructorId = document.getElementById('instructorId').value;
            const instructorPass = document.getElementById('instructorPass').value;
            
            if (instructorId && instructorPass) {
                // For demo purposes - in real app, send to server
                console.log('Faculty login attempt:', { instructorId, instructorPass });
                alert(`Faculty login successful!\nID: ${instructorId}`);
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    // Panel switching functionality
    const switchToInstructor = document.getElementById('switchToInstructor');
    const switchToLearner = document.getElementById('switchToLearner');
    
    if (switchToInstructor && switchToLearner) {
        switchToInstructor.addEventListener('click', function() {
            // Scroll to faculty login section
            const instructorAuth = document.querySelector('.instructor-auth');
            if (instructorAuth) {
                instructorAuth.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        switchToLearner.addEventListener('click', function() {
            // Scroll to student login section
            const learnerAuth = document.querySelector('.learner-auth');
            if (learnerAuth) {
                learnerAuth.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Forgot password links
    document.querySelectorAll('.recover-pass').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const isLearner = this.closest('.learner-auth') !== null;
            const userType = isLearner ? 'student' : 'faculty';
            alert(`Password recovery for ${userType} account initiated.\nA reset link would be sent to your registered email.`);
        });
    });
    
    // Pre-fill demo credentials (optional)
    const learnerIdInput = document.getElementById('learnerId');
    const instructorIdInput = document.getElementById('instructorId');
    
    if (learnerIdInput) learnerIdInput.value = "STU2023001";
    if (instructorIdInput) instructorIdInput.value = "FAC2023001";
});