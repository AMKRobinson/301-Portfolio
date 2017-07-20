'use strict';
var projects = [];

// Hamburger icon animation & show nav

$(function() {
  $('.fa-bars').on('click',function(e) {
    e.preventDefault();
    $('.list').slideToggle();
  });

  $('#home').css('display', 'block');
});

// Hides and shows each tab content

$('.tab').on('click', function(e) {
  var domTabs = $('.tab-content');
  domTabs.each(function() {
    $(this).css('display', 'none');
  });
  var clickedTab = e.target;
  var sectionTarget = clickedTab.dataset.content;
  console.log('sectionTarget: ', sectionTarget);
  $('#' + sectionTarget).css('display', 'block');
});

// Project constructor function

function Project (rawDataObj) {
  this.title = rawDataObj.title;
  this.body = rawDataObj.body;
  this.projectUrl = rawDataObj.projectUrl;
  this.images = rawDataObj.images;
}

// This function selects the project template and compiles the data from the constructor

Project.prototype.toHtml = function() {
  var myProjectlist = $('#projectlist-template').html();
  var compiled = Handlebars.compile(myProjectlist);
  return compiled(this);
};

// This pushes the objects into the projects array.

rawData.forEach(function(projectObject) {
  projects.push(new Project(projectObject));
});

// This appends each object to the section with the id of article

projects.forEach(function(potato) {
  $('#article').append(potato.toHtml());
});
