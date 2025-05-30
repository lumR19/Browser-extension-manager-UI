import './index.css';


// theme switch (light-dark mood)
const themeBtn = document.getElementById('theme-btn')
const currentTheme = localStorage.getItem('theme')

if(currentTheme){
  document.documentElement.setAttribute('data-theme', currentTheme)
}

themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')

  if(currentTheme === 'dark'){
    document.documentElement.removeAttribute('data-theme')
    themeBtn.innerHTML = '<img src="/images/icon-moon.svg">'
    localStorage.setItem('theme','light')
  }else{
    document.documentElement.setAttribute('data-theme', 'dark')
    themeBtn.innerHTML = '<img src="/images/icon-sun.svg">'
    localStorage.setItem('theme', 'dark')
  }
})


// Extensions grid
const extensionsGrid = document.getElementById('extensions-grid')
const filterBtnsContainer = document.getElementById('filter-btns')
const filterBtns = document.querySelectorAll('.filter-btn')
let extensionsData = []
let currentFilter = 'all'

async function fetchExtensions() {
  const res = await fetch('/data.json')
  extensionsData = await res.json()
  applyFillter(currentFilter)
  
}

function displayExtensions(extensions){
 extensionsGrid.innerHTML = ''

 extensions.forEach(extension => {
  const item = document.createElement('div')
  item.classList.add('item')
  item.dataset.name = extension.name

  item.innerHTML = `
    <div class="top">
     <img src=${extension.logo} alt="${extension.name}">
     <div class="extension-info">
        <div class="name">${extension.name}</div> 
        <div class="description">${extension.description}</div>
     
      </div>
    </div>

    <div class="bottom">
       <button class="remove-btn">Remove</button>
       <div class="toggle-switch">
         <input class="toggle-input"
             id="toggle-${extension.name}"
             type="checkbox"
             ${extension.isActive ? 'checked' : ''}>
         <label class="toggle-label" for="toggle-${extension.name}"></label>
       </div>
    </div>
  
  `
  extensionsGrid.appendChild(item)
 });
}

function applyFillter(filter){
  currentFilter = filter
  
  filterBtns.forEach(btn =>{
    btn.classList.toggle('active',btn.id === filter)

  })

  let filteredData
  switch(filter){
    case 'all':
      filteredData = extensionsData
      break

    case 'active':
      filteredData = extensionsData.filter(ext => ext.isActive)
      break

    case 'inactive':
      filteredData = extensionsData.filter(ext => !ext.isActive)
      break
  }

  displayExtensions(filteredData)

}

//Event handlers
filterBtnsContainer.addEventListener('click', handleFilterClick)

extensionsGrid.addEventListener('click', handleGridClick)
extensionsGrid.addEventListener('change', handleToggle)

function handleFilterClick(e){
  if(e.target.classList.contains('filter-btn')){
    applyFillter(e.target.id)
  }
}


function handleGridClick(e){
  if(e.target.classList.contains('remove-btn')){
    const item = e.target.closest('.item')
    const name = item.dataset.name
    extensionsData = extensionsData.filter(ext => ext.name !== name)
    applyFillter(currentFilter)
  }
}

function handleToggle(e) {
  if(e.target.classList.contains('toggle-input')){
    const item = e.target.closest('.item')
    const name = item.dataset.name

    const extension = extensionsData.find(ext => ext.name === name)
    if(extension){
      extension.isActive = e.target.checked
    }
  }
}


fetchExtensions()

