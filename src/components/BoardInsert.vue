<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center">게시판 작성하기</div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main fluid>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col cols="9" align="left" md="3">
          <v-text-field class="boardTitle" v-model="boardTitle" label="제목"></v-text-field>
        </v-col>
        <v-col cols="3" align="left" md="3">
          <v-text-field class="boardWriter" v-model="boardWriter" label="작성자"></v-text-field>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <v-textarea
            counter
            class="boardContents"
            v-model="boardContents"
            label="내용"
            :rules="rules"
            :value="value"
          ></v-textarea>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>

      <!-- insert_date를 받아서 넣어줘야하나? 같이?-->
    </v-main>
    <v-footer>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <!-- 게시판 추가는 데이터를 넘겨야함으로 버튼이 나을수도-->
          <v-btn depressed color="primary" align="center" @click="boardInsert">게시판 작성완료</v-btn>
          <div class="space"></div>
          <v-btn depressed color="primary" align="center" @click="backToboardList">게시판 작성취소</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    rules: [v => v.length <= 500 || "Max 500 characters"],
    boardTitle: "",
    boardWriter: "",
    boardContents: "",
    value: "내용을 입력하시오!"
  }),
  methods: {
    boardInsert() {
      console.log(this.boardTitle);
      console.log(this.boardWriter);
      console.log(this.boardContents);
      // INSERT 로직 후 페이지 이동 -> 할때 마운트?
      this.$axios
        .post("http://localhost:8081/api/insertBoard", {
          // headers: { "Content-Type": "application/json" },
          boardTitle: this.boardTitle,
          boardWriter: this.boardWriter,
          boardContents: this.boardContents
        })
        .then(response => {
          if (response < 1) {
            alert("등록 실패하였습니다.");
          } else {
            alert("등록 완료되었습니다.");
          }
        })
        .catch(err => {
          console.error("list", err);
        });
      this.$router.push({
        path: "/"
      });
    },
    backToboardList() {
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
