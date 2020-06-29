 <template>
  <div class="teacher-page">
    <div class="option-list">
      <div class="option-title">王一涵 - 老师</div>
      <van-search
        maxlength="12"
        class="search-ipt"
        :class="searchListShow?'search-focus' : ''"
        v-model="keyword"
        shape="round"
        background="#fff"
        placeholder="输入学生姓名搜索"
        @focus="searchListShow = true"
        @blur="searchListShow = false"
        @input="searchHandle"
      />
      <div class="search-list" v-if="searchListShow && searchResList">
        <div v-if="searchResList.length > 0">
          <div class="search-item" v-for="item in searchResList" :key="item.id">{{item.name}}</div>
        </div>
        <van-empty v-else image="search" :description="'抱歉，没有找到“'+ keyword +'”'" />
      </div>
    </div>

    <div v-if="!searchListShow" class="submit_btn">下一步</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      searchListShow: false,

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
        }
      ],
      searchResList: null
    };
  },
  created() {
    this.searchResList = this.list;
  },
  methods: {
    //搜索
    searchHandle() {
      let list = this.list;
      let keyword = this.keyword;
      let searchList = list.filter(item => item.name.indexOf(keyword) != -1);
      this.searchResList = searchList;
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
.teacher-page {
  min-height: 100vh;
  padding: 0.3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .option-list {
    flex: 1;
    padding: 0.4rem 0.3rem;
    border-radius: 0.1rem;
    background-color: #fff;
    .option-title {
      font-weight: bold;
      font-size: 0.36rem;
      color: #1d5687;
      padding-bottom: 0.4rem;
    }
    .search-ipt {
      padding: 0;
      & /deep/ .van-search__content {
        background-color: #fff;
        border: 1px #d3d3d3 solid;
        .van-icon-search {
          color: #ddd;
        }
      }
      &.search-focus {
        & /deep/ .van-search__content {
          border-color: #6d7df8;
        }
      }
    }
  }
  .submit_btn {
    margin: 0.6rem auto 0.3rem;
    text-align: center;
    line-height: 0.9rem;
  }
}
</style>
