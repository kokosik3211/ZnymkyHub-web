<template>
  <div>
    <div id="inputForm">
      <input type="text" id="message" />
      <input type="button" id="sendBtn" value="Send" />
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
import { baseUrl } from "../constants";

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
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/forum`)
      .build();

    connection.on("Send", function(data) {
      let elem = document.createElement("p");
      elem.appendChild(document.createTextNode(data));
      let fo = document.getElementById("chatroom");
      if (fo) {
        var firstElem = fo.firstChild;
        fo.insertBefore(elem, firstElem);
      }
    });

    $("#sendBtn").click(function(e) {
      let message = $("#message").val();
      $("#message").val("");
      connection.invoke("Send", message);
    });

    connection.start();
  }
}
</script>

<style scoped></style>
