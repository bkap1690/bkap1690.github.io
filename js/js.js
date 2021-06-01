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
    if ($(this).scrollTop() > 100) {
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
  const zoomingLight = new Zooming({
    bgColor: '#fff',
  });

  const zoomingDark = new Zooming({
    bgColor: '#000',
  });
});

if (window.CSS && CSS.supports('color', 'var(--primary)')) {
  var toggleColorMode = function toggleColorMode(e) {
    // Switch to Light Mode
    if (e.currentTarget.classList.contains('light--hidden')) {
      // Sets the custom html attribute
      document.documentElement.setAttribute('color-mode', 'light'); // Sets the user's preference in local storage

      localStorage.setItem('color-mode', 'light');
      return;
    }
    /* Switch to Dark Mode
    Sets the custom html attribute */
    document.documentElement.setAttribute('color-mode', 'dark'); // Sets the user's preference in local storage

    localStorage.setItem('color-mode', 'dark');
  }; // Get the buttons in the DOM

  var toggleColorButtons = document.querySelectorAll('.color-mode__btn'); // Set up event listeners

  toggleColorButtons.forEach(function (btn) {
    btn.addEventListener('click', toggleColorMode);
  });
} else {
  // If the feature isn't supported, then we hide the toggle buttons
  var btnContainer = document.querySelector('.color-mode__header');
  btnContainer.style.display = 'none';
}
// This code assumes a Light Mode default
if (
  /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
  localStorage.getItem('color-mode') === 'dark' ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localStorage.getItem('color-mode'))
) {
  // if true, set the site to Dark Mode
  document.documentElement.setAttribute('color-mode', 'dark');
}
