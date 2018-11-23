var app = new Vue({
  el: '#wrap',
  data: {
    postList: []
  },
  methods: {
    getPostList: function () {
      // Vue인스턴스를 'vm'변수에 할당
      // this는 파이썬의 self와 유사(하지만 사용성이 구립니다...)
      const vm = this;
      var result = axios.get('http://localhost:8000/api/posts/post/')
        .then(function (response) {
          console.log(response);
          vm.postList = response.data;
        })
        .then(function (error) {
          console.log(error);
        });
      console.log(result);
      return result;
    }
  }
});
