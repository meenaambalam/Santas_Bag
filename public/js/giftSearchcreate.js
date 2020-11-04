let giftObj = {
    title: [],
    thumbnail: [],
    current_price: [],
    url: []
};

$("#submitBtn").click(function (event) {
    event.preventDefault();
    console.log("inside");
    let gift = $(this).attr("data-gift");
    console.log(gift);
    let giftItems = $("#srchInput").val().trim();

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://rapidapi.p.rapidapi.com/product/search?keyword=${giftItems}&country=US`,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "",
            "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        for (let i = 0; (i < response.products.length && i < 10); i++) {
            const giftInfo = response.products[i];
            console.log(giftItems);
            giftObj.title.push(response.products[i].title);
            giftObj.thumbnail.push(response.products[i].thumbnail);
            giftObj.current_price.push("$" + response.products[i].price.current_price);
            giftObj.url.push(response.products[i].url);
        }
        displayCards(giftObj)
    });
});

function displayCards(giftObj) {
    console.log(giftObj)
     for (let i = 0; i < giftObj.thumbnail.length; i++) {

        let d1 = $("<div>");
        d1.attr("class", "card");
        let d2 = $("<div>");
        d2.attr("class", "card-body");
        let img = $("<img>");
        img.attr("class", "card-img-top");
        img.attr("src", giftObj.thumbnail[i]);
        let btnTag = $("<button>");
        btnTag.attr("class", "btn btn-default addGift");
        let aTag = $("<a>");
        aTag.attr("href", giftObj.url[i]);
        aTag.text(giftObj.title[i]);
        let hFive = $("<h5>");
        hFive.attr("class", "card-title");
        let pTag = $("<p>");
        pTag.attr("class", "card-text");
        pTag.text(giftObj.current_price[i]);

        d1.append(d2);
        d1.append(btnTag);
        d1.append(img);
        d2.append(hFive);
        hFive.append(aTag);
        d2.append(pTag);
        $(".result").append(d1);
    }   
}