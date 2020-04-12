<template>
  <div class="container has-margin-top-20">
    <h1>
      Znymky Hub forum
      <button
        :disabled="!isAuthenticated"
        class="btn btn-primary mt-2 float-right"
        @click="isAddQuestionModalActive = true"
      >
        <i class="fas fa-plus" /> Ask a question
      </button>
      <button
        :disabled="!isAuthenticated"
        class="btn btn-secondary mt-2 mr-2 float-right"
        @click="isLiveChatModalActive = true"
      >
        <i class="fas fa-comments" /> Live chat
      </button>
    </h1>
    <ul v-if="questions.length" class="list-group question-previews mt-4">
      <question-preview
        v-for="question in questions"
        :key="question.id"
        :question="question"
        class="list-group-item mb-3"
      />
    </ul>
    <section
      v-else
      class="hero is-medium is-primary is-bold rounded-corners has-margin-top-15 has-margin-bottom-20"
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to the forum...
          </h1>
          <h2 class="subtitle">
            Ask first question!
          </h2>
        </div>
      </div>
    </section>
    <b-modal :active.sync="isAddQuestionModalActive" :width="640">
      <add-question-modal @question-added="onQuestionAdded" />
    </b-modal>
    <b-modal :active.sync="isLiveChatModalActive" :width="700">
      <live-chat-modal />
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import QuestionPreview from "@/components/question-preview";
import AddQuestionModal from "@/components/add-question-modal";
import LiveChatModal from "@/components/live-chat-modal";

export default {
  components: {
    QuestionPreview,
    AddQuestionModal,
    LiveChatModal
  },
  data() {
    return {
      questions: [],
      isAddQuestionModalActive: false,
      isLiveChatModalActive: false
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      profile: "user/profile",
      token: "auth/authToken"
    })
  },
  created() {
    if (this.isAuthenticated) {
      Vue.prototype.startSignalR(this.token);
      this.$questionHub.$on("question-added", this.onQuestionAdded);
    }
    this.$http.get("/api/question").then(res => {
      this.questions = res.data;
    });
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$questionHub.$off("question-added", this.onQuestionAdded);
  },
  methods: {
    onQuestionAdded(question) {
      // make sure the question doesnt exist yet (as it will also arrive through signalR!)
      if (this.questions.some(q => q.id === question.id)) return;
      this.questions = [question, ...this.questions];
    }
  }
};
</script>

<style src="../../node_modules/bootstrap/dist/css/bootstrap.css" scoped></style>
<style
  src="../../node_modules/bootstrap-vue/dist/bootstrap-vue.css"
  scoped
></style>
<style scoped>
.rounded-corners {
  border-radius: 20px 40px;
}
</style>
