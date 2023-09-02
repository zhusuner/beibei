var rule = {
	title:'人人影视[搜]',
	host:'https://yyets.click',
	homeUrl:'/',
	url:'*',
	filter_url:'{{fl.class}}',
	filter:{
	},
	searchUrl: '*',
	searchable:2,
	quickSearch:0,
	filterable:0,
	headers:{
		'User-Agent': PC_UA,
		'Accept': '*/*',
		'Referer': 'https://yyets.click/',
         	'Cookie':'PPA_CI=ff8dba84f5bc281b486e025ca7abba69; cf_clearance=tC2D.k_.ettp3x2QtdkcvAE5UNSphF.m8fVMADGy7jU-1693666826-0-1-6704c06d.48c5173c.30059f8d-250.0.0; _ga=GA1.1.1767290962.1693666855; adblock=1; __gads=ID=af6fbc6bd0ada883-22d154fcbfe30047:T=1693666860:RT=1693666860:S=ALNI_MaOm0ALWvBZuTB9pOSyJESwHIGDTg; __gpi=UID=00000c39c16013c5:T=1693666860:RT=1693666860:S=ALNI_MbP1eGArRGxygGFD_ExuAt6Fqcfcg; _oauth_request_token="WklJNDFRQUFBQUFCby1FN0FBQUJpbFpwbjNF|ZjA1aDg4SHVXQXZ2WFNwUGtpT0xudWJteTRkWWpRWWw="; username="2|1:0|10:1693666903|8:username|12:emh1c3VuZXI=|ceef527c29fb9c534fd6ce9394524031797de938b97df67d491f3f138f54da0e"; _ga_K76PSKSSGX=GS1.1.1693666854.1.1.1693666990.52.0.0; FCNEC=%5B%5B%22AKsRol8pORq-NgHE080HAjke1QEkFbLuD4cbZqqN9oF0oa18s8zWHzhPMwny1VaxRFKKWUh_YN7tJbHBqjdhzVr6kyXQInxLHQyzIRtA9Bmb-bLg5zbhM6hcyCnOXpn2aCXeC_2ViPE461sS29keWI7fotXTu4Uogg%3D%3D%22%5D%2Cnull%2C%5B%5D%5D',
	},
	timeout:5000,
	class_name:'',
	class_url:'',
	play_parse:true,
	play_json:[{
		re:'*',
		json:{
			parse:0,
			jx:0
		}
	}],
	lazy:'',
	limit:6,
	推荐:'',
	一级:'',
	二级:`js:
VOD.vod_play_from = "雲盤";
VOD.vod_remarks = detailUrl;
VOD.vod_actor = "沒有二級，只有一級鏈接直接推送播放";
VOD.vod_content = MY_URL;
VOD.vod_play_url = "雲盤$" + detailUrl;
`,
	搜索:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
if (rule_fetch_params.headers.Cookie.startsWith("http")){
	rule_fetch_params.headers.Cookie=fetch(rule_fetch_params.headers.Cookie);
	let cookie = rule_fetch_params.headers.Cookie;
	setItem(RULE_CK, cookie);
};
log('yyets search cookie>>>>>>>>>>>>>>>' + rule_fetch_params.headers.Cookie);
let _fetch_params = JSON.parse(JSON.stringify(rule_fetch_params));
_fetch_params.headers.Referer = 'http://yyets.click/search?keyword=' + encodeURIComponent(KEY) + '&type=default';
log('yyets search params>>>>>>>>>>>>>>>' + JSON.stringify(_fetch_params));
let new_html=request(rule.homeUrl + 'api/resource?keyword=' + encodeURIComponent(KEY) + '&type=default', _fetch_params);
//log("yyets search result>>>>>>>>>>>>>>>" + new_html);
let json=JSON.parse(new_html);
let d=[];
for(const it in json.comment){
	if (json.comment.hasOwnProperty(it)){
		log("yyets search it>>>>>>>>>>>>>>>" + JSON.stringify(json.comment[it]));
		if (/(www.aliyundrive.com|pan.quark.cn)/.test(json.comment[it].comment)){
			let its = json.comment[it].comment.split("\\n");
			let i=0;
			while(i<its.length){
				let title=its[i].trim().replaceAll(/\\s+/g," ");
				if (title.length==0){
					i++;
					continue;
				}
				let urls=[];
				log("yyets search title>>>>>>>>>>>>>>>" + title);
				while(++i<its.length){
					log("yyets search url>>>>>>>>>>>>>>>" + its[i]);
					let burl = its[i].trim().split(" ")[0];
					if (burl.length==0){
						continue;
					}
					if (burl.includes("https://")){
						urls.push("https:"+burl.split("https:")[1]);
					}else{
						break;
					}
				}
				if (urls.length>0){
					log("yyets search title,urls>>>>>>>>>>>>>>>" + title + ",[" + JSON.stringify(urls) + "]");
					if (title.includes(KEY)){
						urls.forEach(function (url) {
							d.push({
								title:title,
								img:'',
								content:json.comment[it].comment,
								desc:json.comment[it].date,
								url:'push://'+url
								});
						});
					}
				}
			}
		}
	}
}
setResult(d);
`,
}
