const tables_content = document.querySelector(".tables_content");



function load_functions(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
    });
}

load_functions();

function loadJSON(){
<<<<<<< Updated upstream
    fetch("./data/main.db")
=======
    fetch("employees.json")
>>>>>>> Stashed changes
    .then(response => response.json())
    .then(data => {
        let html = '';
        data.forEach(element => {
            html += `
            
            <div class="tables_content" id="table">

                <div class="tables_items">
                <div class="items_size" data-field ="full_name">
                    <p>${element.id}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>              
                <div class="items_size" data-field ="full_name">
                    <p>${element.full_name}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="job">
                    <p>${element.job}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="specialty">
                    <p>${element.specialty}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="legal_hours">
                    <p>${element.legal_hours}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="total_hours">
                    <p>${element.total_hours}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="allocated_hours">
                    <p>${element.allocated_hours}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="outsourced">
                    <p>${element.outsourced}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <div class="items_size" data-field="local">
                    <p>${element.local}</p>
                </div>
                <span style="height: 30px; width:.5px; background-color: #7096d1; margin: auto;"></span>
                <ion-icon class="tables_icons edit" name="create-outline"></ion-icon>
                <ion-icon class="tables_icons delete" name="trash-outline"></ion-icon>
                </div>
            </div>

        `;

        });
        tables_content.innerHTML = html;
    })
}
