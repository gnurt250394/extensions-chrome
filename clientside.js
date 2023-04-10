var script = window.document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js';// Load jQuery
window.document.getElementsByTagName('head')[0].appendChild(script);

const convertPrice = (str, type) => {
    let price = str
    if (
        type == 'price' ||
        type == 'totalPrice' ||
        type == 'amount'
    ) {
        const pattern = /[\d,.]+/;
        const match = str?.match(pattern);
        if (match) {
            const amount = parseFloat(match[0].replace(/,/g, ''));
            price = amount;
        }
    }
    return price
}
const converData = (input) => {
    console.log("-> arr", input);
    let output = [];

    for (let i = 0; i < input[0].length; i++) {
        let obj = {};
        for (let j = 0; j < input.length; j++) {
            console.log("-> obj", obj);
            console.log("-> input[j][i]", input[j][i]);
            obj = {...obj, ...input[j][i]};
        }
        output.push(obj);
    }

    return output
}
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
    let images = data.orderSelectors.image.map(e => ({...e, type: 'image'}))
    let productInfos = data.orderSelectors.title.map(e => ({...e, type: 'productInfo'}))
    let totalPrices = data.orderSelectors.totalPrice.map(e => ({...e, type: 'totalPrice'}))
    let list = prices.concat(quantitys).concat(titles).concat(attributes)
    let arr = []
    let payload = {
        product: [
            {
                price: '',
                amount: '',
                productInfo: '',
                ProductOption: '',
                image: '',
                productInfo: ''

            }
        ],
        totalPrice: ''
    }
    images.forEach(item => {
        $(item.value).ready(function () {
            let image = $(item.value).prop('src')

            console.log('image', image);
        })
    })
    cardWrapper.forEach(card => {
        $(card).ready(function () {
            $(card).bind('DOMSubtreeModified', function () {
                let arr = []
                list.forEach(item => {
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
                                [item.type]: convertPrice($(this).val(), item.type)
                            }
                        }).get();
                    } else {
                        price = $(item.value).map(function () {
                            return {
                                [item.type]: convertPrice($(this).text(), item.type)
                            }
                        }).get();
                    }
                    arr.push(price)
                })
                let output = converData(arr)

                console.log('output', output);
            });
        });
    })

    $(data.observeSelectors.totalPrice).ready(function () {
        let totalPrice = convertPrice($(data.observeSelectors.totalPrice).text(), 'price')
        $(data.observeSelectors.totalPrice).bind('DOMSubtreeModified', function () {
            totalPrice = convertPrice($(this).text(), 'price')
        });
        console.log("-> totalPrice", totalPrice);
    });

}


getPayload()
