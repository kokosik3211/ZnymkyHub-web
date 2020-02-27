<template>
  <div>
      <div id="inputForm">
        <input type="text" id="message" />
        <input type="button" id="sendBtn" value="Отправить" />
    </div>
    <div id="chatroom"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "vue-avatar/src/Avatar.vue";
import { User } from "../models/user.interface";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    profile: "user/profile"
  }),
  components: {
    Avatar
  }
})
export default class Chat extends Vue {
  private user = {} as User;
  mounted() {
      debugger; // eslint-disable-line
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/forum")
        .build();

      connection.on("Send", function (data) {
            debugger; // eslint-disable-line
            let elem = document.createElement("p");
            elem.appendChild(document.createTextNode(data));
            let fo = document.getElementById("chatroom");
            if(fo){
              var firstElem = fo.firstChild;
              fo.insertBefore(elem, firstElem);
            }
 
      });
 
      $("#sendBtn").click(function (e) {
          debugger; // eslint-disable-line
          let message = $("#message").val();
          connection.invoke("Send", message);
      });
 
      connection.start();
  }
}
</script>

<style scoped>
</style>
