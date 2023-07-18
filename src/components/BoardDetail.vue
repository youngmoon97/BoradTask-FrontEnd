<template>
  <!-- <div>
    <BoardUpdate v-bind:childVaule="parentVaule" />
  </div>-->
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <!-- boardidx를 받아서 몇번 게시물인지 알기 -->
        <div align="center">{{this.idx}}번 게시물 상세</div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main fluid>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col cols="3" align="center" md="2">
          <v-text-field
            readonly
            class="boardTitle"
            v-model="boardtitle"
            label="제목"
          >{{this.boardtitle}}</v-text-field>
        </v-col>
        <v-col cols="2" align="center" md="2">
          <v-text-field
            class="boardWriter"
            v-model="boardwriter"
            label="작성자"
            readonly
          >{{this.boardwriter}}</v-text-field>
        </v-col>
        <v-col cols="2" align="center" md="2">
          <v-text-field
            class="insertDate"
            v-model="insertdate"
            label="등록일자"
            readonly
          >{{this.insertdate}}</v-text-field>
        </v-col>
        <v-col cols="2" align="center" md="2">
          <v-text-field class="boardCnt" v-model="boardcnt" label="조회수" readonly>{{this.boardcnt}}</v-text-field>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
      <!-- <hr /> -->
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <v-textarea
            solo
            height="500"
            class="boardContents"
            v-model="boardcontents"
            label="게시판 내용"
          >{{this.boardcontents}}}</v-textarea>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col cols="8" align="center" md="4">
          <v-text-field class="commentContents" v-model="commentContents" label="댓글작성"></v-text-field>
        </v-col>
        <v-col cols="1" align="center" md="2">
          <v-text-field class="commentWriter" v-model="commentWriter" label="댓글작성자"></v-text-field>
        </v-col>
        <v-col cols="1" align="right" md="1">
          <v-btn depressed color="primary" @click="insertComment">댓글 작성</v-btn>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">댓글내용</th>
                  <th class="text-left">댓글작성자</th>
                  <th class="text-left">댓글작성일자</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in commentlist" :key="item.name">
                  <td>{{ item.commentContents }}</td>
                  <td>{{ item.commentWriter}}</td>
                  <td>{{ item.commentDate}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col class="space" cols="2"></v-col>
      </v-row>
    </v-main>

    <v-footer>
      <v-row>
        <v-col class="space" cols="2"></v-col>
        <v-col>
          <v-btn depressed color="primary" @click="toBoardList">게시판 리스트</v-btn>
          <div class="space"></div>
          <v-btn depressed color="primary" @click="toUpdateBoard">게시판 수정</v-btn>

          <div class="space"></div>

          <v-btn depressed color="primary" @click="BoardDelete">게시판 삭제</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
// import dayjs from "dayjs";

export default {
  // name: "boardDetailComponent",
  // components: { dayjs },
  data() {
    return {
      value: "",
      list: "",
      commentlist: "",
      boardtitle: "",
      boardwriter: "",
      boardcontents: "",
      insertdate: "",
      boardcnt: "",
      idx: "",
      commentContents: "",
      commentWriter: ""
    };
  },
  created() {
    console.log("boarddetail", this.$route.query.boardIdx);
    this.idx = this.$route.query.boardIdx;
    this.$axios
      .get("http://localhost:8081/api/getDetail", {
        headers: { "Content-Type": "application/json" },
        params: {
          boardIdx: this.$route.query.boardIdx
        }
      })
      .then(response => {
        // console.log(boardIdx);
        this.list = response.data;
        this.boardtitle = this.list.boardTitle;
        this.boardwriter = this.list.boardWriter;
        this.boardcontents = this.list.boardContents;
        this.insertdate = this.list.insertDate;
        this.boardcnt = this.list.boardCnt + 1;
        console.log("insertDate", this.list.insertDate);
      })
      .catch(err => {
        console.error("detailerr", err);
      });
    this.$axios
      .get("http://localhost:8081/api/getcommentlist", {
        headers: { "Content-Type": "application/json" },
        params: {
          boardIdx: this.$route.query.boardIdx
        }
      })
      .then(response => {
        // console.log(boardIdx);
        this.commentlist = response.data;
      })
      .catch(err => {
        console.error("detailerr", err);
      });
  },
  // props: {
  //   idx: {
  //     type: Number
  //   }
  // },
  methods: {
    // check() {
    //   console.log("this", this.$route.query.boardIdx);
    // },
    // getBoardIdx(idx) {
    //   console.log("emit" + idx);
    //   this.boardIdx = idx;
    // },
    toBoardList() {
      // INSERT 로직 후 페이지 이동 -> 할때 마운트?
      // window.location.href = "/boardlist";
      this.$router.go(-1);
    },
    toUpdateBoard() {
      this.$router.push({
        path: `/boardupdate`,
        query: {
          boardIdx: this.idx
        }
      });
    },
    BoardDelete() {
      if (!confirm("정말 삭제하시겠습니까?")) {
        alert("삭제하지 않았습니다.");
      } else {
        alert("삭제되었습니다.");
        // 내용 삭제
        this.$axios
          .post("http://localhost:8081/api/deleteBoard", {
            // headers: { "Content-Type": "application/json" },
            boardIdx: this.$route.query.boardIdx
          })
          .then(response => {
            if (response < 1) {
              alert("삭제 실패하였습니다.");
            } else {
              alert("삭제 완료되었습니다.");
            }
          })
          .catch(err => {
            console.error("list", err);
          });
        this.$router.push({
          path: "/"
        });
      }
    },
    backToboardList() {
      this.$router.go(-1);
    },
    // test(param) {
    //   console.log(param);
    //   this.testText = param;
    // }
    insertComment() {
      console.log(this.commentContents);
      console.log(this.commentWriter);
      console.log(this.boardIdx);
      this.$axios
        .post("http://localhost:8081/api/insertcomment", {
          // headers: { "Content-Type": "application/json" },
          commentContents: this.commentContents,
          commentWriter: this.commentWriter,
          boardIdx: this.$route.query.boardIdx
        })
        .then(response => {
          if (response < 1) {
            alert("댓글 등록 실패하였습니다.");
          } else {
            alert("댓글 등록 완료되었습니다.");
          }
        })
        .catch(err => {
          console.error("list", err);
        });
      this.$router.go(0);
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
