const { fetch, alert } = window

let newFriendScore
let closestFriend
let list = []

document.querySelector('#submit').addEventListener('click', event => {
  event.preventDefault()
  fetch('/friends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('#name').value,
      image: document.querySelector('#photoLink').value,
      scores: [
        parseInt(document.querySelector('#q1').value),
        parseInt(document.querySelector('#q2').value),
        parseInt(document.querySelector('#q3').value),
        parseInt(document.querySelector('#q4').value),
        parseInt(document.querySelector('#q5').value),
        parseInt(document.querySelector('#q6').value),
        parseInt(document.querySelector('#q7').value),
        parseInt(document.querySelector('#q8').value),
        parseInt(document.querySelector('#q9').value),
        parseInt(document.querySelector('#q10').value)
      ]
    })
  })
    .then(_ => {
      console.log('New Friend Added')
      calculation()
    })
    .catch(errors => console.log(errors))
})

const calculation = _ => {
  list = []
  fetch('/friends')
    .then(response => response.json())
    .then(friends => {
      newFriendScore = friends[friends.length - 1].scores.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
      }
      )

      for (let i = 0; i < friends.length; i++) {
        list.push({
          name: friends[i].name,
          score: friends[i].scores.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue
          }
          ),
          scoreDiff: Math.abs(newFriendScore - friends[i].scores.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue
          }
          ))
        })
      }
      let lowest = Number.POSITIVE_INFINITY
      let tmp
      closestFriend = ''
      for (let i = list.length - 2; i >= 0; i--) {
        tmp = list[i].scoreDiff
        if (tmp < lowest) lowest = tmp
        if (lowest === list[i].scoreDiff) {
          closestFriend = list[i].name
          console.log(list[i].name)
        }
      }
      alert(`Your Closest Friend is ${closestFriend}`)
    })
}
