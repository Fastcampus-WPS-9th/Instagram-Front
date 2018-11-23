window.fbAsyncInit = function() {
  FB.init({
    appId      : '1921889824591097',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  // 이 부분이 페이지가 로드되자 마자 실행될 페이스북 관련코드 블록의 위치
  // 페이스북 유저 정보를 console.log로 출력해본다
  
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
  FB.getLoginStatus(function (response) {
    console.log('getLoginStatus');
    console.log(response);
    if (response.status === 'connected') {
      console.log('response.status === connected');
      // response에 있는 정보를
      // axios를 사용해서 FacebookAuthTokenView에 요청
      // 돌아온 token결과를 console.log에 출력
      axios.post('http://localhost:8000/api/members/auth-token/facebook/', {
        access_token: response.authResponse.accessToken,
        user_id: response.authResponse.userID
      }).then(function (response) {
        var token = response.data.token;
        setCookie('django_token', token, 7);
      }).catch(function (error) {
        console.log(error);
      });
    }
  });
}

function getProfile() {
  var token = getCookie('django_token');
  console.log(token);
  axios.get('http://localhost:8000/api/members/user/profile/', {
    headers: {
      Authorization: 'Token ' + token
    }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
    });
}