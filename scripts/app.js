'use strict';
var projects = [];

$(function() {
  $('.fa-bars').on('click',function(e) {
    e.preventDefault();
    $('.list').slideToggle();
  });

  $('#home').css('display', 'block');
});

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

function Project (rawDataObj) {
  this.title = rawDataObj.title;
  this.body = rawDataObj.body;
  this.projectUrl = rawDataObj.projectUrl;
  this.images = rawDataObj.images;
}
Project.prototype.toHtml = function() {
  var myProjectlist = $('#projectlist-template').html();
  var compiled = Handlebars.compile(myProjectlist);
  return compiled(this);
};

rawData.forEach(function(projectObject) {
  projects.push(new Project(projectObject));
});

projects.forEach(function(Project) {
  $('#articles').append(Project.toHtml());
});
