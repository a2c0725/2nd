$(function() {
  const container = $('.container'); // スクロール対象のcontainer
  const navLinks = $('.gnav-link'); // ナビゲーションリンクを取得
  const sections = []; // 各セクションの情報を格納する配列

  // 各セクションの開始位置と終了位置を取得
  navLinks.each(function() {
    const target = $($(this).attr('href')); // ナビゲーションリンクのhref属性からターゲットセクションを取得
    if (target.length) {
      sections.push({
        id: $(this).attr('href'), // 対応するリンクのhref（#newsなど）
        top: target.offset().top, // セクションの上端位置
        bottom: target.offset().top + target.outerHeight() // セクションの下端位置
      });
    }
  });

  // スクロール時に対応するナビゲーションリンクにクラスを追加
  container.on('scroll', function() {
    updateNavLinks(); // ナビゲーションリンクを更新
    updateLineParallax(); // パララックス効果を更新
  });

  // スクロールイベントの処理
  function updateNavLinks() {
    const scrollPosition = container.scrollTop(); // スクロール位置を正確に取得
    const footer = $('footer'); // footerセクションの取得
    const footerTop = footer.offset().top; // footerの上端位置

    let activeFound = false;
    for (let i = 0; i < sections.length; i++) {
      if (scrollPosition >= sections[i].top && scrollPosition < sections[i].bottom) {
        // 一致したナビゲーションリンクにクラスを付与
        navLinks.removeClass('current'); // すべてのリンクからcurrentクラスを削除
        $(`a[href="${sections[i].id}"]`).addClass('current'); // 該当するリンクにcurrentクラスを追加

        // bodyに現在のセクションのIDをクラスとして付与
        $('body').removeClass(function(index, className) {
          return (className.match(/(^|\s)section-\S+/g) || []).join(' '); // section-から始まるクラスを削除
        });
        $('body').addClass('section-' + sections[i].id.replace('#', '')); // section-セクションID形式で追加

        activeFound = true;
        break;
      }
    }

    // footerに到達した場合、section-footerを追加
    if (!activeFound && scrollPosition >= footerTop) {
      $('body').removeClass(function(index, className) {
        return (className.match(/(^|\s)section-\S+/g) || []).join(' '); // section-から始まるクラスを削除
      });
      $('body').addClass('section-footer'); // section-footerを追加
    }

    // スクロール位置がページの最上部に近い場合、#topセクションと見なす
    if (!activeFound && scrollPosition === 0) {
      $('body').removeClass(function(index, className) {
        return (className.match(/(^|\s)section-\S+/g) || []).join(' '); // section-から始まるクラスを削除
      });
      $('body').addClass('section-top'); // section-topを追加
    }

    if (!activeFound) {
      navLinks.removeClass('current');
    }
  }

  // パララックス効果の処理（.lineを少し遅れて追従）
  function updateLineParallax() {
    let scrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();
    let beforeTriggerOffset = windowHeight / 3;

    let lastActiveIndex = -1;

    $('.line').each(function(index) {
      let section = $(this).closest('section');
      if (section.length) {
        let sectionOffset = section.offset().top;
        let sectionBottom = sectionOffset + section.outerHeight();

        // .beforeクラスの付与
        if (scrollTop + beforeTriggerOffset > sectionOffset) {
          $(this).addClass('before'); // セクションに到達する前に .before クラスを付与
        } else {
          $(this).removeClass('before'); // 範囲外になったら .before クラスを削除
        }

        // .active クラスはセクションが表示されてから付与
        if (scrollTop + windowHeight > sectionOffset && scrollTop < sectionBottom) {
          $(this).addClass('active');
          lastActiveIndex = index; // 現在のセクションのインデックスを保存
        } else {
          $(this).removeClass('active'); // 範囲外になったら .active クラスを削除
        }
      }
    });
  }

  // スクロール時にパララックス効果を適用
  $(window).on('scroll', function() {
    updateLineParallax();
  });

  // ページ読み込み時にパララックス効果を初期化
  $(window).on('load', updateLineParallax);

  // リサイズ時にも再計算
  $(window).on('resize', updateLineParallax);

  // スムーススクロール処理
  $('a[href^="#"]').click(function(e) {
    e.preventDefault(); // デフォルトのアンカーリンク動作を無効化

    const speed = 1000;
    const target = $(this.hash);

    if (target.length) {
      // スクロール位置の計算を正確に行う
      const position = Math.floor(target.offset().top + container.scrollTop());

      // スクロールスナップを無効化
      container.css('scroll-snap-type', 'none');

      // スムーススクロールを実行
      container.animate({ scrollTop: position }, speed, 'swing', function() {
        // スクロール完了後の最終位置を取得
        const finalPosition = Math.floor(container.scrollTop());

        // スクロールがずれている場合は位置を調整
        if (finalPosition !== position) {
          container.scrollTop(position);
        }

        // 少し遅れてスナップを再有効化
        setTimeout(function() {
          container.css('scroll-snap-type', 'y mandatory');
        }, 10);

        updateNavLinks(); // ナビゲーションリンクを更新
      });
    }
  });

  // ハンバーガーメニューのクリックイベント
  let menuOpen = false;

  $('.menu-icon').on('click', function() {
    if (!menuOpen) {
      menuOpen = true;
      $('body').addClass('menu-open');
      $('body').css('overflow', 'hidden');
      $('.menu-icon').addClass('active');

      setTimeout(function() {
        $('.sp-gnav').css('right', '0'); // メニューをスライドイン
      }, 300);
    } else {
      closeMenu(); // 既に開いている場合は閉じる
    }
  });

  $('.overlay').on('click', function() {
    closeMenu();
  });

  $('.sp-gnav').on('click', function() {
    closeMenu();
  });

  function closeMenu() {
    menuOpen = false;
    $('body').removeClass('menu-open');
    $('body').css('overflow', '');
    $('.menu-icon').removeClass('active');
    $('.sp-gnav').css('right', '-100vw');
  }

  document.querySelector('.scroll-arrow').addEventListener('click', function() {
    const container = document.querySelector('.container'); // スクロール対象のcontainer
    let windowHeight = window.innerHeight; // 1画面分の高さを取得

    // container のスクロール位置を1画面分下に移動
    container.scrollBy({
      top: windowHeight,
      behavior: 'smooth' // スムーススクロールを実現
    });
  });

  // innerHeightが少ないデバイス時にclass付与
  function checkWindowSize() {
    if (window.innerHeight <= 680) {
      document.body.classList.add('small-device');
    } else {
      document.body.classList.remove('small-device');
    }
  }

  // ページロード時
  window.addEventListener('load', checkWindowSize);

  // ウィンドウサイズ変更時
  window.addEventListener('resize', checkWindowSize);
});
