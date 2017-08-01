'use strict';
var app = app || {};

(function(module) {

// Project constructor function

  function Project (rawDataObj) {
    this.title = rawDataObj.full_name;
    this.body = rawDataObj.description || 'No Description.';
    this.projectUrl = rawDataObj.size;
    this.images = rawDataObj.private;
    this.clone_url = rawDataObj.clone_url;
  }

  Project.all = [];

// This function selects the project template and compiles the data from the constructor

  Project.prototype.toHtml = function() {
    var myProjectlist = $('#projectlist-template').html();
    var compiled = Handlebars.compile(myProjectlist);
    return compiled(this);
  };

  Project.loadAll = function(rawData) {
    console.log('rd: ', rawData);
    rawData.forEach(function(ele) {
      console.log('el', ele);
      Project.all.push(new Project(ele));
    })
  };

  function loadProjectsToDom() {
    Project.all.forEach(function(project) {
      $('#article').append(project.toHtml());
    });
  }

// fetch the json data

  Project.fetchAll = function() {
    if (localStorage.rawData) {
      Project.loadAll(JSON.parse(localStorage.repos));
      loadProjectsToDom();
    } else {
      $.getJSON('/github/users/twandalon/repos')
        .then(function(data) {
          console.log(data);
          localStorage.setItem('repos', JSON.stringify(data))
          console.log('Winning!', data)
          Project.loadAll(JSON.parse(localStorage.repos))
          loadProjectsToDom();
        }, function(err) {
          console.log('Doh!', err)
        })
    }
  }
  module.Project = Project;
  Project.fetchAll();
})(app)
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
  $('#' + sectionTarget).css('display', 'block');
});
