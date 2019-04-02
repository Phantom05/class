document.getElementById('cartForm').addEventListener('submit', function (e) {
  e.preventDefault();
})
document.getElementById('cartForm').addEventListener('change', function (e) {
  let Async1 = () => {
    return new Promise(function (resolve, reject) {
      let resArr = [];
      Array.from(document.querySelectorAll('#cartForm  *')).forEach(x => {
        if (x.tagName == 'INPUT') {
          if (x.checked) {
            if (x.getAttribute('data-name') != 'cart') resArr.push(x.id) ;
          } else if((x.getAttribute('data-name') == 'cart')) {
              x.setAttribute('data-name', '');
              let configJson = {
                method: 'delete',
                url: '/products/cart/del',
                data: {
                  productId: x.id,
                }
              }
              axios(configJson).then(res => {
                console.log(res.data)
              })
              Array.from(x.parentNode.children).forEach(x => {
                if (x.tagName == 'LABEL') {
                  x.textContent = '장바구니에 담기';
                  x.classList.remove('active');
                }
              })
          }
        }
      })
      resolve(resArr)
    })
  }

  let Async2 = (data) => {
    return new Promise(function (resolve, reject) {
      if (data.length) {
        let configJson = {
          method: 'put',
          url: '/products/cart',
          data: {
            productId: data[0],
          }
        }
        axios(configJson).then(res => {
            Array.from(document.querySelectorAll('#cartForm  *')).forEach(x => {
              if (x.tagName == 'INPUT' && x.id == res.data.productId) {
                x.setAttribute('data-name', 'cart');
                Array.from(x.parentNode.children).forEach(x => {
                  if (x.tagName == 'LABEL') {
                    x.textContent = '장바구니에서 빼기';
                    x.classList.add('active');
                  }
                })
              }
            })
            if (res.data.msg) {
              let idxArr = Array.from(document.querySelectorAll('#cartForm  *')).filter((x, idx) => {
                if (x.tagName == 'INPUT' && x.checked && x.getAttribute('data-name') == 'cart') return x
              });
              Array.from(idxArr[idxArr.length-1].parentNode.children).forEach(x => {
                  if (x.tagName == 'LABEL') {
                    x.textContent = '장바구니에 담기';
                    x.classList.remove('active');
                  }
                   if(x.tagName == 'INPUT'){
                     x.checked = false;
                     x.setAttribute('data-name','');
                   }
                });

              alert(res.data.msg);
            }
          })
          .catch(err => console.log(err))
      } else {
        console.log('비었음');
      }
      resolve()
    })
  }
  Async1().then(Async2)
})
