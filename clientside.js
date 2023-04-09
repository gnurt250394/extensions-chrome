var script = window.document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js';// Load jQuery
window.document.getElementsByTagName('head')[0].appendChild(script);

const getPayload = () => {
    let data = {
        "_meta": {
            "noTranslate": true
        }, "appendSelector": "#container > div.box__article-top > section > div.box__button-buy", "itemSelectors": {
            "cardWrapper": ["#scrollWrap > div.scroll_cont > div > div.purchase-summary", "#scrollWrap > div.scroll_cont > div.purchase-options"],
            "item": {
                "attribute": [{

                    "targetProperty": "innerText",
                    "value": "div.purchase-summary > p.summary_title > span.option-name:nth-child(1)"
                }], "price": [{
                    "targetProperty": "innerText",
                    "value": "div.purchase-summary >  div.option-control-box > p.total-price > span.total-price--text > em"
                }], "quantity": [{
                    "targetProperty": "value",
                    "value": "div.purchase-summary > div > div.option-control--quantity > input"
                }], "title": [{
                    "targetProperty": "innerText",
                    "value": "div.purchase-summary > p.summary_title > span.option-name:nth-child(1)"
                }]
            }
        }, "name": "mg.gmarket.co.kr", "observeSelectors": {
            "totalPrice": "#scrollWrap > div.vip-order-option-button > div.vip-order-option-button--total > p > em"
        }, "orderSelectors": {
            "image": [{
                "targetProperty": "src",
                "value": "#content > div.vip-item-img > div > ul > li.swiper-slide.swiper-slide-active > img"
            }], "title": [{
                "targetProperty": "innerText", "value": "#content > div.vip-item-info.vip-box-shadow > h2 > span"
            }], "totalPrice": [{
                "targetProperty": "innerText",
                "value": "#scrollWrap > div.vip-order-option-button > div.vip-order-option-button--total > p > em"
            }]
        }
    }
    let cardWrapper = data.itemSelectors.cardWrapper
    let prices = data.itemSelectors.item.price.map(e => ({...e, type: 'price'}))
    let quantitys = data.itemSelectors.item.quantity.map(e => ({...e, type: 'amount'}))
    let titles = data.itemSelectors.item.title.map(e => ({...e, type: 'productInfo'}))
    let attributes = data.itemSelectors.item.attribute.map(e => ({...e, type: 'ProductOption'}))
    let list = prices.concat(quantitys).concat(titles).concat(attributes)
    cardWrapper.forEach(card => {
        $(card).ready(function () {
            $(card).bind('DOMSubtreeModified', function () {
                let arr = []
                list.forEach(item => {
                    console.log("-> item", item);
                    let price = ''
                    if (item.targetProperty === 'src') {
                        price = $(item.value).map(function () {
                            return {
                                [item.type]: $(this).prop('src')
                            }
                        }).get();
                    } else if (item.targetProperty === 'value') {
                        price = $(item.value).map(function () {
                            return {
                                [item.type]: $(this).val()
                            }
                        }).get();
                    } else {
                        price = $(item.value).map(function () {
                            return {
                                [item.type]: $(this).text()
                            }
                        }).get();
                    }
                    arr.push(price)
                })
                let output = [];

                for (let i = 0; i < arr[0].length; i++) {
                    let obj = {};
                    for (let j = 0; j < arr.length; j++) {
                        let key = Object.keys(arr[j][i])[0];
                        obj[key] = arr[j][i][key];
                    }
                    output.push(obj);
                }

                console.log('output', output);
            });
        });
    })

}


getPayload()
