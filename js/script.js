//////////// ハンバーガーメニュー（sp）
$('.btnHamburger').on('click', function () {
  $('.btnHamburger, #coverlayer, nav.navi-inner').toggleClass('is-active');
});
$('nav.navi-inner ul li a, nav.navi-inner p a').on('click', function () {
  $('.btnHamburger, #coverlayer, nav.navi-inner').removeClass('is-active');
});

//////////// ナビのスムーススクロール（tb-pc）；旧（下層からトップページのリンクが作動しない）
// $('nav a, .sp_Hamburger_logo a, h1 a').on('click', function (e) {
//   e.preventDefault();
//   var target = $($(this).attr('href'));
//   $('html, body').animate({ scrollTop: target.offset().top }, 600);
// });


//////////// ナビのスムーススクロール；旧（＃がないと作動しない）
// $('nav a, .sp_Hamburger_logo a, h1 a').on('click', function (e) {

//   // href が "#" で始まらない場合（別ページリンク）は通す
//   const href = $(this).attr('href');
//   if (!href.startsWith('#')) return;

//   // ここからスムーススクロール
//   e.preventDefault();
//   const target = $(href);
//   $('html, body').animate({ scrollTop: target.offset().top }, 600);
// });



//////////// ナビのスムーススクロール；新（＃なくてもOK）
$('nav a, .sp_Hamburger_logo a, h1 a').on('click', function (e) {
  const href = $(this).attr('href');

  // #以外のリンクは通常遷移
  if (!href || !href.startsWith('#')) return;

  // IDが存在しない時のエラー回避
  const target = $(href);
  if (!target.length) return;

  e.preventDefault();

  $('html, body').animate(
    { scrollTop: target.offset().top },
    600
  );
});


//////////// ナビリンクの色（tb-pcのみ。sp時は解除）
// $(function () {
//   var navLinks = $('nav.navi-inner a');

//   $(window).scroll(function () {
//     spの時は解除
//     if (window.innerWidth <= 599) {
//       navLinks.css('opacity', 1);
//       return;
//     }

//     tb-pcの時はスクロール量で変化
//     if ($(this).scrollTop() > 30) {
//       navLinks.css('opacity', 1);
//     } else {
//       navLinks.css('opacity', 0.2);
//     }

//   });

// });


//////////// ナビリンクの色（tb-pcのみ。sp時は解除）
$(function () {
  var navLinks = $('nav.navi-inner a');

  // 現在のページファイル名を取得
  var path = window.location.pathname;
  var page = path.split("/").pop(); // ファイル名だけ取得

  // index.html 以外は常に opacity:1
  if (page !== "index.html" && page !== "") {
    navLinks.css('opacity', 1);
    return; // ここで処理終了
  }

  // 以下、index.html のみ実行
  $(window).scroll(function () {

    // SP時は常に1
    if (window.innerWidth <= 599) {
      navLinks.css('opacity', 1);
      return;
    }

    // TB-PC時はスクロール量で変化
    if ($(this).scrollTop() > 30) {
      navLinks.css('opacity', 1);
    } else {
      navLinks.css('opacity', 0.5);
    }
  });

});




//////////// ロゴサイズ（スクロール470以上）
// $(window).on('scroll', function () {
//   var scroll = $(this).scrollTop();

//   if (scroll >= 470) {
//     $('.logo-fixed').addClass('small');
//   } else {
//     $('.logo-fixed').removeClass('small');
//   }
// });


//////////// ロゴサイズ（スクロール470以上）index.html 以外では動かさない
if (location.pathname.endsWith("index.html") || location.pathname === "/" ) {

  $(window).on('scroll', function () {
    var scroll = $(this).scrollTop();

    if (scroll >= 470) {
      $('.logo-fixed').addClass('small');
    } else {
      $('.logo-fixed').removeClass('small');
    }
  });

}


//////////// フェードインふわっと
$(window).scroll(function () {
  $('.fadein').each(function () {
    var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 150) {
      $(this).addClass('scrollin');
    }
  });
});

//////////// トップへ戻るボタンの表示・非表示（共通）
$(function () {
  var pagetop = $('.pagetop');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) pagetop.fadeIn();
    else pagetop.fadeOut();
  });

  // スムーズにトップへ戻る（共通）
  pagetop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});


//////////// slickスライド
$('.slick-autoplay').slick({
  slidesToShow: 5, // 1300px以上
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,

  responsive: [
    {
      breakpoint: 1300, // 1300px未満
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 1060, // 1060px未満
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 705, // 705px未満
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 600, // 600px未満
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


//////////// TOP WORKS タブ切り替え処理
// 指定されたハッシュID（例: #tab1）に対応するタブを表示する関数
function GethashID(hashIDName) {
  if (hashIDName) {
    // .tab li 内のすべてのリンクを走査
    $('.tab li').find('a').each(function () {
      var idName = $(this).attr('href'); // 各リンクの href 属性（例: #tab1）

      // クリックされたタブ or URLのハッシュが一致した場合
      if (idName == hashIDName) {
        var parentElm = $(this).parent(); // 対応する li 要素

        // すべてのタブから active を外し、対象タブだけ active に
        $('.tab li').removeClass("active");
        $(parentElm).addClass("active");

        // すべてのタブコンテンツを非表示にし、対象タブだけ表示
        $(".tab_area").removeClass("is-active");
        $(hashIDName).addClass("is-active");
      }
    });
  }
}

// タブがクリックされたときの処理
$('.tab a').on('click', function () {
  var idName = $(this).attr('href'); // href に設定された ID名を取得
  GethashID(idName);                 // タブ切り替え実行
  return false;                      // ページ内リンクのデフォルト動作を無効化
});

// ページ読み込み時の処理
$(window).on('load', function () {
  // 最初のタブと最初のコンテンツを強制的に表示状態にする
  $('.tab li').eq(0).addClass("active");
  $('.tab_area').eq(0).addClass("is-active");

  // URLにハッシュ（#tab2 など）がある場合、そのタブを表示
  var hashName = location.hash;
  GethashID(hashName);
});



//////////// 躍動するボタン文字
document.querySelectorAll('.split-chars').forEach(el => {
  // いま入っている子要素（iタグなど）を退避
  const preservedNodes = Array.from(el.childNodes)
    .filter(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim() === '');

  // テキストノードだけ取得
  const textNodes = Array.from(el.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');

  // テキストノードを削除
  textNodes.forEach(node => el.removeChild(node));

  // 文字用 span を追加
  let index = 0;
  textNodes.forEach(node => {
    Array.from(node.textContent).forEach(ch => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.setProperty('--i', index++);
      el.appendChild(span);
    });
  });
});





//////////// モーダル起動
$(function () {

  const $modal  = $('#modal-overlay');
  const $slider = $('.modal-slider');
  const $title  = $('.modal-title');
  const $text   = $('.modal-text');

  const $targets = $(
    '.slick-autoplay section figure img, ' +
    '.gallery-box_ots figure img'
  );

  $targets.on('click', function () {

    const index = $targets.index(this);
    $slider.empty();

    // スライド生成（title / text 両方持たせる）
    $targets.each(function () {
      $slider.append(
        `<div 
          data-title="${$(this).data('title')}"
          data-text="${$(this).data('text')}"
        >
          <img src="${$(this).data('large')}" alt="">
        </div>`
      );
    });

    $slider.not('.slick-initialized').slick({
      initialSlide: index,
      arrows: true,
      dots: false,
      infinite: true,
      swipe: true
    });

    // 初期表示
    updateMeta(index);

    // スライド変更時
    $slider.on('afterChange', function (e, slick, current) {
      updateMeta(current);
    });

    function updateMeta(i) {
      const $current = $($slider.slick('getSlick').$slides[i]);
      $title.text($current.data('title'));
      $text.text($current.data('text'));
    }

    $modal.addClass('is-open');
    $('body').css('overflow', 'hidden');
  });

  $('.modal-close').on('click', closeModal);

  $modal.on('click', function (e) {
    if ($(e.target).is('#modal-overlay')) closeModal();
  });

  function closeModal() {
    $modal.removeClass('is-open');
    $('body').css('overflow', '');

    if ($slider.hasClass('slick-initialized')) {
      $slider.off('afterChange');
      $slider.slick('unslick');
    }
  }

});


    // sp時は矢印なしでスワイプ
$slider.slick({
  initialSlide: index,
  arrows: true,
  dots: false,
  infinite: true,
  swipe: true,

  responsive: [
    {
      breakpoint: 705,
      settings: {
        //  arrows: false,  ← SPで非表示
        swipe: true      // ← 指スワイプOK
      }
    }
  ]
});
