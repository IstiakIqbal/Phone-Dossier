const loadingPhone = async (searchText = 'a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayData(phones, isShowAll)
}

const displayData = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear the datas 
    phoneContainer.textContent = '';

    const showAllButton = document.getElementById('showAllButton');
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden') //show hidden button
    }
    else {
        showAllButton.classList.add('hidden') //hide hidden button
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl pt-7 m-5`;
        phoneCard.innerHTML = `
        <figure><img src=${phone.image}
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}');" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoader(false);
}

const showDetails = async (id) => {
    console.log('Clicked on show details of ', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    displayDetails(phone)
    showDetailsModal.showModal();
}

const displayDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phoneName');
    phoneName.innerText = phone.name;
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML =
        `
    <img src="${phone.image}" alt="">
    <p><span>Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p><span>GPS: </span> ${phone.others?.GPS || 'No GPS available'}</p>
    `
}


const handleSearch = (isShowAll) => {
    toggleLoader(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    loadingPhone(searchText, isShowAll)
    // searchField.value = ''
}

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');

    if (isLoading) {
        loader.classList.remove('hidden')
    }
    else {
        loader.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true)
}
loadingPhone()