document.addEventListener("DOMContentLoaded", function (event) {
  let numWithCommas = (x) => (x == 0) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let res = 0;
  Array.from(document.getElementsByClassName('priceHidden')).forEach(x => {
    res += +x.value
  })
  document.getElementById('wishlistPriceInfo').innerHTML =
    `상품가격 ${numWithCommas(res)}원 + 배송비 무료 = 주문금액 ${numWithCommas(res)}원`;

  // price_info
  document.getElementById('wishlistSelect').addEventListener('change', function (e) {

    console.log(this.options[this.options.selectedIndex].getAttribute('data-type'));
    let selectOpt = this.options[this.options.selectedIndex];
    Array.from(document.querySelectorAll('#wishlistForm *')).forEach(x=>{
       if(x.classList.contains('couponAvail')){
         if(x.value.trim() != 'false'){

          Array.from(x.parentElement.children).forEach(x=>{
            if(x.classList.contains('price_info')){
              
              let priceValue = +x.textContent.replace(/,/gi, "");
              if(selectOpt.getAttribute('data-type') == 'rate'){
                let saleRateKrw = priceValue * +selectOpt.value / 100;
                let saleRes = priceValue - saleRateKrw;
                x.innerHTML = numWithCommas(saleRes)
              }

              if(selectOpt.getAttribute('data-type') == 'amount'){
                console.log(+selectOpt.value,'amount');
                let saleAmoutKrw = priceValue - +selectOpt.value;
                console.log(saleAmoutKrw)
                x.innerHTML = numWithCommas(saleAmoutKrw)
              }
            }

            if(x.classList.contains('priceHidden')){

              if(selectOpt.getAttribute('data-type') == 'rate'){
                let hiddenPriceValue= +x.value;
                let saleHiddenKrw = hiddenPriceValue * +selectOpt.value / 100;
                let saleHiddenRes = hiddenPriceValue - saleHiddenKrw;
                x.value = saleHiddenRes
              }

              if(selectOpt.getAttribute('data-type') == 'amount'){

              }

            }
          })
         }
       }
      })
  })


  document.getElementById('wishlistForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let selectProduct = Array.from(this.wishlist).filter(x => {
      return x.checked
    });
    if (!selectProduct.length) alert('상품을 선택해주세요.');
    console.log(selectProduct)
  })
});