const shadowWrapper = document.createElement('div');
shadowWrapper.id = "shadow-wrapper";
script = document.createElement('script');

document.body.appendChild(shadowWrapper);

const host = document.getElementById('shadow-wrapper');
const shadowRoot = host.attachShadow({ mode: 'closed' });

function loadDirectPriceShadowDOM(){
      shadowRoot.innerHTML += `
      <div class="cd-content focus" id="draggable"><img class="cd-logo" src="${extension_icon}" alt="${extension_name}">
        <span id="open-modal" class="triger-modal" data-triger="modal-demo">Earn <span id="pts">0</span> Points when Purchased</span>
        <div class="close-sm" id="close">&times;</div>
      </div>
      <div class="modal-wrap" id="modal-main">
        <div class="modal-container">
          <button class="close" id="close-modal">&times;</button>
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user">User</span>! Thanks for saving with us. We Save you Save!</h6>
          </div>
          <div class="modal-content">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div><div class="col-md-8 col-sm-8 col-xs-8 modal-body-text" style="">You Qualify for the rewards earned from this purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-tag.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="dp"> 0</div><div class="col-md-8 col-sm-8 col-xs-8">Earn Points from this Purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="40" height="40"/></div><div class="col-md-2 col-sm-2 col-xs-2" id="sp"> 0</div><div class="col-md-4 col-sm-4 col-xs-4" id="pts_msg">Total Points Balance</div><div class="col-md-4 col-sm-4 col-xs-4" id="reward"></div>
            </div>
          </div>
        </div>
      </div>`;

    shadowRoot.innerHTML += `
    <div class="modal-wrap" id="modal-reward-amount">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal-amount">&times;</button>
          <div class="modal-header">
            <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user1">User</span>! Thanks for saving with us. We Save you Save!</h6>
          </div>
          <div class="modal-content">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4"><img class="cd-logo-b" src="${extension_icon}" alt="${extension_name}"></div>
              <div class="col-md-8 col-sm-8 col-xs-8 modal-body-text">You Qualify for the rewards earned from this purchase!</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row row-grey">
              <div class="col-md-4 col-sm-4 col-xs-4"><input class="reward-amt" id="reward_amt" type="text" /></div>
              <div class="col-md-4 col-sm-4 col-xs-4"><span id="est_pts">100</span>Points = $<span id="est_usd">1</span><p  class="pts-validation-msg" id="pts_validation_msg"><p></div>
              <div class="col-md-4 col-sm-4 col-xs-4"><a href="#" id="next-modal">Redeem Reward!</a></div>
            </div>
            <div class="row row-grey">
              <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>
              <div class="col-md-2 col-sm-2 col-xs-2" id="tpb"> 0</div>
              <div class="col-md-8 col-sm-8 col-xs-8" id="pts_msg">Total Points Balance</div>
            </div>
          </div>
      </div>
    </div>
    `;
    shadowRoot.innerHTML += `
    <div class="modal-wrap" id="modal-reward">
      <div class="modal-container">
        <button class="close" id="close-rewardmodal">&times;</button>
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel"><span class="plus">+</span> Welcome <span id="user2">User</span>! Now for the fun part!</h6>
        </div>
        <div class="modal-content">
          <div class="row row-grey">
            <div class="col-md-2 col-sm-2 col-xs-2"><img src="${chrome.extension.getURL("assets/icons/cd-points.png")}" width="50" height="50"/></div>
            <div class="col-md-2 col-sm-2 col-xs-2" id="pb"> 0</div><div class="col-md-8" id="pts_msg">Total Points Balance</div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="card-container">
                <ul class="cards" id="cards">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

   
    chrome.storage.local.get('userid', function(result){
      if(result.userid!==undefined){
        user_id = result.userid;
        shadowRoot.getElementById("user").innerText = user_id;
        shadowRoot.getElementById("user1").innerText = user_id;
        shadowRoot.getElementById("user2").innerText = user_id;
      }
    });  
    shadowRoot.getElementById('reward_amt').addEventListener("keyup", function(){
      shadowRoot.getElementById('est_usd').innerText = this.value / 100;
      shadowRoot.getElementById('est_pts').innerText = this.value;
     });
var cartid = '12345gh';    
chrome.runtime.sendMessage(
  {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'cartprice/v2/pricehook?cartid='+encodeURIComponent(cartid), method: 'GET'},
  function(result){
    result = JSON.parse(result);
    if(result.body.qualified == "Y"){
        // window.cart_subtotal = result.body.subtotal;
        // nodes = document.body.querySelectorAll('div');
        // [].forEach.call(nodes, function(div) {
        // console.log(div.lastElementChild);
          // if(div.lastChild.innerText.match(/\$/)!=null){
          //   console.log(div);
          // }
        // });
        //.match(/(^(US ){0,1}(rs\.|Rs\.|RS\.|\$|₹|INR|USD|CAD|C\$){0,1}(\s){0,1}[\d,]+(\.\d+){0,1}(\s){0,1}(AED){0,1}$)/)

        //cart page
        //commerce direct
        if($('.cart-subtotal__price').length > 0)
        window.cart_subtotal = $('.cart-subtotal__price').text().replace(",","").match(/\d+/)[0];
        //aquatalia
        else if($('.product-subtotal').length > 0)
        window.cart_subtotal = $('.product-subtotal').text().replace(",","").match(/\d+/)[0];
        //Alloy Apparel
        else if($('.cart-total-value').length > 0) 
        window.cart_subtotal = $('.cart-total-value').text().replace(",","").match(/\d+/)[0];
        //hurlay
        else if($('.bfx-product-subtotal').length > 0 )
        window.cart_subtotal = $('.bfx-product-subtotal').text().replace(",","").match(/\d+/)[0];
        //AtmosRX
        else if($('.order-txt').length > 0 )
        window.cart_subtotal = $('.order-txt > p:first').text().replace(",","").match(/\d+/)[0];
        else if($('.order-price').length > 0 )
        window.cart_subtotal = $('.order-price > .value').text().replace(",","").match(/\d+/)[0];
        else if($('.saso-cart-original-total').length > 0 )
        window.cart_subtotal = $('.saso-cart-original-total').text().replace(",","").match(/\d+/)[0];
        else if($('.cart__subtotal').length > 0 )
        window.cart_subtotal = $('.cart__subtotal > .saso-cart-total').text().replace(",","").match(/\d+/)[0];
        else if($('.finalPriceAlign').length > 0 )
        window.cart_subtotal = $('.finalPriceAlign').text().replace(",","").match(/\d+/)[0];
        else if($('.hulkapps-cart-original-total').length > 0 )
        window.cart_subtotal = $('.hulkapps-cart-original-total > .money').text().replace(",","").match(/\d+/)[0];
        else if($('#subTotal').length > 0 )
        window.cart_subtotal = $('#subTotal').text().replace(",","").match(/\d+/)[0];
        else if($('#ShoppingCartDetails1_ShoppingCartShippingTaxCalculator1_lblcartsubtotal').length > 0 )
        window.cart_subtotal = $('#ShoppingCartDetails1_ShoppingCartShippingTaxCalculator1_lblcartsubtotal').text().replace(",","").match(/\d+/)[0];
        //checkout page
        else if($('.order-summary__emphasis').length > 0 )
        window.cart_subtotal = $('.order-summary__emphasis').text().replace(",","").match(/\d+/)[0];
        alert('Cart Total: '+window.cart_subtotal);
        chrome.storage.local.get('data', function(result){
          z = JSON.parse(result.data);
          window.discount_amount = z.sale_commission;
          alert('Discount Amount: '+window.discount_amount);
          // var direct_price = parseFloat(window.cart_subtotal)-window.discount_amount;
          // var direct_price = (((parseFloat(window.discount_amount).toFixed(2) * parseFloat(.75).toFixed(2)).toFixed(2) * parseFloat(window.cart_subtotal)).toFixed(2) * 100.00).toFixed(2);
          var direct_price = (parseFloat(window.discount_amount) * parseFloat(0.75) * parseFloat(window.cart_subtotal) * 100).toFixed(2);
          cart_data = {
            discount:window.discount_amount,
            cart_total:window.cart_subtotal,
            points:direct_price
          }
          chrome.storage.local.set({cart_data:JSON.stringify(cart_data)},function(){
            console.log('Cart Data Saved',JSON.stringify(cart_data));
          });
          shadowRoot.getElementById('dp').innerText = direct_price;
          shadowRoot.getElementById('pts').innerText = direct_price;
       
       })
    }
  }
);

chrome.storage.local.get(['userid','opix_data'], function(result){
  console.log(result);
  if(result.userid!==undefined){
    user_id = result.userid;
    var opix_data = JSON.parse(result.opix_data);
    uid = opix_data.uid;
    vid = opix_data.vid;
    
   
    chrome.runtime.sendMessage(
      {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'userpts?userid='+encodeURIComponent(user_id)+'&uid='+encodeURIComponent(uid)+'&vid='+encodeURIComponent(vid), method: 'GET'},
      function(result){
        result = JSON.parse(result);
        if(result.body.qualified == "Y"){
            const discount = result.body.discount;
              shadowRoot.getElementById('sp').innerText = parseFloat(discount).toFixed(2);
              shadowRoot.getElementById('tpb').innerText = parseFloat(discount).toFixed(2);
              shadowRoot.getElementById('pb').innerText = parseFloat(discount).toFixed(2);
              shadowRoot.getElementById('reward').innerHTML = '<a href="#" id="rewardlink">Redeem Rewards!</a>';
              chrome.runtime.sendMessage(
                {contentScriptQuery: 'apiTango',url: tangocard_api_endpoint+'catalogs',token:tangocard_token, method: 'GET'},
                function(result){
                  var data = JSON.parse(result);
                  var frame = shadowRoot.getElementById('cards');
                  
                  data.brands.forEach(function(brand,index){
                    if(brand.brandName.match(/(Commerce Direct)/g)){
                    var cardimage = document.createElement('img');
                    cardimage.src = brand.imageUrls["130w-326ppi"];
                    cardimage.title = "Click to Redeem!"
                    var li = document.createElement("li");
              
                    li.classList.add('card');
                    li.setAttribute('utid', brand.items[0].utid);
                    li.appendChild(cardimage);
                    frame.appendChild(li);
                    
                    }
                  })
                  let listItems = shadowRoot.querySelectorAll('.card-container li');
                  listItems.forEach((item, index) => {
                    item.addEventListener('click', (event) => {
                      // makeOrder(event.currentTarget.getAttribute('utid'),discount);
                      makeOrder(event.currentTarget.getAttribute('utid'));
                    });
                   
                  });
                    }
              );

              
              var openRewardModalAmt = shadowRoot.getElementById('rewardlink');
              var rewardModalAmt = shadowRoot.getElementById('modal-reward-amount');
              var closeRewardModalAmt = shadowRoot.getElementById('close-rewardmodal-amount');
              var rewardModal = shadowRoot.getElementById('modal-reward');
              
              openRewardModalAmt.addEventListener('click', function(){
                rewardModalAmt.classList.toggle('visible');
              });

              closeRewardModalAmt.addEventListener('click', function(){
                rewardModalAmt.classList.remove('visible');
              });

              var openRewardModal = shadowRoot.getElementById('next-modal');
              var closeRewardModal = shadowRoot.getElementById('close-rewardmodal');
              
              openRewardModal.addEventListener('click', function(){
                // var asked_amt = (parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2)/100.00).toFixed(2);
                var asked_amt = parseFloat(shadowRoot.getElementById("reward_amt").value).toFixed(2);
               
                chrome.runtime.sendMessage(
                  {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'userpts/ptsamt?userid='+encodeURIComponent(user_id)+'&uid='+encodeURIComponent(uid)+'&vid='+encodeURIComponent(vid)+'&ptsamt='+asked_amt, method: 'GET'},
                  function(result){
                    result = JSON.parse(result);
                    if(result.body.qualified == "Y"){
                      chrome.storage.local.set({asked_amt:asked_amt},function(){
                        console.log('Amount Stored!'+asked_amt);
                      });
                      shadowRoot.getElementById("pts_validation_msg").innerText = '';
                      rewardModal.classList.toggle('visible');
                    }else{
                        shadowRoot.getElementById("pts_validation_msg").innerText = result.body.message;
                        setTimeout(function(){
                          shadowRoot.getElementById("pts_validation_msg").innerText = '';
                        },5000)
                        
                    }
                  }
                );
              });

              closeRewardModal.addEventListener('click', function(){
                rewardModal.classList.remove('visible');
              });

        }else{
          shadowRoot.getElementById('sp').innerText = 0; 
        }
        shadowRoot.getElementById('pts_msg').innerText = result.body.message;
      }
    );
    
  }
});


       
appendStyleInline(shadowRoot);
const element = shadowRoot.getElementById("draggable");if(element != null)dragElement(element);
shadowRoot.getElementById("close").addEventListener("click", function(){
  element.style.display = 'none';
});
  // Modal button
var openModal = shadowRoot.getElementById('open-modal');

// Modal ID
var modal = shadowRoot.getElementById('modal-main');

// Close modal button
var closeModal = shadowRoot.getElementById('close-modal');

// Open modal event listener
openModal.addEventListener('click', function(){
    modal.classList.toggle('visible');
});



// Close modal event listener
closeModal.addEventListener('click', function(){
    modal.classList.remove('visible');
});

 
}

chrome.storage.local.get("data",function(results){
  var cd_stat = JSON.parse(results.data);
 console.log(cd_stat);

      if(cd_stat.cd == 1){
        if(shadowRoot.getElementById("draggable_popup") == null){
          loadDirectPriceShadowDOM()
       

          }
      }
    
     
});