$( init);

function init(){
  $('#fullpage').fullpage({
    sectionsColor: ['#A5D8FF', '#758ECD', '#D5C6E0', '#C5979D', '#C5979D'],
    fixedElements: '#navbar',
    anchors: ['landingPage', 'about', 'madeBy']
  });
  $("form").on("submit", submitForm);
  $("#profile").on("click", Profile);
  $(".logout-link").on("click", logout);
  $(".login-link, .register-link").on("click", showPage);
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
  hideErrors();
  checkLoginState();
}

function checkLoginState(){
  if (getToken()) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}

function showPage() {
  event.preventDefault();
  var linkClass = $(this).attr("class").split("-")[0]
  $("section").hide();
  hideErrors();
  return $("#" + linkClass).show();
}

function submitForm(event){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  this.reset();

  return ajaxRequest(method, url, data, authenticationSuccessful);
}

function logout(){
  removeData();
  return loggedOutState();
}


function hideErrors(){
  return $(".alert").removeClass("show").addClass("hide");
}

function displayErrors(data){
  return $(".alert").text(data).removeClass("hide").addClass("show");
}

function loggedInState(){
  $("section, .logged-out").hide();
  $("#users, .logged-in").show();
  $.fn.fullpage.destroy();
  $("#fullpage").hide();
  $("#newsfeed").show();
}

function loggedOutState(){
  $("section, .logged-in").hide();
  $("#register, .logged-out").show();
  $("fullpage").show();
}

function authenticationSuccessful(data) {
  if (data.token) setData(data);
  checkLoginState();
}

function setData(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);
  localStorage.setItem("user-name", data.user.username);
  localStorage.setItem("user-email", data.user.email);
  localStorage.setItem("user-pic", data.user.picture_url);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeData() {
  return localStorage.clear();
}

function setRequestHeader(xhr, settings) {
  var token = getToken();
  if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader,
  }).done(function(data){
    callback(data);
  }).fail(function(data) {
    displayErrors(data.responseJSON.message);
  });
}

function Profile(data){
  event.preventDefault();
  var userId = localStorage.getItem("userId");
  return ajaxRequest("get", "http://localhost:3000/api/users/:" + userId, data, showProfile)
}

function showProfile(data){
  event.preventDefault();
  console.log(data)

  data.users.forEach(function(user) {
    // $(".users").append( '<li>' + user.local.email + '</li>' )
  })

}

function hideProfile(){
  event.preventDefault();

}


// $(init);

//  function init(){
//   $("form").on("submit", submitForm);
//   $(".logout-link").on("click", logout);
//   $(".login-link, .register-link").on("click", showPage);
//   hideErrors();
//   checkLoginState();  
// }

// function logout(){
//   removeData();
//   return loggedOutState();
// }

// function removeData() {
//   return localStorage.clear();
// }

// function checkLoginState(){
//   if (getToken()) {
//     return loggedInState();
//   } else {
//     return loggedOutState();
//   }
// }

// function checkLogInState() {

// }

// function loggedInState() {

// }

// function loggedOutState() {

// }

// function authenticationSuccessful() {

// }

// function setToken() {

// }

// function getToken() {
//   return localStorage.getItem("token");
// }

// function showProfile() {

// }

// function hideProfile() {

// }

// function setRequestHeader() {

// }

// function showPage() {

// }

// function submitForm() {

// }

// function displayJumbles() {

// }
// function ajaxRequest(method, url, data, callback) {
//   return $.ajax({
//     method: method,
//     url: url,
//     data: data,
//     beforeSend: setRequestHeader,
//   }).done(function(data){
//     callback(data);
//   }).fail(function(data) {
//     displayErrors(data.responseJSON.message);
//   });
// };