/*
  Цель задания: Разработать функционал для удаления фильма из списка с использованием паттерна MVC. После удаления фильма, необходимо отобразить сообщение "Фильм успешно удалён!" в message-box

  При возникновении сложностей можете ознакомиться с пошаговым планом реализации ниже, но лучше попробовать сначала самостоятельно 🧙‍♂️

Пошаговый план реализации:

1. Реализовать метод deleteMovie в объекте model:
  - метод должен принимать id фильма, который необходимо удалить
  - метод должен удалить фильм из массива movies
  - метод должен обновить отображение фильмов на странице

2. Добавить обработчик события для удаления фильмов:
  - в метода view.init добавить обработчик события на список фильмов
  - используя делегирование событий, обработать клик на кнопке удаления фильма
  - при клике на кнопку удаления, получить id фильма из родительского элемента и передать его в метод deleteMovie объекта controller

3. Реализовать метод deleteMovie в объекте controller:
  - метод должен принимать id фильма
  - метод должен передать id фильма в метод deleteMovie объекта model
  - метод должен отобразить сообщение "Фильм успешно удалён!" в message-box
*/

const model = {
    //здесь будут храниться фильмы
    movies: [],
    addMovie(title, description) {
        const id = Math.random()
        const newMovie = { id, title, description }
        this.movies.push(newMovie)
        view.renderMovies(this.movies)
    },
    // your code
    deleteMovie(movieId) {
        this.movies = this.movies.filter((movie) => {
            return movie.id !== movieId
        })
        view.renderMovies(this.movies)
    }
}

const view = {
    init() {
        //метод init дергает render и отдает из модели те фильмы, которые есть в моделе
        this.renderMovies(model.movies)

        const form = document.querySelector('.form')
        const inputTitle = document.querySelector('.input-title')
        const inputDescription = document.querySelector('.input-description')
            //при отправке формы будет выполняться событие
        form.addEventListener('submit', function(event) {
            //стоп перезагрузка
            event.preventDefault()
            const title = inputTitle.value //берем у input значение, которое ввели в value
            const description = inputDescription.value //берем у input значение, которое ввели в value
            controller.addMovie(title, description) //Мы говорим контроллеру, что мы данные собрали, пожалуйста, добавь задачу с таким title, description. 


            inputTitle.value = '' //обнуляем поле
            inputDescription.value = ''
        })

        // your code

        const ul = document.querySelector('.list')
        ul.addEventListener("click", (event) => {
            if (event.target.classList.contains('delete-button')) {
                const movieId = +event.target.parentElement.id
                controller.deleteMovie(movieId)
            }
        })
    },
    //render - только отрисовывает
    //принимаем какие-то фильмы из массива и что-то с ним делает 
    renderMovies(movies) {
        //находим элемент в DOM с классом .list и сохраняем в переменную list (ul наша)
        const list = document.querySelector('.list')
            //создаем строковую переменную
        let moviesHTML = ''
            //идем циклом по массиву movies и находя каждый фильм записываем в переменную let moviesHTML фильмы, то есто генерируем li  
        for (const movie of movies) {
            moviesHTML += `
        <li id="${movie.id}" class="movie">
          <b class="movie-title">${movie.title}</b>
          <p class="movie-description">${movie.description}</p>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
      `
        }
        //добавили в ul c классом list строчку moviesHTML фильмами
        list.innerHTML = moviesHTML
    },
    displayMessage(message, isError = false) {
        const messageBox = document.querySelector('.message-box')
        messageBox.textContent = message
        if (isError) {
            messageBox.classList.remove('success')
            messageBox.classList.add('error')
        } else {
            messageBox.classList.remove('error')
            messageBox.classList.add('success')
        }
    },
}

const controller = {
    //Вызываем метод addMovie контроллера
    addMovie(title, description) {
        if (title.trim() !== '' && description.trim() !== '') {
            model.addMovie(title, description)
            view.displayMessage('Фильм добавлен успешно!')
        } else {
            view.displayMessage('Заполните все поля!', true)
        }
    },
    // your code
    deleteMovie(movieId) {
        model.deleteMovie(movieId)
        view.displayMessage('Фильм успешно удалён!')
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init)
