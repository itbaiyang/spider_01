// var express = require('express');
var url = require('url');
var http = require('http');
// var superagent = require('superagent');
// var request = require('superagent-charset');
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var cheerio = require('cheerio');

for(var i = 1; i < 2; i++){
    var targetUrl = 'http://www.shenhuabidding.com.cn/bidweb/001/001006/'+i+'.html';
    superagent.get(targetUrl).charset()
        .end(function (err,res) {
            // console.log(res);
            var $ = cheerio.load(res.text);
            $('.r-block').each(function (i, e) {
                var bid_sh = {};
                var link = e.children;
                bid_sh['time'] = e.next.innerHTML;
                var link_new = 'http://www.shenhuabidding.com.cn' + link[0].next.attribs.href;
                bid_sh['title'] = link[0].next.attribs.title;
                var bid_sh_new = detail(link_new);
                console.log(bid_sh_new)
            });

        });
}
var detail = function (url) {
    bid_sh1 = [];
    var bid_sh3 = superagent.get(url).charset('utf-8').end(function (err,res) {

            // console.log(res);
            var $ = cheerio.load(res.text);
            var tr = $('tr');
            var td = tr[1].children;
            var td3 = td[3].children[0].data;
            var td5 = td[5].children[0].data;
            bid_sh1['name'] = td3;
            bid_sh1['man'] = td5;
        return bid_sh1;

    }); console.log(bid_sh3)
};