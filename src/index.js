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
  let insertDocumentDom = document.querySelector("#content");

  const newDocument = `
  <div>
    <img src="${item.photo}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.city}</p>, <span>${item.state}</span>
  </div>
  `;

  insertDocumentDom.append(newDocument);
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

  const listItems = dataUsers.map((name) => createListItem(name));

  return document.body.insertAdjacentHTML(
    "afterbegin",
    `<ul>${listItems}</ul>`
  );
};

const getFilterUsers = (key, value) => {
  let search_query = document.getElementById("searchbox").value;

  for (var i = 0; i < cards.length; i++) {
    if (
      cards[i].textContent.toLowerCase().includes(search_query.toLowerCase())
    ) {
      cards[i].classList.remove("is-hidden");
    } else {
      cards[i].classList.add("is-hidden");
    }
  }
};

getUsers()