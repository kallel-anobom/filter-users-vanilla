const BASEURL = "https://randomuser.me";

const customFetch = async (endpoint) => {
  try {
    const response = await fetch(`${BASEURL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

const createListItem = (item) => {
  const newDocument = `
  <div style="visibility: visible">
    <img src="${item.photo}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.city}</p>, <span>${item.state}</span>
  </div>`;

  return newDocument;
};

const getUsers = async () => {
  const data = await customFetch("/api?results=50&nat=br,us,mx,gb,nz,nl,ca");
  const dataUsers = data.results.map((result) => {
    return {
      name: result.name.first + "" + result.name.last,
      city: result.location.city,
      state: result.location.state,
      photo: result.picture.large,
    };
  });

  const listItems = dataUsers.map((data) => createListItem(data));
  
  let targetInsertDocumentElement = document.querySelector("#content");

  return targetInsertDocumentElement.insertAdjacentHTML("beforeend", listItems);
};

const getFilterUsers = (value) => {
  let targetInsertDocumentElement = document.getElementById("content");
  let childrenElements = targetInsertDocumentElement.children;

  for (let i = 0; i < childrenElements.length; i++) {
    let nameSearch =
      childrenElements[i].children[2].innerHTML.toLocaleLowerCase();
    let locationSearch =
      childrenElements[i].children[3].innerHTML.toLocaleLowerCase();
    let stringTreatment = locationSearch.trim(" ").split(" ").join(" ");

    if (
      nameSearch.substring(0, 3) === value ||
      stringTreatment.substring(0, 3) === value
    ) {
      childrenElements[i].style.display = "block";
      childrenElements[i].style.visibility = "visible";
    } else if (childrenElements[i].style.display !== "block") {
      childrenElements[i].style.visibility = "hidden";
    }

    if (value.length === 0) {
      childrenElements[i].style.removeProperty("visibility");
      childrenElements[i].style.removeProperty("display");
    }
  }
};

getUsers();
