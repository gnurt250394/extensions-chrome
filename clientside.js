var script = window.document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js';// Load jQuery
window.document.getElementsByTagName('head')[0].appendChild(script);

const getPayload = (element) => {
    console.log("-> element", element);
    $(element.value).ready(function () {
        console.log("-> element11", element.value);
        $(element.value).bind('DOMSubtreeModified', function () {
            console.log("-> element.value", element.value);
            let payload = '';
            if (element.targetProperty === 'src') {
                payload = $(element.value).prop('src');
            } else if (element.targetProperty === 'value') {
                payload = $(element.value).val();
            } else {
                payload = $(element.value).text();
            }
            console.log("-> payload", payload);
        });
    });
}


let data = {
    "_meta": {
        "noTranslate": true
    },
    "appendSelector": "#container > div.box__article-top > section > div.box__button-buy",
    "itemSelectors": {
        "cardWrapper": [
            "#scrollWrap > div.scroll_cont > div > div.purchase-summary"
        ],
        "item": {
            "attribute": [
                {
                    "targetProperty": "innerText",
                    "value": "p.summary_title > span.option-name:nth-child(1)"
                }
            ],
            "price": [
                {
                    "targetProperty": "innerText",
                    "value": "div.option-control-box > p.total-price > span.total-price--text > em"
                }
            ],
            "quantity": [
                {
                    "targetProperty": "value",
                    "value": "div > div.option-control--quantity > input"
                }
            ],
            "title": [
                {
                    "targetProperty": "innerText",
                    "value": "p.summary_title > span.option-name:nth-child(1)"
                }
            ]
        }
    },
    "name": "mg.gmarket.co.kr",
    "observeSelectors": {
        "totalPrice": "#scrollWrap > div.vip-order-option-button > div.vip-order-option-button--total > p > em"
    },
    "orderSelectors": {
        "image": [
            {
                "targetProperty": "src",
                "value": "#content > div.vip-item-img > div > ul > li.swiper-slide.swiper-slide-active > img"
            }
        ],
        "title": [
            {
                "targetProperty": "innerText",
                "value": "#content > div.vip-item-info.vip-box-shadow > h2 > span"
            }
        ],
        "totalPrice": [
            {
                "targetProperty": "innerText",
                "value": "#scrollWrap > div.vip-order-option-button > div.vip-order-option-button--total > p > em"
            }
        ]
    }
}
getPayload({
    value: '#scrollWrap > div.scroll_cont > div > div.purchase-summary',
    targetProperty: 'innerText'
})
