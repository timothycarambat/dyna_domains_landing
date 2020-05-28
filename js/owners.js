function getEstimate() {
  const value = $('li.active.selected').text().replace(/[^0-9\.]+/g,"")

  fetch(`https://app.dynadomains.co/api/utils/estimate?value=${value}`)
    .then(response => response.json())
    .then((response) => {
      $('#income_est').text(response.estimate)
    })
    .catch((error) => {
      $('#income_est').text('$5 - $10')
    })
}

function setupSlider() {
  let html = ''

  if ($(".navbar-toggler").is(':visible')){
    html =`
      <div class="range">
        <input type="range" min="1" max="4" steps="1" value="1">
      </div>

      <ul class="range-labels">
        <li class="active selected">≤ $5,000</li>
        <li> $15,000 </li>
        <li> $50,000 </li>
        <li> $100,000 </li>
      </ul>
    `
  } else {
    html =`
    <div class="range">
      <input type="range" min="1" max="7" steps="1" value="1">
    </div>

    <ul class="range-labels">
      <li class="active selected">≤ $5,000</li>
      <li> $10,000 </li>
      <li> $15,000 </li>
      <li> $25,000 </li>
      <li> $55,000 </li>
      <li> $75,000 </li>
      <li> $100,000+ </li>
    </ul>
    `
  }

  $('.slider').html(html)
}


$(function(){
  setupSlider()
  getEstimate()

  var sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

  document.body.appendChild(sheet);
  const divisor = 100 / ($('.range-labels > li').length - 1)
  var getTrackStyle = function (el) {
    var curVal = el.value,
        val = (curVal - 1) * divisor,
        style = '';

    // Set active label
    $('.range-labels li').removeClass('active selected');

    var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('selected');

    // Change background gradient
    for (var i = 0; i < prefs.length; i++) {
      style += '.range {background: linear-gradient(to right, #3da1ff 0%, #3da1ff ' + val + '%, #fff ' + val + '%, #fff 100%)}';
      style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #3da1ff 0%, #3da1ff ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
    }

    getEstimate()

    return style;
  }

  $rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
  });

  // Change input value on label click
  $('.range-labels li').on('click', function () {
    var index = $(this).index();

    $rangeInput.val(index + 1).trigger('input');
  });

})
