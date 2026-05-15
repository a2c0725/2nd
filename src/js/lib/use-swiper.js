'use strict';

$(function(){
  const swiper = new Swiper(".swiper", {
    // ページネーションが必要なら追加
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

});
