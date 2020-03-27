<template>
  <div>
    <h1>
      This totally looks like Stack Overflow
      <button
        v-b-modal.addQuestionModal
        :disabled="!isAuthenticated"
        class="btn btn-primary mt-2 float-right"
      >
        <i class="fas fa-plus" /> Ask a question
      </button>
      <button
        v-b-modal.liveChatModal
        :disabled="!isAuthenticated"
        class="btn btn-secondary mt-2 mr-2 float-right"
      >
        <i class="fas fa-comments" /> Live chat
      </button>
    </h1>
    <ul class="list-group question-previews mt-4">
      <question-preview
        v-for="question in questions"
        :key="question.id"
        :question="question"
        class="list-group-item mb-3"
      />
    </ul>
    <add-question-modal @question-added="onQuestionAdded" />
    <live-chat-modal />
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
      questions: []
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
    debugger; // eslint-disable-line
    if (this.isAuthenticated) {
      Vue.prototype.startSignalR(this.token);
      this.$questionHub.$on("question-added", this.onQuestionAdded);
      this.$http.get("/api/question").then(res => {
        this.questions = res.data;
      });
    }
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$questionHub.$off("question-added", this.onQuestionAdded);
  },
  methods: {
    onQuestionAdded(question) {
      debugger; // eslint-disable-line
      // make sure the question doesnt exist yet (as it will also arrive through signalR!)
      if (this.questions.some(q => q.id === question.id)) return;
      this.questions = [question, ...this.questions];
    }
  }
};
</script>
