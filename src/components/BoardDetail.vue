<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <!-- boardidx를 받아서 몇번 게시물인지 알기 -->
        <div align="center">??번 게시물</div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main fluid>
      <v-row>
        <v-col cols="6" align="left" md="3">${titledata}</v-col>
        <v-col cols="3" align="left" md="3">${writerdata}</v-col>
        <v-col cols="3" align="left" md="3">${datetimedata}</v-col>
      </v-row>
      <v-textarea readonly counter class="boardContents" label="Text" :value="value"></v-textarea>
      <!-- insert_date를 받아서 넣어줘야하나? 같이?-->
    </v-main>

    <v-footer>
      <v-btn depressed color="primary" @click="toBoardList">게시판 리스트</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    value: "${contentsdata}"
  }),
  method: {
    toBoardList() {
      // INSERT 로직 후 페이지 이동 -> 할때 마운트?
      window.location.href = "/boardlist";
    }
  }
};
</script>

<style>
</style>
