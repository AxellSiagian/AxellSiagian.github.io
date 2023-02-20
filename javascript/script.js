//Sidebar
const navbarNav = document.querySelector('.navbar-nav');
const navbarItems = document.querySelector('.navbar-nav a');
const navbarItemss = document.querySelector('.navbarItems');

document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle("active");
    navbarItems.classList.toggle("active");
    navbarItemss.classList.toggle("active");
};

//animasi muncul sesuai class
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenTeks = document.querySelectorAll('.hidden');
hiddenTeks.forEach((el) => observer.observe(el));

const hiddenTeks2 = document.querySelectorAll('.hidden2');
hiddenTeks2.forEach((el) => observer.observe(el));

const hiddenJudul = document.querySelectorAll('.hidden3');
hiddenJudul.forEach((el) => observer.observe(el));

const hiddenextra = document.querySelectorAll('.hidden4');
hiddenextra.forEach((el) => observer.observe(el));


//Cari menu
const templateitem = document.querySelector("[template-item]")
const datamenu = document.querySelector("[data-menu]")
const inputsearch = document.querySelector("[data-search]")

let semuaItem = []

inputsearch.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    semuaItem.forEach(itemm => {
        const unhideitem = itemm.namaitem.toLowerCase().includes(value)
        itemm.element.classList.toggle("hideitem", unhideitem)

        const isempty = (value==="")
        itemm.element.classList.toggle("hideitemempty", isempty)
    })
})

//file json untuk offline -> "./json/itemmenu.json"

fetch("https://api.npoint.io/9d959bee562ebd7e215c")
    .then((response) => response.json())
    .then(data => {
        semuaItem = data.map(itemm =>{
            const item = templateitem.content.cloneNode(true).children[0]

            const namaitem = item.querySelector("[data-nama]")
            const hargaitem = item.querySelector("[data-harga]")
            const deskripsiitem = item.querySelector("[data-deskripsi]")

            namaitem.textContent =  itemm.nameitem
            hargaitem.textContent = itemm.hargaitem
            deskripsiitem.textContent = itemm.deskripsiitem
            datamenu.append(item)
            return {namaitem: itemm.nameitem, hargaitem: itemm.hargaitem, deskripsiitem: itemm.deskripsiitem, element: item}
        })
    })

