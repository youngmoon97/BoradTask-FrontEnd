<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center">게시판 리스트</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">제목</th>
              <th class="text-left">내용</th>
              <th class="text-left">작성자</th>
              <th class="text-left">작성시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.boardTitle }}</td>
              <td>{{ item.boardContents }}</td>
              <td>{{ item.boardWriter }}</td>
              <td>{{ item.insertDate }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>
    <v-footer>
      <v-btn depressed color="primary" @click="toboardInsertPage">게시판 작성</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      boards: [
        {
          boardTitle: "",
          boardContents: "",
          boardWriter: "",
          insertDate: ""
        }
        // {
        //   name: "Ice cream sandwich",
        //   calories: 237
        // },
        // {
        //   name: "Eclair",
        //   calories: 262
        // },
        // {
        //   name: "Cupcake",
        //   calories: 305
        // },
        // {
        //   name: "Gingerbread",
        //   calories: 356
        // },
        // {
        //   name: "Jelly bean",
        //   calories: 375
        // },
        // {
        //   name: "Lollipop",
        //   calories: 392
        // },
        // {
        //   name: "Honeycomb",
        //   calories: 408
        // },
        // {
        //   name: "Donut",
        //   calories: 452
        // },
        // {
        //   name: "KitKat",
        //   calories: 518
        // }
      ]
    };
  },
  method: {
    toboardInsertPage() {
      window.location.href = "/boardinsert";
    }
  }
};
</script>