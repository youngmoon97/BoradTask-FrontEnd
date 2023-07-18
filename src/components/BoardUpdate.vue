<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center">{{this.idx}}번 게시판 수정하기</div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main fluid>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col cols="4" align="left" md="3">
          <v-text-field class="boardTitle" v-model="boardtitle" label="제목">{{this.boardtitle}}</v-text-field>
        </v-col>
        <v-col cols="4" align="left" md="3">
          <v-text-field
            class="boardWriter"
            v-model="boardwriter"
            label="작성자"
            readonly
          >{{this.boardwriter}}</v-text-field>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>

      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <span>게시판 내용</span>
          <v-textarea
            solo
            height="500"
            class="boardContents"
            v-model="boardcontents"
            label="게시판 내용"
            :rules="rules"
          >{{this.boardcontents}}}</v-textarea>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
      <!-- insert_date를 받아서 넣어줘야하나? 같이?-->
    </v-main>

    <v-footer>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <v-btn depressed color="primary" align="center" @click="boardUpdate">게시판 수정완료</v-btn>
          <div class="space"></div>
          <v-btn depressed color="primary" align="center" @click="$router.go(-1)">게시판 수정취소</v-btn>
        </v-col>
        <!-- <v-btn depressed color="primary" align="center" @click="check">check</v-btn> -->
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    rules: [v => v.length <= 500 || "Max 500 characters"],
    value: "",
    list: "",
    boardtitle: "",
    boardwriter: "",
    boardcontents: "",
    idx: ""
  }),
  created() {
    // console.log("boardupdate", this.$route.query.boardIdx);
    this.idx = this.$route.query.boardIdx;
    console.log("this.boardtitle", this.boardtitle);
    // console.log("created", this.idx);
    // console.log("created2", this.$route.query.boardIdx);
    this.$axios
      .get("http://localhost:8081/api/getDetail", {
        headers: { "Content-Type": "application/json" },
        params: {
          boardIdx: this.idx
        }
      })
      .then(response => {
        // console.log(boardIdx);
        this.list = response.data;
        this.boardtitle = this.list.boardTitle;
        this.boardwriter = this.list.boardWriter;
        this.boardcontents = this.list.boardContents;
        console.log("response", response);
        console.log("this.list", this.list);
        console.log("this.list.boardTitle", this.list.boardTitle);
        console.log("this.list.boardContents", this.list.boardContents);
      })
      .catch(err => {
        console.error("updateerr", err);
      });
  },
  methods: {
    // check() {
    //   console.log(this.$route.query.boardIdx);
    // },
    boardUpdate() {
      console.log("boardUpdateOK");
      this.idx = this.$route.query.boardIdx;
      console.log(this.idx);
      console.log(this.boardtitle);
      console.log(this.boardcontents);
      this.$axios
        .post("http://localhost:8081/api/updateBoard", {
          // headers: { "Content-Type": "application/json" }
          boardTitle: this.boardtitle,
          boardContents: this.boardcontents,
          boardIdx: this.idx
        })
        .then(response => {
          if (response < 1) {
            alert("수정 실패하였습니다.");
          } else {
            alert("수정 완료하였습니다.");
          }
        })
        .catch(err => {
          console.error("list", err);
        });
      this.$router.push({
        path: "/"
      });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.space {
  width: 4px;
  height: auto;
  display: inline-block;
}
</style>
