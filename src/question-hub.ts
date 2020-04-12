//import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import * as signalR from "@microsoft/signalr";

export default {
  install(Vue: any) {
    // use a new Vue instance as the interface for Vue components to receive/send SignalR events
    // this way every component can listen to events or send new events using this.$questionHub
    const questionHub = new Vue();
    Vue.prototype.$questionHub = questionHub;

    // Provide methods to connect/disconnect from the SignalR hub
    let connection: any = null;
    let startedPromise: any = null;
    let manuallyClosed = false;

    Vue.prototype.startSignalR = (jwtToken: any) => {
      connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/question-hub", {
          accessTokenFactory: () => jwtToken
        })
        //.configureLogging(LogLevel.Information)
        .build();

      // Forward hub events through the event, so we can listen for them in the Vue components
      connection.on("QuestionAdded", (question: any) => {
        questionHub.$emit("question-added", question);
      });
      connection.on("QuestionScoreChange", (questionId: any, score: any) => {
        questionHub.$emit("score-changed", { questionId, score });
      });
      connection.on(
        "AnswerCountChange",
        (questionId: any, answerCount: any) => {
          questionHub.$emit("answer-count-changed", {
            questionId,
            answerCount
          });
        }
      );
      connection.on("AnswerAdded", (answer: any) => {
        questionHub.$emit("answer-added", answer);
      });
      connection.on("LiveChatMessageReceived", (username: any, text: any) => {
        questionHub.$emit("chat-message-received", { username, text });
      });

      // You need to call connection.start() to establish the connection but the client wont handle reconnecting for you!
      // Docs recommend listening onclose and handling it there.
      // This is the simplest of the strategies
      function start() {
        startedPromise = connection
          .start()
          .then(() => {
            console.log('Chat Connection started.'); // eslint-disable-line
            console.log('Now connected, connection ID=' + connection.connectionId); // eslint-disable-line
          })
          .catch((err: any) => {
            console.error('Failed to connect with hub', err) // eslint-disable-line
            return new Promise((resolve, reject) =>
              setTimeout(
                () =>
                  start()
                    .then(resolve)
                    .catch(reject),
                5000
              )
            );
          });
        return startedPromise;
      }
      connection.onclose(() => {
        if (!manuallyClosed) start();
      });

      // Start everything
      manuallyClosed = false;
      start();
    };
    Vue.prototype.stopSignalR = () => {
      if (!startedPromise) return;

      manuallyClosed = true;
      return startedPromise
        .then(() => connection.stop())
        .then(() => {
          startedPromise = null;
        });
    };

    // Provide methods for components to send messages back to server
    // Make sure no invocation happens until the connection is established
    questionHub.questionOpened = (questionId: any) => {
      if (!startedPromise) return;

      return startedPromise
        .then(() => connection.invoke("JoinQuestionGroup", questionId))
        .catch(console.error) // eslint-disable-line
    };
    questionHub.questionClosed = (questionId: any) => {
      if (!startedPromise) return;

      return startedPromise
        .then(() => connection.invoke("LeaveQuestionGroup", questionId))
        .catch(console.error) // eslint-disable-line
    };
    questionHub.sendMessage = (message: any) => {
      if (!startedPromise) return;

      return startedPromise
        .then(() => connection.invoke("SendLiveChatMessage", message))
        .catch(console.error) // eslint-disable-line
    };
  }
};
