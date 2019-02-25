<template>
    <div class="cmt-container">
        <h3>吐槽大会</h3>
        <textarea placeholder="小主，请发表你对本款美食的建议" v-model="content" maxlength="120"></textarea>

        <mt-button style="width: 20%;margin: 5px 0;position: relative;left: 75vw;" type="primary" size="small" @click="postComment">发表</mt-button>

        <div class="cmt-list">
            <div v-for="(item,idx) in comments" :key="item.content" class="cmt-item">
                <div class="cmt-title">
                    第{{ idx+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;<br>发表时间：{{ item.add_time | dataFormatter }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <mt-button size="small" type="danger" style="outline: none;border: #efeff4;position: relative;left: 30vw;top: -10px;background-color: #efeff4;color: #000" @click="loadMore">加载更多...</mt-button>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      content: "",
      comments: [],
      pageIndex: 1
    };
  },
  created() {
    this.getComments();
  },
  props: ["id"],
  methods: {
    postComment() {
      if (this.content.length != 0) {
        this.$http
          .post("api/postcomment/" + this.id, {
            content: this.content
          })
          .then(function({ body }) {
            //加载评论
            this.comments.unshift({
              content: this.content,
              user_name: "匿名用户",
              add_time: new Date()
            });
            this.content = "";
          });
      }
    },
    //获取评论数据
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id, {
          //get请求的参数
          params: {
            pageindex: this.pageIndex
          }
        })
        .then(function({ body }) {
          console.log(body);
          if (body.status === 0) {
            if (this.pageIndex == 1) {
              this.comments = body.message;
            } else {
              this.comments = this.comments.concat(body.message);
            }
          }
        });
    },
    loadMore() {
      this.pageIndex++;
      this.getComments();
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 16px;
    padding: 10px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    width: 95%;
    margin: 0 10px;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 20px;
        color: #aaa;
        margin-left: 5px;
      }
      .cmt-body {
        line-height: 100px;
        text-indent: 2em;
        background-color: white;
        margin: 5px 5px 15px 5px;
      }
    }
  }
}
</style>
