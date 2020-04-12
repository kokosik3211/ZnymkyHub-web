<template>
  <article class="container has-margin-top-20" v-if="question">
    <header class="row align-items-center">
      <question-score :question="question" class="col-1" />
      <h3 class="col-8">{{ question.title }}</h3>
      <p class="col-3">Posted by: {{ question.createdBy }}</p>
    </header>
    <p class="row">
      <vue-markdown class="offset-1 col-11">{{ question.body }}</vue-markdown>
    </p>
    <ul class="list-unstyled" v-if="hasAnswers">
      <li
        v-for="answer in question.answers"
        :key="answer.id"
        class="row border-top py-2"
      >
        <vue-markdown class="offset-1 col-8">{{ answer.body }}</vue-markdown>
        <p class="col-3">{{ answer.createdBy }}</p>
      </li>
    </ul>

    <div class="is-divider"></div>

    <b-field class="has-margin-bottom-10">
      <b-modal :active.sync="isAddAnswerModalActive" :width="640">
        <add-answer-modal
          :question-id="this.questionId"
          @answer-added="onAnswerAdded"
        >
        </add-answer-modal>
      </b-modal>
      <button
        class="btn btn-primary float-right"
        :disabled="!isAuthenticated"
        @click="isAddAnswerModalActive = true"
      >
        <i class="fas fa-edit" /> Post your Answer
      </button>
      <button class="btn btn-link float-right" @click="onReturnHome">
        Back to list
      </button>
    </b-field>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import VueMarkdown from "vue-markdown";
import QuestionScore from "@/components/question-score";
import AddAnswerModal from "@/components/add-answer-modal";

export default {
  components: {
    VueMarkdown,
    QuestionScore,
    AddAnswerModal
  },
  data() {
    return {
      question: null,
      answers: [],
      questionId: this.$route.params.id,
      isAddAnswerModalActive: false
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated"
    }),
    hasAnswers() {
      return this.question.answers.length > 0;
    }
  },
  created() {
    // Load the question and notify the server we are watching the question
    this.$http.get(`/api/question/${this.questionId}`).then(res => {
      this.question = res.data;
      return this.$questionHub.questionOpened(this.questionId);
    });
    // Listen for notifications that new answer were added
    this.$questionHub.$on("answer-added", this.onAnswerAdded);
  },
  beforeDestroy() {
    // Notify the server we stopped watching the question
    this.$questionHub.questionClosed(this.questionId);
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$questionHub.$off("answer-added", this.onAnswerAdded);
  },
  methods: {
    onReturnHome() {
      this.$router.push({ name: "forum" });
    },
    // This method can be called directly from the modal or after receiving an event through signalR
    onAnswerAdded(answer) {
      if (this.question.id !== answer.questionId) return;
      if (!this.question.answers.find(a => a.id === answer.id)) {
        this.question.answers.push(answer);
      }
    }
  }
};
</script>

<style src="../../node_modules/bootstrap/dist/css/bootstrap.css" scoped></style>
<style
  src="../../node_modules/bootstrap-vue/dist/bootstrap-vue.css"
  scoped
></style>
