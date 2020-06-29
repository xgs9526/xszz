 <template>
  <div class="role-page">
    <div class="option-title">您的身份是？</div>
    <div class="option-list">
      <div
        class="option-item"
        @click="changeTab(item)"
        v-for="item in list"
        :key="item.id"
        :class="active == item.id?'active': item.disabled?'disabled':''"
      >{{item.title}}</div>
    </div>

    <div class="submit_btn">下一步</div>
    <div
      class="text-content"
    >为了保障学生信息安全，学生只能为自己申请资助业务；家长或监护人只能为自己的子女申请；老师只能为自己的学生申请；组织机构负责人只能为所属单位的学生申请。</div>
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
          disabled: false,
          title: "我是学生"
        },
        {
          id: 1,
          disabled: false,
          title: "我是家长或监护人"
        },
        {
          id: 2,
          disabled: false,
          title: "我是老师"
        },
        {
          id: 3,
          disabled: true,
          title: "我是组织机构负责人"
        }
      ]
    };
  },
  created() {},
  methods: {
    //切换
    changeTab(item) {
      if (item.disabled) {
        return;
      }
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
.role-page {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .option-title {
    text-align: center;
    font-weight: bold;
    font-size: 0.4rem;
    color: #41310c;
    // padding-top: .9rem;
  }
  .option-list {
    padding-top: 0.4rem;
    .option-item {
      width: 6rem;
      margin: 0.5rem auto 0;
      box-sizing: border-box;
      padding: 0.3rem;
      border: 1px #0f1459 solid;
      border-radius: 0.1rem;
      font-size: 0.34rem;
      color: #0f1459;
      &.active {
        position: relative;
        background-color: #636bf6;
        color: #ffffff;
        background: -webkit-linear-gradient(to right, #636bf6, #95c5ff);
        background: -o-linear-gradient(to right, #636bf6, #95c5ff);
        background: -moz-linear-gradient(to right, #636bf6, #95c5ff);
        background: linear-gradient(to right, #636bf6, #95c5ff);
        &::after {
          content: "";
          width: 0.44rem;
          height: 0.44rem;
          position: absolute;
          top: 50%;
          right: 0.4rem;
          margin-top: -0.22rem;
          background: url(/static/img/icon_roleselect.png) no-repeat;
          background-size: 100%;
        }
      }
      &.disabled {
        color: #d2d2d2;
        border: none;
        background-color: #f3f3f3;
      }
    }
  }
  .submit_btn {
    margin: 1rem auto;
    text-align: center;
    line-height: 0.9rem;
  }
  .text-content {
    padding: 0 0.3rem;
    color: #ababab;
    font-size: 0.26rem;
    line-height: 0.4rem;
  }
}
</style>
