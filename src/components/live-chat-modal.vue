<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Live Chat</p>
    </header>
    <section class="modal-card-body">
      <div class="messages-container">
        <ul v-if="messages.length">
          <li v-for="(message, index) in messages" :key="index" class="columns">
            <span class="column is-3">{{
              message.username === profile.email ? "You" : message.username
            }}</span>
            <vue-markdown
              :class="{
                column: true,
                'has-text-primary': message.username === profile.email
              }"
              :source="message.text"
            />
          </li>
        </ul>
        <section
          v-else
          class="hero is-warning is-medium is-bold rounded-corners has-margin-top-50"
        >
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Welcome to the chat...
              </h1>
              <h2 class="subtitle">
                Say hi!
              </h2>
            </div>
          </div>
        </section>
      </div>

      <div class="is-divider"></div>

      <b-field
        label="Your message:"
        message="Note: use markdown to format your message."
      >
        <b-input
          v-model="form.message"
          placeholder="What do you have to say?"
          type="textarea"
        >
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" type="button" @click="onSendMessage()">
        Sent
      </button>
    </footer>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { mapGetters } from "vuex";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      messages: [],
      form: {
        message: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      profile: "user/profile"
    })
  },
  created() {
    // Listen to answer changes from SignalR event
    this.$questionHub.$on("chat-message-received", this.onMessageReceived);
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$questionHub.$off("chat-message-received", this.onMessageReceived);
  },
  methods: {
    onMessageReceived({ username, text }) {
      this.messages = [...this.messages, { username, text }];
      setTimeout(this.scrollToBottom, 100);
    },
    onSendMessage(evt) {
      this.$questionHub.sendMessage(this.form.message);
      this.form.message = "";
    },
    scrollToBottom() {
      var messagesContainer = $(".messages-container")[0];
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    onHidden() {
      Object.assign(this.form, {
        message: ""
      });
    }
  }
};
</script>

<style scoped>
.messages-container {
  height: 450px;
  overflow-y: scroll;
}
.rounded-corners {
  border-radius: 20px 40px;
}
</style>
