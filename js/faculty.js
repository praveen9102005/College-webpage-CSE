const faculty = {
    hod: {
        img: "../Images/faculty/hod.jpg",
        name: "Dr. H. Lilly Beaulah",
        role: "Professor & Head of Department",
        spec: "Specialization: Machine Learning, NLP, Comput er Vision",
        email: "Email: hodcse@mahendacollege.com",
        exp: "Experience: 30+ Years"
    },
    dhanakodi: {
        img: "../Images/faculty/Dhanakodiv.jpg",
        name: "Ms. Dhanakodi V",
        role: "Assistant Professor",
        spec: "Specialization: Data Science & Big Data Analytics",
        email: "Email: dhanakodiv@mahendacollege.com",
        exp: "Experience: 4 Years"
    },
    gayathiri: {
        img: "../Images/faculty/gayathiri.jpg",
        name: "Mrs. Gayathiri M",
        role: "Assistant Professor",
        spec: "Specialization: Cyber Security",
        email: "Email: gayathirim@mahendracollege.com",
        exp: "Experience: 4 Years"
    },
    sakthivel: {
        img: "../Images/faculty/sakthivel.jpg",
        name: "Mr. Sakthivel P",
        role: "Professor",
        spec: "Specialization: AI & Machine Learning",
        email: "Email: sakthivelp@mahendracollege.com",
        exp: "Experience: 4 Years"
    }
};

function openFaculty(id) {
    const f = faculty[id];
    document.getElementById("m-img").src = f.img;
    document.getElementById("m-name").innerText = f.name;
    document.getElementById("m-role").innerText = f.role;
    document.getElementById("m-spec").innerText = f.spec;
    document.getElementById("m-email").innerText = f.email;
    document.getElementById("m-exp").innerText = f.exp;
    document.getElementById("facultyModal").style.display = "flex";
}

function closeFaculty() {
    document.getElementById("facultyModal").style.display = "none";
}
