document.addEventListener('DOMContentLoaded', () => {
    const name_taskInput = document.getElementById('name_task');
    const name_collInput = document.getElementById('name_coll');
    const addButton = document.getElementById('addButton');
    const titleList = document.getElementById('titleList');
    const submitButton = document.getElementById('submitButton');
    const cardContainer = document.getElementById('cardContainer');
  
    let titles = [];
    let cardData = [];
  
    addButton.addEventListener('click', () => {
        const title = name_taskInput.value.trim();
        if (title) {
            titles.push(title);
            updateTitleList();
            name_taskInput.value = ''; // Clear input after adding
        }
    });
  
    function updateTitleList() {
        titleList.innerHTML = '';
        titles.forEach((title, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-list">
                <label for="title-${index}">${title}</label>
                <div class="check-btn">
                <input type="checkbox" id="title-${index}" name="is_done" />
                <button class="deleteButton" data-index="${index}">Delete</button>
                </div>
                </div>
            `;
            titleList.appendChild(li);
        });
        addDeleteListeners();
    }
  
    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                titles.splice(index, 1);
                updateTitleList();
            });
        });
    }
  

    //CHECKBOX LISTENER
    submitButton.addEventListener('click', () => {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const totalCheckboxes = titles.length;
        const checkedCount = selectedCheckboxes.length;
  
        if (totalCheckboxes > 0) {
            const name_coll = name_collInput.value.trim();
  
            // Prepare title status for each project title (yes/no based on checkbox)
            const titleStatuses = titles.map((title, index) => {
                return {
                    title: title,
                    status: document.getElementById(`title-${index}`).checked ? 'yes' : 'no'
                };
            });
  
            // Push the card data into the cardData array
            cardData.push({
                name_coll: name_coll,
                checkedCount: checkedCount,
                totalCheckboxes: totalCheckboxes,
                titleStatuses: titleStatuses
            });
  
            displayCards(); // Call function to display all cards
  
            // Clear form after submission
            name_collInput.value = '';
            titles = [];
            titleList.innerHTML = '';
        }
    });
  

//  ==================================================================================================   
    // function displayCards() {
    //     cardContainer.innerHTML = ''; // Clear previous cards
    //     cardData.forEach((cardInfo, index) => {
    //         const card = document.createElement('div');
    //         card.classList.add('card');
    //         card.innerHTML = `
    //             <h2>${cardInfo.name_coll}</h2>
    //             <h3>Judul Proyek:</h3>
    //             <ul>
    //                 ${cardInfo.titleStatuses.map(status => `<li>${status.title} (${status.status})</li>`).join('')}
    //             </ul>
    //             <p>${cardInfo.checkedCount}/${cardInfo.totalCheckboxes} Judul Proyek Terpilih</p>
    //             <button class="edit-card" data-index="${index}">Edit</button>
    //             <button class="delete-card" data-index="${index}">Delete</button>
    //         `;
    //         cardContainer.appendChild(card);
  
    //         // Add delete functionality to each card
    //         const deleteCardButton = card.querySelector('.delete-card');
    //         deleteCardButton.addEventListener('click', () => {
    //             deleteCard(index);
    //         });
  
    //         // Add edit functionality to each card
    //         const editCardButton = card.querySelector('.edit-card');
    //         editCardButton.addEventListener('click', () => {
    //             editCard(index);
    //         });
    //     });
    // }
  
    // function deleteCard(index) {
    //     cardData.splice(index, 1); // Remove the card from the cardData array
    //     displayCards(); // Refresh the card display
    // }
  
    // function editCard(index) {
    //     const cardInfo = cardData[index];
    //     name_collInput.value = cardInfo.name_coll; // Populate the name_coll input for editing
  
    //     // Repopulate checkbox based on current checked status
    //     titles = cardInfo.titleStatuses.map(status => status.title);
    //     updateTitleList(); // Refresh checkbox list with pre-filled titles
  
    //     // Set checkbox states based on previous selection
    //     cardInfo.titleStatuses.forEach((status, i) => {
    //         document.getElementById(`title-${i}`).checked = status.status === 'yes';
    //     });
  
    //     // Remove the card from the array to allow for the updated one
    //     cardData.splice(index, 1);
    //     displayCards(); // Refresh the card display
    // }
  });