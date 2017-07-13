'use strict';
var articles = [];

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

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.removeClass();
  $newArticle.addClass('name');
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);
  // appending object properties to html
  $newArticle.find('h1').html(this.title);
  // $newArticle.find('a').html(this.language);
  // $newArticle.find('a').attr('href',this.projectUrl);
  $newArticle.find('section').html(this.body);
  $newArticle.find('time').attr('datetime',this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#projects').append(article.toHtml());
});
