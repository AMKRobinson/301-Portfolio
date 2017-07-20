'use strict';


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

Project.all = [];
console.log(Project.all);

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

Project.loadAll = function(rawData) {
  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  })
};

// This pushes the objects into the projects array.

// rawData.forEach(function(projectObject) {
//   projects.push(new Project(projectObject));
// });

// This appends each object to the section with the id of article

// projects.forEach(function(potato) {
//   $('#article').append(potato.toHtml());
// });

// fetch the json data

Project.fetchAll = function() {
  if (localStorage.rawData) {
    Project.loadAll(JSON.parse(localStorage.rawData));
  } else {
    $.getJSON('rawData.json')
      .then(function(data) {
        localStorage.setItem('rawData', JSON.stringify(data))
        console.log('Winning!' + data)
        Project.loadAll(JSON.parse(localStorage.rawData))
      }, function(err) {
        console.log('Doh!' + err)
      })
  }
}

Project.fetchAll();
