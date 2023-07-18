<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center">게시판 리스트</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-row>
        <v-col class="space" cols="1"></v-col>
        <v-col>
          <v-simple-table fixed-header height="720px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">제목</th>
                  <th class="text-left">내용</th>
                  <th class="text-left">작성자</th>
                  <th class="text-left">작성일자</th>
                  <th class="text-left">조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.name" @click="toBoardDetailPage(item.boardIdx)">
                  <td>{{ item.boardTitle }}</td>
                  <td width="800">{{ item.boardContents }}</td>
                  <td>{{ item.boardWriter }}</td>
                  <td>{{ item.insertDate }}</td>
                  <td>{{ item.boardCnt }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col class="space" cols="1"></v-col>
      </v-row>
    </v-main>
    <v-footer>
      <v-row>
        <v-col class="space" cols="1"></v-col>
        <v-col>
          <v-btn depressed color="primary" @click="toboardInsertPage()">게시판 추가</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      list: ""
    };
  },
  created() {
    // axios로 get board리스트 조회하기
    this.$axios
      .get("http://localhost:8081/api/getBoard", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        // console.log(response.data);
        // List에 담기
        this.list = response.data;
      })
      .catch(err => {
        console.error("listerr", err);
      });
  },
  methods: {
    // 게시판 작성 페이지 이동
    toboardInsertPage() {
      this.$router.push({
        path: "/boardInsert"
      });
    },
    toBoardDetailPage(boardIdx) {
      //게시판 디테일로 이동(인덱스번호 get으로 보내주기)
      this.$router.push({
        path: `/boardDetail?boardIdx=${boardIdx}`,
        params: {
          boardIdx: boardIdx
        }
      });
      // this.$emit("boardIdx", boardIdx.target.value);
      // console.log(boardIdx.target.value);
    }
  }
};
</script>

<style>
/* .text-left {
  font-size: 20px;
} */
</style>