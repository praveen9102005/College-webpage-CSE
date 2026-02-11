const faculty = {
    hod: {
        img: "../Images/faculty/H.LILLY BEAULAH.JPG",
        name: "Dr. H. Lilly Beaulah",
        role: "Professor & Head of Department",
        email: "Email: hodcse@mahendacollege.com",
        exp: "Experience: 39 Years"
    },
    jenolinrex: {
        img: "../Images/faculty/M.JENOLIN REX.jpg",
        name: "Mr. M. Jenolin Rex",
        role: "Assistant Professor",
        email: "Email: jenolinrex@mahendracollege.com",
        exp: "Experience: 15 Years"
    },
    dhanakodi: {
        img: "../Images/faculty/V.DHANAKODI.jpg",
        name: "Ms. V. Dhanakodi",
        role: "Assistant Professor",
        email: "Email: dhanakodiv@mahendracollege.com",
        exp: "Experience: 4 Years"
    },
    gayathiri: {
        img: "../Images/faculty/GAYATHRI.M.jpg",
        name: "Mrs. M. Gayathiri",
        role: "Assistant Professor",
        email: "Email: gayathirim@mahendracollege.com",
        exp: "Experience: 4 Years"
    },
    anandraj: {
        img: "../Images/faculty/ANANDRAJ.M.jpg",
        name: "Mr. M. Anandraj",
        role: "Assistant Professor",
        email: "Email: anandraj@mahendracollege.com",
        exp: "Experience: 13 Years"
    },
    amjath: {
        img: "../Images/faculty/AMJATH A.JPG",
        name: "Mr. Amjath",
        role: "Assistant Professor",
        email: "Email: amjath@mahendracollege.com",
        exp: "Experience: 4 Years"
    },
    nishadevi: {
        img: "../Images/faculty/NISHADEVI.V.jpg",
        name: "Mrs. V. Nishadevi",
        role: "Assistant Professor",
        email: "Email: nishadevi@mahendracollege.com",
        exp: "Experience: 13 Years"
    },
    indhuja: {
        img: "../Images/faculty/A.INDHUJA.jpg",
        name: "Mrs. A. Indhuja",
        role: "Assistant Professor",
        email: "Email: indhujaa@mahendracollege.com",
        exp: "Experience: 8 Years"
    },
    deepa: {
        img: "../Images/faculty/V.DEEPA.jpg",
        name: "Mrs. V. Deepa",
        role: "Assistant Professor",
        email: "Email: deepav@mahendracollege.com",
        exp: "Experience: 12 Years"
    },
    vinithasree: {
        img: "../Images/faculty/L.VINITHASREE.jpg",
        name: "Mrs. L. Vinithasree",
        role: "Assistant Professor",
        email: "Email: vinithasree@mahendracollege.com",
        exp: "Experience: 8 Years"
    },
    sathya: {
        img: "../Images/faculty/M.SATHYA.jpg",
        name: "Mrs. M. Sathya",
        role: "Assistant Professor",
        email: "Email: sathya@mahendracollege.com",
        exp: "Experience: 11 Years"
    },
    shanmugapriya: {
        img: "../Images/faculty/M.SHANMUGAPRIYA.jpg",
        name: "Mrs. M. Shanmugapriya",
        role: "Assistant Professor",
        email: "Email: shanmugapriya@mahendracollege.com",
        exp: "Experience: 12 Years"
    }


};

function openFaculty(id) {
    const f = faculty[id];
    document.getElementById("m-img").src = f.img;
    document.getElementById("m-name").innerText = f.name;
    document.getElementById("m-role").innerText = f.role;
    document.getElementById("m-email").innerText = f.email;
    document.getElementById("m-exp").innerText = f.exp;
    document.getElementById("facultyModal").style.display = "flex";
}

function closeFaculty() {
    document.getElementById("facultyModal").style.display = "none";
}
