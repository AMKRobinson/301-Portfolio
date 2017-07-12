'use strict';

var projects = [];

function project(name, date, body, language, collaborator, image) {
  this.name = name;
  this.date = date;
  this.body = body;
  this.language = language;
  this.collaborator = collaborator;
  this.image = image;
  projects.push(this);
}

$(function() {
  $('.fa-bars').on('click',function(e) {
    e.preventDefault();
    $('.list').slideToggle();
  });
});
