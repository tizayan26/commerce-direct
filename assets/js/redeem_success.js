window.onload = function(){
    // chrome.storage.local.get(['userid','opix_data','asked_amt'], function(result){
    //     console.log(result);
    //     if(result.userid!==undefined){
    //         user_id = result.userid;
    //         var opix_data = JSON.parse(result.opix_data); 
    //         uid = opix_data.uid;
    //         vid = opix_data.vid;
    //         amount = result.asked_amt * (-1);
          
    //         chrome.runtime.sendMessage(
    //             {contentScriptQuery: 'fetchUrl',url: cdirect_api_endpoint+'userpts/used?userid='+encodeURIComponent(user_id)+'&uid='+encodeURIComponent(uid)+'&vid='+encodeURIComponent(vid)+'&pts='+amount*100, method: 'PUT'},
    //             function(result){
    //                 alert('Success!')
    //                 console.log(result);
    //             }
    //         );
    //     }
    // });
}
$(document).ready(function(){
    // console.log(document.getElementById('cart-total').innerHTML);
    console.log($('body').find('#cart-total').text());//.replace(",","").match(/\d+/)[0]
    console.log($('.description-list-description').text());//.replace(",","").match(/\d+/)[0]
})

