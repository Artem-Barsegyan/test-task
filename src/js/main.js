'use strict'

// Импорт картинок
import brooklynImg from '../assets/card-img/brooklyn-simmons-course.jpg';
import codyImg from '../assets/card-img/cody-fisher-course.jpg';
import dianneImg from '../assets/card-img/dianne-russell-course.jpg';
import guyImg from '../assets/card-img/guy-hawkins-course.jpg';
import jeromeImg from '../assets/card-img/jerome-bell-course.jpg';
import kathrynImg from '../assets/card-img/kathryn-myrphy-course.jpg';
import kristinImg from '../assets/card-img/kristin-watson-course.jpg';
import leslieImg from '../assets/card-img/leslie-alexander-li-course.jpg';
import marvinImg from '../assets/card-img/marvin-mckinney-course.jpg';

// DOM элементы
const menuList = document.querySelector('.nav__list');
const searchInput = document.querySelector('.search__field');
const searchIcon = document.querySelector('.search__icon');
const cardsContainer = document.querySelector('.course-cards');
const burgerBtn = document.querySelector('.header__burger-btn');
const burgerMenu = document.querySelector('.nav');

// Навигация
const menu = [
    { category: 'All', isActive: true, id: Math.random().toString(16).slice(2), categoryId: '1' },
    { category: 'Marketing', isActive: false, id: Math.random().toString(16).slice(2), categoryId: '2' },
    { category: 'Management', isActive: false, id: Math.random().toString(16).slice(2), categoryId: '3' },
    { category: 'HR & Recruiting', isActive: false, id: Math.random().toString(16).slice(2), categoryId: '4' },
    { category: 'Design', isActive: false, id: Math.random().toString(16).slice(2), categoryId: '5' },
    { category: 'Development', isActive: false, id: Math.random().toString(16).slice(2), categoryId: '6' },
]

// Карточки курсов
const courseCards = [
    {
        authorImg: brooklynImg,
        direction: { title: 'Development', theme: 'development' },
        courseName: 'Highload Software Architecture',
        price: '$600',
        author: 'Brooklyn Simmons',
        id: Math.random().toString(16).slice(2),
        categoryId: '6'
    },
    {
        authorImg: codyImg,
        direction: { title: 'Design', theme: 'design' },
        courseName: 'User Experience. Human-centered Design',
        price: '$240',
        author: 'Cody Fisher',
        id: Math.random().toString(16).slice(2),
        categoryId: '5'
    },
    {
        authorImg: dianneImg,
        direction: { title: 'Management', theme: 'management' },
        courseName: 'Business Development Management',
        price: '$400',
        author: 'Dianne Russell',
        id: Math.random().toString(16).slice(2),
        categoryId: '3'
    },
    {
        authorImg: guyImg,
        direction: { title: 'Design', theme: 'design' },
        courseName: 'Graphic Design Basic',
        price: '$500',
        author: 'Guy Hawkins',
        id: Math.random().toString(16).slice(2),
        categoryId: '5'
    },
    {
        authorImg: jeromeImg,
        direction: { title: 'Marketing', theme: 'marketing' },
        courseName: 'The Ultimate Google Ads Training Course',
        price: '$100',
        author: 'Jerome Bell',
        id: Math.random().toString(16).slice(2),
        categoryId: '2'
    },
    {
        authorImg: kathrynImg,
        direction: { title: 'HR & Recruiting', theme: 'recruiting' },
        courseName: 'Human Resources – Selection and Recruitment',
        price: '$150',
        author: 'Kathryn Murphy',
        id: Math.random().toString(16).slice(2),
        categoryId: '4'
    },
    {
        authorImg: kristinImg,
        direction: { title: 'Marketing', theme: 'marketing' },
        courseName: 'Brand Management & PR Communications',
        price: '$530',
        author: 'Kristin Watson',
        id: Math.random().toString(16).slice(2),
        categoryId: '2'
    },
    {
        authorImg: leslieImg,
        direction: { title: 'HR & Recruiting', theme: 'recruiting' },
        courseName: 'HR  Management and Analytics',
        price: '$200',
        author: 'Leslie Alexander Li',
        id: Math.random().toString(16).slice(2),
        categoryId: '4'
    },
    {
        authorImg: marvinImg,
        direction: { title: 'Management', theme: 'management' },
        courseName: 'Product Management Fundamentals',
        price: '$480',
        author: 'Marvin McKinney',
        id: Math.random().toString(16).slice(2),
        categoryId: '3'
    },
]

// Функция рендера меню
function renderMenu(list) {
    const menuItem = list.map(({ category, isActive, id, categoryId }) => {
        const totalNum = getTotalNum(categoryId)
        let allCourserNum = courseCards.length;
        return (`<li class="nav__item"><a class="${isActive ? 'nav__link nav__link--active' : 'nav__link'}" href="#" data-id="${id}" data-category-id="${categoryId}" data-total-num="${categoryId === '1' ? allCourserNum : totalNum}">${category}</a></li>`);
    })
    menuList.innerHTML = menuItem.join('');
}

// Функция рендера списка
function renderCards(cards) {
    const courseItem = cards.map(({ authorImg, direction, courseName, price, author, id }) => {
        return (
            `<div class="card-item" data-id="${id}">
          <img src="${authorImg}" alt="author">
          <div class="card-item__description">
            <span class="card-item__subtitle card-item__subtitle--${direction.theme}">${direction.title}</span>
            <span class="card-item__title">${courseName}</span>
            <div class="card-item__footer">
              <span>${price}</span>
              <span>by ${author}</span>
            </div>
          </div>
        </div>`
        )
    })
    cardsContainer.innerHTML = courseItem.join('');
}

// Функция рендера активного пункта меню и списка
let updatedContent;
let updatedCards = courseCards;

function renderUpdatedContent(menuContainer, list) {
    menuContainer.addEventListener('click', (e) => {
        const currentList = list || menu;
        const activeLink = e.target.closest('.nav__link');
        if (!activeLink) return;
        searchInput.value = '';
        searchIcon.style.display = 'block';
        const clickedId = activeLink.dataset.id;
        const categoryId = activeLink.dataset.categoryId;
        const newMenu = currentList.map(item => {
            return { ...item, isActive: item.id === clickedId }
        });
        updatedContent = newMenu;
        renderMenu(updatedContent);

        const newCourseCards = courseCards.filter((item) => {
            if (categoryId === '1') {
                return true;
            } else {
                return item.categoryId === categoryId
            }
        })
        updatedCards = newCourseCards;
        renderCards(newCourseCards);
    })
}

// Функция поиска
function handleInput() {
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value) {
            searchIcon.style.display = 'none';
        } else {
            searchIcon.style.display = 'block';
        }
        const searchTerm = value.toLowerCase().trim();
        let filteredCards;
        if (searchTerm) {
            filteredCards = updatedCards.filter((item) => {
                return item.courseName.toLowerCase().includes(searchTerm) ||
                    item.direction.title.toLowerCase().includes(searchTerm) ||
                    item.author.toLowerCase().includes(searchTerm)
            })
        } else {
            filteredCards = updatedCards;
        }
        renderCards(filteredCards);
    })
}

// Функция получения общего количества курсов каждой категории
function getTotalNum(str) {
    const totalNum = courseCards.filter(({ categoryId }) => {
        return categoryId === str
    })
    return totalNum.length;
}

// Функция для бургер-меню
function handleBurgerMenu() {
    document.addEventListener('click', (e) => {
        if (e.target === burgerBtn || burgerBtn.contains(e.target)) {
            burgerBtn.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        } else if (e.target.classList.contains('nav__link')) {
            burgerBtn.classList.remove('active');
            burgerMenu.classList.remove('active');
        } else if (!burgerMenu.contains(e.target)) {
            burgerBtn.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });
}

// Рендер контента
function mainRender() {
    renderMenu(menu);
    renderCards(courseCards);
    renderUpdatedContent(menuList, updatedContent);
    handleInput();
    handleBurgerMenu();
}

mainRender();