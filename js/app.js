// for loading phones 
const loadPhone = async (searchText, searchLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data, searchLimit);
};


// for display phone in loading function 
const displayPhones = (phones, searchLimit) => {
    // display 9 phones only
    const btnShowAll = document.getElementById('show-all');
    if (searchLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        btnShowAll.classList.remove('hidden');
    } else {
        btnShowAll.classList.add('hidden');
    }

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // console.log(phones);

    const yesAlert = document.getElementById('yes-phone-alert');
    const noAlert = document.getElementById('no-phone-alert');


    // validating search result
    if (phones.length === 0) {
        noAlert.classList.remove('hidden');
        yesAlert.classList.add('hidden');
    } else {
        yesAlert.classList.remove('hidden');
        noAlert.classList.add('hidden');
    }

    // looping phone of phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="card h-full bg-base-100 shadow-xl pt-5">
            <figure><img src="${phone.image}" alt="Phones" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <label onclick="loadPhoneDetails('${phone.slug}')" for="phone-details-modal" class="btn">Details</label>
                </div>
            </div>
        </div>
        `;

        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner 
    toggleSpinner(false);
};

// processing search copied from 'clicking search button' section 
const processSearch = (searchLimit) => {
    // start spinner 
    toggleSpinner(true);
    const inputField = document.getElementById('input-field').value;
    // document.getElementById('input-field').value = '';
    loadPhone(inputField, searchLimit);
}

// clicking search button 
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(9);
});

// search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
});

// loading spinner function 
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
};

// not the best way to load data for ShowALL btn
document.getElementById("btn-show-all").addEventListener('click', function () {
    processSearch();
})

// function for load phone details on modal
const loadPhoneDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

const displayPhoneDetails = phone => {
    // console.log(phone);

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <label for="phone-details-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <p class="pt-4">Brand: ${phone.brand}</p>
    <p class="pt-2">chipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : "Not Found"}</p>
    <p class="pt-2">Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "Not Found"}</p>
    <p class="pt-2">Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "Not Found"}</p>
    <p class="py-4">Release Date: ${phone.releaseDate ? phone.releaseDate : "No date found"}</p>
    `;
}

loadPhone('iphone')