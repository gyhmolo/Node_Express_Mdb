var fortuneCookies = [
    "Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not dear what you don't know",
    "you will have a pleasant surprise",
    "Whenever possible, keep it simple"
];

exports.getFortune = function(){
    var idx = Math.floor(Math.random()*fortuneCookies.length);
    return fortuneCookies[idx];
}