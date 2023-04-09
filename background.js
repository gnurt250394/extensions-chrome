(async function () {
    let [tab] = await chrome.tabs.query({url: 'http://mg.gmarket.co.kr/Item?goodsCode=2848620146'})
    console.log("-> tab", tab);

    // Execute script in the current tab
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['jquery-3.4.1.min.js'],
        // args: [items] // pass any parameters to function
    }).then(() => {
        console.log("script jquery-3.4.1.min.js")
    });
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['clientside.js'],
        // args: [items] // pass any parameters to function
    }).then(() => console.log("script injected"));
})()

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    console.log("-> tabId", tabId);
    if (changeInfo.status == 'complete') {
        await chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['jquery-3.4.1.min.js'],
            // args: [items] // pass any parameters to function
        }).then(() => {
            console.log("script jquery-3.4.1.min.js")
        });
        await chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['clientside.js'],
            // args: [items] // pass any parameters to function
        }).then(() => console.log("script injected"));
    }
});
