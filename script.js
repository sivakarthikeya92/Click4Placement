
// Job Data
const jobs = [
    {
        id: 1,
        company: "Google",
        role: "Software Engineer",
        location: "Mountain View, CA",
        skills: ["JavaScript", "Node.js", "Angular"],
        description: "Work on scalable web applications impacting millions of users. Collaborate with top engineers in the industry.",
        applyLink: "https://careers.google.com/jobs/"
    },
    {
        id: 2,
        company: "Amazon",
        role: "Data Analyst",
        location: "Seattle, WA",
        skills: ["SQL", "Python", "Data Visualization"],
        description: "Analyze and interpret complex datasets to provide insights for business growth.",
        applyLink: "https://www.amazon.jobs/"
    },
    {
        id: 3,
        company: "Microsoft",
        role: "Cloud Developer",
        location: "Redmond, WA",
        skills: ["Azure", "C#", "Kubernetes"],
        description: "Develop and maintain cloud-based applications on Microsoft Azure.",
        applyLink: "https://careers.microsoft.com/"
    }
];

// Carousel
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
if (items.length > 0) {
    const totalItems = items.length;
    let autoSlide = setInterval(nextSlide, 5000);
    document.querySelector('.next').addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    document.querySelector('.prev').addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    function showSlide(index) {
        document.querySelector('.carousel-inner').style.transform = `translateX(-${index * 100}%)`;
    }
    function nextSlide() { currentIndex = (currentIndex + 1) % totalItems; showSlide(currentIndex); }
    function prevSlide() { currentIndex = (currentIndex - 1 + totalItems) % totalItems; showSlide(currentIndex); }
    function resetAutoSlide() { clearInterval(autoSlide); autoSlide = setInterval(nextSlide, 5000); }
}

// Helper: Render Job List
function renderJobList(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = "";
        jobs.forEach(job => {
            const jobCard = document.createElement("div");
            jobCard.classList.add("job-card");
            jobCard.innerHTML = `
                <h2>${job.company}</h2>
                <p>${job.role}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <a href="job-details.html?id=${job.id}" class="details-btn">View Details</a>
            `;
            container.appendChild(jobCard);
        });
    }
}

// Detect Page
if (window.location.pathname.includes("click4placement.html") || window.location.pathname.endsWith("/")) {
    renderJobList("job-list");
}
if (window.location.pathname.includes("job-description.html")) {
    renderJobList("job-list");
}
if (window.location.pathname.includes("job-details.html")) {
    const jobDetails = document.getElementById("job-details");
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get("id");
    const job = jobs.find(j => j.id === parseInt(jobId));
    if (job) {
        jobDetails.innerHTML = `
            <div class="job-card">
                <h2>${job.company} - ${job.role}</h2>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Skills Required:</strong> ${job.skills.join(", ")}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <a href="${job.applyLink}" target="_blank" class="apply-btn">Apply Now</a>
                <br><br>
                <a href="job-description.html" class="details-btn">Back to Job List</a>
            </div>
        `;
    } else {
        jobDetails.innerHTML = `<p>Job not found.</p>`;
    }
}
