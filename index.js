const description = document.getElementById("description");
const selector = document.getElementById("selector");
const assign = document.getElementById("assign");
const issueBtn = document.getElementById("issueBtn");

issueBtn.addEventListener("click", function () {
  const descriptionValue = description.value;
  const assignValue = assign.value;
  const severity = selector.value;
  const id = Math.floor(Math.random() * 100000000) + "";

  if (!descriptionValue) {
    description.style.border = "1px solid red";
    description.value = "Please Fill this field";
    setTimeout(() => {
      description.style.border = "1px solid #ddd";
      description.value = "";
    }, 1000);
    return;
  } else if (!assignValue) {
    assign.value = "Please Fill this field";
    assign.style.border = "1px solid red";
    setTimeout(() => {
      assign.style.border = "1px solid #ddd";
      assign.value = "";
    }, 1000);
    return;
  }

  const issue = {
    id,
    description: descriptionValue,
    assign: assignValue,
    severity: severity,
    status: "open",
  };

  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  description.value = "";
  assign.value = "";

  displayIssue();
});

const displayIssue = () => {
  const getIssues = localStorage.getItem("issues");
  let parseIssue = JSON.parse(getIssues);
  if (!parseIssue) {
    parseIssue = [];
  }
  const issueContainer = document.getElementById("issueContainer");
  issueContainer.innerHTML = "";
  parseIssue.forEach((issue) => {
    const { id, description, assign, severity, status } = issue;
    const newDiv = document.createElement("div");
    newDiv.classList.add("issue");
    newDiv.innerHTML = `
    <div class="clsBtn" onclick="deleteIssue(${id})">
        <i class="fa-solid fa-xmark"></i>
    </div>
  <p class="issue-id">Issue ID: <span>${id}</span></p>
  <p class="open">${status}</p>
  <h3 class="issue-title">${description}</h3>
  <p class="issue-level">
    <i class="fa-regular fa-clock"></i><span>${severity}</span>
  </p>
  <p class="user-assign">
    <i class="fa-regular fa-user"></i>
    <span id="issue-assign">${assign}</span>
  </p>
  <div class="issues-btn">
    <button class="close" onclick="closeIssue(${id})">Close</button>
    <button class="delete" onclick="deleteIssue(${id})">Delete</button>
  </div>
    `;
    issueContainer.appendChild(newDiv);
  });
};

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const closeissue = issues.filter((issue) => {
    return issue.id == id;
  });
  closeissue[0].status = "closed";
  console.log(closeissue);
  localStorage.setItem("issues", JSON.stringify(issues));
  displayIssue();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));

  const updateIssue = issues.filter((issue) => {
    return issue.id != id;
  });
  console.log(updateIssue);
  localStorage.setItem("issues", JSON.stringify(updateIssue));
  displayIssue();
};

displayIssue();
