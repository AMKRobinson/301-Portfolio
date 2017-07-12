'use strict';

var projects = [];

function project(rawprojectData) {
  this.name = rawprojectData.name;
  this.date = rawprojectData.date;
  this.body = rawprojectData.body;
  this.language = rawprojectData.language;
  this.collaborator = rawprojectData.collaborator;
  this.image = rawprojectData.image;
  projects.push(this);
}

$(function() {
  $('.fa-bars').on('click',function(e) {
    e.preventDefault();
    $('.list').slideToggle();
  });
});
