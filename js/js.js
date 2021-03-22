$(document).ready(function () {
  $('#secondary-nav').hide();

  // Add smooth scrolling to all links
  $('a').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

// Typing Effect on Hero Header

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML =
    '.txt-rotate > .wrap { border-right: 0.08em solid transparent }';
  document.body.appendChild(css);
};

$(function () {
  $(window).scroll(function (e) {
    if ($(this).scrollTop() > 800) {
      $('#secondary-nav').fadeIn('slow');
    } else {
      $('#secondary-nav').fadeOut('fast');
    }
  });
});

//Cross-browser smooth-scroll JS:

$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();

  var target = this.hash;
  var $target = $(target);

  $('html, body')
    .stop()
    .animate(
      {
        scrollTop: $target.offset().top,
      },
      700,
      'swing',
      function () {
        window.location.hash = target;
      }
    );
});

//Check to see if the window is top if not then display button
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $('#scroll-to-top').fadeIn();
  } else {
    $('#scroll-to-top').fadeOut();
  }
});

//Click event to scroll to top
$('#scroll-to-top').click(function () {
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    600
  );
  return false;
});

$(document).ready(function () {
  var getMax = function () {
    return $(document).height() - $(window).height();
  };

  var getValue = function () {
    return $(window).scrollTop();
  };

  if ('max' in document.createElement('progress')) {
    var progressBar = $('progress');

    progressBar.attr({
      max: getMax(),
    });

    $(document).on('scroll', function () {
      progressBar.attr({
        value: getValue(),
      });
    });

    $(window).resize(function () {
      progressBar.attr({
        max: getMax(),
        value: getValue(),
      });
    });
  } else {
    var progressBar = $('.progress-bar'),
      max = getMax(),
      value,
      width;

    var getWidth = function () {
      value = getValue();
      width = (value / max) * 100;
      width = width + '%';
      return width;
    };

    var setWidth = function () {
      progressBar.css({
        width: getWidth(),
      });
    };

    $(document).on('scroll', setWidth);
    $(window).on('resize', function () {
      max = getMax();
      setWidth();
    });
  }
});

$(window).scroll(function () {
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 100);
});

// Listen to images after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  new Zooming({
    // options...
    zIndex: '4000',
  }).listen('.img-zoomable');
});

// // you can use app's unique identifier here
// const LOCAL_STORAGE_KEY = 'toggle-bootstrap-theme';

// const LOCAL_META_DATA = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

// // you can change this url as needed
// const DARK_THEME_PATH = 'https://bootswatch.com/4/cyborg/bootstrap.min.css';

// const DARK_STYLE_LINK = document.getElementById('dark-theme-style');
// const THEME_TOGGLER = document.getElementById('theme-toggler');

// let isDark = LOCAL_META_DATA && LOCAL_META_DATA.isDark;

// // check if user has already selected dark theme earlier
// if (isDark) {
//   enableDarkTheme();
// } else {
//   disableDarkTheme();
// }

// /**
//  * Apart from toggling themes, this will also store user's theme preference in local storage.
//  * So when user visits next time, we can load the same theme.
//  *
//  */
// function toggleTheme() {
//   isDark = !isDark;
//   if (isDark) {
//     enableDarkTheme();
//   } else {
//     disableDarkTheme();
//   }
//   const META = { isDark };
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(META));
// }

// function enableDarkTheme() {
//   DARK_STYLE_LINK.setAttribute('href', DARK_THEME_PATH);
//   THEME_TOGGLER.innerHTML = '🌙 Dark';
// }

// function disableDarkTheme() {
//   DARK_STYLE_LINK.setAttribute('href', '');
//   THEME_TOGGLER.innerHTML = '🌞 Light';
// }
