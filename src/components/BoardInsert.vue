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
        <v-col cols="9" align="left" md="3">
          <v-text-field class="boardTitle" label="제목"></v-text-field>
        </v-col>
        <v-col cols="3" align="left" md="3">
          <v-text-field class="boardWriter" label="작성자"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea counter class="boardContents" label="Text" :rules="rules" :value="value"></v-textarea>
      <!-- insert_date를 받아서 넣어줘야하나? 같이?-->
    </v-main>

    <v-footer>
      <v-btn depressed color="primary" align="center" @click="boardInsert">게시판 작성완료</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    rules: [v => v.length <= 100 || "Max 100 characters"],
    value: "내용을 입력하시오!"
  }),
  method: {
    boardInsert() {
      // INSERT 로직 후 페이지 이동 -> 할때 마운트?
      window.location.href = "/BoardList";
    }
  }
};
</script>

<style>
</style>
