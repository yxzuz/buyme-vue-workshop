<template>
  <div
    class="d-flex flex-column justify-center align-center ma-10 font-Poppins grey-lighten-4"
  >
    <h1 class="text-h3 blue-grey--text font-weight-bold mb-4">
      Grade Calculator
    </h1>
    <v-text-field
      clearable
      v-model="score"
      label="Enter your score"
      class="font-weight-bold"
    ></v-text-field>
    <v-btn
      color="blue-grey lighten-2"
      rounded
      class="mb-10 white--text"
      @click="setMessage"
      >Calculate Grade</v-btn
    >
    <v-card class="mt-4 mb-10" v-if="message">
      <v-card-text class="text-h5">{{ message }}</v-card-text>
    </v-card>
    <v-card
      width="400"
      class="grey-lighten-4 pa-4 d-flex justify-center align-center flex-column"
    >
      <v-card-title class="text-h6 blue-grey--text">Grading Scale</v-card-title>
      <v-card-text
        ><span class="font-weight-bold green--text">A:</span> 80 -
        100</v-card-text
      >
      <v-card-text
        ><span class="font-weight-bold blue--text">B:</span> 70 -
        79</v-card-text
      >
      <v-card-text
        ><span class="font-weight-bold yellow--text text--darken-2">C:</span> 60
        - 69</v-card-text
      >
      <v-card-text
        ><span class="font-weight-bold red--text">D:</span> 50 - 59</v-card-text
      >
      <v-card-text
        ><span class="font-weight-bold text-display-small grey--text">F:</span>
        0 - 49</v-card-text
      >
    </v-card>
  </div>
</template>

<script>
import { wait } from '@/utils/wait';
export default {
  data() {
    return {
      score: 0,
      grade: '',
      message: '',
      valid: null,
      items: [
        { grade: 'A', text: 'Congratulations! You got an A!' },
        { grade: 'B', text: 'Good job! You got a B!' },
        { grade: 'C', text: 'You got a C. Keep trying!' },
        { grade: 'D', text: 'You got a D. You can do better!' },
        { grade: 'F', text: "You got an F. Don't give up! Keep studying!" },
      ],
    };
  },
  methods: {
    calculateGrade() {
      if (this.score >= 80) {
        return 'A';
      } else if (this.score >= 70) {
        return 'B';
      } else if (this.score >= 60) {
        return 'C';
      } else if (this.score >= 50) {
        return 'D';
      } else {
        return 'F';
      }
    },
    setMessage() {
      if (!this.checkValid()) {
        alert(this.message);
        return;
      }
      const grade = this.calculateGrade();
      if (grade === 'A') {
        this.startConfetti();
        wait(2000).then(() => {
          this.$confetti.stop();
        }); // stop confetti after 2 seconds
      }
      const item = this.items.find((item) => item.grade === grade);
      this.message = item ? item.text : '';
    },
    checkValid() {
      if (this.score < 0 || this.score > 100) {
        this.message = 'Please enter a valid score between 0 and 100.';
        return false;
      }
      try {
        const parsedScore = parseFloat(this.score);
        if (isNaN(parsedScore)) {
          this.message = 'Please enter a valid number.';
          return false;
        }
      } catch (error) {
        this.message = 'An error occurred while processing the score.';
        return false;
      }
      return true;
    },
    startConfetti() {
      this.$confetti.start();
    },
  },
};
</script>

<style></style>
