 <template>
  <div class="parent-page">
    <div class="option-list">
      <div class="option-title">王一涵 - 家长</div>
      <div
        class="option-item"
        @click="changeTab(item)"
        v-for="item in list"
        :key="item.id"
        :class="active == item.id?'active': ''"
      >{{item.name}}</div>
    </div>

    <div class="submit_btn">下一步</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [
        {
          id: 0,
          name: "王一博"
        },
        {
          id: 1,
          name: "王大波"
        },
        {
          id: 2,
          name: "王晓梅"
        },
      ]
    };
  },
  created() {},
  methods: {
    //切换
    changeTab(item) {
      this.active = item.id;
    },
    //跳转
    gotoLink(name) {
      this.$router.push(name);
    },
    //提交数据
    subData() {
      let _this = this;
      let tel = _this.login.tel;
      let password = _this.login.password;
      let code = _this.login.code;
      let uuid = _this.uuid;
      let isCookie = _this.isCookie;
      _this.login.auto = isCookie ? "1" : "0";

      if (!tel) {
        _this.$dialog.alert({
          message: "请输入学信网账号登录"
        });
        return;
      } else if (!password) {
        _this.$dialog.alert({
          message: "请输入密码"
        });
        return;
      } else if (!code) {
        _this.$dialog.alert({
          message: "请输入验证码"
        });
        return;
      }
      _this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0
      });
      _this.submitFlag = true;
      _this
        .$http({
          method: "post",
          url: PUBLICURL + "xszz/login",
          data: _this.login
        })
        .then(function(json) {
          let loginData = json.data;
          _this.$toast.clear();
          if (loginData.result == 200) {
            //防重复
            setTimeout(() => {
              _this.submitFlag = false;
            }, 2000);

            let tokenValidTime = isCookie ? 15 : 1;
            //是否确认过身份0未确认  1已确认  已确认跳首页
            let isQrsf = loginData.data.bs;
            let pathName = !!isQrsf ? "/" : "/loginafterwrite";

            _this.$cookie.set(
              isCookieName,
              loginData.data.token,
              tokenValidTime
            );

            //清空之前存的信息
            try {
              localStorage.xm = "";
              localStorage.sjh = "";
              localStorage.sfz = "";
              localStorage.schoolLb = null;
              localStorage.scxdPickerVal = "";
            } catch (e) {}

            setTimeout(function() {
              _this.$router.replace(pathName);
            }, 300);
          } else {
            //防重复
            _this.submitFlag = false;
            _this.getYzm();
            _this.$dialog.alert({
              message: json.data.errorcode
            });
          }
        })
        .catch(function(error) {
          _this.$toast.clear();
          console.log(error);
          //防重复
          _this.submitFlag = false;
          _this.getYzm();
        });
    }
  }
};
</script>

<style scoped lang="scss">
.parent-page {
  min-height: 100vh;
  padding: 0.3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .option-list {
      flex: 1;
    padding: 0.4rem .3rem;
    border-radius: .1rem;
    background-color: #fff;
    .option-title {
      font-weight: bold;
      font-size: 0.36rem;
      color: #1d5687;
      padding-bottom: .5rem;
    }
    .option-item {
      width: 4rem;
      margin: 0.5rem auto 0;
      box-sizing: border-box;
      padding: 0.3rem;
      border: 1px #0f1459 solid;
      border-radius: 0.1rem;
      font-size: 0.34rem;
      color: #0f1459;
      text-align: center;
      &.active {
        position: relative;
        background-color: #636bf6;
        color: #ffffff;
        background: -webkit-linear-gradient(to right, #636bf6, #95c5ff);
        background: -o-linear-gradient(to right, #636bf6, #95c5ff);
        background: -moz-linear-gradient(to right, #636bf6, #95c5ff);
        background: linear-gradient(to right, #636bf6, #95c5ff);       
      }      
    }
  }
  .submit_btn {
    margin: .6rem auto .3rem;
    text-align: center;
    line-height: 0.9rem;
  }
}
</style>
