$(function(){
  const URL = "https://app.dynadomains.co/api/utils/sum"

  fetch(URL)
  .then((response) => response.json())
  .then((res) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const {total} = res
    const valuation = formatter.format(total)

    // dont show if value is low - it aint impressive brah
    if (res < 10000) { return false}
    $('#valuation').text(valuation)
    $('#valueContainer').fadeIn()
  });
});
