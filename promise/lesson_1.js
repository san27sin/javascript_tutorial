// Пример №1

function akaFetch() {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve('hello from promise')
    }, 2000)
  })
}

akaFetch()
  .then(console.log)
  .catch(console.log)

// Пример №2
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(data => console.log(data))