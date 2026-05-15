$(function () {
  var $products = $('.js-products');

  $products.imagesLoaded(function(){
    $products.masonry({
      itemSelector: '.js-product-item',
      gutter: 80,
      fitWidth: true,
    });
  });
});
