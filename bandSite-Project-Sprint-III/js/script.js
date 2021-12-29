const form = document.querySelector('.comment__form'),
  nameInput = document.getElementById('name'),
  commentInput = document.getElementById('comment-field'),
  alert = document.querySelector('.comment__alert'),
  commentLength = document.querySelector('.comment__length span');

alert.style.display = 'none';

const url = 'https://project-1-api.herokuapp.com/comments?api_key=farzinjabbary';

let comments = [];

function fetchComments() {
  axios.get(url)
    .then(res => {
      return res.data;
    }).then(data => {
      comments = data;
      displayComment(comments);
      commentLength.textContent = comments.length;
    })
}

fetchComments();

form.onsubmit = function (e) {
  if (nameInput.value && commentInput.value) {
    axios({
      method: 'post',
      url: url,
      data: {
        name: nameInput.value,
        comment: commentInput.value
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => { fetchComments() })

    nameInput.value = '';
    commentInput.value = '';

  } else {
    alert.style.display = 'block';
    alert.textContent = 'Please enter valid values';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000)
  }

  e.preventDefault();
}

function displayComment(comments) {
  //Makes comment section to disappear from DOM
  document.querySelector('.comment__mainContent').innerHTML = '';

  //Loops through the comment array and render markup for each comment for form validation on line 57
  comments.forEach(item => {
    //Creates relative date
    const now = new Date();
    const nowTimestamp = now.getTime();
    const timeDiff = (nowTimestamp - item.timestamp) / 1000;
    let showTime;

    if (timeDiff < 60) {
      showTime = ' less than a minute ago';
    } else if (timeDiff > 60 && timeDiff < 3600) {
      showTime = Math.floor(timeDiff / 60) + ' minutes ago';
    } else if (timeDiff > 3600 && timeDiff < 86400) {
      showTime = Math.floor(timeDiff / 3600) + ' hour(s) ago';
    } else if (timeDiff > 86400) {
      showTime = Math.floor(timeDiff / 86400) + ' day(s) ago';
    }

    const commentUI = `<div class="comment__content" id=${item.id}> 
                           <div class="comment__content--left">
                              <span class="comment__content--imageSpan"></span>
                           </div>
                           <div class="comment__content--right">
                               <span class="comment__content--name">${item.name}</span>
                               <span class="comment__content--date">${timeDiff < 86400 ? showTime : now.toLocaleDateString(item.timestamp)}</span>
                               <span class="comment__content--span"></span>
                               <span class="comment__content--likeCount">${item.likes}</span>
                               <span class="comment__content--remove"></span>
                               <p class="comment__content--text">${item.comment}.</p>
                           </div>
                       </div>`;

    const div = document.createElement('div');
    div.innerHTML = commentUI;
    document.querySelector('.comment__mainContent').appendChild(div)
  });
}

//Add eventListener for Like button
//Since element was added to the DOM dynamicaly, Event Delegation was used
let i = 0;

document.querySelector('.comment__mainContent').addEventListener('click', function (e) {

  if (e.target.className === 'comment__content--span') {
    i += 1;
    const id = e.target.parentElement.parentElement.id;

    axios({
      method: 'put',
      url: `https://project-1-api.herokuapp.com/comments/${id}/like?api_key=farzinjabbary`,
      data: {
        likes: `${i}`
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      fetchComments(comments);
    })

  } //end of if
})

//Add Event Listener for Delete Button
document.querySelector('.comment__mainContent').addEventListener('click', function (e) {
  if (e.target.className === 'comment__content--remove') {
    const id = e.target.parentElement.parentElement.id;

    axios({
      method: 'delete',
      url: `https://project-1-api.herokuapp.com/comments/${id}?api_key=farzinjabbary`,
    }).then(() => {
      fetchComments(comments);
    })
  }
})


// JQuery plugin "waypoint" was used to fade in image and image gallery when scrolling to certain part of webpage
$('.js--wp-1').waypoint(function () {
  $('.js--wp-1').addClass('animated fadeIn')
},
  {
    offset: '50%'
  }
)

$('.js--wp-2').waypoint(function () {
  $('.js--wp-2').addClass('animated fadeIn')
},
  {
    offset: '50%'
  }
)

